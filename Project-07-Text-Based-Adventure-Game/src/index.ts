import inquirer from "inquirer";
import chalk from "chalk";

class Player {
  public static Name: string = "";
  public static HP: number = 0;
  public static maxHP: number = 0;
  public static xp: number = 0;
  public static atk: number = 0;
  public static def: number = 0;
  public static lvl: number = 0;
  public static potion: number = 0;
  public static dam: number = Math.floor(Math.random() * 6) + 1;
  public static heal: number = Math.floor(Math.random() * 6) + 1;
}

class Game {
  static rand = Math.floor(Math.random() * 3) + 1;

  static async room2() {
    console.log(chalk.yellow("You've entered room 2!"));
    console.log("You see something interesting in this room...");
    console.log("available commands: investigate, leave");

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: ["investigate", "leave"],
      },
    ]);

    const input = answers.action;

    if (input === "investigate") {
      const randomEncounter = Math.floor(Math.random() * 2) + 1;
      switch (randomEncounter) {
        case 1:
          await Game.combatskel();
          break;
        case 2:
          await Game.combatzombie();
          break;
      }
    } else if (input === "leave") {
      console.log(chalk.blue("You decided to leave the room."));
      // Continue with the game logic
    }
  }

  static async StartRoom() {
    let input = "";
    console.log(
      chalk.red(
        "The room is dark and gloomy, it reeks of dead corpses and rotten food,"
      )
    );
    console.log(
      chalk.red(
        "You look behind you, the skeleton you recently killed and the damaged map are on the floor"
      )
    );
    console.log(chalk.yellow("the only choice now is to move forward"));
    console.log(chalk.yellow("available commands: forward, heal"));

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: ["forward", "heal"],
      },
    ]);

    input = answers.action;

    if (input === "heal") {
      Player.potion--;
      Player.HP = Player.maxHP;
      console.log(chalk.green(`You are now at max HP, HP=${Player.HP}`));
      await Game.StartRoom();
    } else if (input === "forward") {
      await Game.room2();
    } else {
      console.log(chalk.red("Please Choose A Valid Command"));
      await Game.StartRoom();
    }
  }

  static async combatskel() {
    let skeldam = Math.floor(Math.random() * 3) + 1;
    console.log(chalk.red("You've encountered a skeleton!"));

    while (Player.HP > 0) {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Choose an action:",
          choices: ["attack", "heal"],
        },
      ]);

      const input = answers.action;

      if (input === "attack") {
        const randomDamageSource = Math.random() < 0.5 ? "player" : "skeleton";

        if (randomDamageSource === "player") {
          Player.HP -= skeldam;
          console.log(
            chalk.red(`You've been hit! Your HP is now ${Player.HP}`)
          );
        } else {
          skeldam = skeldam - 1;
          console.log(
            chalk.green(`You hit the skeleton! Skeleton's HP is now ${skeldam}`)
          );
        }
      } else if (input === "heal") {
        if (Player.potion > 0) {
          Player.HP += Player.heal;
          Player.potion--;
          console.log(
            chalk.green(`You've been healed! Your HP is now ${Player.HP}`)
          );
        } else {
          console.log(chalk.yellow("You do not have enough potions."));
        }
      }

      if (Player.HP <= 0) {
        Game.gameover();
      } else if (skeldam <= 0) {
        console.log(chalk.green("You defeated the skeleton!"));
        Player.lvl++;
        console.log(chalk.green("You have reached level " + Player.lvl));
        break;
      }
    }
  }

  static async combatzombie() {
    let zombdam = Math.floor(Math.random() * 3) + 2;
    console.log(chalk.red("You've encountered a zombie!"));

    while (Player.HP > 0) {
      const answers = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Choose an action:",
          choices: ["attack", "heal"],
        },
      ]);

      const input = answers.action;

      if (input === "attack") {
        const randomDamageSource = Math.random() < 0.5 ? "player" : "zombie";

        if (randomDamageSource === "player") {
          Player.HP -= zombdam;
          console.log(
            chalk.red(`You've been hit! Your HP is now ${Player.HP}`)
          );
        } else {
          zombdam = zombdam - 1;
          console.log(
            chalk.green(`You hit the zombie! Zombie's HP is now ${zombdam}`)
          );
        }
      } else if (input === "heal") {
        if (Player.potion > 0) {
          Player.HP += Player.heal;
          Player.potion--;
          console.log(
            chalk.green(`You've been healed! Your HP is now ${Player.HP}`)
          );
        } else {
          console.log(chalk.yellow("You do not have enough potions."));
        }
      }

      if (Player.HP <= 0) {
        Game.gameover();
      } else if (zombdam <= 0) {
        console.log(chalk.green("You defeated the zombie!"));
        Player.lvl++;
        console.log(chalk.green("You have reached level " + Player.lvl));
        break;
      }
    }
  }

  static gameover() {
    console.log(chalk.red(`${Player.Name} Died!`));
    console.log(chalk.red("GAME OVER!"));
    process.exit(0);
  }

  static async main() {
    Player.maxHP = 20;
    Player.potion = 3;

    console.log(chalk.green("---------------------"));
    console.log(chalk.yellow("|   Welcome to Dungeon Maze   |"));
    console.log(chalk.green("---------------------"));
    Player.Name = (
      await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Please Input Your Name:",
      })
    ).name;

    console.log(`${Player.Name} is a brave adventurer`);
    console.log("They were sent on a task to check on one of");
    console.log("the sacred underground shrines of Port Nyanzaru,");
    console.log(
      `but when one of the skeletons knocked off the map ${Player.Name} had,`
    );
    console.log("they had no choice but to try and escape the dungeon");
    console.log("ARE YOU READY BRAVE ADVENTURER");
    Player.HP = Player.maxHP;
    Player.lvl = 1;
    Player.def = 1;
    Player.atk = 1;

    await Game.StartRoom();
  }
}

Game.main();
