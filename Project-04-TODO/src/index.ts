#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

const todos: string[] = [];

async function showTodos() {
	if (todos.length === 0) {
		console.log(chalk.yellow("No todos found."));
		return;
	}

	console.log(chalk.green("---------------------"));
	console.log(chalk.yellow("|   Todo List    |"));
	console.log(chalk.green("---------------------"));

	todos.forEach((todo, index) => {
		console.log(chalk.cyan(`${index + 1}. ${todo}`));
	});
}

async function addTodo() {
	const questions = [
		{
			type: "input",
			name: "newTodo",
			message: "Enter a new todo:",
		},
	];

	const answers = await inquirer.prompt(questions);
	const newTodo: string = answers.newTodo;

	todos.push(newTodo);

	console.log(chalk.green("Todo added successfully!"));
}

async function removeTodo() {
	if (todos.length === 0) {
		console.log(chalk.yellow("No todos found."));
		return;
	}

	const choices = todos.map((todo, index) => ({ name: `${index + 1}. ${todo}`, value: index }));

	const questions = [
		{
			type: "list",
			name: "todoIndex",
			message: "Select a todo to remove:",
			choices: [...choices, new inquirer.Separator(), { name: "Cancel", value: -1 }],
		},
	];

	const answers = await inquirer.prompt(questions);
	const todoIndex: number = answers.todoIndex;

	if (todoIndex === -1) {
		console.log(chalk.yellow("Action cancelled."));
		return;
	}

	todos.splice(todoIndex, 1);
	console.log(chalk.green("Todo removed successfully!"));
}

async function todoApp() {
	const menuChoices = [
		{ name: "Show Todos", value: "showTodos" },
		{ name: "Add Todo", value: "addTodo" },
		{ name: "Remove Todo", value: "removeTodo" },
		{ name: "Exit", value: "exit" },
	];

	while (true) {
		const questions = [
			{
				type: "list",
				name: "action",
				message: "What would you like to do?",
				choices: menuChoices,
			},
		];

		const answers = await inquirer.prompt(questions);

		switch (answers.action) {
			case "showTodos":
				await showTodos();
				break;
			case "addTodo":
				await addTodo();
				break;
			case "removeTodo":
				await removeTodo();
				break;
			case "exit":
				return;
			default:
				console.log(chalk.red("Invalid choice"));
		}
	}
}

todoApp();
