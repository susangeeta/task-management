import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../db/db.config";
import useDb from "./useDb";

const useAuth = () => {
  const [user, setUser] = useState<DocumentData>({});
  const [loading, setLoading] = useState(true);
  const { findById } = useDb();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser?.uid) {
          const response = await findById("users", currentUser.uid);
          const data = response.data();
          if (data) {
            setUser(data);
          }
        }
      });
      setLoading(false);

      return () => unsubscribe();
    })();
  }, []);

  return { user, loading };
};

export default useAuth;
