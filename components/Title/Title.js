import React, { Fragment } from 'react';
import Head from 'next/head';

import variables from '../../styles/variables';

const Title = ({ inverted, children, level }) => {
    const Heading = `h${level}`;

    return (
        <Fragment>
            <Heading className={Heading}>
                {children}
            </Heading>
            <style jsx global>{`
                h1, h2, h3 {
                    color: ${inverted ? variables.colors.fontContrast : variables.colors.fontBase};
                }

                h1 {
                    font-size: 52px;
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
