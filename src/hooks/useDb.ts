import { signInWithPopup, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, provider } from "../db/db.config";

const useDb = () => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            avatar: user.photoURL,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }

        return user.uid;
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      throw new Error(message);
    }
  };

  const create = async (collectionName: string, data: object) => {
    try {
      const docData = {
        ...data,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, collectionName), docData);
      return docRef.id;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      throw new Error(message);
    }
  };

  const findById = async (collectionName: string, uid: string) => {
    try {
      const userDocRef = doc(db, collectionName, uid);
      const userDoc = await getDoc(userDocRef);
      return userDoc;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      throw new Error(message);
    }
  };

  const find = async (collectionName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      throw new Error(message);
    }
  };

  const findByIdAndUpdate = async (
    collectionName: string,
    docId: string,
    updatedData: object
  ) => {
    try {
      const docRef = doc(db, collectionName, docId);

      // Verify document exists before updating
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Document not found");
      }

      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      });

      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      throw new Error(message);
    }
  };

  const findByIdAndDelete = async (collectionName: string, docId: string) => {
    try {
      const docRef = doc(db, collectionName, docId);

      // Verify document exists before deleting
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("Document not found");
      }

      await deleteDoc(docRef);
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      throw new Error(message);
    }
  };

  return {
    signInWithGoogle,
    logout,
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
  };
};

export default useDb;
