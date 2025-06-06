import { useState, type ChangeEvent } from "react";

interface Contact {
  id: string;
  name: string;
  city: string;
}

interface NewContact {
  name: string;
  city: string;
}

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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [edit, setEdit] = useState<string | undefined>(undefined);

  const addContact = () => {
    if (contacts.find(c => c.name === newContact.name)) {
      console.log("Already exists!");
      return
    };

    const id = crypto.randomUUID();
    setContacts(prev => [
      ...prev, { ...newContact, id }
    ])
  };

  const editContact = (id: string) => {
    setEdit(id);
    setIsEditing(true);
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="pb-8 text-2xl">
        <h1 className="text-2xl">Contact Book</h1>
        <h3 className="text-xl">Keep track of where your friends live</h3>
      </div>
      {/* Form */}
      <div className="card card-side gap-4 p-8 bg-white border-black w-96 shadow-sm w-max">
        <label className="input bg-white border-black">
          <span className="label">Name:</span>
          <input 
            type="text" 
            placeholder="URL" 
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => setNewContact((prev) => ({ 
                name: e.target.value, city: prev.city
              }))
            }
          />
        </label>
        <label className="input bg-white border-black">
          <span className="label">City:</span>
          <input 
            type="text" 
            placeholder="URL" 
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => setNewContact((prev) => ({ 
                name: prev.city, city: e.target.value
              }))
            }
          />
        </label>
        <button className="btn" onClick={() => addContact()}>Add contact</button>
      </div>
      {/* Contacts */}
      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          contacts.length > 0 ? contacts.map((c: Contact) => 
            isEditing && c.id === edit ? 
            (
              <div key={c.id} className="card w-96 bg-white border-black w-96 shadow-sm card-md">
                <div className="card-body">
                  <label className="input bg-white border-black w-auto">
                    <span className="label">Name:</span>
                    <input 
                      type="text" 
                      placeholder="URL"
                      value={c.name} 
                      onChange={
                        (e: ChangeEvent<HTMLInputElement>) => setNewContact((prev) => ({ 
                          name: e.target.value, city: prev.city
                        }))
                      }
                    />
                  </label>
                  <label className="input bg-white border-black w-auto">
                    <span className="label">City:</span>
                    <input 
                      type="text" 
                      placeholder="URL"
                      value={c.city} 
                      onChange={
                        (e: ChangeEvent<HTMLInputElement>) => setNewContact((prev) => ({ 
                          name: prev.city, city: e.target.value
                        }))
                      }
                    />
                  </label>
                  <div className="justify-between card-actions pt-4">
                    <button 
                      className="btn btn-secondary"
                      onClick={() => editContact(c.id)}
                    >
                      Delete
                    </button>
                    <div className="flex row gap-2">
                      <button 
                        className="btn btn-outline"
                        onClick={() => editContact(c.id)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn btn-primary"
                        onClick={() => editContact(c.id)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : 
            (
              <div key={c.id} className="card w-96 bg-white border-black w-96 shadow-sm card-md">
                <div className="card-body">
                  <h2 className="card-title">{c.name}</h2>
                  <p>{c.city}</p>
                  <div className="justify-end card-actions">
                    <button 
                      className="btn btn-primary"
                      disabled={isEditing}
                      onClick={() => editContact(c.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )
          ) :
          <></>
        }
      </div>
    </div>
  );
};
