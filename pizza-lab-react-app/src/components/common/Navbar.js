import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = (props) => {
  const {loggedIn, isAdmin, logout, users, products} = props

  return (
    <header>
      <nav className='navbar navbar-dark bg-warning'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Link className='navbar-brand' to='/'>Pizza Lab</Link>
              <NavLink className='nav-link' activeClassName='active' exact to='/'>Home</NavLink>
              <NavLink className='nav-link' to='/menu'>Menu</NavLink>
              {loggedIn && !isAdmin && <NavLink className='nav-link' to='/orders'>My Orders</NavLink>}
              {isAdmin && <NavLink className='nav-link' to='/admin/create'>Create New Pizza</NavLink>}
              {loggedIn && !isAdmin && <NavLink className='nav-link' to='/cart'>Cart</NavLink>}
              {loggedIn && <a className='nav-link' href='javascript:void(0)' onClick={logout}>Logout</a>}
              {!loggedIn && <NavLink className='nav-link' to='/login'>Login</NavLink>}
              {!loggedIn && <NavLink className='nav-link' to='/register'>Register</NavLink>}
              {isAdmin && <span style={{color: 'blue'}}>{products} products in catalog</span>}
              {isAdmin && <span style={{color: 'blue'}}> | {users} users registered</span>}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
