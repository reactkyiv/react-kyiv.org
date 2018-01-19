import React from 'react';
import Head from 'next/head';

import cx from 'classnames';

import variables from '../../styles/variables';

export default ({ children }) => {
    return (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Poppins:400,600,700,800,900&amp;subset=latin-ext" rel="stylesheet" />
            </Head>
            <div>{children}</div>
            <style jsx global>{`
                body {
                    font-family: 'Poppins', sans-serif;
                }

                html, body {
                    margin: 0;
                    padding: 0;
                }
            `}</style>
        </div>
    )
}
