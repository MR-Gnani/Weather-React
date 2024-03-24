import moment from 'moment-timezone'
import React from 'react'

const LeftBox = ({weather}) => {
  
  if (!weather || !weather.weather || !weather.weather[0]) {
    // weather 객체나 weather.weather 배열이 비어있거나 존재하지 않는 경우
    return (
        <div className='leftWeatherBox'>
            <div className='city'>No data available</div>
        </div>
    );
}

  const date = new Date((weather?.dt - (32400-weather?.timezone))*1000)
  
  return (
    <div className='leftWeatherBox'>
          <div className='city'>{weather?.name}</div>
          <div className='date'>{moment(date).format("MMM Do")}</div>
          <div className='time'>{moment(date).format("H:mm")}</div>
          <div className='info'>{weather?.weather[0]?.description}</div>
    </div>
  )
}

export default LeftBox
