import React from 'react'


const MenuInfo = ({weather}) => {
  return (
    <div className='menuSection'>
        <div className='menuInfoBox'>
            <div>체감온도 <br/>:{weather?.main.feels_like}</div>
        </div> 
        <div className='menuInfoBox'>
            <div>습도 <br/>:{weather?.main.humidity}</div>
        </div>
        <div className='menuInfoBox'>
            <div>기압 <br/>:{weather?.main.pressure}</div>
        </div>
        <div className='menuInfoBox'></div>
        <div className='menuInfoBox'></div>
        <div className='menuInfoBox'></div>
        <div className='menuInfoBox'></div>
    </div>
  )
}

export default MenuInfo
