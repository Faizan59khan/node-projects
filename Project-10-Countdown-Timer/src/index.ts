#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

function getCurrentDateTime(format: string): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hour = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	switch (format) {
		case "YYYY-MM-DD hh:mm:ss":
			return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
		case "YYYY-MM-DD":
			return `${year}-${month}-${day}`;
		case "DD-MM-YYYY":
			return `${day}-${month}-${year}`;
		default:
			return "Invalid format";
	}
}

function getCurrentTimestamp(): number {
	return Math.floor(Date.now() / 1000);
}

function getDateTimeFromTimestamp(timestamp: number, format: string): string {
	const date = new Date(timestamp * 1000);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const hour = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	switch (format) {
		case "YYYY-MM-DD hh:mm:ss":
			return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
		case "YYYY-MM-DD":
			return `${year}-${month}-${day}`;
		case "DD-MM-YYYY":
			return `${day}-${month}-${year}`;
		default:
			return "Invalid format";
	}
}

// Example usage:
console.log(getCurrentDateTime("YYYY-MM-DD hh:mm:ss"));
console.log(getCurrentDateTime("YYYY-MM-DD"));
console.log(getCurrentDateTime("DD-MM-YYYY"));

const currentTimestamp = getCurrentTimestamp();
console.log(`Current timestamp: ${currentTimestamp}`);

const dateTimeFromTimestamp = getDateTimeFromTimestamp(currentTimestamp, "YYYY-MM-DD hh:mm:ss");
console.log(`Date-time from timestamp: ${dateTimeFromTimestamp}`);

async function showOptions() {
	const options = [
		{
			type: "list",
			name: "action",
			message: "Choose an action:",
			choices: [
				"Get current date-time in YYYY-MM-DD hh:mm:ss format",
				"Get current date in YYYY-MM-DD format",
				"Get current date in DD-MM-YYYY format",
				"Get current timestamp",
				"Get date-time from a given timestamp",
			],
		},
	];

	const { action } = await inquirer.prompt(options);

	switch (action) {
		case "Get current date-time in YYYY-MM-DD hh:mm:ss format":
			console.log(chalk.green(getCurrentDateTime("YYYY-MM-DD hh:mm:ss")));
			break;
		case "Get current date in YYYY-MM-DD format":
			console.log(chalk.green(getCurrentDateTime("YYYY-MM-DD")));
			break;
		case "Get current date in DD-MM-YYYY format":
			console.log(chalk.green(getCurrentDateTime("DD-MM-YYYY")));
			break;
		case "Get current timestamp":
			console.log(chalk.green(`Current timestamp: ${getCurrentTimestamp()}`));
			break;
		case "Get date-time from a given timestamp":
			const timestampInput = await inquirer.prompt([
				{
					type: "input",
					name: "timestamp",
					message: "Enter a timestamp:",
					validate: (input) => /^\d+$/.test(input) || "Please enter a valid timestamp (numeric)",
				},
			]);
			const timestamp = parseInt(timestampInput.timestamp, 10);
			console.log(
				chalk.green(
					`Date-time from timestamp: ${getDateTimeFromTimestamp(timestamp, "YYYY-MM-DD hh:mm:ss")}`
				)
			);
			break;
		default:
			console.log(chalk.red("Invalid action"));
			break;
	}
}

showOptions();
