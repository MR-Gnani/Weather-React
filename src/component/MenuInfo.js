import React from 'react'

// 자외선
// 바람 wind, deg: 방향, gust: 바람세기, speed: 풍속
// 강우

// 가시거리 visibility

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
        <div className='menuInfoBox'>
            <div>강우 <br/>:</div>
        </div>
        <div className='menuInfoBox'>
            <div>바람 <br/>:</div>
        </div>
        <div className='menuInfoBox'>
            <div>자외선 <br/>:</div>
        </div>
        <div className='menuInfoBox'>
            <div>가시거리 <br/>:</div>
        </div>
    </div>
  )
}

export default MenuInfo
