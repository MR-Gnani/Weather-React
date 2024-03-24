import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTemperatureThreeQuarters } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingDroplet } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';



// 바람 wind, deg: 방향, gust: 바람세기, speed: 풍속

const MenuInfo = ({weather}) => {

    // 기압계
    const basePressure = 1013; // 기압 1013 hPa일 때의 각도
    const degreePerHPa = 1.2; // 1 hPa 당 회전하는 각도   
    // 현재 기압에 따른 회전 각도 계산
    const rotationAngle = (weather?.main.pressure - basePressure) * degreePerHPa;
    // 회전 각도 적용
    const airRotation = `rotate(${rotationAngle}deg)`;

    // 가시거리
    const vib = weather?.visibility;

    // 양수: 춥다고 느낌, 음수: 덥다고 느낌
    // 온도차 2도기준 비슷함
    let gapTemp = weather?.main.temp - weather?.main.feels_like;

    // Magnus-Tetens 공식 상수 값
    const a = 17.27;
    const b = 237.7;

    // 상대 습도 비율로 변환
    const gamma = (a*weather?.main.temp) / (b+weather?.main.temp) + Math.log(weather?.main.humidity/100);

    // 이슬점 계산
    const dewPoint = Math.round( (b*gamma) / (a-gamma)); 

    // 바람 방향
    const rotation = `rotate(${weather?.wind?.deg}deg)`;
    const getWindDirection = (degree) => {
        const directions = ["북풍", "북동풍", "동풍", "남동풍", "남풍", "남서풍", "서풍", "북서풍"];
        const index = Math.round(degree / 45) % 8;
        return directions[index];
    };

    // 바람의 방향 구하기
    const windDirection = weather?.wind ? getWindDirection(weather.wind.deg) : "";

  return (
    <div className='menuSection'>
        <div className='menuInfoBox'>
            <div className='iconWrapper'><FontAwesomeIcon icon={faTemperatureThreeQuarters}/> 체감온도</div>
            <div className='contentsInfo'>{weather?.main.feels_like}°C</div>
            <div>{gapTemp>2? "실제 온도보다 춥습니다." :gapTemp<-2? "실제 온도보다 덥습니다." : "실제 온도와 비슷합니다."}</div>
        </div> 
        <div className='menuInfoBox'>
            <div className='iconWrapper'><FontAwesomeIcon icon={faHandHoldingDroplet}/> 습도</div>
            <div className='contentsInfo'>{weather?.main.humidity}%</div>
            <div>현재 이슬점이 {dewPoint}°C 입니다.</div>
        </div>
        <div className='menuInfoBox'>
            <div className='iconWrapper'><FontAwesomeIcon icon={faWeightScale}/> 기압</div>
                <div className='middleIcon'>
                    <div class="barometer">
                        <div class="needle" style={{ transform: airRotation }}></div>
                    </div>
                </div>
            <div className='contentsInfo2'>{weather?.main.pressure}hPa</div>
        </div>
        {weather?.rain? (
            <div className='menuInfoBox'>
                <div className='iconWrapper'><FontAwesomeIcon icon={faDroplet}/> 강우</div>
                <div className='contentsInfo'>{weather.rain['1h']}mm</div>
                <div>1시간 이내에 {weather.rain['1h']}mm의 <br/>강수가 예상됩니다.</div>
            </div>
            ) : (
            <div className='menuInfoBox'>
                <div className='iconWrapper'><FontAwesomeIcon icon={faDroplet}/> 강우</div>
                <div>비가 오지 않습니다.</div>
            </div>
            )
        }
       
        {weather?.wind? (
            <div className='menuInfoBox'>
                <div className='iconWrapper'><FontAwesomeIcon icon={faWind}/> 바람</div>
                <div className='sizeUp' style={{ transform: rotation}}><FontAwesomeIcon icon={faArrowUpLong}/></div>
                <div className='contentsInfo3'>{windDirection}</div>
                <div className='contentsInfo2'>{weather.wind.speed}m/s</div>
            </div>
            ) : (
            <div className='menuInfoBox'>
                <div className='iconWrapper'><FontAwesomeIcon icon={faWind}/> 바람</div>
                <div className='contentsInfo'> 바람 한 점 불지 않는 날입니다.</div>
            </div>
            )
        }

        {weather?.visibility? (
            <div className='menuInfoBox'>
                <div className='iconWrapper'><FontAwesomeIcon icon={faEye}/> 가시거리</div>
                <div className='contentsInfo'> {vib/1000}km</div>
                <div>
                    {vib>10000 ? "현재 매우 좋은 상태입니다." : vib>5000 ? "보통입니다. 일부 제한되어 있습니다." : vib>1000 ? "물체를 명확하게 보기 어렵습니다." : "매우 나쁜 상태입니다. 운전 시 유의하세요"}
                </div>
            </div>
            ) : (
            <div className='menuInfoBox'>
                <div className='iconWrapper'><FontAwesomeIcon icon={faEye}/> 가시거리</div>
                <div className='contentsInfo'>가시거리 정보를 불러올 수 없습니다.</div>
            </div>
            )
        }
        
    </div>
  )
}

export default MenuInfo
