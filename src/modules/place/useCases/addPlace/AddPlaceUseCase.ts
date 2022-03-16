import { prisma } from "../../../../database/prismaClient";

interface IAddPlaceUseCase {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  email?: string;
}
export class AddPlaceUseCase {
  async handle({
    name,
    description,
    latitude,
    longitude,
    email,
  }: IAddPlaceUseCase) {
    if (latitude < -90 || latitude > 90) {
      throw new Error("Invalid latitude, must be between -90 and 90");
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error("Invalid longitude, must be between -180 and 180");
    }

    if (name.length < 3) {
      throw new Error("Invalid name, must be at least 3 characters");
    }

    const result = await prisma.place.create({
      data: { name, description, latitude, longitude },
    });

    if (email) {
      const user = await prisma.users.findFirst({
        where: { email },
      });

      if (user) {
        await prisma.userOnPlace.create({
          data: {
            owner: true,
            place_id: result.id,
            user_id: user.id,
          },
        });
      }
    }

    return result;
  }
}
