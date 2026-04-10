class Calculator {
    static ADD = "Calculator.ADD"
    static SUB = "Calculator.SUB"
    static MUL = "Calculator.MUL"
    static DIV = "Calculator.DIV"

    calculate(a, b, operation) {
        switch (operation) {
            case Calculator.ADD:
                return a + b
            case Calculator.SUB:
                return a - b
            case Calculator.MUL:
                return a * b
            case Calculator.DIV:
                if (b === 0) {
                    throw new RangeError("Can't divide by 0")
                }
                return a / b
        }
    }
}

module.exports = Calculator
