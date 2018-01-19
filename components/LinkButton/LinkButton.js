import React from 'react';
import cx from 'classnames';
import shader from 'shader';

import Icon from '../Icon';

import variables from '../../styles/variables';

export default ({ inverted, label, to, point }) => {
    return (
        <div>
            <a href={to}>
                {label} {point && <Icon type="arrowRight" />}
            </a>
            <style jsx>{`
                a {
                    font-size: ${variables.fontSizeBody}px;
                    font-weight: ${variables.fontWeightSemiBold};
                    letter-spacing: 0.1em;
                    color: ${inverted ? variables.colors.fontContrast : variables.colors.fontBase};
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    display: ${point && 'inline-flex'}
                }

                a:hover {
                    color: ${variables.colors.fontSecondary};
                }

                a:active {
                    color: ${variables.colors.primary};
                }
            `}</style>
        </div>
    )
}
