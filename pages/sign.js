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

import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import {
    uniqueNamesGenerator,
    adjectives,
    animals
} from 'unique-names-generator';
import Well from '~/components/Well';
import createSignature from '~/util/sign';
import { hexToBase64 } from '~/util/base64';

const Sign = ({ pseudonym }) => {
    const [error, setError] = useState();
    const router = useRouter();

    const redirect = ({ path }) => {
        if (path) router.push('/s/[digest]', `/s/${path}`, { shallow: true });
    };

    const signFiles = useCallback(
        async files => {
            // 1. Create certificate
            const algorithm = 'SHA-256';

            const signatures = await Promise.all(
                files.map(async file => {
                    try {
                        // 2. Get hash of file
                        const {
                            certificate,
                            privateKey,
                            cms,
                            digest
                        } = await createSignature(file, algorithm);
                        const hashBase64 = hexToBase64(digest);
                        return {
                            algorithm,
                            digest,
                            path: encodeURI(hashBase64),
                            fileName: file.name,
                            certificate,
                            privateKey,
                            cms
                        };
                    } catch (err) {
                        console.error('Failed to create signature:', err);
                        setError('An error occurred');
                    }
                    return {};
                })
            );

            // 3. Sign file
            // 4. Upload hash and signature
            // 5. Redirect to signature page
            if (signatures.length > 1) {
                console.info({ signatures });
            } else {
                const signature = signatures[0];
                console.info({ signature });
                // DEBUG
                localStorage.setItem('lastSig', JSON.stringify(signature));
                redirect(signature);
            }
        },
        [setError]
    );

    return (
        <>
            <Helmet title="Sign" />
            <Well
                verb="sign"
                pseudonym={pseudonym}
                error={error}
                handleFiles={signFiles}
            />
        </>
    );
};

Sign.getInitialProps = async () => ({
    pseudonym: uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
        separator: '-'
    })
});

Sign.propTypes = {
    pseudonym: string.isRequired
};

export default Sign;
