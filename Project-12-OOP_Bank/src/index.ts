class Account {
	private accountNumber: string;
	protected balance: number;

	constructor(accountNumber: string, initialBalance: number) {
		this.accountNumber = accountNumber;
		this.balance = initialBalance;
	}

	deposit(amount: number) {
		this.balance += amount;
	}

	withdraw(amount: number) {
		if (amount <= this.balance) {
			this.balance -= amount;
		} else {
			console.log("Insufficient funds");
		}
	}

	getAccountInfo(): string {
		return `Account Number: ${this.accountNumber}\nBalance: $${this.balance}`;
	}
}

class SavingsAccount extends Account {
	private interestRate: number;

	constructor(accountNumber: string, initialBalance: number, interestRate: number) {
		super(accountNumber, initialBalance);
		this.interestRate = interestRate;
	}

	calculateInterest(): number {
		return this.balance * (this.interestRate / 100);
	}

	getAccountInfo(): string {
		return super.getAccountInfo() + `\nInterest Rate: ${this.interestRate}%`;
	}
}

class CurrentAccount extends Account {
	private overdraftLimit: number;

	constructor(accountNumber: string, initialBalance: number, overdraftLimit: number) {
		super(accountNumber, initialBalance);
		this.overdraftLimit = overdraftLimit;
	}

	withdraw(amount: number) {
		if (amount <= this.balance + this.overdraftLimit) {
			this.balance -= amount;
		} else {
			console.log("Exceeded overdraft limit");
		}
	}

	getAccountInfo(): string {
		return super.getAccountInfo() + `\nOverdraft Limit: $${this.overdraftLimit}`;
	}
}

// Usage example
const savingsAccount = new SavingsAccount("SA1234", 5000, 2);
savingsAccount.deposit(1000);
savingsAccount.withdraw(300);
console.log(savingsAccount.getAccountInfo());
console.log(`Interest Earned: $${savingsAccount.calculateInterest()}`);

const currentAccount = new CurrentAccount("CA5678", 1000, 2000);
currentAccount.withdraw(1500);
currentAccount.withdraw(3000);
console.log(currentAccount.getAccountInfo());
