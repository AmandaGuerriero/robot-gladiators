var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };

// Game States
// "WIN" - Player robot has defated all enemy robot
//  * Fight all enemy robots
//  * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var fight = function(enemyName) {
    while(enemyHealth > 0 && playerMoney > 0) {
        // Ask player to fight or skip
        var promptFight = window.prompt("Do you want to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        // If player choses to skip
        if (promptFight === "SKIP" || promptFight === "skip") {
            var confirmSkip = window.confirm("Are you sure you want to skip?");

            // If yes, leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip the fight. Goodbye!");
                // Remove $2 in Player Money
                playerMoney = Math.max(0, playerMoney - 2);
                console.log("playerMoney", playerMoney)
                shop ()
                break;
            } 
             
            // If no, ask question again by running fight again
             else {
                fight ();
            }
        }
        // If player chooses to fight
        if (promptFight === "FIGHT" || promptFight === "fight") {
            // Update enemyHealth by subtracting playerAttack
            var damage = randomNumber(playerAttack - 3, playerAttack);
                enemyHealth = Math.max(0, enemyHealth - damage);
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. ");

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died! ");
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left. ");
            }

            // Update playerHealth by subtracting enemyAttack
            // playerHealth = Math.max(0, playerHealth - enemyAttack);
            var damage = randomNumber(enemyAttack - 3, enemyAttack);
                playerHealth = Math.max(0, playerHealth - damage);            
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. ");

            // check player's health
            if (playerHealth <= 0) {
                window.alert (playerName + " has died! ");
                break;
            } else {
                window.alert (playerName + " still has " + playerHealth + " health left. ");
            }
        }
        
        // If player types something invalid
        else {
            window.alert("You need to pick a valid option. Try again!");
            fight ();
        }
    }
}

var startGame = function () {
    // Reset Player Health
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // Ask to Buy Things
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40, 60);
            console.log(enemyHealth)
            fight(pickedEnemyName);
            // If player is still alive and we're not at the last enemy left to fight
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
            if (playerMoney >= 7) {
            window.alert ("Refilling player's health by 20 for 7 dollars.");
            // Increase Health and Decrease Money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            } else {
                window.alert ("You don't have enough money!");
            }
            break; 
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
               // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
              }
              else {
                window.alert("You don't have enough money!");
              }
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
    if (playerHealth > 0) {
        window.alert ("Great job, you've survived the game! You now have a score of " + playerHealth + ".");
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
// Start Game when Page Loads
startGame ();
