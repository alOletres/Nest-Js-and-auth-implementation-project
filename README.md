## Get Started 🚀

## Pre-requisite 🔥

1. Download and install nodejs
2. Download and install XAMPP

## How to run the app

1. Create a `.env` file in the root of the directory and paste this code:

```.env
AUTH_SECRET_KEY=f3fcd7797baaea07fdae8b9f959e8d646cb7d5562ab72595759f1aae7afb4735bf891fc925b6f8d98dd7c11cba772e19e636d770ac6c4861dff5ecfda6bf6ac6
DATABASE_URL="mysql://root:@localhost:3306/sunAsterisk"

SALTROUND=10
DEFAULT_PASSWORD=test
DEV_PORT=3000
```

2. Run `npm install` to install the dependencies
3. Run `npm run seed` to seed test data to the database
4. Run `npm run start` to start the server
