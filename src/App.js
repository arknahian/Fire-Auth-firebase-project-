import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import './App.css';
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig)
function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo : ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleButton = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signedInUser)
      console.log(displayName, photoURL, email)
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
  }
  // const [signOut, setSignOut] = useState({
  //     isSignedIn: false,
  //     name: '',
  //     email: '',
  //     photo: ''
  // })
  const signOutUser = () => {
    firebase.auth().signOut()
    .then(res => {
      const signOutUser ={
        isSignedIn : false,
        photo : '',
        email : '', 
        name: ''
      }
      setUser(signOutUser)
    })
    .catch( err => {

    });
  }
  
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={signOutUser}>Sign Out</button> : 
        <button onClick={handleButton}>Sign in</button>
      }
      {
        user.isSignedIn &&  <div>
          <h1>Welcome, {user.name}</h1>
      <h2>Your email is {user.email}</h2>
        <img src={user.photo} alt="image"/>

        </div> 
      }
    </div>
  );
}

export default App;
