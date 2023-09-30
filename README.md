# **CS 260 Startup**

## Specification

### Elevator Pitch and Key Features
  People love games. Games offer a break from the busy, complicated world around them, and the success of Scrabble and Boggle shows that word games are especially popular. Today, the web is an ideal platform for such games. Take Wordle, for example. Wordle is a popular game by the *New York Times* that draws thousands of players daily. This provides an opportunity for advertising and continuing positive public perception.
  
  I am interested in developing something similar. Like Wordle, my game will feature the opportunity for players to take a few minutes of their day to enjoy solving a puzzle with words. It will also allow players to keep track of their success and high scores.

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
- **Pages** - I built four HTML pages: _Home_, _Play_, _Stats_, and _About_. 
- **Links** - There is a menu at the top of each page that allows for navigation between pages.
- **Text** - The textual content is composed mostly of headers and labels right now. I intend to expand the _About_ section with instructions, but I am still testing what works best. 
- **Service Calls** - _Play_ shows a connection to a dictionary API for reference.
- **Images** - I added placeholders for a logo that I am still working on. I also added an icon for the user. I don't think I will use any other images.
- **Login** - _Home_ includes a login section displaying textboxes for both username and password.
- **Database** - _Stats_ includes tables representing data that will be stored in and pulled from the database.
- **WebSocket** - _Play_ shows real-time data entered by the user.

  
