# Project-B
A site to track and display tournament stats and data

Built with: React.js Node.js Express and MongoDB

featuring: react hooks, Context api, axios, react bootstrap, json web tokens, bcrypt

## Dependencies:
 ### Backend
 express
 mongoose
 dotenv
 cors
 bcrypt
 jsonwebtoken
 
 ### Client
 axios
 bootstrap
 react-router-dom
 react-icons
 react-scripts
 
  ### Current log: https://trello.com/b/xA56zACi/bnw
  6/7/2020: Working backend with register and login routes using JWT and password encryption. working page layout, routing, database connection on frontend
  ![image](https://user-images.githubusercontent.com/50600343/84925642-36da1180-b098-11ea-864b-63ff7fab5df4.png)
  ![image](https://user-images.githubusercontent.com/50600343/84925737-5cffb180-b098-11ea-95f8-9786f74df682.png)

  6/17/2020: Added delete and token validation routes to the user route. Further JWT and user validation. Organized Client side file structure, added login,and register pages and routing. Added a nav unit.
  ![image](https://user-images.githubusercontent.com/50600343/84925861-89b3c900-b098-11ea-8794-8b1c008b6f03.png)
  ![image](https://user-images.githubusercontent.com/50600343/84939972-297b5200-b0ad-11ea-9d70-a973a80080a2.png)
  
  6/19/2020: Added user context to manage logged in users, stored users in state and passed to context.provider, access jwt and logged in user from local storage, made sure password and email cannot be accessed from the dev console.
  
  ![image](https://user-images.githubusercontent.com/50600343/85160732-bac50280-b22c-11ea-821a-25385e3194f1.png)
  
  6/20/2020: Added login and register forms. Stores jwt in local storage, stores user in context, stores user in database. working logout button. 
 
  6/21/2020 am: working on logic to save and display users matches. 
  
  6/21/2020 pm; Woking total match display for all users. logic set up for match display for single users
  ![image](https://user-images.githubusercontent.com/50600343/85241592-4cd63200-b40a-11ea-9eb2-f90179195049.png)
  
  6/25/2020: added login and register ui buttons, handled home page if user isnt logged in, directing them to login. Added all users into context. attempted to add filtering so that it only displays the active users' matches. however, it breaks on reset, will fix tomorrow.
  
  7/08/20 / 7/10/20: Added username to match backend route. Also changed score from string to number in backend. (scores look like: '3-2'). This will allow for more data comparisons compared to just displaying the score.
