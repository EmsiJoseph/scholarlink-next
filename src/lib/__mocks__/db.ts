import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import { db } from "../db"; // Adjust the path according to your setup

jest.mock("../src/lib/db", () => ({
  __esModule: true,
  db: mockDeep<DeepMockProxy<typeof db>>(),
}));

export const prismaMock = db as unknown as DeepMockProxy<typeof db>;
