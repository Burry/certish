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

import { bool, string } from 'prop-types';
import { Box, Text } from 'grommet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-duotone-svg-icons';

const Loading = ({ loading, pad, ...props }) =>
    loading ? (
        <Box fill justify="center" pad={pad} {...props}>
            <Text color="brand" alignSelf="center">
                <FontAwesomeIcon icon={faSpinnerThird} size="3x" spin />
            </Text>
        </Box>
    ) : null;

Loading.propTypes = {
    loading: bool,
    pad: string
};

Loading.defaultProps = {
    loading: true,
    pad: 'large'
};

export default Loading;
