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

import Link from 'next/link';
import { Anchor, Box, Image } from 'grommet';

const links = ['sign', 'verify', 'me'];

const Nav = () => (
    <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        pad="medium"
        style={{ zIndex: '1' }}
    >
        <Link href="/">
            <Anchor alt="certish">
                <Image src="/static/img/logo.svg" height="32" />
            </Anchor>
        </Link>
        <Box tag="nav" direction="row" justify="between" role="navigation">
            {links.map(link => (
                <Link key={`nav-link-${link}`} href={`/${link}`}>
                    <Anchor margin="small">{link}</Anchor>
                </Link>
            ))}
        </Box>
    </Box>
);

export default Nav;
