/*
 * This file is part of certish. © 2019 certish.
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
import { number } from 'prop-types';
import { Box, Heading } from 'grommet';

const friendlyError = statusCode => {
    switch (statusCode) {
        case 404:
            return 'Not found';
        case 400:
            return 'Bad request';
        case 500:
            return 'Server error';
        default:
            return statusCode;
    }
};

const CertishError = ({ statusCode }) => (
    <Box justify="center" animation="fadeIn" fill pad={{ vertical: 'large' }}>
        <Heading textAlign="center">
            {friendlyError(statusCode) || 'An error occurred'}
        </Heading>
    </Box>
);

CertishError.propTypes = {
    statusCode: number.isRequired
};

CertishError.getInitialProps = ({ res, err }) => {
    let statusCode;
    if (res) statusCode = res.statusCode;
    else if (err) statusCode = err.statusCode;
    return { statusCode };
};

export default CertishError;
