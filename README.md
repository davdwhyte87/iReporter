# iReporter

[![Build Status](https://travis-ci.org/davdwhyte87/iReporter.svg?branch=api_get_records)](https://travis-ci.org/davdwhyte87/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/davdwhyte87/iReporter/badge.svg?branch=api_get_records&service=github)](https://coveralls.io/github/davdwhyte87/iReporter?branch=api_get_records&service=github)
[![Maintainability](https://api.codeclimate.com/v1/badges/6d3c17678ddc23f0d8eb/maintainability)](https://codeclimate.com/github/davdwhyte87/iReporter/maintainability)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

iReporter enables users  to bring any form of corruption to the notice of appropriate authorities and the general public


## Table of Contents

* [Project Overview](#Project-Overview)
* [Features](#Features)
* [Built with](#built-with)
* [Known Issues](#Known-issues)
* [Installation](#Installation)
* [Contributing](#Contributing)
* [Api Endpoints](#Api-Endpoints)


## Project Overview
**iReporter** iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention. it was built from scratch using `Html` , `Css` , `JavaScript` and `Node.js`

## Features

- Users can create an account and log in.
- Users can create a red-flag record (An incident linked to corruption).
- Users can create intervention record (a call for a government agency to intervene e.g
repair bad road sections, collapsed bridges, flooding e.t.c).
- Users can edit their red-flag or intervention records.
- Users can delete their red-flag or intervention records.
- Users can add geolocation (Lat Long Coordinates) to their red-flag or intervention
records.
- Users can change the geolocation (Lat Long Coordinates) attached to their red-flag or
intervention records.
- Admin can change the status of a record to either under investigation, rejected (in the
event of a false claim) or resolved (in the event that the claim has been investigated and
resolved).


## Built with
- `HTML 5`
- `CSS`
- `JavaScript`
- `Node.js`
- `Express framework`

## UI link (Gh-pages): 
 `https://davdwhyte87.github.io/iReporter/UI/`

 ## Pivotal Tracker board
 `https://www.pivotaltracker.com/n/projects/2226785`

## Api Endpoints
- `GET /api/v1/red-flags` - Fetches all the red-flag records
- `GET /api/v1/interventions` - Fetches all the intervention records
- `GET /api/v1/red-flags/:id` - Fetches a single record
- `GET /api/v1/interventions/:id` - Fetches a single record
- `POST /api/v1/red-flags` - Creates a red-flag record
- `POST /api/v1/interventions` - Creates an intervention record
- `PATCH /api/v1/red-flags/:id/location` - Edits a red-flag record location
- `PATCH /api/v1/red-flags/:id/status` - Edits a red-flag record status
- `PATCH /api/v1/red-flags/:id/comment` - Edits a red-flag record location
- `PATCH /api/v1/interventions/:id/location` - Edits an intervention record location
- `PATCH /api/v1/interventions/:id/status` - Edits an intervention record status
- `PATCH /api/v1/interventions/:id/comment` - Edits an intervention record comment
- `DELETE /api/v1/red-flags/:id` - Deletes a red-flag record
- `DELETE /api/v1/interventions/:id` - Deletes an intervention record
- `POST /api/v1/auth/signup` - Signs up a new user
- `POST /api/v1/auth/login` - Logs a user in
- `GET /api/v1/interventions/me` - Fetches all records for an authenticated user
- `PATCH /api/v1/auth/me` - Updates an authenticated users data
 
 ## Known issues
- The views are just built out, they have no functionalities yet


## Installation

- $ git clone 'https://github.com/davdwhyte87/iReporter'
- $ cd iReporter
- $ npm i , to install dependencies
- $ npm start, to start the server
Once the server starts-up, you can query the api at 'http://localhost:3000/api/v1' using the end points stated above.

## Contributing
>  Feel free to 🍴 fork this repository

>  👯 Clone this repository to your local machine using 'https://github.com/davdwhyte87/iReporter'

> Make Contributions

> 🔃 Create a new pull request using 'https://github.com/davdwhyte87/iReporter./compare'


## License
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

- Copyright 2018 © iReporter
