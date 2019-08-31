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
