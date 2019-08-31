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
