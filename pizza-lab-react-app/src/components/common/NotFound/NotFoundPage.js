import React from 'react'
import './NotFoundPage.css'

const NotFoundPage = (props) => (
  <div className='error-page'>
    <div>
      <h1 data-h1='404'>404</h1>
      <p data-p='NOT FOUND'>{props.errMessage || 'PAGE NOT FOUND'}</p>
    </div>
  </div>
)

export default NotFoundPage
