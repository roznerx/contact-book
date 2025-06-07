import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { NewContact } from "../interfaces/contacts";

interface FormProps {
  setNewContact: Dispatch<SetStateAction<NewContact>>;
  addContact: () => void;
};

export default function Form({ setNewContact, addContact }: FormProps) {
  return (
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
  );
};
