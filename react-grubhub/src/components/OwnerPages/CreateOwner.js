import React, { Component } from 'react'
import axios from 'axios'
// import cookie from "react-cookies";
// import { Redirect } from "react-router";

class CreateOwner extends Component {
  // call the constructor method
  constructor (props) {
    // Call the constrictor of Super class i.e The Component
    super(props)
    // maintain the state required for this component
    this.state = {
      Name: '',
      EmailID: '',
      createpassword: '',
      RestaurantName: '',
      RestaurantZipCode: '',
      existsFlag: false
    }
    // Bind the handlers to this class
    this.submitCreate = this.submitCreate.bind(this)
    this.NameChangeHandler = this.NameChangeHandler.bind(this)

    this.EmailIDChangeHandler = this.EmailIDChangeHandler.bind(this)
    this.createpasswordChangeHandler = this.createpasswordChangeHandler.bind(
      this
    )
    this.RestaurantNameChangeHandler = this.RestaurantNameChangeHandler.bind(
      this
    )
    this.RestaurantZipCodeChangeHandler = this.RestaurantZipCodeChangeHandler.bind(
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
  RestaurantNameChangeHandler = e => {
    this.setState({
      RestaurantName: e.target.value
    })
  }
  RestaurantZipCodeChangeHandler = e => {
    this.setState({
      RestaurantZipCode: e.target.value
    })
  }
  submitCreate = e => {
    if (
      this.state.Name &&
      this.state.EmailID &&
      this.state.createpassword &&
      this.state.RestaurantName &&
      this.state.RestaurantZipCode
    ) {
      var headers = new Headers()
      // prevent page from refresh
      e.preventDefault()
      const data = {
        Name: this.state.Name,
        EmailID: this.state.EmailID,
        createpassword: this.state.createpassword,
        RestaurantName: this.state.RestaurantName,
        RestaurantZipCode: this.state.RestaurantZipCode
      }
      axios.post('http://localhost:3100/ownersignup', data).then(response => {
        // update the state with the response data
        console.log(response.data)
        /* if (response.data == "Book ID exists") {
        this.setState({ existsFlag: true });
      } else {
        this.setState({ existsFlag: false });
      } */
      })
    }
    setTimeout(function () {
      alert('Account Created -Please Login')
    }, 1500)
    this.props.history.push('/owner/ownerlogin')
  }

  render () {
    const existsFlag = this.state.existsFlag
    let redirectVar = null
    /* if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    } */
    return (
      <div>
        <br />
        <div className='container' align='center'>
          <h1>Restaurant Sign Up</h1>
          <form action='http://127.0.0.1:3000/login' method='post'>
            {redirectVar}
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='text'
                className='form-control'
                name='Name'
                onChange={this.NameChangeHandler}
                placeholder='Name'
                required
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
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='type'
                className='form-control'
                name='RestaurantName'
                onChange={this.RestaurantNameChangeHandler}
                placeholder='RestaurantName'
                required
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className='form-group'>
              <input
                type='email'
                className='form-control'
                name='RestaurantZipCode'
                onChange={this.RestaurantZipCodeChangeHandler}
                placeholder='RestaurantZipCode'
                required
              />
            </div>

            <br />
            <div>{existsFlag ? 'Book ID exists ' : ' '} </div>
            <br />
            <div style={{ width: '30%' }}>
              <button
                className='btn btn-success'
                type='submit'
                onClick={this.submitCreate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateOwner
