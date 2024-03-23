import { useEffect, useState } from 'react';
import './App.css';
import LeftBox from './component/LeftBox';
import RightBox from './component/RightBox';
import WeatherButton from './component/WeatherButton';
import MenuInfo from './component/MenuInfo';
import 'bootstrap/dist/css/bootstrap.min.css';

// 1. 앱이 실행되면 현재 위치 기반의 날씨를 보여준다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태정보를 보여준다.(미세먼지, 습도, 일교차)
// 3. 5개의 버튼이 있다. - 1개는 현재위치, 4개는 다른도시
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.\
// 6. 데이터를 들고오는 동안 로딩 스피너

// + 우측 박스에는 날씨에 맞는 브리핑을 해준다.
// 텍스트를 음성으로 읽어준다.
// 하단 메뉴바 : 비오는날 우산 알림, 큰 일교차 외투 알림, 강한 햇볕 선크림 알림, 폭염or한파 외출 자제 알림,
//            미세먼지 및 황사 마스크 알림, 건조한날 안구건조증 약.

// 자외선
// 바람 wind, deg: 방향, gust: 바람세기, speed: 풍속
// 강우
// 체감온도 feelslike
// 습도 humidity
// 기압 pressure
// 가시거리 visibility

// 요일 별 날씨 : 요일, 아이콘, 최고기온, 최저기온

function App() {

  const [weather, setWeather]=useState(null);

  const apiKey = "a9496fdbcc2cce81628cd99797380bdb";
  
  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude 
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon)=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  }

  useEffect(()=>{
    getCurrentLocation();
    

  },[]);

  return (
    <div className='backgroundClear basic'>
      <div className='nothing'></div>

      {/* 메인 인포 섹션 */}
      <div className='mainSection'>
        {/* 좌측 박스 */}
        <LeftBox weather={weather}/>

        <WeatherButton/>

        {/* 우측 박스 */}
        <RightBox weather={weather}/>
      </div>

      {/* 메뉴 바 섹션 */}
      <MenuInfo weather={weather}/>
        
      {/* 요일별 날씨 섹션 */}
      <div className='daySection'>
        <div className='dayWeatherBox'></div>
        <div className='dayWeatherBox'></div>
        <div className='dayWeatherBox'></div>
        <div className='dayWeatherBox'></div>
        <div className='dayWeatherBox'></div>
        <div className='dayWeatherBox'></div>
        <div className='dayWeatherBox'></div>
      </div>

      
    </div>
  );
}

export default App;
