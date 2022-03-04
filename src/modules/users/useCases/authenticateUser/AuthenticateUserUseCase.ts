import { compare } from "bcrypt";

import { prisma } from "../../../../database/prismaClient";
import { generateJwtTokenAndRefreshToken } from "../../utils/auth/tokenAndRefreshToken";

interface IAuthenticateUser {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUser) {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Email or password is not valid");
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      throw new Error("Email or password is not valid");
    }

    const payload = {
      email,
    };

    const response = await generateJwtTokenAndRefreshToken({
      email,
      payload,
      subject: user.id,
    });

    return response;
  }
}
