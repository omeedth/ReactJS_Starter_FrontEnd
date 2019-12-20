/* External Imports */
import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Internal Imports */
import { getAuthStatus } from '../../scripts/util.js';

/* Class Definition */
class HomePage extends Component{

  constructor(props) {
    super(props);
    
    /* State */
    this.state = {

    };

    /* Additional Variables */

    /* Function Bindings */
    this.createNote = this.createNote.bind(this);
    this.readNote = this.readNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.googleAuth = this.googleAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    console.log('HomePage Mounted')  
  }

  createNote() {
    const fetchURL = 'http://localhost:8000/test/db';
    let postBody = {title: 'New Title', body: 'New Body'};
    fetch(fetchURL, {
      method: 'POST',
      body: JSON.stringify(postBody),
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  readNote() {
    const fetchURL = 'http://localhost:8000/notes/5def300935c2232b18d31b8c';    
    fetch(fetchURL, {
      method: 'GET',      
      cache: 'no-cache',
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  deleteNote() {
    const fetchURL = 'http://localhost:8000/notes/5def300935c2232b18d31b8c';    
    fetch(fetchURL, {
      method: 'DELETE',      
      cache: 'no-cache',
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  updateNote() {
    const fetchURL = 'http://localhost:8000/notes/5def300935c2232b18d31b8c'; 
    let postBody = {title: 'Updated Title', body: 'Updated Body'};   
    fetch(fetchURL, {
      method: 'PUT',  
      body: JSON.stringify(postBody),
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/json',
      },      
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  }

  googleAuth() {
    // Authenticate using via passport api in the backend
    // Open Google login page
    // NOTE: this apps's location ('http://localhost:3000') must be a 'Valid Redirect URL' for your provider as well as the backend route!
    window.open("http://localhost:8000/auth/google", "_self") // URL -> where to go to, _self -> this tab
  }

  logout() {    
    // Logout using Google passport api
    // Set authenticated state to false in the HomePage component
    // NOTE: this apps's location ('http://localhost:3000') must be a 'Valid Redirect URL' for your provider as well as the backend route!
    window.open("http://localhost:8000/auth/logout", "_self")
    this.props.setAppState({ user: {}, authenticated: false })
    // this.setState({ authenticated: false })
  }

  render(){
    const { authenticated, user } = this.props.authStatus;
    return(
      <div className="App">
        <h1> Hello, World! </h1>
        <p>{JSON.stringify(user)}</p>
        <button type="button" onClick={this.createNote}>Create Note</button>
        <button type="button" onClick={this.readNote}>Read Note</button>
        <button type="button" onClick={this.deleteNote}>Delete Note</button>
        <button type="button" onClick={this.updateNote}>Update Note</button>
        <button type="button" onClick={this.googleAuth}>Google Auth</button>
        <button type="button" onClick={this.logout}>Logout</button>
        <Link to="/profile">Profile</Link>
      </div>
    );
  }
}

export default HomePage;