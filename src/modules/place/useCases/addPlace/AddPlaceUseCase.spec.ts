import { prismaMock } from "../../../../singletonTest";
import { AddPlaceUseCase } from "./AddPlaceUseCase";

describe("PLACE", () => {
  it("should create a new place", async () => {
    const place = {
      id: "29219cbb-390f-409d-b6f2-ff53afbb2532",
      name: "Pista de sao bernado",
      description: "Bom lugar para andar de patins",
      latitude: -23.50660320067105,
      longitude: -46.6154439769532,
    };

    prismaMock?.place?.create?.mockResolvedValue(place);

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
