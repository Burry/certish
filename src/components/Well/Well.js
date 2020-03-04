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

import React, { useState, useCallback } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { Box, Button, DropButton, Heading, Text } from 'grommet';
import globalStyles from './global-styles';
import './well.scss';

const Well = ({ verb, pseudonym }) => {
    const [identity] = useState({ username: pseudonym });
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(
        acceptedFiles => {
            setFiles(_files => [..._files, ...acceptedFiles]);
        },
        [setFiles]
    );
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        open: openFilePicker
    } = useDropzone({
        onDrop,
        noClick: true,
        noKeyboard: true
    });

    const InputButton = props => <Button primary color="brand" {...props} />;

    return (
        <div className="well-container">
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
                alignContent="center"
                textAlign="center"
                className="well"
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Box alignSelf="center" className="content">
                    <Heading as="div" margin="none" textAlign="center">
                        {isDragActive ? 'Release' : 'Drop'} to {verb}
                    </Heading>
                    <Box
                        direction="row"
                        fill
                        align="center"
                        alignSelf="center"
                        justify="between"
                        margin={{ vertical: 'large' }}
                        className={classNames(
                            'uploadRow',
                            isDragActive && 'fadeOut'
                        )}
                    >
                        <Text>or </Text>
                        <InputButton
                            label="choose file"
                            onClick={openFilePicker}
                        />
                        <InputButton
                            label="paste text"
                            onClick={e => {
                                e.preventDefault();
                            }}
                        />
                    </Box>
                    <Text size="small" textAlign="center">
                        {files.length
                            ? `${files.length} file${
                                  files.length !== 1 ? 's' : ''
                              } ready`
                            : 'The contents of your data are never sent to certish.'}
                    </Text>
                </Box>
                {isDragActive && (
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
        </div>
    );
};

Well.propTypes = {
    verb: string.isRequired,
    pseudonym: string.isRequired
};

export default Well;
