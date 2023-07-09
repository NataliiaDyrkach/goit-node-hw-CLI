const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  // Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async (name, email, phone) => {
  // Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const removeContact = async (contactId) => {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const removeContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
