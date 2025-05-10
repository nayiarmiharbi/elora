import { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "userDetails");

  const createUser = async () => {
    if (!firstName || !lastName) return alert("Please fill both fields.");
    await addDoc(userCollectionRef, { firstName, lastName });
    navigate('/');
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      /><br /><br />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      /><br /><br />
      <button onClick={createUser}>Submit</button>
    </div>
  );
}

export default CreateUser;
