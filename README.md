# Meantest
> This project is created during the MEAN course taken on Udemy.

## What is it?
- Simple blog style website with authentication on both client-server side.
- User can signup and create their account.
- Each User can upload and edit their own post and not others.

## MEAN stack
- **M**ongoDB : Back-end (NoSQL)
- **E**xpress : Node Route handler
- **A**ngular : Front-end
- **N**ode : Server 

Styling         | Authentication| Upload        |
-------------   | ------------- |:-------------:| 
Angular Material| JWT           | Multer        |  
## Others Implementation
#### Angular
  - HTTP Interceptors
  - Error Interceptors
  - Guards
  - Environment
#### MongoDB: Mongoose
  - find
  - delete
  - update
#### Express
  - custom middleware
    - check authentication and pass user credentials
    - multer upload
  - serving static files
    - images
    - angular production html file
    
## Installing
1. Use `npm install` after cloning
2. Use `ng serve`
  - This will create a dev server on port 4200 `http://localhost:4200`
3. Use `npm run server:start`
  - This will creat run node server for API request from web app 
  
## Online Server
https://mean-udemy.herokuapp.com/

