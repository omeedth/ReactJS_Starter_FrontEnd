/* External Imports */
import React, { Component } from "react";
import { Link } from "react-router-dom";

/* Internal Imports */

/* Class Definition */
class ProfilePage extends Component{

  constructor(props) {
    super(props);
    
    /* State */
    this.state = {

    };

    /* Additional Variables */

    /* Function Bindings */
  }

  componentDidMount() {
    console.log('ProfilePage Mounted!')
  }

  render(){
    return(
      <div className="App">
        <h1> Profile! </h1>
        <p>{JSON.stringify(this.props.authStatus.user)}</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default ProfilePage;