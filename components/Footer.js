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
import Link from 'next/link';
import { Anchor, Box, Text } from 'grommet';

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
        pad={{ horizontal: 'medium', vertical: 'medium' }}
        style={{ zIndex: '1' }}
    >
        <FooterText>
            &copy; {new Date().getFullYear()} certish. All rights reserved.
        </FooterText>
        <FooterText textAlign="end" as="div">
            <Link href="/privacy">
                <FooterAnchor label="Privacy" />
            </Link>
            |
            <Link href="/terms">
                <FooterAnchor label="Terms" />
            </Link>
            |
            <FooterAnchor
                label="GitHub"
                href="https://github.com/Burry/certish"
                target="_blank"
                rel="noopener noreferrer"
            />
        </FooterText>
    </Box>
);

export default Footer;
