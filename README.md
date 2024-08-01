# Digital-Wall
Digital Art wall  - CDM BCCH

## Developers:
### Rio Samson
- LinkedIn: https://ca.linkedin.com/in/riosamson
### Sadaf Ahmadi

Start main application:
- git clone
- cd into ```Digital-Wall``` file
- cd into ```app``` file
- ```npm install```
- ```npm start``` in the app folder
   - This will run the main app
   - Put this in the browser ```http://localhost:3000```
   - Use your wifi IP address for opening it on the phone (dont forget to add the port number 3000)

Start main application:
- cd into ```Digital-Wall``` file
- cd into ```backend``` file
- ```npm install```
- ```npm start```
   - This will run the backend server

Start the baseten server:
- go to the baseten website where your model is, and activate the server 


## Before You start 
## Before you start, you need to do some stuff
### 1) Upload your own AI model to baseten
  - This is so that the backend can actually call an AI when you submit your drawing
  - A detailed explanation on how to deploy your model is given in the tech documentation, section "Baseten"
- Once you upload your baseten AI model, you have to update the endpoint links in the backend folder, file "Server.js"
  - Here, update the fields such as url, headers, Api key, and all the fields needed to satisfy your AI model
  - If you dont want to change too much to get started and want to use the same Models that I used, I have given the "baseten" folder that I deployed. This way you will just have to update the endpoint link and key and not the fields of the model.
### 2) Create Your Firebase database and Firebase storage
- Once you have made these, you need to update the links in the main app to point to this new database location
- In firebase.js, you need to put in your credentials and replace the current one

