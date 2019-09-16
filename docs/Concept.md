# 💡Concept

This document describes the technical, user experience, and business concepts of certish and is intended to bootstrap discussion of the platform to plan a business and development strategy. Nothing in this document is presently set in stone.

## Elevator Pitch

certish is a free, public, digital notary: a trusted third-party that acts as an arbiter and storehouse of identity, applying enterprise-grade crypto standards to sharing data, so that everyone can take ownership of their identity on the web, know where their data comes from, and prove that it hasn't been tampered with.

## Benefit

The average user will be able to authenticate data they consume or produce with a single-click interface, and organizations who value public trust (e.g. press, governments) will be given the tools to allow audiences to authenticate their content.

## Market

This will be a platform of producers and consumers. Producers would be anyone who publishes static information on the web that would be shared outside of their webpage (a download, a photo on a news article, a link to static content, a text snippet, etc.). The most compelling use-case for a producer, and the initial marketing/experience target, may be journalists. Consumers would be, well everybody. The best way to grow a consumer base may be to spread certish around nerdy crypto enthusiast circles through word of mouth, start traditional online marketing, and work to create a culture where people find value in authenticating the data they consume. The toughest hill to climb is how to market this to consumers.

## Intellecutal Property

Since this is a startup founded on cryptography and trust, and we won't be able to get crypto experts on-board from the start, the project needs to be free and open source so that it can be audited by advocacy experts who do that sort of thing. But if we use the pseudo-Communist GPL license, it will be fairly unattractive to companies to take our IP, since they would be required to open source any applications of it.

## Technical Description

A managed [public key infrastructure](https://en.wikipedia.org/wiki/Public_key_infrastructure) using the [X.509](https://en.wikipedia.org/wiki/X.509) standard that powers HTTPS, SSH, and all kinds of security and data integrity applications for enterprises, governments, and enthusiast nerds. The backend consists of several microservices: [AWS Certificate Manager](https://docs.aws.amazon.com/crypto/latest/userguide/awspki-service-acm.html) for certificate operations, [Auth0](https://auth0.com/) for streamlined and robust authentication, [ZEIT Now](https://zeit.co/) for hosting the client, and likely one of AWS's GraphQL or API Gateway solutions paired with one of their databases. The frontend uses [Next.js](https://nextjs.org) (with [React](https://reactjs.org) for server-side rendering with [Grommet](https://v2.grommet.io) as a UI foundation (this is what's currently been implemented as a basic UI demo, with ZEIT Now as the host). [PKI.js](https://pkijs.org) (or equivalent WebAssembly + OpenSSL implementations) will power the client-side cryptographic operations.

For free users, the company will act as a certificate authority, using the client to generate certificate signing requests which are sent to the server and signed by certish's private key (to prove that they are recognized by certish), generating an X.509 certificate which is sent to the client. Enthusiasts will enjoy the abilities to upload their own CSRs, to save their private key, and to sign their data offline and upload the signature. But for the layperson, the private key will stay securely stored on certish's servers, so that when the user signs something else, they just have to use their account (or a pseudonym that we give them and store in a cookie, if they aren't logged in) to prove their identity. Paid users will have the option of uploading their own certificate chains without letting certish interact with their private key at all: this is more acceptable to enterprises who already have these certificates and don't want to compromise their cryptography for convenience. Down the line, we can also expand this system for internal enterprise uses, which is likely the real money-maker.

## User Stories

-   I want to easily sign and publish data, and I'm signed into an account.
    -   Go to [https://certi.sh/sign](https://certi.sh/sign).
    -   Paste a URL to some data you've uploaded, paste or type a text snippet, or drag-&-drop/click to choose a local file.
    -   We download your private key to your browser (generated on account creation) and use the client to sign the data and generate a hash of the data. We upload the hash and signature to certish and generate a short signature URL for you to share with others that shows optional metadata, the link if you shared a URL, your public identity, and the cryptographic signature and public key for nerds to verify.
    -   With one action you've created a URL you can share to verify your data.
-   I want to easily sign and publish data, and I'm not signed into an account.
    -   Go to [https://certi.sh/sign](https://certi.sh/sign).
    -   Paste a URL to some data you've uploaded, paste or type a text snippet, or drag-&-drop/click to choose a local file.
    -   We'll generate a random pseudonym and keypair for you, keep the private key to ourselves (letting only you download it), and publish the public key on a new profile URL.
    -   We'll then sign your data and generate a signature URL with the same process as the signed-in user.
    -   With one action you've created a URL you can share to verify your data.
-   I want to sign and publish data, and I'm a raging nerd who knows all about cryptography.
    -   Sign your data offline using your own private key.
    -   Go to [https://certi.sh/sign](https://certi.sh/sign).
    -   Paste, drag-&-drop, or click to upload your signature, public key, and optionally your data (in whatever order—if you don't upload your data you'll need to also provide a hash of it). If you try to upload a private key, we shout at you for not knowing what you're doing. We can identify that you're using the nerd-workflow by the header on the signature and public key.
    -   We generate a short signature URL for you to share with others that shows the file metadata if you sent your data, the link if you shared a URL, your public identity, and the cryptographic signature.
    -   If you're signed in, your public identity and profile URL assumes that of your profile, but if you're not signed in, your public identity inherits the identity from your public key, and we generate a random profile URL.
    -   With 2-3 actions you've created a URL you can share to verify your data.
-   I want to sign and publish data, and I'm an enterprise user.
    -   Go to [https://certi.sh/sign](https://certi.sh/sign).
    -   Sign in using your organization's SSO connection to certish.
    -   Sign your data using your organization's processes and upload the signature, or if your organization integrates with certish's API, use the private key automatically downloaded to your browser and then choose your data (paste a URL, paste or type a text snippet, or drag-&-drop/click to choose a local file) for client-side signing.
    -   We generate a short signature URL for you to share with others, optionally gated behind your enterprise SSO, that shows the file metadata if you sent your data, the link if you shared a URL, your public identity, and the cryptographic signature.
    -   With 2-3 actions you've created a URL you can share to verify your data.
-   I want to verify some data that's been shared to me with a certish link.
    -   Just click the link, confirm you're on [https://certi.sh](https://certi.sh), and confirm that the metadata and listed profile is what you expect.
    -   If the publisher signed a link, follow the link on the signature page to know you're visiting the authenticated source.
    -   If you're a raging nerd, use the signature and public key and OpenSSL from the command line to verify the signature yourself.
-   I want to verify some data that's been shared to me, and I don't have a certish link.
    -   Go to [https://certi.sh/verify](https://certi.sh/verify).
    -   Paste a URL, paste or type a text snippet, or drag-&-drop/click to choose a local file.
    -   Your browser will compute a hash of the data and upload it to certish for matching. If certish recognizes the hash, we redirect you to the data's signature URL. If certish can't recognize the hash, then the data hasn't been signed with certish, and we advise you to be cautious of the data.
-   I signed data using a pseudo-account, and now I want to claim a profile and manage my signatures.
    -   Create an account, and the signatures from the pseudo-account in your browser cookie will be associated with your persistent account and custom profile URL, and they will be appended with a new signature and public key that corresponds to your provided identity.
-   I signed data using a pseudo-account, and now I want to sign in and associate these signatures to my account.
    -   Sign in to an account on a browser that has a cookie for a pseudo-account with existing signatures, and you will be prompted with the option of migrating your signatures to your persistent account.
