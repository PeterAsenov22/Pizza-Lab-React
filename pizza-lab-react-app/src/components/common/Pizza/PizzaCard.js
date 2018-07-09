import React from 'react'
import {Link} from 'react-router-dom'

const PizzaCard = ({id, name, image, description, weight}) => (
  <div className='card col-4'>
    <img className='card-img-top' src={image} alt={name} />
    <div className='card-body'>
      <h5 className='card-title'>{name}</h5>
      <p className='card-text'>{description}</p>
    </div>
    <div className='card-footer'>
      <small className='text-muted'>{weight} gr</small>
      <Link to={`/details/${id}`} type='button' className='btn btn-primary float-right btn-sm'>Details</Link>
      <button type='button' className='btn btn-warning float-right btn-sm'>Order</button>
    </div>
  </div>
)

export default PizzaCard
