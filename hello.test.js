test("jest runs our first test", function () {})

test("2+2 is 4", function () {
  expect(2+2).toBe(4)
})

test("sum adds 2 and 2 to get 4", function () {
    const sum = require("./lib/sum")
    expect(sum(2, 2)).toBe(4)
})
