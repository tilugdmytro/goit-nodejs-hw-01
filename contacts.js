const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");
console.log(contactsPath);

async function getContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}

async function listContacts() {
  try {
    const contacts = await getContacts();
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts();
    const result = contacts.find((contact) => contact.id === `${contactId}`);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === `${contactId}`
    );
    if (contactIndex === -1) {
      return null;
    }
    const remove = contacts.splice(contactIndex, 1);
    updateContacts(contacts);
    return remove;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { name, email, phone, id: v4() };
    const contacts = await getContacts();
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
