import React from 'react'

const WeatherButton = ({cities, setCity, city}) => {

  const handleCityChange = (e)=>{
    const selectedCity = e.target.value;
    if (selectedCity === "Current Location"){
      setCity(null);
      // 여기랑
    } else {
      setCity(selectedCity);
    }
    // 여기에

  }

  return (
    <div className='buttonBox'>
      <select aria-label="Select City" className="custom-select" onChange={handleCityChange} value={city}>
        {cities.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default WeatherButton
