const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
} else if (process.argv.length === 4) {
  console.log(
    "Please provide the password, newName, or newNumber as an argument: node mongo.js <password> <newName> <newNumber>"
  );
  process.exit(1);
}

const password = process.argv[2];
const newName = process.argv[3];
const newNumber = process.argv[4];

const url = `mongodb+srv://${process.env.DB_USER}:${password}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((_result) => {
    console.log("Connected to MongoDB");
  })
  .then(() => {
    if (process.argv.length === 5) {
      const newPerson = new Person({
        name: newName,
        number: newNumber,
      });

      return newPerson.save();
    } else if (process.argv.length === 3) {
      console.log("-----");
      console.log("phonebook");
      Person.find({}).then((allPersons) => {
        allPersons.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
      });
    }
  })
  .then(() => {
    if (process.argv.length === 5) {
      console.log(`added ${newName} number ${newNumber} to phonebook`);
      mongoose.connection.close();
    }
  })
  .catch((error) => console.log(error));
