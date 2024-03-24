import moment from 'moment-timezone'
import React from 'react'

const LeftBox = ({weather}) => {
  
  const date = new Date(weather?.dt*1000)
  return (
    <div className='leftWeatherBox'>
          <div className='city'>{weather?.name}</div>
          <div className='date'>{moment(date).format("MMM Do")}</div>
          <div className='time'>{moment(date).format("H:mm")}</div>
          <div className='info'>{weather?.weather[0].description}</div>
    </div>
  )
}

export default LeftBox
