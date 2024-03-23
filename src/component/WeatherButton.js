import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = () => {
  return (
    <div className='buttonBox'>
      <Button variant="info">Current Location</Button>
      <Button variant="info">PARIS</Button>
      <Button variant="info">NEW YORK</Button>
    </div>
  )
}

export default WeatherButton
