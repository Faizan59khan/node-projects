#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

async function calculator() {
  const questions = [
    {
      type: "input",
      name: "num1",
      message: "Enter the first number:",
      validate: (input: string) =>
        !isNaN(parseFloat(input)) || "Please enter a valid number",
    },
    {
      type: "input",
      name: "operator",
      message: "Enter an operator (+, -, *, /):",
      validate: (input: string) =>
        ["+", "-", "*", "/"].includes(input) ||
        "Please enter a valid operator (+, -, *, /)",
    },
    {
      type: "input",
      name: "num2",
      message: "Enter the second number:",
      validate: (input: string) =>
        !isNaN(parseFloat(input)) || "Please enter a valid number",
    },
  ];

  const answers = await inquirer.prompt(questions);

  const num1 = parseFloat(answers.num1);
  const num2 = parseFloat(answers.num2);
  const operator = answers.operator;

  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        console.log(chalk.red("Error: Division by zero"));
        return;
      }
      result = num1 / num2;
      break;
    default:
      console.log(chalk.red("Error: Invalid operator"));
      return;
  }

  console.log(chalk.green("---------------------"));
  console.log(chalk.yellow("|   Calculator   |"));
  console.log(chalk.green("---------------------"));
  console.log(chalk.cyan(`  ${num1} ${operator} ${num2} = ${result}`));
}

calculator();
