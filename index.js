const { Command } = require("commander");
const program = new Command();
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contactsList = await contacts.listContacts();
        console.table(contactsList);
        break;

      case "get":
        const contact = await contacts.getContactById(id);
        console.table(contact);
        break;

      case "add":
        const contactToAdd = await contacts.addContact(name, email, phone);
        console.table(contactToAdd);
        console.log("Contact successfully added");
        break;

      case "remove":
        const remove = await contacts.removeContact(id);
        console.table(remove);
        console.log("Contact successfully removed.");
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error.message);
  }
}

invokeAction(argv);
