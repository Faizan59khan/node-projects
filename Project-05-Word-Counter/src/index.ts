#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

function countWordsAndCharacters(input: string) {
  const words = input.split(/\s+/).filter((word) => word !== "");
  const characters = input.replace(/\s/g, "").length;

  return {
    words: words.length,
    characters: characters,
  };
}

async function main() {
  const questions = [
    {
      type: "input",
      name: "paragraph",
      message: "Enter an English paragraph:",
      validate: (input: string) =>
        input.trim() !== "" ? true : "Please enter a paragraph.",
    },
  ];

  const answers = await inquirer.prompt(questions);
  const userInput = answers.paragraph;

  const result = countWordsAndCharacters(userInput);

  console.log(chalk.green("---------------------"));
  console.log(chalk.yellow("|   Word Counter   |"));
  console.log(chalk.green("---------------------"));

  console.log(`Number of words (excluding whitespaces): ${result.words}`);
  console.log(
    `Number of characters (excluding whitespaces): ${result.characters}`
  );
}

main();
