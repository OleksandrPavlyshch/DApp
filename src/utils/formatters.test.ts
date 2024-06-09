import { truncateAddress, formatValue, formatDate } from "./formatters";

describe("truncateAddress", () => {
  it("should truncate the address correctly", () => {
    const address = "0x1234567890abcdef";
    const truncatedAddress = truncateAddress(address);
    expect(truncatedAddress).toBe("0x1234...cdef");
  });
});

describe("formatValue", () => {
  it("should format the value correctly", () => {
    const value = "1000000000000000000";
    const formattedValue = formatValue(value);
    expect(formattedValue).toBe("1.0");
  });
});

describe("formatDate", () => {
  it("should format the timestamp correctly", () => {
    const timestamp = 1631234567;
    const formattedDate = formatDate(timestamp);
    expect(formattedDate).toBe("9/9/2021, 8:42:47 PM");
  });
});