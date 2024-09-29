// src/components/Calculator.js

import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css'; // Make sure this imports the CSS

const Calculator = () => {
    const [input, setInput] = useState("0");
    const [isScientific, setIsScientific] = useState(false);

    const handleButtonClick = (value) => {
        if (input === "0" && !isNaN(value)) {
            setInput(value);
        } else if (value === "C") {
            setInput("0");
        } else if (value === "=") {
            try {
                const result = evaluate(input);
                setInput(result.toString());
                document.querySelector('.display').classList.add('animate'); // Add animation class
                setTimeout(() => {
                    document.querySelector('.display').classList.remove('animate'); // Remove animation class after some time
                }, 500);
            } catch {
                setInput("Error");
            }
        } else {
            // Limit input length to 12 characters
            if (input.length < 12) {
                setInput(prevInput => prevInput + value);
            }
        }
    };

    const toggleCalculatorType = () => {
        setIsScientific(!isScientific);
        setInput("0"); // Reset input when toggling
    };

    // Keyboard input handling
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;

            // Map key presses to calculator input
            if (/[0-9]/.test(key) || "+-*/=()".includes(key)) {
                if (key === "=") {
                    handleButtonClick("=");
                } else {
                    handleButtonClick(key);
                }
            } else if (key === "c" || key === "C") {
                handleButtonClick("C");
            } else if (key === "Enter") {
                handleButtonClick("=");
            } else if (key === "Backspace") {
                setInput(prevInput => prevInput.length > 1 ? prevInput.slice(0, -1) : "0");
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [input]);

    return (
        <div className="calculator">
            <div className="display">{input}</div>
            <div className="buttons">
                <div className="button-row">
                    <button onClick={() => handleButtonClick("C")}>C</button>
                    <button onClick={toggleCalculatorType}>
                        {isScientific ? "Standard" : "Scientific"}
                    </button>
                </div>
                <div className="button-row">
                    <button onClick={() => handleButtonClick("7")}>7</button>
                    <button onClick={() => handleButtonClick("8")}>8</button>
                    <button onClick={() => handleButtonClick("9")}>9</button>
                    <button onClick={() => handleButtonClick("/")}>/</button>
                </div>
                <div className="button-row">
                    <button onClick={() => handleButtonClick("4")}>4</button>
                    <button onClick={() => handleButtonClick("5")}>5</button>
                    <button onClick={() => handleButtonClick("6")}>6</button>
                    <button onClick={() => handleButtonClick("*")}>*</button>
                </div>
                <div className="button-row">
                    <button onClick={() => handleButtonClick("1")}>1</button>
                    <button onClick={() => handleButtonClick("2")}>2</button>
                    <button onClick={() => handleButtonClick("3")}>3</button>
                    <button onClick={() => handleButtonClick("-")}>-</button>
                </div>
                <div className="button-row">
                    <button onClick={() => handleButtonClick("0")}>0</button>
                    <button onClick={() => handleButtonClick(".")}>.</button>
                    <button onClick={() => handleButtonClick("=")}>=</button>
                    <button onClick={() => handleButtonClick("+")}>+</button>
                </div>
                {isScientific && (
                    <div className="scientific-buttons">
                        <button onClick={() => handleButtonClick("sin(")}>sin</button>
                        <button onClick={() => handleButtonClick("cos(")}>cos</button>
                        <button onClick={() => handleButtonClick("tan(")}>tan</button>
                        <button onClick={() => handleButtonClick("sqrt(")}>√</button>
                        <button onClick={() => handleButtonClick("PI")}>π</button>
                        <button onClick={() => handleButtonClick("e")}>e</button>
                        <button onClick={() => handleButtonClick(")")}>)</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculator;
