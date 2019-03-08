[![Build Status](https://travis-ci.org/tundewritescode/WorkList.svg?branch=development)](https://travis-ci.org/tundewritescode/WorkList)
[![Coverage Status](https://coveralls.io/repos/github/tundewritescode/WorkList/badge.svg?branch=development)](https://coveralls.io/github/tundewritescode/WorkList?branch=development)
[![Maintainability](https://api.codeclimate.com/v1/badges/a450377d1c69e32b2a3f/maintainability)](https://codeclimate.com/github/tundewritescode/WorkList/maintainability)
# WorkList
## Introduction
Worklist is a simple and open source todo list application that allows users to create lists of tasks to be completed and track their progress on these tasks

## How it works
+ Register a new account or sign in with an existing account
+ Create a todo list
+ Upload an avatar
+ Update your profile
+ Open the todo and create a task
+ Add collaborators
+ Add deadline date
+ Mark todo is completed
+ Recover your password in case you forget it
+ Get reminders according to the due dates of each task
+ Each task is color coded

## Technologies used
+ [ES6 and ES7](https://webapplog.com/es7-es8/) - These provide advantages of advanced JavaScript features like object spread, array spread, object destructuring, async/await, and so on.
+ [NodeJs](https://nodejs.org/en/docs/) - Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
+ [ExpressJS](https://expressjs.com/en/4x/api.html) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. I used this framework for routing.
+ [MongoDB](https://www.mongodb.com/download-center#community) - MongoDB is a free and open-source cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemas.
+ [Mongoose](http://mongoosejs.com/docs/guide.html) - Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
+ [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
+ [Cloudinary](https://cloudinary.com/documentation) - Cloudinary is the image back-end for web and mobile developers. An end-to-end solution for all your image-related needs.
+ [Materialize CSS](http://materializecss.com/) - A modern responsive front-end framework based on Material Design

## Installation and setup
+ Install NodeJS and MongoDB on your machine
+ Using your terminal, navigate to any directory of your choice and enter the following command to clone this repository to the directory:

```
>  git clone https://github.com/tundewritescode/WorkList.git
```

+ Navigate to the just created `worklist` directory with the following command:

```
> cd worklist
```
+ And then this command:
```
> npm install
```
+ Create a Cloudinary account
+ Set up your `.env` file as specified in the included `.env.sample` file
+ Finally, run:
```
npm run local
```

### Limitations
+ There are no in-app notifications at the moment
+ Users cannot edit their todos
+ Editing tasks is only limited to checking to complete them

## How to Contribute
Contributors are welcome to further enhance the features of this API by contributing to its development. The following guidelines should guide you in contributing to this project:

1. Fork the repository.
2. Create your feature branch: git checkout -b feat/featureId/my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request describing the feature(s) you have added
6. Include a feature.md readme file with a detailed description of the feature(s) you have added, along with clear instructions of how to use the features(s) you have added. This readme file will be reviewed and included in the original readme if feature is approved.

## Tests
After you have done `npm install`, you can then run the tests.

For server tests, run:
```
> npm test
```
For client tests,
```
> npm run test:client
```
For end to end,
```
> nightwatch
```
## Documentation
The API documentation is available here: https://worklist1.docs.apiary.io

## Note
Ensure your code adheres strictly to the [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript).