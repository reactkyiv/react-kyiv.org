import React from 'react';
import Link from 'next/link';

import variables from '../styles/variables';

import Page from '../components/Page';
import Title from '../components/Title';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import VerticalSpacer from '../components/VerticalSpacer';
import Header from '../components/Header';

export default () => {
    return (
        <Page>
            <Header />
            <div className="hero">
                <div className="inner">
                    <Title inverted>
                        React Kyiv
                    </Title>

                    <p className="motto">OUR Motto Good One</p>

                    <Button cta point label="Our next event" />
                </div>
            </div>
            <style jsx>{`
                .hero {
                    background-color: #3A376D; // temporary
                    height: 800px; // temporary
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    background: url(/static/img/kyiv_background.svg) no-repeat;
                    background-color: ${variables.colors.black};
                    background-position: center center;
                }

                .inner {
                    padding: 32px;
                }

                .motto {
                    font-size: 20px;
                    margin-bottom: 80px;
                    color: white;
                }
            `}</style>
        </Page>
    );
}
