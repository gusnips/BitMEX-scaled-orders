import React from 'react';
import styles from './styles.module.scss';

interface Props {
  id: string;
  label: string;
  onChange: (event: any) => void;
  disabled?: boolean;
}

const availableSymbols = ['XBTUSD', 'ETHUSD', 'XRPUSD'];

function SelectDropdown({id, label, onChange, disabled = false}: Props) {
  const renderSymbol = (item: string) => (
    <option key={item} value={item}>
      {item}
    </option>
  );

  return (
    <div className={styles.select_dropdown}>
      <label htmlFor={label}>{label}</label>

      <select disabled={disabled} className="custom-select" onChange={onChange} id={id}>
        {availableSymbols.map(renderSymbol)}
      </select>
    </div>
  );
}

export {SelectDropdown};
