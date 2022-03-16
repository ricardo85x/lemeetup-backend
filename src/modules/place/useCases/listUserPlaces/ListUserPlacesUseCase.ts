import prisma from "../../../../database/prismaClient";
import { CustomError } from "../../../error/CustomError";

export class ListUserPlacesUseCase {
  async execute(user_id: string) {
    const result = await prisma.users.findUnique({
      where: { id: user_id },
      select: {
        email: true,
        places: {
          select: {
            joined_at: true,
            owner: true,
            place: true,
          },
        },
      },
    });

    if (!result) {
      throw new CustomError("User Not found", 404);
    }
    return result;
  }
}
