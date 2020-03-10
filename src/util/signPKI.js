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

// Based on https://github.com/PeculiarVentures/PKI.js/blob/master/examples/CMSSignedComplexExample/CMSSigned_complex_example.html

/* eslint-disable no-undef,no-unreachable,no-unused-vars */
import * as asn1js from 'asn1js';
import { stringToArrayBuffer, bufferToHexCodes, fromBase64 } from 'pvutils';
import {
    getCrypto,
    getAlgorithmParameters,
    setEngine,
    Certificate,
    AttributeTypeAndValue,
    Extension,
    Attribute,
    SignedData,
    EncapsulatedContentInfo,
    SignerInfo,
    IssuerAndSerialNumber,
    SignedAndUnsignedAttributes,
    ContentInfo
} from 'pkijs';

let hashAlg = 'SHA-256';
let signAlg = 'RSASSA-PKCS1-v1_5';
let addExt = false;
let detachedSignature = false;

function formatPEM(pemString) {
    const stringLength = pemString.length;
    let resultString = '';
    for (let i = 0, count = 0; i < stringLength; i += 1, count += 1) {
        if (count > 63) {
            resultString = `${resultString}\r\n`;
            count = 0;
        }
        resultString += pemString[i];
    }
    return resultString;
}

function parseCAbundle(buffer) {
    // Initial variables
    const base64Chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    const trustedCertificates = [];
    const startChars = '-----BEGIN CERTIFICATE-----';
    const endChars = '-----END CERTIFICATE-----';
    const endLineChars = '\r\n';

    const view = new Uint8Array(buffer);

    let waitForStart = false;
    let middleStage = true;
    let waitForEnd = false;
    let waitForEndLine = false;
    let started = false;

    let certBodyEncoded = '';

    for (let i = 0; i < view.length; i += 1) {
        if (started === true) {
            if (base64Chars.indexOf(String.fromCharCode(view[i])) !== -1)
                certBodyEncoded += String.fromCharCode(view[i]);
            else if (String.fromCharCode(view[i]) === '-') {
                // Decoded trustedCertificates
                const asn1 = asn1js.fromBER(
                    stringToArrayBuffer(window.atob(certBodyEncoded))
                );
                try {
                    trustedCertificates.push(
                        new Certificate({ schema: asn1.result })
                    );
                } catch (ex) {
                    console.error('Wrong certificate format');
                    return;
                }

                // Set all "flag variables"
                certBodyEncoded = '';

                started = false;
                waitForEnd = true;
            }
        } else if (waitForEndLine === true) {
            if (endLineChars.indexOf(String.fromCharCode(view[i])) === -1) {
                waitForEndLine = false;

                if (waitForEnd === true) {
                    waitForEnd = false;
                    middleStage = true;
                } else if (waitForStart === true) {
                    waitForStart = false;
                    started = true;
                    certBodyEncoded += String.fromCharCode(view[i]);
                } else middleStage = true;
            }
        } else if (middleStage === true) {
            if (String.fromCharCode(view[i]) === '-') {
                if (
                    i === 0 ||
                    String.fromCharCode(view[i - 1]) === '\r' ||
                    String.fromCharCode(view[i - 1]) === '\n'
                ) {
                    middleStage = false;
                    waitForStart = true;
                }
            }
        } else if (waitForStart === true) {
            if (startChars.indexOf(String.fromCharCode(view[i])) === -1)
                waitForEndLine = true;
        } else if (waitForEnd === true) {
            if (endChars.indexOf(String.fromCharCode(view[i])) === -1)
                waitForEndLine = true;
        }
    }
}

// Parse existing CMS_Signed
//* ********************************************************************************
function parseCMSSigned(cmsSignedBuffer) {
    // Initial check
    if (cmsSignedBuffer.byteLength === 0) {
        alert('Nothing to parse!');
        return;
    }

    // Initial activities

    const certificatesTable = document.getElementById('cms-certificates');
    while (certificatesTable.rows.length > 1)
        certificatesTable.deleteRow(certificatesTable.rows.length - 1);

    const crlsTable = document.getElementById('cms-rev-lists');
    while (crlsTable.rows.length > 1)
        crlsTable.deleteRow(crlsTable.rows.length - 1);

    // Decode existing CMS Signed Data
    const asn1 = asn1js.fromBER(cmsSignedBuffer);
    const cmsContentSimpl = new ContentInfo({ schema: asn1.result });
    const cmsSignedSimpl = new SignedData({ schema: cmsContentSimpl.content });

    // Put information about digest algorithms in the CMS Signed Data
    const dgstmap = {
        '1.3.14.3.2.26': 'SHA-1',
        '2.16.840.1.101.3.4.2.1': 'SHA-256',
        '2.16.840.1.101.3.4.2.2': 'SHA-384',
        '2.16.840.1.101.3.4.2.3': 'SHA-512'
    };

    for (let i = 0; i < cmsSignedSimpl.digestAlgorithms.length; i += 1) {
        let typeval = dgstmap[cmsSignedSimpl.digestAlgorithms[i].algorithmId];
        if (typeof typeval === 'undefined')
            typeval = cmsSignedSimpl.digestAlgorithms[i].algorithmId;

        const ulrow = `<li><p><span>${typeval}</span></p></li>`;

        // noinspection InnerHTMLJS
        document.getElementById('cms-dgst-algos').innerHTML =
            document.getElementById('cms-dgst-algos').innerHTML + ulrow;
    }

    // Put information about encapsulated content type
    const contypemap = {
        '1.3.6.1.4.1.311.2.1.4': 'Authenticode signing information',
        '1.2.840.113549.1.7.1': 'Data content'
    };

    let eContentType = contypemap[cmsSignedSimpl.encapContentInfo.eContentType];
    if (typeof eContentType === 'undefined')
        eContentType = cmsSignedSimpl.encapContentInfo.eContentType;

    // noinspection InnerHTMLJS
    document.getElementById('cms-encap-type').innerHTML = eContentType;

    // Put information about included certificates
    const rdnmap = {
        '2.5.4.6': 'C',
        '2.5.4.10': 'O',
        '2.5.4.11': 'OU',
        '2.5.4.3': 'CN',
        '2.5.4.7': 'L',
        '2.5.4.8': 'S',
        '2.5.4.12': 'T',
        '2.5.4.42': 'GN',
        '2.5.4.43': 'I',
        '2.5.4.4': 'SN',
        '1.2.840.113549.1.9.1': 'E-mail'
    };

    if ('certificates' in cmsSignedSimpl) {
        for (let j = 0; j < cmsSignedSimpl.certificates.length; j += 1) {
            let ul = '<ul>';

            for (
                let i = 0;
                i < cmsSignedSimpl.certificates[j].issuer.typesAndValues.length;
                i += 1
            ) {
                let typeval =
                    rdnmap[
                        cmsSignedSimpl.certificates[j].issuer.typesAndValues[i]
                            .type
                    ];
                if (typeof typeval === 'undefined')
                    typeval =
                        cmsSignedSimpl.certificates[j].issuer.typesAndValues[i]
                            .type;

                const subjval =
                    cmsSignedSimpl.certificates[j].issuer.typesAndValues[i]
                        .value.valueBlock.value;

                ul += `<li><p><span>${typeval}</span> ${subjval}</p></li>`;
            }

            ul = `${ul}</ul>`;

            const row = certificatesTable.insertRow(
                certificatesTable.rows.length
            );
            const cell0 = row.insertCell(0);
            // noinspection InnerHTMLJS
            cell0.innerHTML = bufferToHexCodes(
                cmsSignedSimpl.certificates[j].serialNumber.valueBlock.valueHex
            );
            const cell1 = row.insertCell(1);
            // noinspection InnerHTMLJS
            cell1.innerHTML = ul;
        }

        document.getElementById('cms-certs').style.display = 'block';
    }

    // Put information about included CRLs
    if ('crls' in cmsSignedSimpl) {
        for (let j = 0; j < cmsSignedSimpl.crls.length; j += 1) {
            let ul = '<ul>';

            for (
                let i = 0;
                i < cmsSignedSimpl.crls[j].issuer.typesAndValues.length;
                i += 1
            ) {
                let typeval =
                    rdnmap[
                        cmsSignedSimpl.crls[j].issuer.typesAndValues[i].type
                    ];
                if (typeof typeval === 'undefined')
                    typeval =
                        cmsSignedSimpl.crls[j].issuer.typesAndValues[i].type;

                const subjval =
                    cmsSignedSimpl.crls[j].issuer.typesAndValues[i].value
                        .valueBlock.value;

                ul += `<li><p><span>${typeval}</span> ${subjval}</p></li>`;
            }

            ul = `${ul}</ul>`;

            const row = crlsTable.insertRow(certificatesTable.rows.length);
            const cell = row.insertCell(0);
            // noinspection InnerHTMLJS
            cell.innerHTML = ul;
        }

        document.getElementById('cms-certs').style.display = 'block';
    }

    // Put information about number of signers
    // noinspection InnerHTMLJS
    document.getElementById(
        'cms-signs'
    ).innerHTML = cmsSignedSimpl.signerInfos.length.toString();

    document.getElementById('cms-signed-data-block').style.display = 'block';
}
//* ********************************************************************************

