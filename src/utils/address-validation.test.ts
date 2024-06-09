import { isValidEthAddress } from "./address-validation";

describe("isValidEthAddress", () => {
  it("should return true for a valid Ethereum address", () => {
    const address = "0xcA8400c2D78f34B59baEc44e5dB25f475B5aC209";
    const isValid = isValidEthAddress(address);
    expect(isValid).toBe(true);
  });

  it("should return false for an invalid Ethereum address", () => {
    const address = "invalidAddress";
    const isValid = isValidEthAddress(address);
    expect(isValid).toBe(false);
  });
});