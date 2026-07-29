import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Config/Firebase/firebase.config";
import { createContext, useEffect, useState } from "react";
import usePublicAxios from "../hooks/usePublicAxios";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosPublic = usePublicAxios();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (name, photo) => {
    // Note: no setLoading(true) here on purpose — updateProfile() does not
    // trigger onAuthStateChanged, so nothing would ever flip loading back
    // to false again, leaving the whole app stuck on the loading screen.
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            if (res.data?.token) {
              localStorage.setItem("token", res.data?.token);
            }
          })
          .catch((err) => {
            console.warn("JWT request failed (backend may be unreachable):", err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });
    return () => {
      return unSubscribe();
    };
  }, [auth, axiosPublic]);

  const authInfo = {
    auth,
    loading,
    createUser,
    signIn,
    user,
    updateUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;