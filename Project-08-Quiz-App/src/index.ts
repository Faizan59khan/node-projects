#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Question {
  question: string;
  options: string[];
  correctAnswer: number;

  constructor(question: string, options: string[], correctAnswer: number) {
    this.question = question;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  displayQuestion() {
    console.log(chalk.yellow(this.question));
    this.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
  }

  checkAnswer(userAnswer: number): boolean {
    return userAnswer === this.correctAnswer;
  }
}

class Quiz {
  questions: Question[];
  score: number;

  constructor(questions: Question[]) {
    this.questions = questions;
    this.score = 0;
  }
  async startQuiz() {
    const answers = await inquirer.prompt({
      type: "confirm",
      name: "start",
      message: "Welcome to the Quiz! Are you ready to start?",
    });

    if (answers.start) {
      await this.askQuestions();
      this.displayResult();
    } else {
      console.log(chalk.blue("Okay, maybe next time!"));
    }
  }

  async askQuestions() {
    for (let index = 0; index < this.questions.length; index++) {
      const question = this.questions[index];

      console.log(chalk.green(`Question ${index + 1}:`));
      question.displayQuestion();

      const answers = await inquirer.prompt({
        type: "number",
        name: "answer",
        message: "Your answer (enter option number):",
        validate: (value) => {
          if (value >= 1 && value <= question.options.length) {
            return true;
          }
          return "Please enter a valid option number.";
        },
      });

      const userAnswer = answers.answer;
      if (question.checkAnswer(userAnswer)) {
        console.log(chalk.green("Correct!\n"));
        this.score++;
      } else {
        console.log(chalk.red("Incorrect!\n"));
      }
    }
  }

  displayResult() {
    console.log(chalk.yellow("Quiz Ended!"));
    console.log(`Your Score: ${this.score}/${this.questions.length}`);
  }
}

const questions = [
  new Question(
    "What is the capital of France?",
    ["London", "Paris", "Berlin"],
    2
  ),
  new Question("What is 2 + 2?", ["3", "4", "5"], 2),
  new Question(
    "What is the largest mammal?",
    ["Elephant", "Whale", "Giraffe"],
    2
  ),
];

const quiz = new Quiz(questions);
quiz.startQuiz();
