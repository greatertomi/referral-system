# Amitree Referral System

This is an API that is used to create and manage referrals.

The url is [https://amitreereferral.herokuapp.com/api/v1/](https://amitreereferral.herokuapp.com/api/v1/).

You can read its documentation [here](https://documenter.getpostman.com/view/8710999/TWDcFuyL)

### Tools

- Node.js
- MySQL
- Heroku

### Instruction on how to use on PC

You can clone this project and run it on your PC following these steps

1. Run `npm install`
2. Create a .env file and specify the following details about your database and the app
   - HOST
   - USER
   - PASSWORD
   - DATABASE
   - PORT
3. Run the file called db-structure in your MySQl shell or MySQL GUI application to create that database.
4. Run `npm test` to execute the automated tests. On the test please take note of the instruction written above each test.
5. Run `npm start` to execute the project
