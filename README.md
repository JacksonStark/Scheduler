# Interview Scheduler

  Interview Scheduler is a web application, built with React, that allows users to book, edit and delete appointments for the days Monday through Friday.

## Setup

Install dependencies with `npm install`.
 * double check PORT 8000 and 8001 is clear.

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory 
(NOT within our current scheduler directory) and follow the README.md instructions to configure and run the API server. 
  * you will need to `npm start` both scheduler-api and scheduler in order for the app to work properly.


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


# Final Product

## An example of a fully booked day. 

!["fully booked day"](https://github.com/JacksonStark/Scheduler/blob/master/docs/fully-booked.jpg?raw=true)

## Hover over an existing appointment to reveal the edit and delete icons.

!["hover state"](https://github.com/JacksonStark/Scheduler/blob/master/docs/hover-interview.jpg?raw=true)

## Editing an interview will display the same form as creating an interview, but will reveal the current values and allow you to change them.

!["edit interview"](https://github.com/JacksonStark/Scheduler/blob/master/docs/edit-interview.jpg?raw=true)

## When deleting an interview, we have a measure in place to confirm that you indeed would like to delete.

!["delete interview"](https://github.com/JacksonStark/Scheduler/blob/master/docs/delete-interview.jpg?raw=true)

For full accessibility, this app is mobile friendly!
------

!["mobile view"](https://github.com/JacksonStark/Scheduler/blob/master/docs/mobile-view.jpg?raw=true)