//* ********************************************************************************
// Create CMS_Signed
//* ********************************************************************************
const createCMSSignedInternal = async dataBuffer => {
    const certSimpl = new Certificate();
    const trustedCertificates = [];
    let publicKey;
    let privateKey;
    let certificateBuffer;
    let privateKeyBuffer;

    // Get a "crypto" extension
    const crypto = getCrypto();
    if (typeof crypto === 'undefined')
        throw new Error('No WebCrypto extension found');

    // Put a static values
    certSimpl.version = 2;
    certSimpl.serialNumber = new asn1js.Integer({ value: 1 });
    certSimpl.issuer.typesAndValues.push(
        new AttributeTypeAndValue({
            type: '2.5.4.6', // Country name
            value: new asn1js.PrintableString({ value: 'RU' })
        })
    );
    certSimpl.issuer.typesAndValues.push(
        new AttributeTypeAndValue({
            type: '2.5.4.3', // Common name
            value: new asn1js.BmpString({ value: 'Test' })
        })
    );
    certSimpl.subject.typesAndValues.push(
        new AttributeTypeAndValue({
            type: '2.5.4.6', // Country name
            value: new asn1js.PrintableString({ value: 'RU' })
        })
    );
    certSimpl.subject.typesAndValues.push(
        new AttributeTypeAndValue({
            type: '2.5.4.3', // Common name
            value: new asn1js.BmpString({ value: 'Test' })
        })
    );

    certSimpl.notBefore.value = new Date(2016, 1, 1);
    certSimpl.notAfter.value = new Date(2019, 1, 1);

    certSimpl.extensions = []; // Extensions are not a part of certificate by default, it's an optional array

    // "KeyUsage" extension
    const bitArray = new ArrayBuffer(1);
    const bitView = new Uint8Array(bitArray);

    bitView[0] |= 0x02; // Key usage "cRLSign" flag
    // bitView[0] = bitView[0] | 0x04; // Key usage "keyCertSign" flag

    const keyUsage = new asn1js.BitString({ valueHex: bitArray });

    certSimpl.extensions.push(
        new Extension({
            extnID: '2.5.29.15',
            critical: false,
            extnValue: keyUsage.toBER(false),
            parsedValue: keyUsage // Parsed value for well-known extensions
        })
    );

    // Get default algorithm parameters for key generation
    const algorithm = getAlgorithmParameters(signAlg, 'generatekey');
    if ('hash' in algorithm.algorithm) algorithm.algorithm.hash.name = hashAlg;
    // Create a new key pair
    try {
        const keyPair = await crypto.generateKey(
            algorithm.algorithm,
            true,
            algorithm.usages
        );
        publicKey = keyPair.publicKey;
        privateKey = keyPair.privateKey;
    } catch (error) {
        throw new Error(`Error during key generation: ${error}`);
    }
    // Exporting public key into "subjectPublicKeyInfo" value of certificate
    await certSimpl.subjectPublicKeyInfo.importKey(publicKey);
    // Signing final certificate
    try {
        await certSimpl.sign(privateKey, hashAlg);
    } catch (error) {
        throw new Error(`Error during exporting public key: ${error}`);
    }
    // Encode and store certificate
    try {
        trustedCertificates.push(certSimpl);
        certificateBuffer = certSimpl.toSchema(true).toBER(false);
    } catch (error) {
        throw new Error(`Error during signing: ${error}`);
    }
    // Exporting private key
    try {
        privateKeyBuffer = await crypto.exportKey('pkcs8', privateKey);
    } catch (error) {
        throw new Error(`Error during exporting of private key: ${error}`);
    }

    // Check if user wants us to include signed extensions
    if (addExt) {
        // Create a message digest
        const digest = await crypto.digest(
            { name: hashAlg },
            new Uint8Array(dataBuffer)
        );

        // Combine all signed extensions
        const signedAttr = [];

        signedAttr.push(
            new Attribute({
                type: '1.2.840.113549.1.9.3',
                values: [
                    new asn1js.ObjectIdentifier({
                        value: '1.2.840.113549.1.7.1'
                    })
                ]
            })
        ); // contentType

        signedAttr.push(
            new Attribute({
                type: '1.2.840.113549.1.9.5',
                values: [new asn1js.UTCTime({ valueDate: new Date() })]
            })
        ); // signingTime

        signedAttr.push(
            new Attribute({
                type: '1.2.840.113549.1.9.4',
                values: [new asn1js.OctetString({ valueHex: digest })]
            })
        ); // messageDigest
    }

    // Initialize CMS Signed Data structures and sign it
    const cmsSignedSimpl = new SignedData({
        version: 1,
        encapContentInfo: new EncapsulatedContentInfo({
            eContentType: '1.2.840.113549.1.7.1' // "data" content type
        }),
        signerInfos: [
            new SignerInfo({
                version: 1,
                sid: new IssuerAndSerialNumber({
                    issuer: certSimpl.issuer,
                    serialNumber: certSimpl.serialNumber
                })
            })
        ],
        certificates: [certSimpl]
    });

    if (addExt)
        cmsSignedSimpl.signerInfos[0].signedAttrs = new SignedAndUnsignedAttributes(
            {
                type: 0,
                attributes: signedAttr
            }
        );

    if (detachedSignature === false) {
        const contentInfo = new EncapsulatedContentInfo({
            eContent: new asn1js.OctetString({ valueHex: dataBuffer })
        });

        cmsSignedSimpl.encapContentInfo.eContent = contentInfo.eContent;

        await cmsSignedSimpl.sign(privateKey, 0, hashAlg);
    }

    await cmsSignedSimpl.sign(privateKey, 0, hashAlg, dataBuffer);

    // Create final result
    try {
        const cmsSignedSchema = cmsSignedSimpl.toSchema(true);

        const cmsContentSimp = new ContentInfo({
            contentType: '1.2.840.113549.1.7.2',
            content: cmsSignedSchema
        });

        const _cmsSignedSchema = cmsContentSimp.toSchema();

        // Make length of some elements in "indefinite form"
        _cmsSignedSchema.lenBlock.isIndefiniteForm = true;

        const block1 = _cmsSignedSchema.valueBlock.value[1];
        block1.lenBlock.isIndefiniteForm = true;

        const block2 = block1.valueBlock.value[0];
        block2.lenBlock.isIndefiniteForm = true;

        if (detachedSignature === false) {
            const block3 = block2.valueBlock.value[2];
            block3.lenBlock.isIndefiniteForm = true;
            block3.valueBlock.value[1].lenBlock.isIndefiniteForm = true;
            block3.valueBlock.value[1].valueBlock.value[0].lenBlock.isIndefiniteForm = true;
        }

        const cmsSignedBuffer = _cmsSignedSchema.toBER(false);
        return { certificateBuffer, privateKeyBuffer, cmsSignedBuffer };
    } catch (error) {
        throw new Error(`Error during signing of CMS Signed Data: ${error}`);
    }
    return {};
};

