import React, { Component } from 'react'
import axios from 'axios'
// import cookie from "react-cookies";
// import { Redirect } from "react-router";

class CreateUser extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      Name: '',
      EmailID: '',
      createpassword: '',
      UserCreated: false
    }
    // Bind the handlers to this class
    this.submitCreate = this.submitCreate.bind(this)
    this.NameChangeHandler = this.NameChangeHandler.bind(this)

    this.EmailIDChangeHandler = this.EmailIDChangeHandler.bind(this)
    this.createpasswordChangeHandler = this.createpasswordChangeHandler.bind(
      this
    )
  }
  // Name change handler to update state variable with the text entered by the user
  NameChangeHandler = e => {
    this.setState({
      Name: e.target.value
    })
  }
  EmailIDChangeHandler = e => {
    this.setState({
      EmailID: e.target.value
    })
  }
  createpasswordChangeHandler = e => {
    this.setState({
      createpassword: e.target.value
    })
  }
  submitCreate = e => {
    if (this.state.Name && this.state.EmailID && this.state.createpassword) {
      var headers = new Headers()
      // prevent page from refresh
      e.preventDefault()
      const data = {
        Name: this.state.Name,
        EmailID: this.state.EmailID,
        createpassword: this.state.createpassword
      }
      axios.post('http://localhost:3100/buyersignup', data).then(response => {
        // update the state with the response data
        console.log(response.data)
        if (response.data == 'Your GrubHub UserID is Created') {
          this.setState({ UserCreated: true })
          console.log(this.state.UserCreated)
        } else {
          this.setState({ UserCreated: false })
        }
      })
    }
    setTimeout(function () {
      alert('Account Created -Please Login')
    }, 1500)
    this.props.history.push('/buyer/login')
  }

  render () {
    const UserCreated = this.state.UserCreated
    let redirectVar = null
    console.log(UserCreated)
    /* if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/user" />;
    } */
    return (
      <div>
        <br />
        <div className='container' align='center'>
          <h1>Buyer Sign Up</h1>
          <form onSubmit={this.submitCreate} method='post'>
            {redirectVar}
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='Name'
                onChange={this.NameChangeHandler}
                placeholder='Name'
                required='required'
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='email'
                className='form-control'
                name='EmailID'
                onChange={this.EmailIDChangeHandler}
                placeholder='EmailID'
                required
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='password'
                className='form-control'
                name='createpassword'
                onChange={this.createpasswordChangeHandler}
                placeholder='createpassword'
                required
              />
            </div>
            <br />
            <div>{UserCreated ? 'Your GrubHub UserID is Created' : ' '} </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className='btn btn-danger' type='submit'>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateUser
