import React from 'react';
import cx from 'classnames';
import {toast, ToastContainer as ToastifyContainer} from 'react-toastify';
import SVGIcon from '../SVGIcon/SVGIcon';
import ICONS from '../SVGIcon/icons';
import styles from './ToastBar.module.css';
import './ToastContainer.css';

export type ToastPreset = 'success' | 'warning' | 'error' | 'general';

const toastColors: {[key in ToastPreset]: string} = {
  error: 'pink',
  success: 'green',
  warning: 'orange',
  general: 'violet',
};

export interface ToastBarProps {
  toastPreset: ToastPreset;
  message: string;
}

const ToastBar = React.memo(({toastPreset, message}: ToastBarProps) => {
  const toast_style = cx({
    [styles.error_toast]: toastPreset === 'error',
    [styles.success_toast]: toastPreset === 'success',
    [styles.warning_toast]: toastPreset === 'warning',
  });

  return (
    <div className={toast_style}>
      <SVGIcon color={toastColors[toastPreset]} icon={ICONS[toastPreset?.toUpperCase()]} />
      <span className={styles.toast_text}>{message}</span>
    </div>
  );
});

export const ToastContainer = React.memo(() => {
  return <ToastifyContainer autoClose={50000} closeButton={false} position={'top-center'} />;
});

export function showToast(message: string, preset: ToastPreset = 'success') {
  toast(<ToastBar toastPreset={preset} message={message} />);
}
