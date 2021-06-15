# Bookpro
Bookpro is REAL Time MERN stack web application which allows CRUD operation on book details with certain specification and limitation.

You can visit [Bookpro](http://ec2-18-222-165-190.us-east-2.compute.amazonaws.com/app/#/)

## Discription
-
## Features And Video Demo
-

## Important Technology and Packages
- [Redux]() for state management on client side. 
- [Redux Thunk]() as a middleware for redux.
- [Redux Persist]() for storing the logged in session of client.
- [Redux offline]() for handling the API call while Client is facing network issues. 
- [PM2]() for running server forever without any interruption
- [Nginx]() for carrying out reverse proxy.
- [Material UI]() for styling web application
- [Amazon EC2 Instance]() for hosting application

## Installation

Perform following steps:

```bash
git clone https://github.com/hrishikesh2708/bookpro.git
cd react_frontend/
npm install
cd ..
cd express_backend/
npm install
```

## Usage
for using this repo. you need to create two files 
*   .env file inside react_frontend/ and add following key pair value:
    ```bash
    PORT="**** {any port number}"
    REACT_APP_GOOGLE_CLIENT_ID=" Get it from google API console "
    REACT_APP_GOOGLE_PASSWORD=" Get it from google API console "
    REACT_APP_LOCALHOST=" http://localhost:**** "
    REACT_APP_HOME=" http://localhost:**** "
    ```
*   default.json file inside express_backend/config/ and add fo;llowing key pair value:
    ```bash
    {
      "mongoUri": "mongodb://localhost:27017/bookpro",
      "secretOrKey": "secret",
      "googleClientid": " Get this from google API console ",     
      "googlepassword": " Get this from google API console ",
    }
Now you are ready to launch it on loacal Host.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

