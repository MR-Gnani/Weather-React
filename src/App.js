import { useEffect, useState } from 'react';
import './App.css';
import LeftBox from './component/LeftBox';
import RightBox from './component/RightBox';
import WeatherButton from './component/WeatherButton';
import MenuInfo from './component/MenuInfo';
import DayBox from './component/DayBox';
import AlertBox from './component/AlertBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";


// 1. 앱이 실행되면 현재 위치 기반의 날씨를 보여준다.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태정보를 보여준다.(미세먼지, 습도, 일교차)
// 3. 5개의 버튼이 있다. - 1개는 현재위치, 4개는 다른도시
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.\
// 6. 데이터를 들고오는 동안 로딩 스피너

// + 우측 박스에는 날씨에 맞는 브리핑을 해준다.
// 텍스트를 음성으로 읽어준다.
// 하단 메뉴바 : 비오는날 우산 알림, 큰 일교차 외투 알림, 
//            , 건조한날 안구건조증 약.

function App() {

  const [weather, setWeather]=useState(null);
  const [dayWeather, setDayWeather]=useState(null);
  const cities = ["Current Location", "paris", "new york", "tokyo", "seoul", "vienna", "barcelona",
  "london", "vancouver", "berlin", "sydney", "melbourne", "shanghai", "san francisco",
  "hanoi", "helsinki", "sapporo", "moscow", "bern", "rio de janeiro", "toronto"
  ];
  const [city, setCity]=useState("");
  const [loading, setLoading]=useState(false);


  const apiKey = "a9496fdbcc2cce81628cd99797380bdb";

 // 배경 이미지를 동적으로 설정하는 함수
 const setBackgroundStyle = () => {
  if (weather && weather.weather && weather.weather[0] && weather.weather[0].main) {
    const weatherCondition = weather.weather[0].main.toLowerCase();
    if (weatherCondition.includes("clear")) {
      return "backgroundClear";
    } else if (weatherCondition.includes("rain")) {
      return "backgroundRain";
    } else if (weatherCondition.includes("clouds")) {
      return "backgroundCloudy";
    } else if (weatherCondition.includes("mist")) {
      return "backgroundMist";
    } else if (weatherCondition.includes("clouds")) {
      return "backgroundThunder";
    } else if (weatherCondition.includes("snow")) {
      return "backgroundSnow";
    }
  }
  return null;
};
  
  const getCurrentLocation = ()=>{
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude 
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon);
      getDayWeather(lat, lon);
      setLoading(false);
    });
  }

  const getDayWeather = async(lat, lon)=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setDayWeather(data);
    setLoading(false);
  }

  const getWeatherByCurrentLocation = async(lat, lon)=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const getWeatherByCity = async()=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  }

  const getDayWeatherByCity = async()=>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setDayWeather(data);
    setLoading(false);
  }

  useEffect(()=>{
    if(city === "" || city === null){
      getCurrentLocation();
    } else {
      getWeatherByCity();
      getDayWeatherByCity();
    }
  },[city]);

  return (
    <div className={`backgroundClear ${setBackgroundStyle()} basic`}>
      
      {loading? (
      <div className='center'>
        <ClipLoader
        color= "#FFFFFF"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
      </div>
        
      ) : (
    <div>
      <div className='nothing'></div>

      {/* 메인 인포 섹션 */}
      <div className='mainSection'>
        {/* 좌측 박스 */}
        <LeftBox weather={weather}/>
        <div>
        <WeatherButton cities={cities} setCity={setCity} city={city}/>
        <AlertBox weather={weather} dayWeather={dayWeather}/>
        </div>
        

        {/* 우측 박스 */}
        <RightBox weather={weather}/>
      </div>

      {/* 메뉴 바 섹션 */}
      <MenuInfo weather={weather}/>
        
      {/* 요일별 날씨 섹션 */}
      <DayBox dayWeather={dayWeather}/>
          </div>
            
      )}
    </div>
  );
}

export default App;
