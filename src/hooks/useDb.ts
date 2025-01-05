import { signInWithPopup, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db, provider } from "../db/db.config";

const useDb = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      if (user) {
        const response = await create("users", {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        });
        console.log(response);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const create = async (collectionName: string, data: object) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log(docRef);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const find = async (collectionName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error getting documents:", error);
    }
  };

  const findByIdAndUpdate = async (
    collectionName: string,
    docId: string,
    updatedData: object
  ) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, updatedData);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const findByIdAndDelete = async (collectionName: string, docId: string) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return {
    signInWithGoogle,
    logout,
    create,
    find,
    findByIdAndUpdate,
    findByIdAndDelete,
  };
};

export default useDb;
