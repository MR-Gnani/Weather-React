import React from 'react'

const WeatherButton = ({cities, setCity}) => {

  const handleCityChange = (e)=>{
    const selectedCity = e.target.value;
    if (selectedCity === "Current"){
      setCity(null);
    } else {
      setCity(selectedCity);
    }
  }

  return (
    <div className='buttonBox'>
      <select aria-label="Select City" className="custom-select" onChange={handleCityChange}>
        <option value="Current">Current Location</option>
        {cities.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default WeatherButton
