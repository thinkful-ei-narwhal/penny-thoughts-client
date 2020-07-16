## Application
Penny Thoughts

## Links
live site: https://penny-thoughts.vercel.app/<br />
server: https://mighty-peak-21411.herokuapp.com/

## Using The API
Currently the API supports GET and POST endpoints.

- Unprotected Endpoints<br />
  + Sign Up: POST (https://url/api/api/users)<br />
  + Get 10 Random Messages: GET (https://url/api/api/messages)<br />

- Protected Endpoints<br />
  + Login: POST (https://url/api/auth/login)<br />
  + Edit Account Information: PATCH (https://url/api/users)<br />
  + Delete Account: DELETE (https://url/api/users)<br />
  + Submit a Message: POST (https://url/api/api/messages)
  + Get User's Submitted Messages: GET (https://url/api/messages/userData/:page)<br />
  + Edit User's Submitted Messages: PATCH (https://url/api/auth/messages/userData)<br />
  + Delete User's Submitted Messages: DELETE (https://url/api/auth/messages/userData)<br />
  + Report Messages: PATCH (https://url/api/auth/messages/report)<br />

- Admin Endpoints<br />
  + Get Reported Messages: GET (https://url/api/messages/flagged)<br />
  + Archive Reported Message: PATCH (https://url/api/messages/archive)<br />
  + Un-flag Reported Message: PATCH (https://url/api/messages/flagged)<br />

## Screen Shots
![Landing/LogIn](images/LandingLoginPage.png)<br />
![Registration](images/RegistrationPage.png)<br />
![Dashboard](images/Dashboard.png)<br />
![Settings](images/SettingsPage.png)<br />
![Admin](images/AdminPage.png)<br />

### Summary
This app helps users implement the spaced repetition technique to help users learn ten preloaded French words.
New Users can create an account. Returning users can log in and begin practicing with instant feedback and
reinforcement.

## Technologies
- Font End
  * React
- Back End
  * Node.js
  * Postgresql
  * TensorFlow
- Testing
  * Mocha, Chai
  * Jest
