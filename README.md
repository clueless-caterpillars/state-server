# state-server

## Description

ExpressJS server on AWS EC2, utilizing S3 for temporary data storage. Employed Cognito for authentication purposes. Managed data storage using DynamoDB and established an API gateway to enable CRUD operations on the database. Orchestrated communication between the mobile app and a Raspberry Pi device through SNS and SQS.

## Code flow

![server code flow](https://github.com/clueless-caterpillars/state-server/blob/main/state%20codeflow.png)

## Installation

[Deployed server](http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001)

To run your own server locally, clone this repository and run `npm install` to install the dependencies. Delete the `getCreds` files and comment out all the lines requiring the function. Then run `npm start` to start the server.

To deploy your server on EC2 or Render, follow the platform documentation for deloyment. Adjustments may need to be made in the code in order to fit routes and configs to your planned architecture.

*note: the getCreds function was written to automatically get the token from EC2 to start the server, feel free to use that for your own AWS account with proper permissions*
