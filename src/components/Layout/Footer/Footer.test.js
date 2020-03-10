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

/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Component from './Footer';

describe('<Footer />', () => {
    it('matches snapshot', () => {
        const component = renderer.create(<Component />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
