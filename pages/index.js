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
            <Container>
                <Header />
            </Container>
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
            <div className="newsletter_container">
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
            <div className="support-us">
                <div className="support-us_image" />
                <Container>
                    <div className="support-us_container">
                        <div className="support-us_title">
                            <Title inverted>
                                Support us
                            </Title>
                        </div>
                        <div className="support-us_text-container">
                            <p className="support-us_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste perferendis esse natus, modi minus maxime vero quo aperiam maiores expedita.</p>
                            <div className="support-us_links">
                                <LinkButton to="" point label="Support us on patreon" />
                                <LinkButton to="" point label="Buy some swag in our shop" />
                                <LinkButton to="" point label="Become a sponsor" />
                            </div>
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

                .newsletter_container {
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

                .support-us {
                    max-width: 2000px;
                    height: 600px;
                    margin: 0 auto;
                    position: relative;
                }

                .support-us_container {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 64px;
                }

                .support-us_title {
                    width: 50%;
                }

                .support-us_text-container {
                    width: 50%;
                    padding: 32px 24px;                    
                }

                .support-us_text {
                    padding: 0 16px 32px 16px;
                }

                .support-us_links {
                    height: 150px;
                    padding-left: 8px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                }

                .support-us_image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background-image: url('https://camo.mybb.com/e01de90be6012adc1b1701dba899491a9348ae79/687474703a2f2f7777772e6a71756572797363726970742e6e65742f696d616765732f53696d706c6573742d526573706f6e736976652d6a51756572792d496d6167652d4c69676874626f782d506c7567696e2d73696d706c652d6c69676874626f782e6a7067');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    z-index: -1; //maybe temporary
                }

                .support-us_image:before {
                    content: '';
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    display: block;
                    position: absolute;
                    background-color: rgba(58, 55, 109, 0.55);
                }
            `}</style>
        </Page>
    );
}
