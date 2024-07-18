import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { db } from "../lib/db";
import { getPersonalInformation } from "./user";

jest.mock("../lib/db", () => ({
  __esModule: true,
  db: mockDeep<DeepMockProxy<typeof db>>(),
}));

const prismaMock = db as unknown as DeepMockProxy<typeof db>;

describe("getPersonalInformation", () => {
  beforeEach(() => {
    mockReset(prismaMock);
  });

  it("should return personal information for a given userId", async () => {
    const mockPersonalInfo = {
      id: "1",
      userId: "1",
      firstName: "John",
      middleName: null,
      lastName: "Doe",
      dob: new Date(),
      mobile: "123456789",
      gender: "male",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.personal.findUnique.mockResolvedValue(mockPersonalInfo);

    const result = await getPersonalInformation("1");
    expect(result).toEqual(mockPersonalInfo);
  });

  it("should return null when no personal information is found", async () => {
    prismaMock.personal.findUnique.mockResolvedValue(null);

    const result = await getPersonalInformation("2");
    expect(result).toBeNull();
  });

  it("should return null on exception", async () => {
    prismaMock.personal.findUnique.mockRejectedValue(
      new Error("Database error")
    );

    const result = await getPersonalInformation("3");
    expect(result).toBeNull();
  });
});
