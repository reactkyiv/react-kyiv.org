import React, { Fragment } from 'react';
import Head from 'next/head';

import cx from 'classnames';

import variables from '../../styles/variables';

const Title = ({ inverted, children, level }) => {
    const Heading = `h${level}`;

    return (
        <Fragment>
            <Heading className={cx({inverted})}>
                {children}
            </Heading>
            <style jsx global>{`
                .inverted {
                    color: ${variables.colors.fontContrast};
                }

                h1, h2, h3 {
                    color: ${variables.colors.fontBase};
                }

                h1 {
                    font-size: 52px;
                    margin: 32px 0;
                }

                h2 {
                    font-size: 28px;
                }

                h3 {
                    font-size: 22px;
                }
            `}</style>
        </Fragment>
    )
}

Title.defaultProps = {
    level: 1
};

export default Title;
