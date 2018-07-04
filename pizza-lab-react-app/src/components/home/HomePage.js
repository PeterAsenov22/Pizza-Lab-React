import React, { Component } from 'react'

class HomePage extends Component {
  render () {
    return (
      <div class='container'>
        <div class='row space-top'>
          <div class='col-md-12'>
            <h1>Menu</h1>
            <form class='form-inline my-2 my-lg-0'>
              <input class='form-control mr-sm-2' placeholder='Search for your pizza' type='text' />
              <button class='btn btn-outline-warning my-2 my-sm-0' type='submit'>Search</button>
            </form>
          </div>
        </div>
        <div class='row space-top'>
          <div class='card-deck'>
            <div class='card'>
              <img class='card-img-top' src='https://townepizzas.com/assets/images/s7.png' alt='Card image cap' />
              <div class='card-body'>
                <h5 class='card-title'>Card title</h5>
                <p class='card-text'>This card has supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div class='card-footer'>
                <small class='text-muted'>Rating: 7.5</small>
                <button type='button' class='btn btn-primary float-right btn-sm'>Details</button>
                <button type='button' class='btn btn-warning float-right btn-sm'>Order</button>
              </div>
            </div>
            <div class='card'>
              <img class='card-img-top' src='https://townepizzas.com/assets/images/s7.png' alt='Card image cap' />
              <div class='card-body'>
                <h5 class='card-title'>Card title</h5>
                <p class='card-text'>This card has supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div class='card-footer'>
                <small class='text-muted'>Rating: 7.5</small>
                <button type='button' class='btn btn-primary float-right btn-sm'>Details</button>
                <button type='button' class='btn btn-warning float-right btn-sm'>Order</button>
              </div>
            </div>
            <div class='card'>
              <img class='card-img-top' src='https://townepizzas.com/assets/images/s7.png' alt='Card image cap' />
              <div class='card-body'>
                <h5 class='card-title'>Card title</h5>
                <p class='card-text'>This card has supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div class='card-footer'>
                <small class='text-muted'>Rating: 7.5</small>
                <button type='button' class='btn btn-primary float-right btn-sm'>Details</button>
                <button type='button' class='btn btn-warning float-right btn-sm'>Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
