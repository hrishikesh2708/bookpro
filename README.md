# Bookpro
Bookpro is REAL Time MERN stack web application which allows CRUD operation on book details with certain specification and limitation.

You can visit [Bookpro](http://ec2-18-222-165-190.us-east-2.compute.amazonaws.com/app/#/)

## Discription

Bookpro is a single page REAL Time MERN stack application host on amazon ec2 instance. Frontend is handled by React and Material UI, Backend is managed by Nginx (Reverse Proxy) and express server (API calls,  rendering react app), and mongodb database for storing data.

## Features And Video Demo
- All books present in database is visible to every user irrespective of their logged in status.
- User can add new book to database.
- User can edit author of any book.
- User can delete book only if the book was added by same user.
- User login status is persisted so on refresh user don't need to login again.
- User can search books (extremely fast search)
- If user performs any CRUD operation, all online user will receive notification about the particular CRUD operation and REAL TIME changes will be visible on the table 
- User data is stored in securely 
- User can view all books  added by them in a personalised table (Mybooks)
- User can switch to light mode and dark mode according to their preference. 

## Important Technology and Packages
- [Redux](https://www.npmjs.com/package/redux) for state management on client side. 

- [Redux Thunk](https://www.npmjs.com/package/redux-thunk) as a middleware for redux.

- [Redux Persist](https://www.npmjs.com/package/redux-persist) for storing the logged in session of client and rehydrating redux store.

- [Redux offline](https://www.npmjs.com/package/@redux-offline/redux-offline) for handling the API call while Client is facing network issues.

- [PM2](https://www.npmjs.com/package/pm2) for running server forever without any interruption

- [Nginx](https://www.nginx.com/) for carrying out reverse proxy.

- [Material UI](https://material-ui.com/getting-started/installation/) for styling web application

- [Amazon EC2 Instance](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Categories=categories%23compute&trk=ps_a134p000006gEYrAAM&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_IN&sc_publisher=Google&sc_category=Cloud%20Computing&sc_country=IN&sc_geo=APAC&sc_outcome=acq&sc_detail=aws%20ec2%20instance&sc_content=EC2%20Instance_e&sc_matchtype=e&sc_segment=489978426477&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Cloud%20Computing|EC2|IN|EN|Text&s_kwcid=AL!4422!3!489978426477!e!!g!!aws%20ec2%20instance&ef_id=CjwKCAjwn6GGBhADEiwAruUcKumbuS4ykW8ZnBZhL0O5NOGZsCYUytjuo4bIN4q-0_S3L6F2UTYwThoCK0AQAvD_BwE:G:s&s_kwcid=AL!4422!3!489978426477!e!!g!!aws%20ec2%20instance&awsf.Free%20Tier%20Types=*all) for hosting application

- [Server Sent Event](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) for making web application REAL Time 


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
   ​```bash
   ​PORT="**** {any port number}"
   ​REACT_APP_GOOGLE_CLIENT_ID=" Get it from google API console "
   ​REACT_APP_GOOGLE_PASSWORD=" Get it from google API console "
   ​REACT_APP_LOCALHOST=" http://localhost:**** "
   ​REACT_APP_HOME=" http://localhost:**** "
   ​```
*   default.json file inside express_backend/config/ and add fo;llowing key pair value:
   ​```bash
   ​{
     ​"mongoUri": "mongodb://localhost:27017/bookpro",
     ​"secretOrKey": "secret",
     ​"googleClientid": " Get this from google API console ",     
     ​"googlepassword": " Get this from google API console ",
   ​}
Now you are ready to launch it on loacal Host.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
