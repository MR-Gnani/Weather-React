import moment from 'moment-timezone'
import React from 'react'

const DayBox = ({dayWeather}) => {
    // dayWeather가 존재하고 list가 존재하는지 확인.
    if (!dayWeather || !dayWeather.list) return null;

    // 각 날짜별로 최고기온과 최저기온을 저장할 객체를 초기화.
    const temperaturesByDay = {};

    // 각 날짜별로 최고기온과 최저기온을 저장.
    dayWeather.list.forEach(data => {
        const date = new Date(data.dt * 1000);
        const dayOfWeek = moment(date).format("dddd");
        const temperature = Math.round(data.main.temp);
        const iconCode = data.weather[0].icon;

        // 해당 요일에 대한 데이터가 없으면 초기화.
        if (!temperaturesByDay[dayOfWeek]) {
            temperaturesByDay[dayOfWeek] = {
                max: -Infinity,
                min: Infinity,
                icon: iconCode
            };
        }

        // 최고기온과 최저기온을 업데이트.
        if (temperature > temperaturesByDay[dayOfWeek].max) {
            temperaturesByDay[dayOfWeek].max = temperature;
        }
        if (temperature < temperaturesByDay[dayOfWeek].min) {
            temperaturesByDay[dayOfWeek].min = temperature;
        }
    });

    return (
        <div className='daySection'>
            {Object.keys(temperaturesByDay).map((dayOfWeek, index) => (
                <div key={index} className='dayWeatherBox'>
                    <div>{dayOfWeek}</div>
                    <img className='weatherIcon' src={`http://openweathermap.org/img/wn/${temperaturesByDay[dayOfWeek].icon}@4x.png`} alt="weather icon" />
                    <div>{temperaturesByDay[dayOfWeek].max}°C</div> 
                    <div>{temperaturesByDay[dayOfWeek].min}°C</div>
                </div>
            ))}
        </div>
    );
}

export default DayBox
