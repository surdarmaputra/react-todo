# TODO List React

**TODO List React** is a simple TODO List app build using React.

[TODO List App](https://github.com/surdarmaputra/react-todo/assets/8598274/58245e36-4234-4d37-b1a6-a22afae73bae)

Functionalities:

- Fetch tasks
- Add a new task
- Delete a task

## Getting Started

### Requirements

- Node.js v16
- Yarn

**Note**:

Make sure not to use Node.js version 17 and above, otherwise you will see `ERR_PACKAGE_PATH_NOT_EXPORTED` error which blocks the build process.

### Installation

Clone the repo

```bash
# using SSH
git clone git@github.com:surdarmaputra/react-todo.git

# using HTTPS
git clone https://github.com/surdarmaputra/react-todo.git

# go to project directory
cd react-todo

```

Prepare environment variables

```bash
cp .env.example .env

```

Install dependencies

```bash
# if using asdf (https://asdf-vm.com/), prepare the correct Node.js version
asdf install
asdf local nodejs 16.20.2

# install dependencies
yarn
```

Start development server

```bash
# start the JSON server
yarn server

# start the web app
yarn start
```

### Commands

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn testcov`

Launches the test runner and generate coverage report without interactive watch mode.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn server`

Run the API server with JSON Server.

### Environment Variables

#### `REACT_APP_BACKEND_BASE_URL`

Base URL of backend endpoint (JSON server). By default, `yarn server` will start backend service at `http://localhost:3001`. Change its value according to your backend service URL.

## Tech Stacks

- [React](https://react.dev/) bootstrapped using [Create React App](https://create-react-app.dev/).
- [SWR](https://swr.vercel.app/) for data fetching.
- [React Hook Form](https://react-hook-form.com/) for input validation.
- [Lodash](https://lodash.com/) for utilities.
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) for code standardization.
- [JSON Server](https://github.com/typicode/json-server) for faking REST API.
- [Testing Library](https://testing-library.com/) & [MSW](https://mswjs.io/) for testing.
