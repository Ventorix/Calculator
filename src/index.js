import './index.html';
import './index.scss';

// Default values
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

// Selecting DOM elements
const currentValue = document.querySelector('.screen-current');
const previousValue = document.querySelector('.screen-previous');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('.equals-btn');
const clearButton = document.querySelector('.clear-btn');
const backspaceButton = document.querySelector('.backspace-btn');
const dotButton = document.querySelector('.dot-btn');

// Event listeners for various actions
window.addEventListener('keydown', handleKeyboardInput);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspaceNumber);
dotButton.addEventListener('click', appendDot);

// Add event listeners to all number buttons
numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent)),
);

// Add event listeners to all operator buttons
operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent)),
);

// This function appends a number to the calculator screen
function appendNumber(number) {
  if (currentValue.textContent === '0' || shouldResetScreen) resetScreen();
  currentValue.textContent += number;
}

// This function appends a decimal point to the current value on the calculator screen
function appendDot() {
  if (shouldResetScreen) resetScreen();
  if (currentValue.textContent === '') currentValue.textContent = '0';
  if (currentValue.textContent.includes('.')) return;
  currentValue.textContent += '.';
}

// This function resets the calculator screen
function resetScreen() {
  currentValue.textContent = '';
  shouldResetScreen = false;
}

// This function clear the calculator screen
function clear() {
  currentValue.textContent = '0';
  previousValue.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}

// This function removes the last digit from the current value on the calculator screen
function backspaceNumber() {
  currentValue.textContent = currentValue.textContent.toString().slice(0, -1);
}

// This function sets the current operation to be performed on the calculator
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentValue.textContent;
  currentOperation = operator;
  previousValue.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

// This function evaluates the current operation on the calculator
function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === '÷' && currentValue.textContent === '0') {
    alert("Don't try to divide by zero");
    return;
  }
  secondOperand = currentValue.textContent;
  currentValue.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand));
  previousValue.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

// This function rounds off the result of an operation
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

// This function handles keyboard input for the calculator
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendDot();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspaceNumber();
  if (e.key === 'Escape') clear();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key));
}

// This function converts the keyboard operator to the corresponding calculator operator
function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷';
  if (keyboardOperator === '*') return '×';
  if (keyboardOperator === '-') return '−';
  if (keyboardOperator === '+') return '+';
}

// Basic math functions
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// This function performs the specified operation on two numbers
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '−':
      return substract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
