#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  static studentCount: number = 0;
  private studentID: string;
  private name: string;
  private courses: string[];
  private balance: number;

  constructor(name: string) {
    Student.studentCount++;
    this.studentID = this.generateStudentID();
    this.name = name;
    this.courses = [];
    this.balance = 0;
  }

  private generateStudentID(): string {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  enrollCourse(course: string): void {
    this.courses.push(course);
  }

  viewBalance(): number {
    return this.balance;
  }

  payTuition(amount: number): void {
    this.balance -= amount;
  }

  showStatus(): void {
    console.log(`Student Name: ${this.name}`);
    console.log(`Student ID: ${this.studentID}`);
    console.log(`Courses Enrolled: ${this.courses.join(", ")}`);
    console.log(`Balance: $${this.balance}`);
  }
}

const students: Student[] = [];

function addStudent(): void {
  inquirer
    .prompt<{ name: string }>([
      {
        type: "input",
        name: "name",
        message: "Enter student name:",
      },
    ])
    .then((answers) => {
      const student = new Student(answers.name);
      console.log(student);
      students.push(student);
      console.log(chalk.green(`Student ${answers.name} added successfully!`));
      showMenu();
    });
}

function enrollStudent(): void {
  inquirer
    .prompt<{ studentID: string; course: string }>([
      {
        type: "input",
        name: "studentID",
        message: "Enter student ID:",
      },
      {
        type: "input",
        name: "course",
        message: "Enter course name:",
      },
    ])
    .then((answers) => {
      const student = students.find(
        (s: any) => s.studentID === answers.studentID
      );
      if (student) {
        student.enrollCourse(answers.course);
        console.log(
          chalk.green(`Student enrolled in ${answers.course} successfully!`)
        );
      } else {
        console.log(chalk.red("Student not found!"));
      }
      showMenu();
    });
}

function viewBalance(): void {
  inquirer
    .prompt<{ studentID: string }>([
      {
        type: "input",
        name: "studentID",
        message: "Enter student ID:",
      },
    ])
    .then((answers) => {
      const student = students.find(
        (s: any) => s.studentID === answers.studentID
      );
      if (student) {
        const balance = student.viewBalance();
        console.log(
          chalk.green(
            `Balance for student ID ${answers.studentID}: $${balance}`
          )
        );
      } else {
        console.log(chalk.red("Student not found!"));
      }
      showMenu();
    });
}

function payTuition(): void {
  inquirer
    .prompt<{ studentID: string; amount: number }>([
      {
        type: "input",
        name: "studentID",
        message: "Enter student ID:",
      },
      {
        type: "input",
        name: "amount",
        message: "Enter amount to pay:",
        validate: (input) =>
          !isNaN(Number(input)) ? true : "Please enter a valid number.",
      },
    ])
    .then((answers) => {
      const student = students.find(
        (s: any) => s.studentID === answers.studentID
      );
      if (student) {
        const amount = parseInt(answers.amount.toString(), 10);
        student.payTuition(amount);
        console.log(
          chalk.green(
            `Tuition fees of $${amount} paid for student ID ${answers.studentID}.`
          )
        );
      } else {
        console.log(chalk.red("Student not found!"));
      }
      showMenu();
    });
}

function showStatus(): void {
  inquirer
    .prompt<{ studentID: string }>([
      {
        type: "input",
        name: "studentID",
        message: "Enter student ID:",
      },
    ])
    .then((answers) => {
      const student = students.find(
        (s: any) => s.studentID === answers.studentID
      );
      if (student) {
        student.showStatus();
      } else {
        console.log(chalk.red("Student not found!"));
      }
      showMenu();
    });
}

function showMenu(): void {
  inquirer
    .prompt<{ option: string }>([
      {
        type: "list",
        name: "option",
        message: "Select an option:",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Balance",
          "Pay Tuition",
          "Show Status",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.option) {
        case "Add Student":
          addStudent();
          break;
        case "Enroll Student":
          enrollStudent();
          break;
        case "View Balance":
          viewBalance();
          break;
        case "Pay Tuition":
          payTuition();
          break;
        case "Show Status":
          showStatus();
          break;
        case "Exit":
          console.log("Exiting...");
          break;
      }
    });
}

showMenu();
