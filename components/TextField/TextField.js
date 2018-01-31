import React from 'react';
import Head from 'next/head';

import cx from 'classnames';

import variables from '../../styles/variables';

export default ({ value, placeholder, fullWidth }) => {
    return (
        <div>
            <input
                value={value}
                placeholder={placeholder}
                className="input"
            />
            <style jsx global>{`
                .input {
                    width: ${fullWidth ? '100%' : '220px'};
                    padding: 16px;
                    font-size: ${variables.fontSizeBody}px;
                    letter-spacing: 0.1em;
                    outline: none;
                    border: none;
                    border-radius: 0;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    font-weight: ${variables.fontWeightBold};
                    box-shadow: 5px 5px 0 ${variables.colors.primary};
                    background-color: ${variables.colors.white};
                }
            `}</style>
        </div>
    )
}
