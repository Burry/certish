# 📦 Deployment

Certish is deployed with [ZEIT Now](https://zeit.co/docs).

[Our team (you'll need to be signed in) »](https://zeit.co/Certish)

## Prepare

1. Install the Now CLI globally with `npm i -g now`.
2. [Create a free ZEIT account](https://zeit.co/signup) if you don't have one already, then sign in to the Now CLI: `now login`

## Deploy

### Automatic

Pushing changes to a git branch will create a new staging deployment at `https://Certish.xxxxx.now.sh`.

Pushing to the `master` branch will deploy to the production environment.

### Manual

`now` will create a staging deployment when run within the project directory.

`now --prod` will deploy to the production environment.
