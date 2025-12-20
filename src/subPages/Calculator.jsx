import "./calc.css"
import { useState } from "react"

export default function Calculator() {
    const [display, setDisplay] = useState("0")
    const [prevValue, setPrevValue] = useState(null)
    const [operation, setOperation] = useState(null)
    const [waitingForNew, setWaitingForNew] = useState(false)

    function handleNumber(num) {
        if (waitingForNew) {
            setDisplay(String(num))
            setWaitingForNew(false)
        } else {
            setDisplay(display === "0" ? String(num) : display + num)
        }
    }

    function handleDecimal() {
        if (waitingForNew) {
            setDisplay("0.")
            setWaitingForNew(false)
        } else if (!display.includes(".")) {
            setDisplay(display + ".")
        }
    }

    function handleOperation(op) {
        const currentValue = parseFloat(display)

        if (prevValue === null) {
            setPrevValue(currentValue)
        } else if (operation) {
            const result = calculate(prevValue, currentValue, operation)
            setDisplay(String(result))
            setPrevValue(result)
        }

        setOperation(op)
        setWaitingForNew(true)
    }

    function calculate(prev, current, op) {
        switch (op) {
            case "+":
                return prev + current
            case "-":
                return prev - current
            case "*":
                return prev * current
            case "/":
                return prev / current
            default:
                return current
        }
    }

    function handleEquals() {
        if (operation && prevValue !== null) {
            const currentValue = parseFloat(display)
            const result = calculate(prevValue, currentValue, operation)
            setDisplay(String(result))
            setPrevValue(null)
            setOperation(null)
            setWaitingForNew(true)
        }
    }

    function handleClear() {
        setDisplay("0")
        setPrevValue(null)
        setOperation(null)
        setWaitingForNew(false)
    }

    function handleBackspace() {
        if (display.length === 1) {
            setDisplay("0")
        } else {
            setDisplay(display.slice(0, -1))
        }
    }

    function handlePercentage() {
        const currentValue = parseFloat(display)
        setDisplay(String(currentValue / 100))
    }

    function handleToggleSign() {
        const currentValue = parseFloat(display)
        setDisplay(String(-currentValue))
    }

    return <>
        <div className="calculator-window">
            <div className="calc-display">
                <input type="text" value={display} readOnly className="display-input" />
            </div>
            <div className="calc-buttons">
                <div className="button-row">
                    <button className="btn btn-function" onClick={handleClear}>AC</button>
                    <button className="btn btn-function" onClick={handleToggleSign}>+/-</button>
                    <button className="btn btn-function" onClick={handlePercentage}>%</button>
                    <button className="btn btn-operator" onClick={() => handleOperation("/")}>÷</button>
                </div>

                <div className="button-row">
                    <button className="btn btn-number" onClick={() => handleNumber(7)}>7</button>
                    <button className="btn btn-number" onClick={() => handleNumber(8)}>8</button>
                    <button className="btn btn-number" onClick={() => handleNumber(9)}>9</button>
                    <button className="btn btn-operator" onClick={() => handleOperation("*")}>×</button>
                </div>

                <div className="button-row">
                    <button className="btn btn-number" onClick={() => handleNumber(4)}>4</button>
                    <button className="btn btn-number" onClick={() => handleNumber(5)}>5</button>
                    <button className="btn btn-number" onClick={() => handleNumber(6)}>6</button>
                    <button className="btn btn-operator" onClick={() => handleOperation("-")}>−</button>
                </div>

                <div className="button-row">
                    <button className="btn btn-number" onClick={() => handleNumber(1)}>1</button>
                    <button className="btn btn-number" onClick={() => handleNumber(2)}>2</button>
                    <button className="btn btn-number" onClick={() => handleNumber(3)}>3</button>
                    <button className="btn btn-operator" onClick={() => handleOperation("+")}>+</button>
                </div>

                <div className="button-row">
                    <button className="btn btn-number btn-zero" onClick={() => handleNumber(0)}>0</button>
                    <button className="btn btn-number" onClick={handleDecimal}>.</button>
                    <button className="btn btn-equals" onClick={handleEquals}>=</button>
                </div>
            </div>
        </div>
    </>
}