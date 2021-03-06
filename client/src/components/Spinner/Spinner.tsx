import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core/styles';
import styles from './Spinner.module.scss';

const ColorLinearProgress = withStyles({
  root: {height: '5px', width: '600px', margin: '0 auto'},
  colorPrimary: {backgroundColor: '#b2dfdb'},
  barColorPrimary: {backgroundColor: '#4caf50'},
})(LinearProgress);

interface Props {
  loading: boolean;
}

export function Spinner({loading}: Props) {
  return <>{loading ? <ColorLinearProgress /> : <div className={styles.spinnerNonLoading} />}</>;
}
