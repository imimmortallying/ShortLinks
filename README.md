# shortlinks app: frontend

## Develop

```sh
yarn install
```
## About project:
App allows to convert an URL address into a short version.

Registered and authorised users can see all their links and set their lifetime.
Registration and authorisation is implemented using a pair of access/refresh JWT tokens stored in cookies and local storage.
Anonymous users live in the system with the help of JS-fingerprint. Their links are saved on backend for 5 days.

FSD methodology has been used as the architecture.

## Technology stack:
* JavaScript + TypeScript
* React
* TanStak query + Zustand
* Axios
* Ant Design as a UI kit
* Webpack
* Sass
