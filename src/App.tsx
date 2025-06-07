import { useEffect, useState } from "react";
import Form from "./components/Form";
import type { Contact, NewContact } from "./interfaces/contacts";
import CardFront from "./components/CardFront";
import CardBack from "./components/CardBack";
import Alert from "./components/Alert";

const mockData = [
  { "id": "1", "name": "Alice Johnson", "city": "New York" },
  { "id": "2", "name": "Bob Smith", "city": "Los Angeles" },
  { "id": "3", "name": "Charlie Brown", "city": "Chicago" },
  { "id": "4", "name": "David Williams", "city": "Houston" },
  { "id": "5", "name": "Emma Davis", "city": "Phoenix" },
  { "id": "6", "name": "Frank Miller", "city": "Philadelphia" },
  { "id": "7", "name": "Grace Wilson", "city": "San Antonio" },
  { "id": "8", "name": "Henry Moore", "city": "San Diego" },
  { "id": "9", "name": "Isabella Garcia", "city": "Dallas" },
  { "id": "10", "name": "Jack Martinez", "city": "San Jose" }
];

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(mockData);
  const [newContact, setNewContact] = useState<NewContact>({ name: "", city: ""});
  const [editedContact, setEditedContact] = useState<NewContact>({ name: "", city: "" });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [edit, setEdit] = useState<string | undefined>(undefined);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  const triggerAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const addContact = () => {
    if (contacts.find(c => c.name === newContact.name)) {
      triggerAlert("Already exists!");
      return
    };

    if (!newContact.name|| !newContact.city) {
      triggerAlert("Contact must have name and city info!");
      return
    };

    const id = crypto.randomUUID();
    setContacts(prev => [
      ...prev, { ...newContact, id }
    ]);
  };

  const editContact = (id: string) => {
    const contactToEdit = contacts.find(c => c.id === id);

    if (contactToEdit) {
      setEditedContact({ name: contactToEdit.name, city: contactToEdit.city });
      setEdit(id);
      setIsEditing(true);
    }
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(
      contact => contact.id !== id
    ));

    setEdit(undefined);
    setIsEditing(false);
  };

  const saveContact = (id: string) => {
    setContacts(prev =>
      prev.map(c =>
        c.id === id ? { ...c, ...editedContact } : c
      )
    );

    setIsEditing(false);
    setEdit(undefined);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEdit(undefined);
    setEditedContact({ name: "", city: "" });
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, [showAlert]); 

  return (
    <div className="p-8">
      { showAlert && <Alert alertMessage={alertMessage} setShowAlert={setShowAlert} /> }
      <div className="pb-8 text-2xl">
        <h1 className="text-2xl">Contact Book</h1>
        <h3 className="text-xl">Keep track of where your friends live</h3>
      </div>
      <Form setNewContact={setNewContact} addContact={addContact} />
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          contacts.length > 0 
            ? contacts.map((c: Contact) => 
              isEditing && c.id === edit 
                ? <CardBack
                    key={c.id} 
                    contact={c} 
                    editedContact={editedContact} 
                    setEditedContact={setEditedContact} 
                    deleteContact={deleteContact} 
                    cancelEdit={cancelEdit} 
                    saveContact={saveContact} 
                  />
                : <CardFront 
                    key={c.id} 
                    contact={c} 
                    isEditing={isEditing} 
                    editContact={editContact} 
                  />
            ) 
            : <></>
        }
      </div>
    </div>
  );
};
