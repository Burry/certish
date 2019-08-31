# 🛠 Development

certish requires an environment with [Node.js](https://nodejs.org), and we recommend using [Yarn](https://yarnpkg.com/docs/install) to install npm dependencies and run development scripts.

## Dependencies

Inside the project directory, install npm dependencies with `yarn` or `yarn install`. If you prefer to use npm, then run `npm install`.

## AWS Amplify

certish uses the [AWS Amplify Framework](https://aws.amazon.com/amplify/framework) to interface with backend cloud resources provisioned by the [AWS Amplify CLI](https://aws-amplify.github.io/docs/cli-toolchain/quickstart). You will need to install, configure, and initialize the Amplify CLI before building, running, or making backend changes to the project.

1. Install the Amplify CLI globally: `npm install -g @aws-amplify/cli`
2. Run `amplify configure`. You will be prompted to sign in to the AWS Console and create a new IAM user for the Amplify CLI. If your team has already provided you with Amplify IAM credentials, then close the browser prompts and input your IAM access key and secret access key.
3. Run `amplify init`

`amplify push` will be called before building the app or starting the development server to ensure that the latest backend resources are deployed to the cloud. You can also call `amplify push` separately to update backend resources.

[Learn more »](https://aws-amplify.github.io/docs/cli-toolchain/quickstart)

## Scripts

In the project directory, you can run the following development scripts. If you prefer to use npm, then substitute `yarn` for `npm run`.

### `yarn dev`

Deploys AWS backend resources and runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production.

### `yarn start`

Deploys AWS backend resources and runs the compiled production app.

### `yarn lint`

Runs [eslint](https://eslint.org) to detect code errors and bad formatting. You can use `yarn lint:fix` to automatically fix issues and `yarn lint:report` to generate a report of the lint run.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the Create React App section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage`

Launches the test runner and generates a coverage report. Your browser will open the report once it's ready.
