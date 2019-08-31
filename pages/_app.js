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
import App from 'next/app';
import { Helmet } from 'react-helmet';
import { Normalize } from 'styled-normalize';
import { Box, Grommet } from 'grommet';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import 'typeface-metropolis';

const brandColor = '#ff0000';

const textSelectionStyle = `
    background: ${brandColor};
    color: #FFF;
`;

const theme = {
    global: {
        colors: {
            brand: brandColor
        },
        font: {
            family:
                'Metropolis, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            size: '16px',
            height: '20px'
        }
    }
};

class CertishApp extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Helmet defaultTitle="certish" titleTemplate="certish » %s">
                    <meta name="application-name" content="certish" />
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="application-name" content="certish" />
                    <meta name="apple-mobile-web-app-title" content="certish" />
                    <meta name="theme-color" content={brandColor} />
                    <meta name="msapplication-TileColor" content={brandColor} />
                    <meta
                        name="msapplication-TileImage"
                        content="/static/icons/mstile-144x144.png"
                    />
                    {/* Open Graph */}
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="certish" />
                    <meta
                        property="og:description"
                        content="The public key infrastructure for the public"
                    />
                    <meta property="og:url" content="https://certi.sh" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta
                        property="og:image"
                        content="/static/icons/open-graph.png"
                    />
                    {/* Icons */}
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/icons/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/icons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/icons/favicon-16x16.png"
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
                <Normalize />
                <Grommet theme={theme}>
                    <Box fill>
                        <Nav />
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

export default CertishApp;
