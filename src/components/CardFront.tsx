import type { Contact } from "../interfaces/contacts"

interface CardFront {
  contact: Contact;
  isEditing: boolean;
  editContact: (id: string) => void;
};

export default function CardFront({ contact, isEditing, editContact }: CardFront) {
  return (
    <div key={contact.id} className="card w-96 bg-white border-black w-96 shadow-sm card-md">
      <div className="card-body">
        <h2 className="card-title">{contact.name}</h2>
        <p>{contact.city}</p>
        <div className="justify-end card-actions">
          <button 
            className="btn btn-primary"
            disabled={isEditing}
            onClick={() => editContact(contact.id)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
