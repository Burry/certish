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
import { Helmet } from 'react-helmet';
import { Box, Heading, Text } from 'grommet';

const Terms = () => (
    <Box pad={{ horizontal: 'medium' }}>
        <Helmet title="Terms" />
        <Heading margin={{ top: 'none', bottom: 'small' }}>Terms</Heading>
        <Text>TBD</Text>
    </Box>
);

export default Terms;
