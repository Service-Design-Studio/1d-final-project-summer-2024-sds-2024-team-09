# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

## For team members: 
Take note of the following: 
- Jing Kai edit: 
`app` folder holds the code that we want to use now. 

To test the file: 

1) Open app folder

` cd app`

`bin/rails server`

This launches the rails server and the app will be ran. 

2) To edit the UIUX, navigate to `javascript/components. `Under `src` folder, there will be 4 js files. 

- Index.js: The main page that would be launch. Click to either go to CameraPage.js or UserPage.js
- UserPage.js: That should be the first page that the users see on their phones. 
- CameraBroadcastPage.js: Users can monitor what happens at home. 
- CameraPage.js: This page captures all the live footage. 

3) To access the pages: follow the following links
- localhost:3000: Index.js
- localhost:3000/user: User Page
- localhost:3000/camera: Camera page
- localhost:3000/camera_broadcast: CameraBroadcast page

4) handling routing:
In order to ensure that the pages are all displayed properly in a rails app, these 4 files must be defined properly: 
- `app/config/routes.rb`: handles all the routes for the Rails applications
- `app/controllers/pages_controller.rb`: handle controller routing. 
- `app/javascript/packs/application.js`: handles routing throughout the front-end, paths must match controllers
- `app/views/pages/xxx.html.erb`: handle all the default templated stuff, what should show up on each html page
## Bless

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
