/*
 * This file is part of certish. © 2019 certish.
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
import Link from 'next/link';
import { Anchor, Box, Text } from 'grommet';
import styled from 'styled-components';

const GitHub = styled.iframe`
    margin: 0 12px;
`;

const FooterText = React.forwardRef((props, ref) => (
    <Text ref={ref} color="dark-4" size="small" {...props} />
));
const FooterAnchor = React.forwardRef((props, ref) => (
    <Anchor ref={ref} color="dark-4" margin="small" {...props} />
));

const Footer = () => (
    <Box
        tag="footer"
        direction="row"
        align="center"
        justify="between"
        pad={{ left: 'medium', right: 'small', bottom: 'medium' }}
        style={{ zIndex: '1' }}
    >
        <FooterText>
            &copy; {new Date().getFullYear()} certish. All rights reserved.
        </FooterText>
        <FooterText textAlign="end">
            <Link href="/privacy">
                <FooterAnchor label="Privacy" />
            </Link>
            |
            <Link href="/terms">
                <FooterAnchor label="Terms" />
            </Link>
            |
            <GitHub
                src="https://ghbtns.com/github-btn.html?user=Burry&repo=certish&type=star&count=true"
                title="GitHub stars"
                frameBorder="0"
                scrolling="0"
                width="170px"
                height="20px"
            />
        </FooterText>
    </Box>
);

export default Footer;
