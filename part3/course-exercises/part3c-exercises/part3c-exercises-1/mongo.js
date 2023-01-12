const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(`
    Please provide the password, input name, and input number as arguments if adding entry to database:
      "node mongo.js <password> <input name> <input number>"
    
    Please provide only the password as argument if only displaying entries to database:
      "node mongo.js <password>"
  `);
  process.exit(1);
}

const password = process.argv[2];
const inputName = process.argv[3];
const inputNumber = process.argv[4];

const url = `mongodb+srv://khl-fullstack:${password}@cluster0.uvpnaji.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("DB connected.");

      const person = new Person({
        name: inputName,
        number: inputNumber,
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${inputName} number ${inputNumber} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  mongoose
    .connect(url)
    .then(
      Person.find({}).then((result) => {
        console.log("phonebook:");
        result.forEach((person) => {
          console.log(`${person?.name} ${person?.number}`);
        });
        mongoose.connection.close();
      })
    )
    .catch((error) => {
      console.log(error);
    });
}
