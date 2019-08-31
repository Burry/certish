import React from 'react';
import { Box, Button, Heading, Text } from 'grommet';

const Home = () => (
    <Box justify="center" animation="fadeIn" fill pad={{ vertical: 'large' }}>
        <Heading textAlign="center">Drop to sign</Heading>
        <Box direction="row" align="center" alignSelf="center">
            <Text>Or </Text>
            <Button
                primary
                label="Choose File"
                margin="small"
                onClick={() => {}}
            />
        </Box>
    </Box>
);

export default Home;
