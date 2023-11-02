#!/usr/bin/env node
// import { exchangeRates } from "exchange-rates-api";
import inquirer from "inquirer";
import chalk from "chalk";

const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.96,
  GBP: 0.82,
  JPY: 149,
  PKR: 176,
  INR: 75.0,
  AED: 3.67,
  CAD: 1.3,
  AUD: 1.5,
  CNY: 6.7,
};

async function convertCurrency() {
  const questions = [
    {
      type: "input",
      name: "amount",
      message: "Enter the amount you want to convert:",
      validate: (input: string) =>
        !isNaN(Number(input)) ? true : "Please enter a valid number.",
    },
    {
      type: "input",
      name: "from",
      message: "Enter the currency code you have (e.g., USD):",
      validate: (input: string) =>
        /^[A-Z]{3}$/.test(input)
          ? true
          : "Please enter a 3-character currency code.",
    },
    {
      type: "input",
      name: "to",
      message: "Enter the currency code you want to convert to (e.g., EUR):",
      validate: (input: string) =>
        /^[A-Z]{3}$/.test(input)
          ? true
          : "Please enter a 3-character currency code.",
    },
  ];

  const answers = await inquirer.prompt(questions);

  const fromCurrency = answers.from.toUpperCase();
  const toCurrency = answers.to.toUpperCase();

  if (exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
    const conversionRate =
      exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const convertedAmount = Number(answers.amount) * conversionRate;

    console.log(chalk.green("---------------------"));
    console.log(chalk.yellow("|   Currency Convertor   |"));
    console.log(chalk.green("---------------------"));

    console.log(
      chalk.green(
        `Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`
      )
    );
  } else {
    console.log(
      chalk.red("Invalid currency code(s). Please check and try again.")
    );
  }
}

convertCurrency();

// async function convertCurrencyUsingPackage() {
//   const questions = [
//     {
//       type: "input",
//       name: "amount",
//       message: "Enter the amount you want to convert:",
//       validate: (input: string) =>
//         !isNaN(Number(input)) ? true : "Please enter a valid number.",
//     },
//     {
//       type: "input",
//       name: "from",
//       message: "Enter the currency code you have (e.g., USD):",
//     },
//     {
//       type: "input",
//       name: "to",
//       message: "Enter the currency code you want to convert to (e.g., EUR):",
//     },
//   ];

//   const answers = await inquirer.prompt(questions);

//   const currencyExchangeRates: any = await exchangeRates();
//   const conversionRate =
//     currencyExchangeRates[answers.to] / currencyExchangeRates[answers.from];
//   const convertedAmount = Number(answers.amount) * conversionRate;

//   console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${answers.to}`);
// }

// convertCurrencyUsingPackage();
