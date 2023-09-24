**CS 260 Startup**


# Specification

## Elevator Pitch and Key Features
  People love games. Games offer a break from the busy, complicated world around them, and the success of Scrabble and Boggle show that word games are especially popular. Today, the web is an ideal platform for such games. Take Worlde, for eaxmple. Wordle is a popular game by the *New York Times* that draws thousands of players daily. This provides an opportunity for advertising and continuing positive public perception. I am interested in developing something similar. Like Wordle, my game will feature the opportunity for players to take a few minustes of their day to enjoy solving a puzzle with words. It will also allow players to keep track of their success and high scores.

## Technologies
### Authentication
  When first accessing the game, users will be required to create an account with a username and password. This information will then be used to authenticate the user when required to sign in again.
### Database
  A database will be used to store account information. This will include usernames, passwords, and highscores. 
### Websocket
  The server will receive realtime data from two sources: the user and a dictionary API. As part of the game, the user will enter words for scoring. The API will then be used to reference these words recieved as input and communicate their validity to the server.

## Sketches

<img width="197" alt="image" src="https://github.com/Spencer-Gardner/CS_260/assets/120418845/0ebf8c54-dcf3-4a57-9324-859c50f6397e">




