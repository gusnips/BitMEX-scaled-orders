import React from 'react';
import cx from 'classnames';
import styles from './Button.module.css';

export type ButtonVariants = 'submit' | 'text' | 'buy' | 'sell' | 'custom';

export interface ButtonProps {
  testID?: string;
  id?: string;
  label: string;
  variant?: ButtonVariants;
  disabled?: boolean;
  onClick: (event: any) => void;
  style?: any;
  className?: any;
}

function Button({id, label, testID, variant = 'submit', disabled, onClick, style, className = ''}: ButtonProps) {
  const buttonStyle = cx({
    [styles.button]: variant === 'submit',
    [styles.text_button]: variant === 'text',
    [styles.button_buy]: variant === 'buy',
    [styles.button_sell]: variant === 'sell',
    [className]: variant === 'custom',
  });

  return (
    <button id={id} data-test-id={testID} className={buttonStyle} style={style} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export {Button};
