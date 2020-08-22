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
    while (playerInfo.health > 0 && enemy.health > 0)  {
        if (fightOrSkip ()) {
            break;
        }
        else {
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
                enemy.health = Math.max(0, enemy.health - damage);
            console.log(
                playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. ");
        }
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died! ");
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left. ");
            }

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
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    switch (shopOptionPrompt) {
        case "refill": // new case
        case "REFILL":
            playerInfo.refillHealth();
            break; 
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
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


var endGame = function () {
    // If player is alive, player wins! 
    if (playerInfo.health > 0) {
        window.alert ("Great job, you've survived the game! You now have a score of " + playerInfo.health + ".");
    } else {
        window.alert ("You've lost your robot in battle");
    }
    // Ask player if they want to play again
    var playAgainConfirm = window.confirm ("Do you want to play again?")
        if (playAgainConfirm) {
            // Restart Game
            startGame ()
        }
        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!")
        }
    }

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