export const createCMSSigned = async dataBuffer => {
    const {
        certificateBuffer,
        privateKeyBuffer,
        cmsSignedBuffer
    } = await createCMSSignedInternal(dataBuffer);

    const certSimplString = String.fromCharCode.apply(
        null,
        new Uint8Array(certificateBuffer)
    );

    let certificate = '-----BEGIN CERTIFICATE-----\r\n';
    certificate += formatPEM(window.btoa(certSimplString));
    certificate = `${certificate}\r\n-----END CERTIFICATE-----\r\n`;

    const privateKeyString = String.fromCharCode.apply(
        null,
        new Uint8Array(privateKeyBuffer)
    );

    let privateKey = `-----BEGIN PRIVATE KEY-----\r\n`;
    privateKey += formatPEM(window.btoa(privateKeyString));
    privateKey = `${privateKey}\r\n-----END PRIVATE KEY-----\r\n`;

    const signedDataString = String.fromCharCode.apply(
        null,
        new Uint8Array(cmsSignedBuffer)
    );

    let cms = `----BEGIN CMS-----\r\n`;
    cms += formatPEM(window.btoa(signedDataString));
    cms = `${cms}\r\n-----END CMS-----\r\n\r\n`;

    // parseCMSSigned(cmsSignedBuffer);

    return { certificate, privateKey, cms };
};

