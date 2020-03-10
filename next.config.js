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

const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');

const nextPlugins = [
    withCSS,
    withSass,
    // withPurgeCSS,
    withOptimizedImages,
    withFonts
];

const nextConfig = {
    // next-css
    cssLoaderOptions: {
        url: false
    },
    // next-optimized-images
    optimizeImagesInDev: true,
    responsive: {
        adapter: require('responsive-loader/sharp')
    },
    defaultImageLoader: 'responsive-loader',
    // next-fonts
    enableSvg: true,
    // webpack
    webpack(config) {
        const patchedConfig = { ...config };
        patchedConfig.resolve = {
            ...patchedConfig.resolve,
            alias: {
                ...patchedConfig.resolve.alias,
                '~': path.resolve(__dirname, 'src')
            }
        };
        return patchedConfig;
    }
};

module.exports = withPlugins(nextPlugins, nextConfig);
