import React, { Fragment } from 'react';

import variables from '../../styles/variables';

const icons = {
    arrowRight: 'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
};

const Icon = ({ size, type }) => {
    return (
        <Fragment>
            <svg width={size} height={size} viewBox="0 0 24 24">
                <path d={icons[type]} />
            </svg>
            <style jsx>{`
                svg {
                    fill: currentColor;
                    vertical-align: middle;
                }
            `}</style>
        </Fragment>
    );
}

Icon.defaultProps = {
    size: 16
};

export default Icon;
