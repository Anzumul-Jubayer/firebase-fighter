import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { auth } from "../firebase/firebase.config";
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,SetLoading]=useState(true)
  const createUser = (email, password) => {
    SetLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    SetLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInGoogle = () => {
    SetLoading(true)
    return signInWithPopup(auth, googleProvider);
  };
  const signInGithub = () => {
    SetLoading(true)
    return signInWithPopup(auth, githubProvider);
  };
  const signOutFunc = () => {
    SetLoading(true)
    return signOut(auth);
  };
  const resetEmail = () => {
    SetLoading(true)
    return sendPasswordResetEmail(auth);
  };
  const updateProfileFunc = (user, displayName, photoURL) => {
    SetLoading(true)
    return updateProfile(user, {
      displayName,
      photoURL,
    });
  };
  const sendVerificationMail = (user) => {
    SetLoading(true)
    return sendEmailVerification(user);
  };
  const authInfo = {
    user,
    setUser,
    createUser,
    signIn,
    signInGoogle,
    signInGithub,
    signOutFunc,
    resetEmail,
    updateProfileFunc,
    sendVerificationMail,
    SetLoading,
    loading
  };
  useEffect(() => {
   const unsubscribe=onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      SetLoading(false)
    });
    return ()=>{
      unsubscribe()
    }
  });

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
