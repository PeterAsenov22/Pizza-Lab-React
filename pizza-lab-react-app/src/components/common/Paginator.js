import React from 'react'
import {Link} from 'react-router-dom'

const Paginator = (props) => {
  const {productsCount, pageSize, current} = props
  const pagesCount = Math.ceil(productsCount / pageSize)

  const pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(
      (
        <li key={i} className={`page-item${i === current ? ' active' : ''}`}>
          <Link className='page-link' to={`/menu/${i}`}>{i}</Link>
        </li>
      )
    )
  }

  return (
    <div className='row space-top'>
      <div className='col-md-12'>
        <ul className='pagination'>
          <li className={`page-item${current === 1 ? ' disabled' : ''}`}>
            <Link className='page-link' to={`/menu/${current - 1}`}>«</Link>
          </li>
          {pages}
          <li className={`page-item${current === pagesCount ? ' disabled' : ''}`}>
            <Link className='page-link' to={`/menu/${current + 1}`}>»</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Paginator
