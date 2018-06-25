# Plantrecognition

This project was programmed by Albin Geraud Kouatcho Nkuigwa, Arthur Loic Fotso Keumogne and Janik Muenzenberger.

This is our Angular & NodeJS project for the subject Projekt Systementwicklung. The goal is to write a progressive Webapp which shows all plants and diseases from an provided api. You can start a analysis with an pictore of a plant and the api will calculate a result disease which will be shown. This project implements a user management, so that a user can register and see their analysis history. Furthermore it provides a simulated connection to Shaufel-Online (Their are some fixed gardeners which you can see on a map and send emails to).

## Start the project

- Checkout the project from gitlab and go into project folder:

``` bash
git pull https://code.fbi.h-da.de/istankoua/PSE_Projekt.git
cd PSE_Projekt
```

- Install the node modules (Postinstall script automatically builds the project):

``` bash
npm install
```

- Before starting the server check the [Backend API Documentation](./src/backend/README.md) for environment variables and other config paramters and set them for your configuration.

- Start the server:

``` bash
npm start
```

## Angular frontend

### Angular Development server

Run `npm run live` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Only works if outcomment the SWPush, because those PWA features only work in production mode.

### Build

Run `npm run build` to build the project in production. The build artifacts will be stored in the `dist/` directory.

## Backend

The backend for the angular project is in `/src/backend`. It implements different routes which are used by the project.

You can find the documentation with all routes an environment variables [under this page](./src/backend/README.md).

### Run Backend Production Server

Run `npm start` to start the production server.

### Run Backend Development Server

Run `npm run backend_dev` for a dev server. Use the api on `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

### Run Backend Mocha Tests

Run `npm run backend_test` to the mocha tests for the backend.