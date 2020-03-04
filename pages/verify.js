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

import { string } from 'prop-types';
import { Helmet } from 'react-helmet';
import {
    uniqueNamesGenerator,
    adjectives,
    animals
} from 'unique-names-generator';
import Well from '../src/components/Well';

const Verify = ({ pseudonym }) => (
    <>
        <Helmet title="Verify" />
        <Well verb="verify" pseudonym={pseudonym} />
    </>
);

Verify.getInitialProps = async () => ({
    pseudonym: uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2,
        separator: '-'
    })
});

Verify.propTypes = {
    pseudonym: string.isRequired
};

export default Verify;
