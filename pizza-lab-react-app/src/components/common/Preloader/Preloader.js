import React from 'react'
import {connect} from 'react-redux'
import './Preloader.css'

const Preloader = ({ loading }) => {
  if (!loading) return null
  return (
    <div className='preloader'>
      {loading && <p>Loading &hellip;</p>}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    loading: state.ajaxCalls > 0
  }
}

export default connect(mapStateToProps)(Preloader)
