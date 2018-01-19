import React from 'react';
import Head from 'next/head';

import cx from 'classnames';

import variables from '../../styles/variables';

export default ({ double }) => {
    return (
        <div>
            <div className={cx('base', { double })} />
            <style jsx>{`
                .base {
                    height: 8px;
                    width: 100%;
                    flex-shrink: 0;
                }

                .double {
                    height: 8px;
                }
            `}</style>
        </div>
    )
}
