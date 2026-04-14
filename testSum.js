const sum = require("./lib/sum")
const actual = sum(2, 2)
const expected = 4
if (actual !== expected) {
    throw new Error(`${actual} is not equal to ${expected}`)
}
