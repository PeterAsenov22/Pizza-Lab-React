import React, { Component } from 'react'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import HomePage from './components/home/HomePage'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    )
  }
}

export default App
