import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, "userDetails", id);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      } else {
        alert("User not found");
        navigate('/');
      }
    };
    fetchUser();
  }, [id, navigate]);

  const updateUser = async () => {
    const userDoc = doc(db, "userDetails", id);
    await updateDoc(userDoc, { firstName, lastName });
    navigate('/');
  };

  return (
    <div>
      <h2>Edit User</h2>
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
      <button onClick={updateUser}>Update</button>
    </div>
  );
}

export default EditUser;
