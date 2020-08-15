<h1 align="center">
    Code7 challenger
</h1>


## Concepts

<h4>
On this challenger was implemented:

    1) An API REST where is possible to
    
        a) Create, update and authenticate users
        b) Create, update, list and delete client debits.

    2) A Web application to manage client debits, where is possible after the the user authentication:

        a) Visualize a list of client with debits
        b) Visualize a list the debits per clients
        c) Add a new debit
        d) Change/Update/Delete a client debit
        e) Delete a client. On this case all debits also will be deleted.
</h4>


## Main Technologies used

### BACK-END
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 

### FRONT-END
-   [ReactJS](https://reactjs.org/)
-   [Create React App Configuration Override](https://github.com/sharegate/craco)
-   [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)



## How To Use

To clone and run this application, you'll need [Docker](https://docs.docker.com/),  [Git](https://git-scm.com), [Node.js v10.16.1](https://nodejs.org/en/) or higher + [Yarn v1.19.1](https://yarnpkg.com/lang/en/) or higher installed on your computer. The yarn one is optional once you might run the steps using npm and npx

### Install Backend
```bash
# Clone this repository
$ git clone https://github.com/silvasouzaadriano/code7-challenger.git

# Go into the repository
$ cd code7-challenger/api

# Install dependencies
$ yarn install OR npm run install

# Created Postgree Docker container
$ docker run --name code7_database -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=code7 -p 5432:5432 -d postgres

# .env
$ Replace the .env.EXAMPLE to .env

# Run the API
$ yarn dev OR npm run dev
```

### Install Frontend
```bash

# Go into the front path
$ cd code7-challenger/frontend

# Install dependencies
$ yarn install OR npm run install

# Run the Front
$ yarn start OR npm run start
```

Made with ♥ by Adriano Souza [Get in touch!](https://www.linkedin.com/in/adriano-souza-9b1a1b11)


