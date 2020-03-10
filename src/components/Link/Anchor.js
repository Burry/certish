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

import { string, shape } from 'prop-types';
import { withRouter } from 'next/router';
import { Anchor as GrommetAnchor } from 'grommet';
import urlParams from './urlParams';

const Anchor = ({ path, preserveParams, router, ...rest }) => {
    const href = urlParams(path, router, preserveParams);
    return <GrommetAnchor href={href} {...rest} />;
};

Anchor.propTypes = {
    path: string.isRequired,
    preserveParams: string,
    router: shape({}).isRequired
};

Anchor.defaultProps = {
    preserveParams: undefined
};

export default withRouter(Anchor);
