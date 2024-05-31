class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.balance = 0;
    }

    checkBalance() {
        return this.balance;
    }

    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (0 < amount && amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
}

class EWallet {
    constructor() {
        this.users = {};
    }

    createAccount(username, password) {
        if (username in this.users) {
            return false;
        }
        this.users[username] = new User(username, password);
        return true;
    }

    authenticate(username, password) {
        let user = this.users[username];
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}

const wallet = new EWallet();
let currentUser = null;
const appContainer = document.getElementById('app');

function formatCurrency(amount) {
    return `RP. ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function showCreateAccount() {
    appContainer.innerHTML = `
        <h1>Create Account</h1>
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button onclick="createAccount()">Submit</button>
        <button class="back-button" onclick="showMainMenu()">Back</button>
    `;
}

function createAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
        alert('Username and password cannot be blank.');
    } else if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
    } else if (wallet.createAccount(username, password)) {
        alert('Account created successfully!');
        showMainMenu();
    } else {
        alert('Username already exists.');
    }
}

function showLogin() {
    appContainer.innerHTML = `
        <h1>Login</h1>
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <button onclick="login()">Submit</button>
        <button class="back-button" onclick="showMainMenu()">Back</button>
    `;
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    currentUser = wallet.authenticate(username, password);
    if (currentUser) {
        showUserMenu();
    } else {
        alert('Invalid username or password.');
    }
}

function showUserMenu() {
    appContainer.innerHTML = `
        <h1>Welcome, ${currentUser.username}</h1>
        <button onclick="checkBalance()">Check Balance</button>
        <button onclick="showDepositMenu()">Deposit</button>
        <button onclick="showWithdrawMenu()">Withdraw</button>
        <button class="back-button" onclick="logout()">Logout</button>
    `;
}

function checkBalance() {
    alert(`Your balance is: ${formatCurrency(currentUser.checkBalance())}`);
}

function showDepositMenu() {
    appContainer.innerHTML = `
        <h1>Deposit Money</h1>
        <input type="text" id="amount" placeholder="Amount">
        <button onclick="deposit()">Submit</button>
        <button class="back-button" onclick="showUserMenu()">Back</button>
    `;
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (currentUser.deposit(amount)) {
        alert('Deposit successful!');
        showUserMenu();
    } else {
        alert('Invalid amount.');
    }
}

function showWithdrawMenu() {
    appContainer.innerHTML = `
        <h1>Withdraw Money</h1>
        <input type="text" id="amount" placeholder="Amount">
        <button onclick="withdraw()">Submit</button>
        <button class="back-button" onclick="showUserMenu()">Back</button>
    `;
}

function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (currentUser.withdraw(amount)) {
        alert('Withdrawal successful!');
        showUserMenu();
    } else {
        alert('Insufficient balance or invalid amount.');
    }
}

function logout() {
    currentUser = null;
    showMainMenu();
}

function showMainMenu() {
    appContainer.innerHTML = `
        <h1>E-Wallet Application</h1>
        <button onclick="showCreateAccount()">Create Account</button>
        <button onclick="showLogin()">Login</button>
        <button onclick="exitApp()">Exit</button>
    `;
}

function exitApp() {
    window.close();
}

document.addEventListener('DOMContentLoaded', showMainMenu);