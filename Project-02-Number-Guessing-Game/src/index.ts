#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

const minNumber = 1;
const maxNumber = 100;
const maxAttempts = 5;

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printBanner() {
  console.log(
    chalk.blue(
      figlet.textSync("Number Guessing Game", { horizontalLayout: "full" })
    )
  );
}

function playGame() {
  printBanner();

  const secretNumber = generateRandomNumber(minNumber, maxNumber);
  let attempts = 0;

  function guessNumber() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "guess",
          message: `Guess the number between ${minNumber} and ${maxNumber}:`,
          validate: (input) => {
            const parsedInput = parseInt(input);
            if (
              isNaN(parsedInput) ||
              parsedInput < minNumber ||
              parsedInput > maxNumber
            ) {
              return `Please enter a valid number between ${minNumber} and ${maxNumber}.`;
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        const userGuess = parseInt(answers.guess);
        attempts++;

        if (userGuess === secretNumber) {
          console.log(
            chalk.green(
              `Congratulations! You guessed the number in ${attempts} attempts.`
            )
          );
          playAgain();
        } else if (attempts >= maxAttempts) {
          console.log(
            chalk.red(
              `Sorry, you've used all your attempts. The number was ${secretNumber}.`
            )
          );
          playAgain();
        } else if (userGuess < secretNumber) {
          console.log(chalk.yellow("Too low. Try again."));
          guessNumber();
        } else {
          console.log(chalk.yellow("Too high. Try again."));
          guessNumber();
        }
      });
  }

  guessNumber();
}

function playAgain() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "again",
        message: "Do you want to play again?",
      },
    ])
    .then((answers) => {
      if (answers.again) {
        playGame();
      } else {
        console.log(chalk.blue("Thanks for playing!"));
      }
    });
}

playGame();
