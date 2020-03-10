/*
 * Certish
 * Copyright © 2019 Certish
 *
 * Certish is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Certish is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Certish. If not, see <https://www.gnu.org/licenses/>.
 */

import { func, shape } from 'prop-types';
import NextApp from 'next/app';
import { Helmet } from 'react-helmet';
import Layout from '~/components/Layout';
import theme from '~/theme';
import '../src/fonts/metropolis.css';

const title = 'Certish';
const hostname = 'https://certi.sh';
const description = 'The free notary for the web';
const brandColor = '#f00';
const textSelectionStyle = `background:${brandColor};color:#FFF;`;

const defaultLayoutProps = {
    fill: false,
    theme
};

class App extends NextApp {
    constructor(props) {
        super(props);

        this.state = {
            layoutProps: defaultLayoutProps
        };

        this.setLayout = this.setLayout.bind(this);
    }

    setLayout(layoutProps) {
        this.setState(state => ({
            layoutProps: {
                ...state.layoutProps,
                ...layoutProps
            }
        }));
    }

    render() {
        const { Component, pageProps: _pageProps } = this.props;
        const { layoutProps } = this.state;

        const pageProps = { ..._pageProps, setLayout: this.setLayout };

        return (
            <>
                <Helmet
                    defaultTitle={title}
                    titleTemplate={`%s » ${title}`}
                    htmlAttributes={{ lang: 'en' }}
                >
                    <meta charSet="utf-8" />
                    <meta name="application-name" content={title} />
                    <meta name="description" content={description} />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="apple-mobile-web-app-title" content={title} />
                    <meta name="theme-color" content={brandColor} />
                    <meta name="msapplication-TileColor" content={brandColor} />
                    <meta
                        name="msapplication-TileImage"
                        content="/icons/mstile-144x144.png"
                    />
                    {/* Open Graph */}
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content={hostname} />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image"
                        content={`${hostname}/open-graph.png`}
                    />
                    {[16, 32].map(size => {
                        const dimensions = `${size}x${size}`;
                        return (
                            <link
                                key={size}
                                rel="icon"
                                type="image/png"
                                sizes={dimensions}
                                href={`/icons/favicon-${dimensions}.png`}
                            />
                        );
                    })}
                    <link
                        rel="apple-touch-icon"
                        sizes="300x300"
                        href="/icons/apple-touch-icon.png"
                    />
                    <link
                        rel="mask-icon"
                        href="/icons/safari-pinned-tab.svg"
                        color={brandColor}
                    />
                    {/* PWA web manifest */}
                    <link rel="manifest" href="/site.webmanifest" />
                    {/* Text selection style */}
                    <style>
                        {`body,html{margin:0;padding:0;}::selection{${textSelectionStyle}}::-moz-selection{${textSelectionStyle}}`}
                    </style>
                </Helmet>
                <Layout {...layoutProps}>
                    <Component {...pageProps} />
                </Layout>
            </>
        );
    }
}

App.propTypes = {
    Component: func.isRequired,
    pageProps: shape({}).isRequired
};

export default App;
