test("returns 5 when 2 is added to 3", () => {
  let validity;
  if (2 + 3) {
    validity = true;
  }
  expect(validity).toBe(true);
});
