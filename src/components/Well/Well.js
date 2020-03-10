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

import React, { useState } from 'react';
import { string, func } from 'prop-types';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Box, Button, DropButton, Heading, Text } from 'grommet';
import Loading from '../Loading';
import globalStyles from './global-styles';
import './well.scss';

const InputButton = props => (
    <Button primary color="brand" margin="xsmall" {...props} />
);

const Well = ({ verb, pseudonym, handleFiles }) => {
    const [identity] = useState({ username: pseudonym });
    const [loading, setLoading] = useState(false);

    const handleDrop = async files => {
        setLoading(true);
        await handleFiles(files);
        setLoading(false);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        open: openFilePicker
    } = useDropzone({
        onDrop: handleDrop,
        noClick: true,
        noKeyboard: true
    });

    return (
        <Box fill justify="center">
            <style jsx global>
                {globalStyles}
            </style>
            <Box className="identity-widget">
                <DropButton
                    color="brand"
                    label={
                        <>
                            <b>Identity</b>&nbsp;
                            <span>{identity.username}</span>
                        </>
                    }
                    dropAlign={{ top: 'bottom', left: 'left' }}
                    dropContent={
                        <Box pad="small" elevation="none">
                            <div>{identity.username}</div>
                            <div>+ New identity</div>
                        </Box>
                    }
                    className="identity-dropdown-btn"
                />
            </Box>
            <Box
                fill
                align="center"
                justify="center"
                textAlign="center"
                className="well"
                {...(loading ? {} : getRootProps())}
            >
                {!loading && <input {...getInputProps()} />}
                <Box className="content">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <Heading as="div" margin="none" textAlign="center">
                                {isDragActive ? 'Release' : 'Drop'} to {verb}
                            </Heading>
                            <Box
                                direction="row"
                                fill
                                align="center"
                                alignSelf="center"
                                justify="center"
                                margin={{ vertical: 'large' }}
                                className={classNames(
                                    'uploadRow',
                                    isDragActive && 'fadeOut'
                                )}
                            >
                                <Text margin="xsmall">or</Text>
                                <InputButton
                                    label="choose file"
                                    onClick={openFilePicker}
                                />
                                {/* <InputButton
                                    label="paste text"
                                    onClick={e => {
                                        e.preventDefault();
                                    }}
                                /> */}
                            </Box>
                        </>
                    )}
                </Box>
                {(loading || isDragActive) && (
                    <>
                        <div className={classNames('hexagon', 'topHex')}>
                            <div />
                        </div>
                        {[-3, -2, -1, 0].map(delay => (
                            <div
                                className={classNames('hexagon', 'pulse')}
                                style={{ animationDelay: `${delay}s` }}
                                key={`pulse-${delay}`}
                            >
                                <div />
                            </div>
                        ))}
                    </>
                )}
            </Box>
        </Box>
    );
};

Well.propTypes = {
    verb: string.isRequired,
    pseudonym: string.isRequired,
    handleFiles: func.isRequired
};

export default Well;
