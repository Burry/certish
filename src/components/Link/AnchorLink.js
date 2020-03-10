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
import Link from 'next/link';
import { Anchor } from 'grommet';
import { queryParams } from './urlParams';

const AnchorLink = ({ path, preserveParams, router, params, ...rest }) => {
    const query = queryParams(router, preserveParams);
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
            href={{
                pathname: path || rest.href,
                query
            }}
            passHref
        >
            <Anchor {...rest} />
        </Link>
    );
};

AnchorLink.propTypes = {
    path: string,
    preserveParams: shape({}),
    router: shape({}),
    params: string
};

AnchorLink.defaultProps = {
    path: undefined,
    preserveParams: undefined,
    router: undefined,
    params: undefined
};

export default withRouter(AnchorLink);
