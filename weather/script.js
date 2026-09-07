const TOKYO_LAT = 35.6762;
const TOKYO_LON = 139.6503;

const WEATHER_CODE_MAP = {
  0: { label: "快晴", icon: "☀️" },
  1: { label: "晴れ", icon: "🌤️" },
  2: { label: "薄曇り", icon: "⛅" },
  3: { label: "曇り", icon: "☁️" },
  45: { label: "霧", icon: "🌫️" },
  48: { label: "霧氷", icon: "🌫️" },
  51: { label: "小雨", icon: "🌦️" },
  53: { label: "雨", icon: "🌦️" },
  55: { label: "強い霧雨", icon: "🌧️" },
  56: { label: "着氷性の霧雨", icon: "🌧️" },
  57: { label: "強い着氷性の霧雨", icon: "🌧️" },
  61: { label: "小雨", icon: "🌧️" },
  63: { label: "雨", icon: "🌧️" },
  65: { label: "強い雨", icon: "🌧️" },
  66: { label: "着氷性の雨", icon: "🌧️" },
  67: { label: "強い着氷性の雨", icon: "🌧️" },
  71: { label: "小雪", icon: "🌨️" },
  73: { label: "雪", icon: "🌨️" },
  75: { label: "強い雪", icon: "❄️" },
  77: { label: "霧雪", icon: "❄️" },
  80: { label: "にわか雨", icon: "🌦️" },
  81: { label: "にわか雨", icon: "🌧️" },
  82: { label: "激しいにわか雨", icon: "⛈️" },
  85: { label: "にわか雪", icon: "🌨️" },
  86: { label: "激しいにわか雪", icon: "❄️" },
  95: { label: "雷雨", icon: "⛈️" },
  96: { label: "雷雨(ひょう)", icon: "⛈️" },
  99: { label: "激しい雷雨(ひょう)", icon: "⛈️" },
};

function getWeatherInfo(code) {
  return WEATHER_CODE_MAP[code] || { label: "不明", icon: "❓" };
}

function formatToday() {
  const now = new Date();
  return now.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

function formatDayLabel(dateStr, index) {
  if (index === 0) return "今日";
  if (index === 1) return "明日";
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" }) +
    "(" + date.toLocaleDateString("ja-JP", { weekday: "short" }) + ")";
}

async function fetchWeather() {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${TOKYO_LAT}&longitude=${TOKYO_LON}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=Asia%2FTokyo&forecast_days=7`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
}

function renderCurrent(data) {
  const container = document.getElementById("current-weather");
  const current = data.current;
  const weather = getWeatherInfo(current.weather_code);

  container.innerHTML = `
    <div class="current-icon">${weather.icon}</div>
    <div class="current-temp">${Math.round(current.temperature_2m)}°</div>
    <div class="current-label">${weather.label}</div>
    <div class="current-details">
      <div>体感<span class="detail-value">${Math.round(current.apparent_temperature)}°</span></div>
      <div>湿度<span class="detail-value">${Math.round(current.relative_humidity_2m)}%</span></div>
      <div>風速<span class="detail-value">${Math.round(current.wind_speed_10m)}m/s</span></div>
    </div>
  `;
}

function renderForecast(data) {
  const list = document.getElementById("forecast-list");
  const daily = data.daily;
  list.innerHTML = "";

  daily.time.forEach((dateStr, i) => {
    const weather = getWeatherInfo(daily.weather_code[i]);
    const li = document.createElement("li");
    li.className = "forecast-card";
    li.innerHTML = `
      <div class="day">${formatDayLabel(dateStr, i)}</div>
      <div class="icon">${weather.icon}</div>
      <div class="temps">
        <span class="temp-max">${Math.round(daily.temperature_2m_max[i])}°</span>
        <span class="temp-min">/ ${Math.round(daily.temperature_2m_min[i])}°</span>
      </div>
    `;
    list.appendChild(li);
  });
}

function renderError() {
  const container = document.getElementById("current-weather");
  container.innerHTML = `<p class="error">天気情報の取得に失敗しました。<br>時間をおいて再度お試しください。</p>`;
}

async function init() {
  document.getElementById("today-date").textContent = formatToday();
  try {
    const data = await fetchWeather();
    renderCurrent(data);
    renderForecast(data);
  } catch (err) {
    renderError();
  }
}

init();
