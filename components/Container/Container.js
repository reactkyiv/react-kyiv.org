import React, { Fragment } from 'react';

import variables from '../../styles/variables';

const Container = ({ children }) => {
    return (
        <div className={'base'}>
            {children}
            <style jsx>{`
                .base {
                    max-width: ${variables.pageMaxWidth};
                    width: 100%;
                    margin: 0 auto;
                }
            `}</style>
        </div>
    );
}

export default Container;
