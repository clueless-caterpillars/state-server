# state-server

## Description

ExpressJS server on AWS EC2, utilizing S3 for temporary data storage. Employed Cognito for authentication purposes. Managed data storage using DynamoDB and established an API gateway to enable CRUD operations on the database. Orchestrated communication between the mobile app and a Raspberry Pi device through SNS and SQS.

## Code flow

![server code flow](https://github.com/clueless-caterpillars/state-server/blob/main/state%20codeflow.png)

## Installation

This server can be installed on an EC2 instance or other platforms such as Render. Adjustments may need to be made in the code in order to fit routes and configs to your planned architecture.

If running locally, install dependencies with npm install and use npm start to run the server.
