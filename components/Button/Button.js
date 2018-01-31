import React from 'react';
import cx from 'classnames';
import shader from 'shader';

import variables from '../../styles/variables';

export default ({ label, cta }) => {
    return (
        <div>
            <button className={cx('button', { cta })}>
                {label}
            </button>
            <style jsx>{`
                .button {
                    padding: 16px 24px;
                    font-size: ${variables.fontSizeBody}px;
                    letter-spacing: 0.1em;
                    color: ${variables.colors.fontContrast};
                    outline: none;
                    border: none;
                    background-color: ${variables.colors.primary};
                    border-radius: 0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    font-weight: ${variables.fontWeightBold};
                }

                .button:hover {
                    background-color: ${shader(variables.colors.primary, -0.1)}
                }

                .button:active {
                    transform: translate(1px, 1px);
                }

                .cta {
                    color: ${variables.colors.fontBase};                    
                    box-shadow: 5px 5px 0 ${variables.colors.primary};
                    background-color: ${variables.colors.white};
                }

                .cta:hover {
                    box-shadow: 7px 7px 0 ${variables.colors.primary};
                    background-color: ${variables.colors.white};
                }

                .cta:active {               
                    box-shadow: 2px 2px 0 ${variables.colors.primary};
                }
            `}</style>
        </div>
    )
}
