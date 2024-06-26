const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts.toString());
  } catch (error) {
    throw new Error("Error reading file...");
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === id);
    if (contact) {
      return contact;
    }
    throw new Error(`The id ${id} does't exist..`);
  } catch (error) {
    throw new Error("Error trying read contact by ID...");
  }
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      throw new Error(`The id ${id} does't exist..`);
    }
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removedContact;
  } catch (error) {
    throw new Error("Error trying remove contact ");
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    throw new Error("Error triying create contact");
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
