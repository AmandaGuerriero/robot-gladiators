var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };

// Game States
// "WIN" - Player robot has defated all enemy robot
//  * Fight all enemy robots
//  * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var fightOrSkip = function(){
    // Ask player to fight or skip
    var promptFight = window.prompt("Do you want to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // If a player does not us a valid input     
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
      }
    // If player choses to skip
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you want to skip?");

        // If yes, leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
            // Remove $2 in Player Money
            playerInfo.money = Math.max(0, playerInfo.money - 2);
            console.log("playerInfo.money", playerInfo.money);
            shop ();
            return true;
        } 
        
        // If no, ask question again by running fight again
        else {
            fight ();
            return false;
        }
    }
}

var fight = function(enemy) {
    console.log(enemy);
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    while (playerInfo.health > 0 && enemy.health > 0)  {
        if (isPlayerTurn) {
            if (fightOrSkip ()) {
                break;
            }
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
                enemy.health = Math.max(0, enemy.health - damage);
            console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. ");

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died! ");
                playerInfo.money = playerInfo.money + 20;
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left. ");
            }
            // Player attacked first
        } else {
            // Update playerInfo.health by subtracting enemy.attack
            // playerHealth = Math.max(0, playerHealth - enemy.attack);
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);            
            console.log(
                enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. ");

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert (playerInfo.name + " has died! ");
                break;
            } else {
                window.alert (playerInfo.name + " still has " + playerInfo.health + " health left. ");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
}

var startGame = function () {
    // Reset Player Health
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Ask to Buy Things
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            debugger;
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            // console.log(enemy.health)
            fight(pickedEnemyObj);
            // If player is still alive and we're not at the last enemy left to fight
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // Ask if user wants to enter store before next round?
                var storeConfirm = window.confirm ("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                shop ();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};

var shop = function () {
    console.log("Entered the Shop");
    // Ask player what they would like to do?
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break; 
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            // Do nothing, end function
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // Call shop() again to force player to pick a valid option
            shop();
            break;
        }
    }


var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    highScore = highScore || 0;
    // if player have more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
  
      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } 
    else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }
  
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
  
    if (playAgainConfirm) {
      startGame();
    } 
    else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
  };

var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
      }
    console.log("Your robot's name is" + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");  
        }
        },
        upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// Start Game when Page Loads
startGame ();
