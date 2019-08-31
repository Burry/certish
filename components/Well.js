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
import { string } from 'prop-types';
import { Box, Button, Heading, Text } from 'grommet';

const Well = ({ verb }) => (
    <Box alignContent="center" className="expand-height">
        <Box justify="center" alignSelf="center" textAlign="center">
            <Heading as="div" alignSelf="center" margin="none">
                Drop to {verb}
            </Heading>
            <Box
                direction="row"
                fill
                align="center"
                alignSelf="center"
                justify="between"
                margin={{ vertical: 'large' }}
            >
                <Text>or </Text>
                <Button primary label="choose file" onClick={() => {}} />
                <Button primary label="paste text" onClick={() => {}} />
            </Box>
            <Text size="small">
                The contents of your data are never sent to certish.
            </Text>
        </Box>
    </Box>
);

Well.propTypes = {
    verb: string.isRequired
};

export default Well;
