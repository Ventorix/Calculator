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

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent)),
);

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent)),
);

function appendNumber(number) {
  if (currentValue.textContent === '0' || shouldResetScreen) resetScreen();
  currentValue.textContent += number;
}

function appendDot() {
  if (shouldResetScreen) resetScreen();
  if (currentValue.textContent === '') currentValue.textContent = '0';
  if (currentValue.textContent.includes('.')) return;
  currentValue.textContent += '.';
}

function resetScreen() {
  currentValue.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  currentValue.textContent = '0';
  previousValue.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}

function backspaceNumber() {
  currentValue.textContent = currentValue.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentValue.textContent;
  currentOperation = operator;
  previousValue.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

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

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendDot();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspaceNumber();
  if (e.key === 'Escape') clear();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷';
  if (keyboardOperator === '*') return '×';
  if (keyboardOperator === '-') return '−';
  if (keyboardOperator === '+') return '+';
}

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
