import React, {useState} from 'react';
import {Container, Grid} from '@material-ui/core';
import styles from './styles.module.scss';
import {MAIN_CONTAINER} from '../../data-test-ids';

export interface MainContainerProps {
  children: React.ReactNode;
  label: string;
  description?: string;
  renderOutside?: React.ReactNode;
}

export const MainContainer = React.memo(({children, label, description = '', renderOutside}: MainContainerProps) => {
  const [isViewMaximized, setViewMaximized] = useState<boolean>(true);

  const maximizeContainer = React.useCallback(() => setViewMaximized(!isViewMaximized), [isViewMaximized]);

  const cornerButton = () => (
    <div className={styles.div_corner} key={label}>
      <div
        data-test-id={MAIN_CONTAINER.CORNER_BUTTON}
        className={styles.div_corner__button}
        onClick={maximizeContainer}
      />
    </div>
  );

  function maximizedView() {
    return (
      <Grid item xs container direction="row" style={{paddingBottom: '10px'}} data-test-id={MAIN_CONTAINER.MAX_VIEW}>
        <Grid item>{cornerButton()}</Grid>
        <Grid item container xs style={{paddingRight: '20px', paddingTop: '5px'}}>
          <Grid container spacing={2} justify="center" alignItems="center">
            {children}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function minimizedView() {
    return (
      <div className={styles.container__row__minimized} data-test-id={MAIN_CONTAINER.MIN_VIEW}>
        {cornerButton()}
        <div className={styles.container_minimized_text}>
          <span>{label}</span>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Container data-testid={label} fixed maxWidth="sm" className={styles.container_scaled} style={{padding: '0px'}}>
        {isViewMaximized ? maximizedView() : minimizedView()}
      </Container>
      {isViewMaximized ? renderOutside : null}
    </>
  );
});
