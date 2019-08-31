/*
 * This file is part of certish. Copyright © 2019 certish.
 *
 * certish is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * certish is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with certish. If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import NextApp from 'next/app';
import { Helmet } from 'react-helmet';
import { Box, Grommet } from 'grommet';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import 'sanitize.css';
import '../components/styles/metropolis.css';
// import 'typeface-metropolis';

const title = 'certish';
const description = 'The public key infrastructure for the public';
const brandColor = '#ff0000';
const textSelectionStyle = `
    background: ${brandColor};
    color: #FFF;
`;
const theme = {
    global: {
        colors: {
            brand: brandColor,
            focus: '#ff5555'
        },
        font: {
            family:
                'Metropolis, "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            size: '16px',
            height: '20px'
        }
    }
};

class App extends NextApp {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Helmet defaultTitle={title} titleTemplate={`${title} » %s`}>
                    <meta charSet="utf-8" />
                    <meta name="application-name" content={title} />
                    <meta name="description" content={description} />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="application-name" content={title} />
                    <meta name="apple-mobile-web-app-title" content={title} />
                    <meta name="theme-color" content={brandColor} />
                    <meta name="msapplication-TileColor" content={brandColor} />
                    <meta
                        name="msapplication-TileImage"
                        content="/static/icons/mstile-144x144.png"
                    />
                    {/* Open Graph */}
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:url" content="https://certi.sh" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image"
                        content="/static/icons/open-graph.png"
                    />
                    {/* Icons */}
                    {[16, 32].map(size => {
                        const dimensions = `${size}x${size}`;
                        return (
                            <link
                                key={size}
                                rel="icon"
                                type="image/png"
                                sizes={dimensions}
                                href={`/static/icons/favicon-${dimensions}.png`}
                            />
                        );
                    })}
                    <link
                        rel="apple-touch-icon"
                        sizes="300x300"
                        href="/static/icons/apple-touch-icon.png"
                    />
                    <link
                        rel="mask-icon"
                        href="/static/icons/safari-pinned-tab.svg"
                        color={brandColor}
                    />
                    {/* PWA web manifest */}
                    <link rel="manifest" href="/static/site.webmanifest" />
                    {/* Text selection style */}
                    <style>
                        {`
                            ::selection {
                                ${textSelectionStyle}
                            }
                            ::-moz-selection {
                                ${textSelectionStyle}
                            }
                        `}
                    </style>
                </Helmet>
                <Grommet theme={theme}>
                    <Box fill>
                        <Header />
                        <Box
                            pad={{
                                horizontal: 'medium',
                                bottom: 'large'
                            }}
                        >
                            <Component {...pageProps} />
                        </Box>
                        <Footer />
                    </Box>
                </Grommet>
            </>
        );
    }
}

export default App;
