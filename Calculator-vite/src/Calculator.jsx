import React, { useState } from 'react';
import Button from './Button';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setResult(eval(expression).toString());
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else {
      setExpression(prev => prev + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div>{expression}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((btn, i) => (
          <Button key={i} label={btn} onClick={() => handleClick(btn)} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
