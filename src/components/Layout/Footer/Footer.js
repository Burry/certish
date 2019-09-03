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

import { Box, Text } from 'grommet';
import { AnchorLink } from '../../Link';

const FooterText = React.forwardRef((props, ref) => (
    <Text ref={ref} color="dark-4" size="small" {...props} />
));
const FooterAnchor = React.forwardRef((props, ref) => (
    <AnchorLink ref={ref} color="dark-4" margin="small" {...props} />
));

const Footer = () => (
    <Box
        tag="footer"
        direction="row"
        align="center"
        justify="between"
        pad="medium"
        style={{ zIndex: '1' }}
    >
        <FooterText>
            &copy; {new Date().getFullYear()} certish. Licensed under{' '}
            <AnchorLink
                label="GPL v3"
                href="https://www.gnu.org/licenses/gpl-3.0"
                target="_blank"
                rel="noopener noreferrer"
                color="dark-4"
            />
            .
        </FooterText>
        <FooterText textAlign="end" as="div">
            <FooterAnchor href="/privacy" label="privacy" />
            |
            <FooterAnchor href="/terms" label="terms" />
            |
            <FooterAnchor
                label="code"
                href="https://github.com/certish/certish"
                target="_blank"
                rel="noopener noreferrer"
            />
        </FooterText>
    </Box>
);

export default Footer;
