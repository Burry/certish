/*
 * Certish
 * Copyright © 2019 Certish
 *
 * Certish is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Certish is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Certish. If not, see <https://www.gnu.org/licenses/>.
 */

import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Box, Heading, Text } from 'grommet';
import { base64ToHex } from '~/util/base64';

const Signature = ({ fileName, digest, certificate, cms }) => {
    return (
        <Box pad={{ horizontal: 'medium' }}>
            <Helmet title="Signature" />
            <Heading margin="none">{fileName || 'Signed Data'}</Heading>
            <Heading
                level="2"
                color="status-ok"
                margin={{ horizontal: 'none', top: 'none' }}
            >
                VALID
            </Heading>
            <Grid
                rows={['xsmall', 'large']}
                columns={['medium']}
                gap="small"
                areas={[
                    { name: 'digest', start: [0, 0], end: [1, 0] },
                    { name: 'signature', start: [0, 1], end: [0, 1] },
                    { name: 'certificate', start: [1, 1], end: [1, 1] }
                ]}
            >
                <Box gridArea="digest">
                    <Heading
                        level="3"
                        margin={{ top: 'none', bottom: 'small' }}
                    >
                        Digest
                    </Heading>
                    <Text>
                        <code>{base64ToHex(digest)}</code>
                    </Text>
                </Box>
                <Box
                    gridArea="signature"
                    background="light-1"
                    pad="medium"
                    style={{ overflow: 'scroll' }}
                >
                    <Heading
                        level="3"
                        margin={{ top: 'none', bottom: 'small' }}
                    >
                        Signature
                    </Heading>
                    <Text>
                        <pre>{cms}</pre>
                    </Text>
                </Box>
                <Box
                    gridArea="certificate"
                    background="light-1"
                    pad="medium"
                    style={{ overflow: 'scroll' }}
                >
                    <Heading
                        level="3"
                        margin={{ top: 'none', bottom: 'small' }}
                    >
                        Certificate
                    </Heading>
                    <Text>
                        <pre>{certificate}</pre>
                    </Text>
                </Box>
            </Grid>
        </Box>
    );
};

Signature.getInitialProps = async ({ req, query: { digest } }) => {
    if (req) return { digest };
    const { certificate, cms, fileName } = JSON.parse(
        localStorage.getItem('lastSig')
    );
    return {
        certificate,
        cms,
        fileName,
        digest: base64ToHex(digest)
    };
};

Signature.propTypes = {
    digest: string.isRequired
};

export default Signature;
