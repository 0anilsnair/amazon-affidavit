// src/services/manualAuthService.js
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

// Check if a user exists with matching username and password
export const loginWithUsernamePassword = async (username, password) => {
  const usersRef = collection(db, "users");  
  const q = query(usersRef, where("username", "==", username), where("password", "==", password));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const userDoc = snapshot.docs[0];
    return { uid: userDoc.id, ...userDoc.data() };
  } else {
    throw new Error("Invalid username or password");
  }
};
