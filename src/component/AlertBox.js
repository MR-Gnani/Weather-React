import React from 'react'

const AlertBox = ({weather, dayWeather}) => {
    console.log("ww", weather)
    console.log("dd", dayWeather)
    const checkList = () => {
        const alerts = [];
        if (weather) {
            // 1. weather.weather[0].main에 "rain" 이 포함되어 있을 경우
            if (weather.weather[0].main.toLowerCase().includes("rain")) {
                alerts.push("비가 오고 있습니다. 우산을 꼭 챙겨주세요.");
            }

            // 2. (dayWeather.List[0].pop)*100 > 66 이면
            if (dayWeather?.list[0]?.pop * 100 > 66) {
                alerts.push("이후 3시간 내에 비가 내릴 확률이 높습니다. 외출 시 우산을 챙기세요.");
            }

            // 3. weather.main.humidity < 30 이면
            if (weather.main.humidity < 30) {
                alerts.push("많이 건조합니다. 물을 자주 마시고 보습제를 사용하는 것이 좋습니다.");
            }

            // 4. weather.main.temp_max - weather.main.temp_min > 10 이면
            if (weather.main.temp_max - weather.main.temp_min > 10) {
                alerts.push("일교차가 큽니다. 외투를 준비하시고 온도 변화에 신경을 써주세요.");
            }
        }
        return alerts;
    }

    const alerts = checkList();
  return (
    <div className='alertBox'>
        {alerts.length > 0 &&
            <p>
                {alerts.map((alert, index) => (
                    <span key={index}>{alert}<br/></span>
                ))}
            </p>
        }
        {alerts.length === 0 &&
            <p>No alerts</p>
        }
    </div>
  )
}

export default AlertBox
