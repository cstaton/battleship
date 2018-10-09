# Battleship on the Command Line
--

## Getting Started
--
* This is a Javascript implementation without using any 
open source frameworks or libraries.
* In order to get started you must have Node installed on your local machine

1.) Please clone down the repo 

2.) inside the root directory there will be a start.js file.
Please run the following command to begin the game

```node start.js```

3.) This should begin the game and will get you started. If you
have any permission issues it may require a ```chmod +x start.js```

---

##Rules of the game
* Once started, you can either play as two Human players or
you can play against the Robot Computer.
* The game will instruct you on how to set up your ships and to attack your
 opponent.
 * The coordinate inputs which you will supply are going to be deliminated 
 by a dash (see example in game)
* Placing a ship: the game will ask you for the starting coordinate on the board 
and will ask for a direction in which to place the ship

##Ships
* there are three ships by default.

    * Battleship which has 4 spaces 
    * Destroyer which has 3 spaces
    * Submarine which has 2 space
    
* If you would like to configue the default amount of ships
differently, please take a look at the implementation.js under
the services directory and you can either remove/add ships
which are currently hardcoded.

##Attacks
* Once the ships are placed on the board you will
alternate between players to take turns attacking the 
opponents ships.
* The game is finished when all the opponents ships are sunk
    
    
