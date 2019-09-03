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

import React from 'react';
import { func, node, shape, oneOfType, arrayOf } from 'prop-types';
import { Box, Grommet, Text } from 'grommet';
import _Header from './Header';
import _Footer from './Footer';

const Layout = ({ Header, Footer, children, theme }) => (
    <Grommet theme={theme} className="full-height">
        <Box
            as="noscript"
            fill
            background="brand"
            alignContent="center"
            pad="small"
        >
            <Text textAlign="center" weight="bold">
                Please enable JavaScript to use certish.
            </Text>
        </Box>
        <Box fill flex className="full-height">
            <Header />
            <Box fill id="main-content" role="main">
                {children}
            </Box>
            <Footer />
        </Box>
    </Grommet>
);

Layout.propTypes = {
    Header: func,
    Footer: func,
    children: oneOfType([node, arrayOf(node)]).isRequired,
    theme: shape({}).isRequired
};

Layout.defaultProps = {
    Header: _Header,
    Footer: _Footer
};

export default Layout;
