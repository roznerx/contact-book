import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Contact, NewContact } from "../interfaces/contacts";

interface CardBack {
  contact: Contact;
  editedContact: NewContact;
  setEditedContact: Dispatch<SetStateAction<NewContact>>;
  deleteContact: (id: string) => void;
  cancelEdit: () => void;
  saveContact: (id: string) => void;
};

export default function CardBack({ 
  contact, editedContact, setEditedContact, deleteContact, cancelEdit, saveContact 
}: CardBack) {
  return (
    <div key={contact.id} className="card w-96 bg-white border-black w-96 shadow-sm card-md">
      <div className="card-body">
        <label className="input bg-white border-black w-auto">
          <span className="label">Name:</span>
          <input 
            type="text" 
            placeholder="URL"
            value={editedContact.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedContact(prev => (
              { ...prev, name: e.target.value }
            ))}
          />
        </label>
        <label className="input bg-white border-black w-auto">
          <span className="label">City:</span>
          <input 
            type="text" 
            placeholder="URL"
            value={editedContact.city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedContact(prev => (
              { ...prev, city: e.target.value }))
            }
          />
        </label>
        <div className="justify-between card-actions pt-4">
          <button 
            className="btn btn-secondary"
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
          <div className="flex row gap-2">
            <button 
              className="btn btn-outline"
              onClick={() => cancelEdit()}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => saveContact(contact.id)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 
};
