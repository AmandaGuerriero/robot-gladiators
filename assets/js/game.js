var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyName, enemyAttack, enemyHealth);

var fight = function() {
    // Alert users that they are starting the round
    window.alert("Welcome to Robot Gladiators");
    
    // Update enemyHealth by subtracting playerAttack
    enemyHealth = enemyHealth - playerAttack;

    // Log enemyHealth
    console.log(
        playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining. "
    );

    // Update playerHealth by subtracting enemyAttack
    playerHealth = playerHealth - enemyAttack

    // Log playerHealth
    console.log(
        enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining. "
    );

};

fight ();