class Person {
	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	introduce(): string {
		return `Hi, I'm ${this.name} and I am ${this.age} years old.`;
	}
}

class Student extends Person {
	constructor(name: string, age: number) {
		super(name, age);
	}

	introduce(): string {
		return `Hi, I'm ${this.name}, a student, and I am ${this.age} years old.`;
	}

	showStudentData() {
		console.log("name = " + this.name);
		console.log("age = " + this.age);
	}
}

const P1 = new Person("Kashan", 30);
const S1 = new Student("Faizan", 23);

console.log(P1.introduce()); // Output: Hi, I'm Kashan and I am 30 years old.
console.log(S1.introduce()); // Output: Hi, I'm Faizan, a student, and I am 23 years old.
