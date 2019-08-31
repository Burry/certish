# 🛠 Development

certish requires an environment with [Node.js](https://nodejs.org), and we recommend using [Yarn](https://yarnpkg.com/docs/install) to install npm dependencies and run development scripts.

## npm Dependencies

Inside the project directory, install npm dependencies with `yarn` or `yarn install`. If you prefer to install with npm, then run `npm install` instead.

## AWS Amplify

certish uses the [AWS Amplify Framework](https://aws.amazon.com/amplify/framework) to interface with backend cloud resources provisioned by the [AWS Amplify CLI](https://aws-amplify.github.io/docs/cli-toolchain/quickstart). You will need to install, configure, and initialize the Amplify CLI before building, running, or making backend changes to the project.

1. Install the Amplify CLI globally: `npm install -g @aws-amplify/cli`
2. Run `amplify configure`. You will be prompted to sign in to the AWS Console and create a new IAM user for the Amplify CLI. If your team has already provided you with Amplify IAM credentials, then close the browser prompts and input your IAM access key ID and secret access key.
3. If your team has existing Amplify environments deployed, obtain `team-provider-info.json` from them and place it in the `amplify` directory before proceeding. AWS [recommends](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#sharing-projects-outside-the-team-) leaving this file out of public repositories, and so if you're using a private repo you can remove `team-provider-info.json` from `.gitignore` and commit it freely. Otherwise, you will need an external process to keep this file privately in sync among your team after every instance the file is updated by the Amplify CLI.
4. Run `amplify init` from within the project directory. If you have `team-provider-info.json`, confirm that you want to use an existing environment, and then select the environment name that matches your checked-out git branch. Otherwise create a new environment, and name it after the branch.

### Deployment

`amplify push` will be called before building the app or starting the development server to ensure that the latest backend resources are deployed to the cloud. You can also call `amplify push` separately to update backend resources.

### Environments & Teams

Please familiarize yourself with the [concepts and workflow](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#environments--teams) of using the Amplify CLI as a team. When making changes to backend resources, team members should work within their own [sandbox environments](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#team-members-working-on-their-own-sandbox-environments-recommended) before deploying to a shared/production environment.

## Scripts

In the project directory you can run the following development scripts. If you prefer to use npm, then substitute `yarn` for `npm run`.

### `yarn dev`

Deploys AWS backend resources and starts the development server.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn build`

Deploys AWS backend resources and builds the app for production.

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
