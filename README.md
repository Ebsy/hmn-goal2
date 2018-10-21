# hmn-goal2 CRUD

## Installing & Features

`Git clone` then `npm install`.
Requires mongo to be running in the background.

Uses _Express_ as main framework, _Gulp_ as taskrunner.
_Babel_ allows use of ES6 throughout. User authentication handled via _bcrypt_ and JSON Web Tokens.
User must be authenticated before accessing the organizations route.

Tests handled via _Mocha/Chai/Supertest_. Code coverage with _nyc/Istanbul_.

Logging handled by _winston_ and _debug_ replaces console.log

_standard-version_ uses Angular Commit Message standard. _husky_ enforces linting (_ESLint_) and runs tests before commiting.

## npm scripts

`npm run test` runs complete suite of tests for users and organizations. Displays code coverage report using nyc/Istanbul

`npm run docs` generates HTML documentation from source code comments

`npm start` compiles using babel and serves app with nodemon on port 4040

`npm run lint` lints with ESLint

`npm run release` use after merging dev branch with master. Version bumping and commit message validation.
