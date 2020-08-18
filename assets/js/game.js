var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney =10;
console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;
console.log(enemyName, enemyAttack, enemyHealth);

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
console.log(enemyNames);
console.log(enemyNames [0]);
console.log(enemyNames [1]);
console.log(enemyNames [2]);
console.log(enemyNames.length);
for(var i = 0; i < 3; i++) {
    console.log("apple");
}

// Game States
// "WIN" - Player robot has defated all enemy robot
//  * Fight all enemy robots
//  * Defeat each enemy robo
// "LOSE" - Player robot's health is zero or less



var fight = function() {
    // Alert users that they are starting the round
    window.alert("Welcome to Robot Gladiators");
    // Ask player to fight or skip
    var promptFight = window.prompt("Do you want to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);

    // Check the player's response
    if (promptFight === "FIGHT" || promptFight === "fight") {
        // Update enemyHealth by subtracting playerAttack
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyNames + ". " + enemyNames + " now has " + enemyHealth + " health remaining. ");

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyNames + " has died! ");
        } else {
            window.alert(enemyNames + " still has " + enemyHealth + " health left. ");
        }

        // Update playerHealth by subtracting enemyAttack
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyNames + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. ");

        // check player's health
        if (playerHealth <= 0) {
            window.alert (playerName + " has died! ");
        } else {
            window.alert (playerName + " still has " + playerHealth + " health left. ");
        }
    }

    // If player choses to skip
    else if (promptFight === "SKIP" || promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you want to skip?");

        // If yes, leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip the fight. Goodbye!");
            // Remove $2 in Player Money
            playerMoney = playerMoney - 2;
            console.log(playerMoney)
        } 
        // If no, ask question again by running fight again
        else {
            fight ();
        }
        
    } else {
        window.alert("You need to pick a valid option. Try again!");
        fight ();
    }
}
// fight();
