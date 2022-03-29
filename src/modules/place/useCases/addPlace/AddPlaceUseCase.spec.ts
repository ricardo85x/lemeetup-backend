import faker from "@faker-js/faker";

import { AddPlaceUseCase } from "./AddPlaceUseCase";

describe("PLACE", () => {
  it("should create a new place", async () => {
    const place = {
      name: faker.address.cityName(),
      description: faker.lorem.text(),
      latitude: Number(faker.address.latitude()),
      longitude: Number(faker.address.longitude()),
    };

    const addPlaceUseCase = new AddPlaceUseCase();

    expect(
      await addPlaceUseCase.handle({
        description: place.description,
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
      })
    ).toBeTruthy();
  });
});
