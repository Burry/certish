# 📦 Deployment

certish is deployed with [ZEIT Now](https://zeit.co/docs).

## Prepare

1. Install the Now CLI globally with `npm i -g now`.
2. Log into now: `now login`

## Deploy

### Automatic

Pushing changes to a git branch will create a new staging deployment at `https://certish.xxxxx.now.sh`.

Pushing to the `master` branch will deploy to the production environment.

### Manual

`now` will create a staging deployment when run within the project directory.

`now --prod` will deploy to the production environment.
