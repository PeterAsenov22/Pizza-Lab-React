import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <nav className='navbar navbar-dark bg-warning'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Link className='navbar-brand' to='/'>Pizza Lab</Link>
              <NavLink className='nav-link' activeClassName='active' exact to='/'>Home</NavLink>
              <NavLink className='nav-link' to='/menu'>Menu</NavLink>
              <NavLink className='nav-link' to='/orders'>My Orders</NavLink>
              <NavLink className='nav-link' to='/admin/add'>Add New Pizza</NavLink>
              <a className='nav-link' href='javascript:void(0)'>Logout</a>
              <NavLink className='nav-link' to='/login'>Login</NavLink>
              <NavLink className='nav-link' to='/register'>Register</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
