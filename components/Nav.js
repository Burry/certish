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
import { Anchor, Box, Image } from 'grommet';

const links = [
    { href: '/sign', label: 'Sign' },
    { href: '/verify', label: 'Verify' },
    { href: '/me', label: 'Me' }
].map(link => ({
    key: `nav-link-${link.href}-${link.label}`,
    ...link
}));

const Nav = () => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        style={{ zIndex: '1' }}
    >
        <Link href="/">
            <Anchor alt="certish">
                <Image src="/static/img/logo.svg" height="32" />
            </Anchor>
        </Link>
        <Box tag="nav" direction="row" justify="between">
            {links.map(({ key, href, label }) => (
                <Link key={key} href={href}>
                    <Anchor margin="small">{label}</Anchor>
                </Link>
            ))}
        </Box>
    </Box>
);

export default Nav;
