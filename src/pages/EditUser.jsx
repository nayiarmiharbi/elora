import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, "userDetails", id);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setEmail(userData.email || "");
        setPhone(userData.phone || "");
        setAddress(userData.address || "");
      } else {
        alert("User not found");
        navigate('/');
      }
    };
    fetchUser();
  }, [id, navigate]);

  const updateUser = async () => {
    const userDoc = doc(db, "userDetails", id);

    const updatedData = {
      firstName,
      lastName,
      email,
      phone,
      address
    };

    await updateDoc(userDoc, updatedData);
    alert("User updated successfully");
    navigate('/');
  };

  const deleteUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const userDoc = doc(db, "userDetails", id);
    await deleteDoc(userDoc);
    alert("User deleted successfully");
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
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br /><br />
      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      /><br /><br />
      <button onClick={updateUser}>Update</button>&nbsp;
      <button onClick={deleteUser} style={{ color: "white", backgroundColor: "red" }}>
        Delete
      </button>
    </div>
  );
}

export default EditUser;
