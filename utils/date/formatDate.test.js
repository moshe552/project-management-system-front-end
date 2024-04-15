import formatDate from "./formatDate";

test("Format dates to `MonthName D, YYYY`", () => {
  expect(formatDate("12-3-2024")).toBe("December 3, 2024");
});