function verifyCMSSignedInternal() {
    // Initial check
    if (cmsSignedBuffer.byteLength === 0)
        return Promise.reject('Nothing to verify!');

    return Promise.resolve().then(() => {
        // Decode existing CMS_Signed
        const asn1 = asn1js.fromBER(cmsSignedBuffer);
        const cmsContentSimpl = new ContentInfo({ schema: asn1.result });
        const cmsSignedSimpl = new SignedData({
            schema: cmsContentSimpl.content
        });

        // Verify CMS_Signed
        const verificationParameters = {
            signer: 0,
            trustedCerts: trustedCertificates
        };
        if (detachedSignature) verificationParameters.data = dataBuffer;

        return cmsSignedSimpl.verify(verificationParameters);
    });
}

function verifyCMSSigned() {
    // Initial check
    if (cmsSignedBuffer.byteLength === 0) {
        alert('Nothing to verify!');
        return Promise.resolve();
    }

    return verifyCMSSignedInternal().then(
        result => alert(`Verification result: ${result}`),
        error => alert(`Error during verification: ${error}`)
    );
}

function handleFileBrowse(evt) {
    const tempReader = new FileReader();

    const currentFiles = evt.target.files;

    // noinspection AnonymousFunctionJS
    tempReader.onload = event => {
        // noinspection JSUnresolvedVariable
        const dataBuffer = event.target.result;
        createCMSSigned(dataBuffer);
    };

    tempReader.readAsArrayBuffer(currentFiles[0]);
}

function handleParsingFile(evt) {
    const tempReader = new FileReader();

    const currentFiles = evt.target.files;

    // noinspection AnonymousFunctionJS
    tempReader.onload = event => {
        // noinspection JSUnresolvedVariable
        cmsSignedBuffer = event.target.result;
        parseCMSSigned();
    };

    tempReader.readAsArrayBuffer(currentFiles[0]);
}

function handleCABundle(evt) {
    const tempReader = new FileReader();

    const currentFiles = evt.target.files;

    // noinspection JSUnresolvedVariable, AnonymousFunctionJS
    tempReader.onload = event => parseCAbundle(event.target.result);

    tempReader.readAsArrayBuffer(currentFiles[0]);
}

function handleHashAlgOnChange() {
    const hashOption = document.getElementById('hash_alg').value;
    switch (hashOption) {
        case 'alg_SHA1':
            hashAlg = 'sha-1';
            break;
        case 'alg_SHA256':
            hashAlg = 'sha-256';
            break;
        case 'alg_SHA384':
            hashAlg = 'sha-384';
            break;
        case 'alg_SHA512':
            hashAlg = 'sha-512';
            break;
        default:
    }
}

function handleSignAlgOnChange() {
    const signOption = document.getElementById('sign_alg').value;
    switch (signOption) {
        case 'alg_RSA15':
            signAlg = 'RSASSA-PKCS1-V1_5';
            break;
        case 'alg_RSA2':
            signAlg = 'RSA-PSS';
            break;
        case 'alg_ECDSA':
            signAlg = 'ECDSA';
            break;
        default:
    }
}

function handleAddExtOnChange() {
    addExt = document.getElementById('add_ext').checked;
}

function handleDetachedSignatureOnChange() {
    detachedSignature = document.getElementById('detached_signature').checked;
}
