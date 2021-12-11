import './App.css';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState, useEffect } from 'react';
import { auth, data } from './firebase-config';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';

function App() {

  // check logged in
  const loggedIn = () => {
    console.log(user.email);
  }

  const notloggedin = () => {
    console.log('not logged in');
  }

  // reading data
  const [books, setBooks] = useState([]);
  useEffect(
    () => 
      onSnapshot(collection(data,"Books"),(snapshot) => 
      setBooks(snapshot.docs.map(doc => doc.data()))
    ),
    []
  );

  // writing data
  const [title, setTitle] = useState("");
  const addBook = async () => {
    const collectionRef = collection(data, "Books");
    const payload = {Title: title , Author: user.email}
    await addDoc(collectionRef, payload);
  }
  
  // authorization things
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail, 
        registerPassword);
      console.log(user);
    } catch (error) {
      console.log(error.messege);
    }
    
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth, 
        loginEmail, 
        loginPassword);
      console.log(user);
    } catch (error) {
      console.log(error.messege);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };


  // DOM
  return (
    <div className="App">
      <div>
        <h2>Create Account</h2>
        <input placeholder='Email' onChange={(event) => setRegisterEmail(event.target.value)}/>
        <input placeholder='Password' onChange={(event) => setRegisterPassword(event.target.value)}/>
        <button onClick={register}>Create</button>
      </div>

      <div>
        <h2>Login</h2>
        <input placeholder='Email' onChange={(event) => setLoginEmail(event.target.value)}/>
        <input placeholder='Password' onChange={(event) => setLoginPassword(event.target.value)}/>
        <button onClick={login}>Login</button>
      </div>

      <div>
        <h3>User Logged In: {user?.email}</h3>
        <button onClick={logout}>Sign Out</button>
      </div>
      
      <div>
        <h2>Add Book</h2>
        <input placeholder='Title' onChange={(event) => setTitle(event.target.value)}/>
        {user == null ? <button onClick={notloggedin}>Add</button> : <button onClick={addBook}>Add</button>}
        <ul>
          {books.map((book) => (
            <li>
              <strong>{book.Title}</strong>, {book.Author}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}

export default App;
