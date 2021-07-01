# ✖️Math vs Zombies🧟‍♂️

## DETAILED REQUIREMENTS

### SCREEN 1 - Welcome Screen
You must develop a well designed Welcome screen for your game.  

This screen must **display the name of the game;** and provide the following options
- Enter a player name: The player’s name will be displayed on the High Scores page.
- Start the game: Tapping this button starts the game.
- View Rules: Tapping this button displays the game rules. Suggestions include using
a popup box or redirecting the user to a separate Rules page.
- High Scores: Tapping this button directs the user to the High Scores screen.
- Turn audio on/off. If audio is off, no music will be played during the game.

When the user taps the START button, they are directed to the GAME screen.

### SCREEN 2 - Game Screen

This screen represents the “game”.  

When the game starts, a **column of enemies** appears on the left side of the screen.
- Each enemy displays a math multiplication problem.

The **player** appears on the right side of the screen.
- The player displays the correct answer to **one (1)** of the displayed math problems. The
game should randomly choose which answer to display.

At all times, the game must display **five (5)** enemies and **one (1)** player.
- The screenshots shown in this document display 3 enemies. However, your game
must show 5.

At all times, the game must show:
- What level the player is currently on
- How much time is remaining

As noted earlier, each enemy must display a multiplication question.
- Each multiplication question must consist of **two randomly generated numbers.**
- The first number must be between **1-15.**
- The second number must be a value between **1-10.**

### **Gameplay Mechanics**
In each level, enemies move from left to right at random speeds. Some enemies will move
faster; others will move slower.  

To defeat the enemy, the player must use the **UP** and **DOWN** keyboard keys to move to the
row that contains the question that matches the answer shown on the player.  

When the player reaches the row with the correct enemy, the player must press the **SPACE**
keyboard key to defeat the enemy.  

When the enemy is defeated, the player moves to the next level.  

If the player chooses the incorrect answer, the **questions and displayed answer are
regenerated.** The enemies continue to move forward toward the enemy.  

### **New Levels**
At the start of a new level, the game “respawns” enemies with a new set of questions. The
game regenerates one of the correct answers on the player.

### **Enemy Reaches Right Side**
If at any time, an enemy reaches the right side of the screen, the player loses and the game is
over.

### **Game Win/Lose Conditions**
The player wins if they successfully defeats **five (5)** levels within the given time period  

The player loses if:
- Any enemy reaches the right side of the screen without being defeated by the player
- The game timer runs out before the player defeats all 5 levels.  

When the game is over:
- You must display either a YOU WIN or YOU LOSE message.
- Save the player name and the level reached to HIGH SCORES
- Provide user the option to 1) VIEW HIGH SCORES or 2) PLAY AGAIN

### Screen 3 - High Score Screen
This screen displays a list of users who have played the game and the level they reached.  

The HIGH SCORE list shows a total of 5 players (1st place to 5th place). Depending on how
many people have previously played the game, some spots will be empty.  

If the current player ties with any previous player, then the current player occupies the **higher**
position. All other players are “moved down” in the list.  

Example: Assume the current player (“Peter”) reaches level 3. The resulting high score table
looks like this:

| Original High Score Table  | New High Score Table |
| ------------- | ------------- |
| 1. Sam, level 5  | 1. Sam, level 5 |
| 2. Abigail, level 3  | **2. Peter, level 3** |
| 3. Joseph, level 1 | 3. Abigail, level 3 |
| 4. Mark, level 1 | 4. Joseph, level 1 |  

This page must allow the user to return to the WELCOME SCREEN.
##
## Task Lists
- [ ] 1. Project and Assets Setup @MohitSharma(101342267)
  - [x] Create basic project
  - [x] Search game assets(backgrounds, music, sound effects)
  - [ ] Assets editing and correction (resizing, croping, triming)
  - [x] Group assets by levels

- [ ] 2. Implement Welcome Screen @JavteshSinghBhullar(101348129)
  - [ ] Create and implement player name Input
  - [ ] Create and implement main menu buttons (START, VIEW RULES, HIGH SCORES)
  - [ ] Create and implement view rules and high scores popup box
  - [ ] Implement main menu background audio with music on/off button

- [ ] 3. Implement Game Screen @MohitSharma(101342267)
  - [ ] Design game screen
  - [ ] Implement game mechanics
  - [ ] Implement game levels
  - [ ] Implement game win/lose conditions
  - [ ] Add navigation to sign-up and home screens
