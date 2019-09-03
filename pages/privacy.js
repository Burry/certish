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
import { Box, Heading, Paragraph } from 'grommet';
import { AnchorLink } from '../src/components/Link';

const TightHeading = props => (
    <Heading margin={{ vertical: 'small' }} {...props} />
);
const WideParagraph = props => <Paragraph fill {...props} />;

const Privacy = () => (
    <>
        <Box pad={{ horizontal: 'medium', bottom: 'large' }}>
            <Helmet title="Privacy" />
            <Heading margin={{ top: 'none', bottom: 'small' }}>Privacy</Heading>
            <WideParagraph>
                We believe that your data is your business. When use certish to
                sign or verify data, the contents of that data never leave your
                browser.
            </WideParagraph>
            <TightHeading level={2}>How certish works</TightHeading>
            <TightHeading level={3}>Signing</TightHeading>
            <WideParagraph>
                When you sign data with certish, this is what happens:
            </WideParagraph>
            <ol>
                <li>
                    If you&apos;re signed in and have an associated private key,
                    we&apos;ll securely send your private key to your browser,
                    otherwise your browser will generate one for you on the fly.
                </li>
                <li>
                    Your browser uses your target data and the private key to
                    compute a digital signature.
                </li>
                <li>
                    We upload that signature to our servers, so that when you
                    share your data, others can use certish to verify that it
                    came from you and hasn&apos;t been tampered with. If
                    you&apos;re signing a file, we&apos;ll also upload the
                    filename and MIME type to our servers, so that you and the
                    file&apos;s recipients can more easily identify it. The
                    contents of your data are never transmitted to certish.
                </li>
                <li>
                    We&apos;ll generate a pseydonym and public profile profile
                    for you, so that when others verify your data, they&apos;ll
                    be able to see where it came from. A cookie will be stored
                    in your browser, so that if you choose to sign in or claim a
                    persistent profile, your keys and signatures will stay with
                    you.
                </li>
            </ol>
            <TightHeading level={3}>Verification</TightHeading>
            <WideParagraph>When you verify data with certish:</WideParagraph>
            <ol>
                <li>Your browser computes a crypographic hash of the data.</li>
                <li>
                    We upload that hash to our servers. If we haven&apos;t seen
                    the hash before, that means that the data hasn&apos;t been
                    signed by certish, and we&apos;ll let you know that we
                    couldn&apos;t verify it. Otherwise, we&apos;ll proceed...
                </li>
                <li>
                    We send your browser the digital signature, public key, and
                    public user profile we have on file for your target data.
                </li>
                <li>
                    Your browser uses the target data and the public key to
                    verify the signature.
                </li>
            </ol>
            <TightHeading level={2}>Bird Watching</TightHeading>
            <WideParagraph>
                We take good care of our pet canary, but we could always use
                your help to look after him.{' '}
                <AnchorLink href="/canary" label="Isn't he cute?" />
            </WideParagraph>
        </Box>
    </>
);

export default Privacy;
