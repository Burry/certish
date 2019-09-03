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

import { Helmet } from 'react-helmet';
import { Box, Heading, Paragraph } from 'grommet';

const Canary = () => (
    <Box
        justify="center"
        animation="fadeIn"
        fill
        pad={{ bottom: 'medium', horizontal: 'medium' }}
        textAlign="center"
    >
        <Helmet title="The canary's alive!" />
        <Heading alignSelf="center">Look at our pet canary!</Heading>
        <Paragraph fill alignSelf="center">
            Isn&apos;t he cute? We think we do a good job of keeping an eye on
            him, but we could always use your help.
        </Paragraph>
        <Box pad="large" alignContent="center" alignSelf="center">
            <img src="/static/img/canary.svg" height="200" alt="Canary" />
        </Box>
    </Box>
);

export default Canary;
