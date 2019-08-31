import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';

const TightHeading = props => (
    <Heading margin={{ vertical: 'small' }} {...props} />
);
const WideParagraph = props => <Paragraph fill {...props} />;

const Privacy = () => (
    <Box>
        <Heading margin={{ top: 'small', bottom: 'small' }}>Privacy</Heading>
        <WideParagraph>
            We believe that your data is your business. When you send data to
            certish for signing or verification, that data never leaves your
            browser.
        </WideParagraph>
        <TightHeading level={2}>Signing</TightHeading>
        <WideParagraph>
            When you sign data with certish, this is what happens:
        </WideParagraph>
        <ol>
            <li>
                We securely send your browser a private cryptographic key. If
                you&apos;re signed in, we&apos;ll send a key from your account,
                otherwise we&apos;ll generate one for you on the fly.
            </li>
            <li>
                Your browser uses your target data and the private key to
                compute a digital signature.
            </li>
            <li>
                We upload that signature to our servers, so that when you share
                your data, others can use certish to verify that it came from
                you and hasn&apos;t been tampered with. If you&apos;re signing a
                file, we&apos;ll also upload the filename and MIME type to our
                servers, so that you and the file&apos;s recipients can more
                easily identify it. The contents of your data are never
                transmitted to certish.
            </li>
            <li>
                We&apos;ll generate a pseydonym and public profile profile for
                you, so that when others verify your data, they&apos;ll be able
                to see where it came from. A cookie will be stored in your
                browser, so that if you choose to sign in or claim a persistent
                profile, your keys and signatures will stay with you.
            </li>
        </ol>
        <TightHeading level={2}>Verification</TightHeading>
        <WideParagraph>When you verify data with certish:</WideParagraph>
        <ol>
            <li>Your browser computes a crypographic hash of the data.</li>
            <li>
                We upload that hash to our servers. If we haven&apos;t seen the
                hash before, that means that the data hasn&apos;t been signed by
                certish, and we&apos;ll let you know that we couldn&apos;t
                verify it. Otherwise, we&apos;ll proceed...
            </li>
            <li>
                We send your browser the digital signature, public key, and
                public user profile we have on file for your target data.
            </li>
            <li>
                Your browser uses the target data and the public key to verify
                the signature.
            </li>
        </ol>
    </Box>
);

export default Privacy;