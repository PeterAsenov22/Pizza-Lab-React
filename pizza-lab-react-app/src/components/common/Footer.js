import React from 'react'
import { Footer } from 'mdbreact'
import {Link} from 'react-router-dom'

const FooterComponent = () => (
  <Footer color='orange lighten-3' className='footer-copyright text-center py-3 fixed-bottom'>
        &copy; <Link to='/'> Pizza Lab </Link> {(new Date().getFullYear())}
  </Footer>
)

export default FooterComponent
