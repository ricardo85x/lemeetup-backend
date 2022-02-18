import { hash } from "bcrypt";

import { prisma } from "../../../../database/prismaClient";

interface IRegisterUser {
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  async execute({ email, password }: IRegisterUser) {
    const userExists = await prisma.users.findFirst({
      where: {
        email: {
          mode: "insensitive",
          equals: email,
        },
      },
    });

    if (userExists) {
      throw new Error("username already taken");
    }

    const hashPassword = await hash(password, 10);

    const user = await prisma.users.create({
      data: { email, password: hashPassword },
    });

    return user;
  }
}
