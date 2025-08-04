import { auth, db } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginWithUsernamePassword = async (username, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      username,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    localStorage.setItem("ack-tk", token);
    return token;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};
