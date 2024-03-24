import moment from 'moment-timezone';
import React from 'react'

const RightBox = ({weather}) => {
  const sunrise = new Date((weather?.sys.sunrise - (32400-weather?.timezone))*1000)
  const sunset = new Date((weather?.sys.sunset - (32400-weather?.timezone))*1000)

  return (
    <div className='rightWeatherBox'>
          <div className='sun'>SUNRISE: {moment(sunrise).format("H:mm")}</div>
          <div className='sun'>SUNSET: {moment(sunset).format("H:mm")}</div>
          <div className='tempC'>{weather?.main.temp}°C</div>
          {/* <div className='tempF'>+{weather?.main.temp*9/5+32}°F</div> */} 
    </div>
  )
}

export default RightBox
