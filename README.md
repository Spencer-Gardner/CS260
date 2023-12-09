# **CS 260 Startup**

## Specification

### Elevator Pitch and Key Features
  People love games. Games offer a break from the busy, complicated world around them, and the success of Scrabble and Boggle shows that word games are especially popular. Today, the web is an ideal platform for such games. Take Wordle, for example. Wordle is a popular game by the *New York Times* that draws thousands of players daily. This provides an opportunity for advertising and continuing positive public perception.
\  I am interested in developing something similar. Like Wordle, my game will feature the opportunity for players to take a few minutes of their day to enjoy solving a puzzle with words. It will also allow players to keep track of their success and high scores.

### Technologies
#### Authentication
  When first accessing the game, users will be required to create an account with a username and password. This information will then be used to authenticate the user when required to sign in again.
#### Database
  A database will be used to store account information. This will include usernames, passwords, and high scores. 
#### WebSocket
  The server will receive real-time data from two sources: the user and a dictionary API. As part of the game, the user will enter words for scoring. The API will then be used to reference these words received as input and communicate their validity to the server.

### Sketches
![Home](https://github.com/Spencer-Gardner/CS_260/assets/120418845/18f9f269-fd16-4b34-bb2d-4782118a2cfb)
![Play](https://github.com/Spencer-Gardner/CS_260/assets/120418845/eaac79c1-e788-46b5-a9e1-e6710e97d10b)
![Score](https://github.com/Spencer-Gardner/CS_260/assets/120418845/801e5261-3ecb-4195-b526-56607f964d1a)

## HTML
For this deliverable, I developed the basic structure of my application using HTML.
- **Pages** - I built four HTML pages: Home, Play, Stats, and About. 
- **Links** - There is a menu at the top of each page that allows for navigation between pages.
- **Text** - The textual content is composed mostly of headers and labels right now. I intend to expand the About section with instructions, but I am still testing what works best. 
- **Service Calls** - Play shows a connection to a dictionary API for reference.
- **Images** - I added placeholders for a logo that I am still working on. I also added an icon for the user. I don't think I will use any other images.
- **Login** - Home includes a login section displaying textboxes for both username and password.
- **Database** - Stats includes tables representing data that will be stored in and pulled from the database.
- **WebSocket** - Play shows real-time data entered by the user.

## CSS
For this deliverable, I formatted and styled my application.
- I updated the style and format of the header, footer, and main content body.
- I updated the style and format of the navigation elements.
- For the most part, the application is responsive to resizing. However, there are a few quirks on the extremes that I am still trying to sort out.
- I opted for a minimalist style. I used a simple black-and-white theme for all the content. I feel like, for the most part, things are styled well. I am still working out a few minor preferences. Since I don't know much about JavaScript yet, elements may need to change.
- I only used a single font. Most of the textual content will be in the About section. I havn't added it in yet, but I'm almost done writing everything.
- I updated a few of the icons, but I still need to add the official logo.

## JavaScript
For this deliverable, I implemented JavaScript so that the application now functions. I also added placeholders for future technology.
- **Login** - The enter button on the home page redirects the user to the play page, and the user's name is stored in local storage.
- **Database** - The stats page displays the user's name as well as any stats stored in local storage. Information will be stored/accessed through a database in the future.
- **WebSocket** - The game is now functional with access to a dictionary API. When a guess is entered by the user, a request is sent to the API to verify the word.
- **Application Logic** - The keyboard allows the user to interact with the game. The display keeps track of letters, time, and score. I may adjust some rules later, but it is funtional overall.

## Service
For this deliverable, I added endpoints to the backend for getting and posting user stats.
- **Node.js/Express HTTP** - I added an index.js file to create an HTTP service using Node.js and Express.
- **Static Middleware** - index.js includes the use of Express static middleware.
- **Third-Party Endpoints** - play.js makes a call to a dictionary API when a word is entered.
- **Backend Endpoints** - index.js defines endpoints for getting and posting stats.
- **Frontend Endpoints** - Both play.js and stats.js make calls using fetch to the endpoints provided in index.js.

## Database
For this deliverable, I connected my application to a database.
- **MongoDB Atlas** - I created a database using MongoDB Atlas.
- **Endpoints** - The server endpoints are now connected to MongoDB for data processing.
- **Data Storage** - Game statistics are now stored in MongoDB.

## Login
For this deliverable, I added support for user authentication. 
- **Registration** - New users may register under a unique username and password.
- **Authentication** - By logging in, existing users are authenticated and connected to their data.
- **Credentials** - MongoDB is used to store and retrieve user credentials.
- **Restrictions** - Users must enter their credentials in order to play.

## WebSocket
For this deliverable, I updated my application to include a simple use of WebSocket. 
- **Backend** - I created a peerProxy.js file and connected it to my backend files.
- **Frontend** - The JavaScript file for the home page includes code on the frontend that establishes a WebSocket connection.
- **Data** - Player usernames are sent over WebSocket.
- **Interface** - When another player logs in, a notification is displayed on the home page.
