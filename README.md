<h1 align="center">
    eDebits
</h1>


## Concepts

<h4>
For this project was implemented:

    1) An API REST where is possible to
    
        a) Create, update, list and delete client debits.

    2) A Web application to manage client debits, where is possible:

        a) Visualize a list of client with debits
        b) Visualize a list the debits per clients
        c) Add a new debit
        d) Change/Update/Delete a client debit
        e) Delete a client. On this case all debits also will be deleted.
</h4>


## 🚀 Main Technologies used

### BACK-END
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [TypeORM](https://typeorm.io/#/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Docker](https://www.docker.com/docker-community)
-   [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 

### FRONT-END


-   [Create React App Configuration Override](https://github.com/sharegate/craco)
-   [ReactJS](https://reactjs.org/)
-   [TypeScript](https://www.typescriptlang.org/docs/handbook/react.html)
-   [React Router DOM](https://www.npmjs.com/package/react-router-dom)
-   [React Hooks](https://reactjs.org/docs/hooks-reference.html)
-   [React Icons](http://react-icons.github.io/react-icons/)
-   [React Spring](https://www.react-spring.io/)
-   [Styled Components](https://www.styled-components.com/)
-   [Axios](https://github.com/axios/axios)
-   [History](https://www.npmjs.com/package/history)
-   [Polished](https://polished.js.org/)
-   [Date Fns/TZ](https://date-fns.org/)
-   [Unform](https://github.com/Rocketseat/unform)
-   [Uuid](https://www.npmjs.com/package/uuid)
-   [Yup](https://github.com/jquense/yup)
-   [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)



## How To Use

To clone and run this application, you'll need [Docker](https://docs.docker.com/),  [Git](https://git-scm.com), [Node.js v10.16.1](https://nodejs.org/en/) or higher + [Yarn v1.19.1](https://yarnpkg.com/lang/en/) or higher installed on your computer. The yarn one is optional once you might run the steps using npm and npx

### Install Backend
```bash
# Clone this repository
$ git clone https://github.com/silvasouzaadriano/edebits.git

# Go into the repository
$ cd edebits/api

# Install dependencies
$ yarn install OR npm run install

# Created Postgres Docker container and the database code7
$ docker run --name edebits_postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=edebits -p 5432:5432 -d postgres

# Run the Migrations for create the tables
yarn typeorm migration:run OR npx typeorm migration:run

# Run the API
$ yarn dev:server OR npm run dev:server
```

### Install Frontend
```bash

# Go into the front path
$ cd edebits/frontend

# Install dependencies
$ yarn install OR npm run install

# Run the Front
$ yarn start OR npm run start
```

Made with ♥ by Adriano Souza [Get in touch!](https://www.linkedin.com/in/adriano-souza-9b1a1b11)


