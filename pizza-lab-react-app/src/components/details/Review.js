import React from 'react'

const Review = (props) => {
  const { review, createdBy } = props.review
  return (
    <div className='col-md-8'>
      <div className='card text-black bg-light'>
        <div className='card-body'>
          <blockquote className='card-blockquote'>
            <p>{review}</p>
            <footer style={{'textAlign': 'right'}}>Created By:
            <cite>{createdBy}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

export default Review
