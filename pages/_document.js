/*
 * certish
 * Copyright © 2019 certish
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

import NextDocument, { Head, Main, NextScript } from 'next/document';
import { shape } from 'prop-types';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

class Document extends NextDocument {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                });

            const initialProps = await NextDocument.getInitialProps(ctx);

            return {
                ...initialProps,
                // https://github.com/nfl/react-helmet#server-usage
                helmet: Helmet.renderStatic(),
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        const {
            helmet: { htmlAttributes, bodyAttributes, ...helmet }
        } = this.props;

        return (
            // eslint-disable-next-line jsx-a11y/html-has-lang
            <html {...htmlAttributes.toComponent()}>
                <Head>
                    {Object.keys(helmet).map(el => helmet[el].toComponent())}
                </Head>
                <body {...bodyAttributes.toComponent()}>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

Document.propTypes = {
    helmet: shape({}).isRequired
};

export default Document;
