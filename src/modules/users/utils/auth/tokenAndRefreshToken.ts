import { sign } from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";

import { prisma } from "../../../../database/prismaClient";

interface IGenerateJwtTokenAndRefreshToken {
  email: string;
  payload: string | object | Buffer;
  subject: string;
  token_family?: string;
}

type IUpdateRefreshTokenAndJWT = Omit<
  IGenerateJwtTokenAndRefreshToken,
  "token_family"
> & {
  refresh_token: string;
};

interface ICheckValidRefreshToken {
  email: string;
  token: string;
}

const generateRefreshToken = async (
  email: string,
  token_family?: string
): Promise<string> => {
  const refresh_token = uuidV4() as string;

  let count = 0;

  if (token_family) {
    const family = await prisma.refreshTokens.findMany({
      where: { token_family, email },
    });

    if (!family.length) {
      throw new Error("Invalid token family");
    }

    count = family.reduce((acc, f) => {
      if (f.count > acc) {
        // eslint-disable-next-line no-param-reassign
        acc = f.count;
      }
      return acc;
    }, 0);
    count += 1;
  }

  const data = {
    count,
    email,
    token: refresh_token,
    token_family: count > 0 ? token_family : refresh_token,
  };

  await prisma.refreshTokens.create({
    data,
  });

  return refresh_token;
};

export const checkRefreshTokenAndUpdate = async ({
  email,
  token,
}: ICheckValidRefreshToken) => {
  const foundToken = await prisma.refreshTokens.findFirst({
    where: {
      email,
      token,
    },
  });

  // token not found
  if (!foundToken) {
    throw new Error("Invalid token");
  }

  const { token_family } = foundToken;

  const tokenFamilies = await prisma.refreshTokens.findMany({
    where: { token_family, email },
  });

  const latestCount = tokenFamilies.reduce((acc, token) => {
    if (token.count > acc) {
      // eslint-disable-next-line no-param-reassign
      acc = token.count;
    }
    return acc;
  }, 0);

  // old refresh token used, are you a hacker?
  if (foundToken.count < latestCount) {
    await prisma.refreshTokens.deleteMany({
      where: { token_family },
    });
    throw new Error("Token already used!, invalidating all family members");
  }

  const updatedRefreshToken = await generateRefreshToken(email, token_family);

  return {
    refresh_token: updatedRefreshToken,
  };
};

export const updateRefreshTokenAndJWT = async ({
  email,
  refresh_token,
  payload,
  subject,
}: IUpdateRefreshTokenAndJWT) => {
  const { refresh_token: newRefreshToken } = await checkRefreshTokenAndUpdate({
    email,
    token: refresh_token,
  });

  const hash = process.env.USER_AUTH_SECRET;

  const newJWT = sign(payload, hash, {
    subject,
    expiresIn: process.env.JWT_TIMEOUT,
  });

  return {
    new_token: newJWT,
    new_refresh_token: newRefreshToken,
  };
};

export const generateJwtTokenAndRefreshToken = async ({
  email,
  payload,
  subject,
}: IGenerateJwtTokenAndRefreshToken) => {
  const refresh_token = await generateRefreshToken(email);

  const hash = process.env.USER_AUTH_SECRET;

  const token = sign(payload, hash, {
    subject,
    expiresIn: process.env.JWT_TIMEOUT,
  });

  return {
    token,
    refresh_token,
  };
};
