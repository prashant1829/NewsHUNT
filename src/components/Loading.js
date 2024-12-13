import React, { Component } from 'react'
import loader from './loader.gif'

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
        <img src={loader} alt=''/>
      </div>
    )
  }
}
