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
import { Helmet } from 'react-helmet';
import { Box, Heading } from 'grommet';

const TightHeading = props => (
    <Heading margin={{ top: 'none', bottom: 'small' }} {...props} />
);

const Me = () => (
    <Box pad={{ horizontal: 'medium' }}>
        <Helmet title="Me" />
        <TightHeading>Me</TightHeading>
        <TightHeading level="2">Signatures</TightHeading>
    </Box>
);

export default Me;
