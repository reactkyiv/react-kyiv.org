import React from 'react';
import { object } from 'prop-types';
import classNames from 'classnames';

import Image from './../Image';
import Button from './../Button';

import styles from './HeaderBar.scss';

export default class HeaderBar extends React.Component {
  static contextTypes = {
    i18n: object,
  };

  render() {
    const { l } = this.context.i18n;

    return (
      <div className={styles.headerBar}>
        <div className={styles.leftSide}>
          <div className={styles.logo}>
            <Image
              className={styles.logoImg}
              src={require('./imgs/logo.png')}
            />
          </div>
          <div className={styles.title}>
            <h1>{l('React Example')}</h1>
          </div>
        </div>
        <div className={styles.rightSide}>
          <Button>{l('Register')}</Button>
          <Button>{l('Login')}</Button>
          <div className={styles.mainActionButton}>
            <Button secondary>{l('Action')}</Button>
          </div>
        </div>
        <div className={classNames(styles.rightSide, styles.mobile)}>
          <Button icon>
            <Image
              src={require('bytesize-icons/dist/icons/menu.svg')}
            />
          </Button>
        </div>
      </div>
    );
  }
}
