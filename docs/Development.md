# 🛠 Development

certish requires an environment with [Node.js](https://nodejs.org), and we recommend using [Yarn](https://yarnpkg.com/docs/install) to install npm dependencies and run development scripts. Once you have node, you'll want to install the [Now CLI](https://zeit.co/docs) with `npm i -g now`.

## npm Dependencies

Inside the project directory, install npm dependencies with `yarn` or `yarn install`. If you prefer to install with npm, then run `npm install` instead.

## Scripts

In the project directory you can run the following development scripts. If you prefer to use npm, then substitute `yarn` for `npm run`.

### `now dev`

Starts the development server and local Lambda API.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn build`

Builds the app for production.

### `yarn start`

Runs the compiled production app.

### `yarn lint`

Runs [ESLint](https://eslint.org) to detect code errors and bad formatting.

You can use `yarn lint:fix` to automatically fix issues and `yarn lint:report` to generate a report of the lint run.

### `yarn test`

Runs tests with [Jest](https://jestjs.io).

You can use `yarn test:watch` to run in interactive watch mode.

See the Create React App section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage`

Runs tests and generates a coverage report. Your browser will open the report once it's ready.

### `yarn deploy`

An alias for [`now`](Deployment.md). Deployes the app on ZEIT Now.
