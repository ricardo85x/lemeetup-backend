import prisma from "../../../../database/prismaClient";

export class ListPlaceUseCase {
  async execute() {
    const places = await prisma.place.findMany();
    return places;
  }
}
