/* External Imports */
import React, { Component } from "react";
import {hot} from "react-hot-loader";
import { Switch, Route, Redirect } from 'react-router-dom';

/* Internal Imports */
import "./App.css";
import { getAuthStatus } from './scripts/util.js';
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";

/* Class Definition */
// class App extends Component{

  // constructor(props) {
  //   super(props);
    
  //   /* State */
  //   this.state = {
  //     user: {},
  //     error: null,
  //     authenticated: false
  //   };

  //   /* Additional Variables */

  //   /* Function Bindings */
  //   this.createNote = this.createNote.bind(this);
  //   this.readNote = this.readNote.bind(this);
  //   this.deleteNote = this.deleteNote.bind(this);
  //   this.updateNote = this.updateNote.bind(this);
  //   this.googleAuth = this.googleAuth.bind(this);
  //   this.logout = this.logout.bind(this);
  // }

//   componentDidMount() {
//     // const fetchURL = 'http://localhost:8000/auth/google'; // INCORRECT: This is incorrect because you can't fetch the literal route where you login! It returns the html page of the provider's login screen
//     const fetchURL = 'http://localhost:8000/auth/login/success'; // In this route the back end tells us whether or not they have the user logged in and update the variables if so!
//     fetch(fetchURL, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials": true
//       }     
//     }).then(response => {
//       if (response.status === 200) return response.json();
//       throw new Error("failed to authenticate user");
//     })
//     .then(responseJson => {
//       this.setState({
//         authenticated: true,
//         user: responseJson.user
//       });
//     })
//     .catch(error => {
//       this.setState({
//         authenticated: false,
//         error: "Failed to authenticate user"
//       });
//     });
//   }

//   createNote() {
//     const fetchURL = 'http://localhost:8000/test/db';
//     let postBody = {title: 'New Title', body: 'New Body'};
//     fetch(fetchURL, {
//       method: 'POST',
//       body: JSON.stringify(postBody),
//       cache: 'no-cache',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//     }).then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err))
//   }

//   readNote() {
//     const fetchURL = 'http://localhost:8000/notes/5def300935c2232b18d31b8c';    
//     fetch(fetchURL, {
//       method: 'GET',      
//       cache: 'no-cache',
//     }).then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err))
//   }

//   deleteNote() {
//     const fetchURL = 'http://localhost:8000/notes/5def300935c2232b18d31b8c';    
//     fetch(fetchURL, {
//       method: 'DELETE',      
//       cache: 'no-cache',
//     }).then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err))
//   }

//   updateNote() {
//     const fetchURL = 'http://localhost:8000/notes/5def300935c2232b18d31b8c'; 
//     let postBody = {title: 'Updated Title', body: 'Updated Body'};   
//     fetch(fetchURL, {
//       method: 'PUT',  
//       body: JSON.stringify(postBody),
//       cache: 'no-cache',
//       headers: {
//           'Content-Type': 'application/json',
//       },      
//     }).then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.log(err))
//   }

//   googleAuth() {
//     // Authenticate using via passport api in the backend
//     // Open Google login page
//     // NOTE: this apps's location ('http://localhost:3000') must be a 'Valid Redirect URL' for your provider as well as the backend route!
//     window.open("http://localhost:8000/auth/google", "_self") // URL -> where to go to, _self -> this tab
//   }

//   logout() {    
//     // Logout using Google passport api
//     // Set authenticated state to false in the HomePage component
//     // NOTE: this apps's location ('http://localhost:3000') must be a 'Valid Redirect URL' for your provider as well as the backend route!
//     window.open("http://localhost:8000/auth/logout", "_self")
//     this.setState({ authenticated: false })
//   }

//   render(){
//     const { authenticated, user } = this.state
//     return(
//       <div className="App">
//         <h1> Hello, World! </h1>
//         <p>{JSON.stringify(user)}</p>
//         <button type="button" onClick={this.createNote}>Create Note</button>
//         <button type="button" onClick={this.readNote}>Read Note</button>
//         <button type="button" onClick={this.deleteNote}>Delete Note</button>
//         <button type="button" onClick={this.updateNote}>Update Note</button>
//         <button type="button" onClick={this.googleAuth}>Google Auth</button>
//         <button type="button" onClick={this.logout}>Logout</button>
//       </div>
//     );
//   }
// }

/* Setup Switches */
class App extends Component {

  constructor(props) {
    super(props);

    /* State */
    this.state = {

      /* Authentication */
      user: {},      
      authenticated: false,

      /* Error */
      error: null,

    };

    /* Additional Variables */

    /* Function Bindings */
    this.setStateHandler = this.setStateHandler.bind(this);

  }

  /* Lifecycle Functions */
  componentDidMount() {
    console.log('Main App Page Mounted')
    getAuthStatus().then(status => {
      console.log('Status',status)
      this.setState(status, () => {
        // Callback
      });
    });    
  }

  /* Component Functions */
  setStateHandler(newState, callback) {
    console.log('Setting Main App State!')
    this.setState(newState,callback)
  }

  /* Render */
  render() {
    return (
      <Switch>

        <Route 
          exact path='/'
          render={(props) => (
            <HomePage 
              {...props}                                                                     // spread attributes (unpacks a json or list into multiple variables)
              setAppState={this.setStateHandler}
              authStatus={{user: this.state.user, authenticated: this.state.authenticated}}
            />
          )}
        />

        <Route 
          path='/profile'
          render={(props) => (
            this.state.authenticated ? (
              <ProfilePage 
                {...props}
                setAppState={this.setStateHandler}
                authStatus={{user: this.state.user, authenticated: this.state.authenticated}}
              />
            ) : (
              <Redirect to='/' /> // Receive Warning on this because it is a function that returns a class
            )
          )}
        />

      </Switch>
    );
  }

}

/* Export */
export default hot(module)(App);