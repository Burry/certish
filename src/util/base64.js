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

import { atob, btoa } from 'isomorphic-base64';

export const base64ToHex = str => {
    const raw = atob(str);
    let hex = '';
    for (let i = 0; i < raw.length; i += 1) {
        hex += raw
            .charCodeAt(i)
            .toString(16)
            .padStart(2, '0');
    }
    return hex;
};

export const hexToBase64 = hexStr => {
    /* eslint-disable no-bitwise */
    let base64 = '';
    for (let i = 0; i < hexStr.length; i += 1) {
        base64 += !((i - 1) & 1)
            ? String.fromCharCode(parseInt(hexStr.substring(i - 1, i + 1), 16))
            : '';
    }
    return btoa(base64);
};
