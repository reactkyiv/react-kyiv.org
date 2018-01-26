import React from 'react';
import cx from 'classnames';

import LinkButton from '../LinkButton';

import variables from '../../styles/variables';

export default ({ children }) => {
    return (
        <div className="header">
            <div className="logo">
                <img src="/static/img/logo.svg" width={60} height={60} />
            </div>
            <div className="links">
                <LinkButton to="/events" inverted label="Events" />
                <LinkButton to="/events" inverted label="Sponsors" />
                <LinkButton to="/events" inverted label="Shop" />
                <LinkButton to="/events" inverted label="Follow" />
            </div>
            <style jsx>{`
                .header {
                    width: 100vw;
                    position: fixed;
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    top: 0;
                    box-sizing: border-box;
                }

                .links {
                    display: flex;
                }
            `}</style>
        </div>
    )
}
