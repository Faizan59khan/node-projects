#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

interface UserData {
  userId: number;
  pin: number;
  balance: string;
}

const users: UserData[] = [
  { userId: 1111, pin: 2222, balance: "500" },
  { userId: 3333, pin: 4444, balance: "1000" },
  { userId: 5555, pin: 6666, balance: "2000" },
  { userId: 7777, pin: 8888, balance: "1500" },
];

async function atm() {
  const questions = [
    {
      type: "input",
      name: "userId",
      message: "Enter Your Id",
    },
    {
      type: "password",
      mask: "*",
      name: "pin",
      message: "Enter Your Pin (4 digits)",
      validate: (input: string) => {
        const isFourDigits = /^\d{4}$/.test(input);
        return isFourDigits ? true : "Please enter exactly 4 digits.";
      },
    },
  ];
  const answers = await inquirer.prompt(questions);

  const user: UserData | undefined = users.find(
    (u) =>
      u.userId === parseInt(answers.userId) && u.pin === parseInt(answers.pin)
  );

  if (user) {
    console.log(chalk.green("Authentication successful!"));

    // Implement ATM Functionalities
    const atmOptions = [
      {
        type: "list",
        name: "action",
        message: "Select an action:",
        choices: ["Check Balance", "Withdraw Money", "Deposit Money", "Exit"],
      },
    ];

    const atmSelection = await inquirer.prompt(atmOptions);

    switch (atmSelection.action) {
      case "Check Balance":
        console.log(`Your balance is $${user.balance}`);
        break;
      case "Withdraw Money":
        // Implement withdrawal logic here
        console.log("Withdraw Money");
        break;
      case "Deposit Money":
        // Implement deposit logic here
        console.log("Deposit Money");
        break;
      case "Exit":
        console.log("Exiting ATM. Goodbye!");
        break;
      default:
        console.log("Invalid action.");
    }
  } else {
    console.log(chalk.red("Authentication failed. Please try again."));
  }
}

atm();
