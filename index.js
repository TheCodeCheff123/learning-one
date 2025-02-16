// Telephone class implementing the Observer pattern
class Telephone {
    constructor() {
        this.phoneNumbers = new Set(); // Store phone numbers
        this.observers = new Set(); // Store observers
    }

    // Method to add a phone number
    AddPhoneNumber(number) {
        this.phoneNumbers.add(number);
    }

    // Method to remove a phone number
    RemovePhoneNumber(number) {
        this.phoneNumbers.delete(number);
    }

    // Method to dial a phone number (only if it's added)
    DialPhoneNumber(number) {
        if (this.phoneNumbers.has(number)) {
            this.notifyObservers(number);
        } else {
            console.log(`Cannot dial ${number}. Number not found.`);
        }
    }

    // Observer management methods
    addObserver(observer) {
        this.observers.add(observer);
    }

    removeObserver(observer) {
        this.observers.delete(observer);
    }

    notifyObservers(number) {
        this.observers.forEach(observer => observer.update(number));
    }
}

// First Observer: Logs the phone number
class PrintNumberObserver {
    update(number) {
        console.log(`Dialing: ${number}`);
    }
}

// Second Observer: Logs "Now Dialling {number}"
class NowDialingObserver {
    update(number) {
        console.log(`Now Dialling ${number}`);
    }
}

// Example usage
const telephone = new Telephone();
const printObserver = new PrintNumberObserver();
const nowDialingObserver = new NowDialingObserver();

// Adding observers
telephone.addObserver(printObserver);
telephone.addObserver(nowDialingObserver);

// Adding and dialing numbers
telephone.AddPhoneNumber("2347023232");
telephone.AddPhoneNumber("1234567890");
telephone.DialPhoneNumber("2347023232"); // Should notify both observers

telephone.RemovePhoneNumber("2347023232");
telephone.DialPhoneNumber("2347023232"); // Should print "Cannot dial" message
