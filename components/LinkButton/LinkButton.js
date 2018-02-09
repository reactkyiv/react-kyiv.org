import React, { Fragment, Component } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import shader from 'shader';

import Icon from '../Icon';

import variables from '../../styles/variables';

const isLinkExternal = link => link.includes('http');

export default class LinkButton extends Component {
    renderLink = () => {
        const { to, point, label, inverted } = this.props;

        return (
            <Fragment>
                <a href={to} className={cx({inverted})}>
                    {label} {point && <Icon type="arrowRight" />}
                </a>

                <style jsx>{`
                    .inverted {
                        color: ${variables.colors.fontContrast};
                    }

                    a {
                        font-size: ${variables.fontSizeBody}px;
                        font-weight: ${variables.fontWeightSemiBold};
                        letter-spacing: 0.1em;
                        color: ${variables.colors.fontBase};
                        cursor: pointer;
                        transition: all 0.3s ease;
                        text-transform: uppercase;
                        display: ${point && 'inline-flex'}
                        padding: 8px;
                        text-decoration: none;
                    }

                    a:hover {
                    }

                    a:active {
                    }
                `}</style>
            </Fragment>
        );
    }

    render() {
        const { to, point } = this.props;

        return (
            isLinkExternal(to)
            ? this.renderLink()
            : <Link href={to}>{this.renderLink()}</Link>
        );
    }
}
