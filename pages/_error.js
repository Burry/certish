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
