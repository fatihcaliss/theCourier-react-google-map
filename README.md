# Hide the Flaws App

Hide the Flaws App is a React application designed to Vigo applicant task.

![Task App Demo](public/assets/task-app-gif.gif)

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Dependencies](#dependencies)
- [Notes](#notes)

## Installation

`npm install `

`npm run start `

`http://localhost:3000/`

## Features

- After 3 query, healthcheck query check the service health. If service doesn't work, user see a toastify message about services status info.
- User can select a region on dropdown menu.
- After selected region user can see the region polygon on map.
- After selected region user can see the rpute polyline on map.
- Two marker animate on the route for every 1 sec.
- User can refresh page and see same data.

## Dependencies

- @googlemaps/polyline-codec - For working with Google Maps Polylines.
- @react-google-maps/api - React wrapper for Google Maps JavaScript API.
- @tanstack/react-query - For managing API data fetching and state.
- axios - HTTP client for making API requests.
- react-toastify - For displaying toast notifications.
- tailwindcss - CSS framework for styling the app.

## Notes !!

- I disabled origin policy chrome for get the data otherwise my requests failed from backend cors policy failure. I use this command:
  `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security `
