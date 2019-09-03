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

import { string, shape } from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Button } from 'grommet';
import { queryParams } from './urlParams';

const AnchorButton = ({
    path,
    preserveParams,
    route,
    router,
    params,
    ...rest
}) => {
    const query = queryParams(router, preserveParams);
    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
            route={route}
            href={{
                pathname: path || rest.href,
                query
            }}
            params={{
                ...query,
                ...params
            }}
            passHref
        >
            <Button {...rest} />
        </Link>
    );
};

AnchorButton.propTypes = {
    path: string,
    preserveParams: shape({}),
    route: string,
    router: string,
    params: string
};

AnchorButton.defaultProps = {
    path: undefined,
    preserveParams: undefined,
    route: undefined,
    router: undefined,
    params: undefined
};

export default withRouter(AnchorButton);
