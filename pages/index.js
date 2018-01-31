import React from 'react';
import Link from 'next/link';

import variables from '../styles/variables';

import Page from '../components/Page';
import Title from '../components/Title';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import VerticalSpacer from '../components/VerticalSpacer';
import Header from '../components/Header';
import Container from '../components/Container';
import TextField from '../components/TextField';

export default () => {
    return (
        <Page>
            <Header />
            <div className="hero">
                <Container>
                    <div className="inner">
                        <Title inverted>
                            React Kyiv
                        </Title>

                        <p className="motto">OUR Motto Good One</p>

                        <Button cta point label="Our next event" />
                    </div>
                </Container>
            </div>
            <Container>
                <div className="contacts_container">
                    <Title>
                        Follow us
                    </Title>

                    <div className="contacts">
                        <div className="contact_card">Twitter</div>
                        <div className="contact_card">Telegram</div>
                        <div className="contact_card">Meetup</div>
                        <div className="contact_card">Facebook</div>
                    </div>
                </div>
            </Container>
            <div className="newsletter_background">
                <Container>
                    <div className="newsletter">
                        <Title level={2} inverted>
                            Our latest news right in your box
                        </Title>

                        <div className="subscription_input">
                            <TextField />
                            <div className="spacer" />
                            <Button cta label="Submit" />
                        </div>
                    </div>
                </Container>
            </div>
            <style jsx>{`
                .hero {
                    background-color: #3A376D; // temporary
                    height: 800px; // temporary
                    width: 100%; // temporary
                    max-width: 2000px; // temporary
                    margin: 0 auto; // temporary
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    background: url(/static/img/kyiv_background.svg) no-repeat;
                    background-color: ${variables.colors.black};
                    background-position: center center;
                    background-size: cover; // temporary
                }

                .inner {
                    padding: 0 64px;
                    width: 100%;
                }

                .motto {
                    font-size: 20px;
                    margin-bottom: 80px;
                    color: white;
                }

                .contacts_container {
                    padding: 0 64px;
                }

                .contacts {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    margin-bottom: 64px;
                }

                .contact_card {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 250px;
                    height: 250px;
                    margin-bottom: 16px;
                    background-color: ${variables.colors.grey};
                }

                .newsletter_background {
                    background-color: ${variables.colors.secondary};
                }

                .newsletter {
                    padding: 32px 64px;
                }

                .spacer {
                    background-color: ${variables.colors.black};
                    width: 1px;
                }

                .subscription_input {
                    display: flex;
                }
            `}</style>
        </Page>
    );
}
