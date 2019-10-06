import React, { Component } from 'react'
import '../../App.css'
import axios from 'axios'
import { readdirSync } from 'fs'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
class CentralContent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  itemsearch = e => {
    this.setState({ searchtext: e.target.value })
    console.log(this.state.searchtext)
  }
  search = e => {
    e.preventDefault()
    console.log('search clicked')
    axios
      .get(`http://localhost:3100/items/${this.state.searchtext}`)
      .then(response => {
        console.log('Onclick')
        console.log(JSON.stringify(response.data))
      })
  }
  componentDidMount () {
    axios.get(`http://localhost:3100/items/${'pizza'}`).then(response => {
      console.log('populate')
      console.log(response.data)
    })
  }

  render () {
    return (
      <div class='jumbotron'>
        <div class='jumbotron'>
          <h1 class='display-4'>{}</h1>

          <div class='lead m-4' align='center'>
            <span styles='color:blue'>{this.state.text}</span>
            <br />
            <a href='/owner/ownerlogin' type='button' class='btn btn-dark m-2'>
              Restaurant Owner
            </a>
            <a href='buyer/login' type='button' class='btn btn-dark m-2'>
              Order Food
            </a>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default CentralContent
