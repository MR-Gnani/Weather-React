import moment from 'moment-timezone';
import React from 'react'

const RightBox = ({weather}) => {
  console.log(weather)
  const convertEpochToTime = (epoch) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleTimeString(); // 시간 부분만 추출하여 반환
  };

  return (
    <div className='rightWeatherBox'>
          <div>SUNRISE: {convertEpochToTime(weather?.sys.sunrise)}</div>
          <div>SUNSET: {convertEpochToTime(weather?.sys.sunset)}</div>
          <div>+{weather?.main.temp}°C</div>
          <div>+{weather?.main.temp*9/5+32}°F</div>
          <div>PM: 89-보통</div>
    </div>
  )
}

export default RightBox
