// classes are syntax sugar over prototypes, plus a few real additions (private fields, static blocks)

class Account {
  static #count = 0 // private static field
  #balance = 0 // private instance field, not reachable from outside

  constructor(owner) {
    this.owner = owner
    Account.#count++
  }

  get balance() { return this.#balance } // getter
  set balance(_) { throw new Error('use deposit/withdraw') } // setter guard

  deposit(amount) {
    if (amount <= 0) throw new Error('amount must be positive')
    this.#balance += amount
    return this
  }

  static get count() { return Account.#count }
}

const acc = new Account('ibrahim').deposit(100).deposit(50)
console.log(acc.balance) // 150
console.log(Account.count) // 1
try { acc.balance = 1 } catch (e) { console.log(e.message) } // use deposit/withdraw
console.log(Object.keys(acc)) // [ 'owner' ] -> private fields are invisible

// inheritance with extends / super
class Savings extends Account {
  constructor(owner, rate) {
    super(owner) // must call super before using this
    this.rate = rate
  }
  addInterest() { return this.deposit(this.balance * this.rate) }
}

const s = new Savings('sara', 0.1).deposit(200).addInterest()
console.log(s.balance) // 220
console.log(s instanceof Account, typeof Savings) // true function
