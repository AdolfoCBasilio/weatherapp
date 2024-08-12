import axios from 'axios';

const API_KEY = '37d81fe357e7878aa9a8cd40bdd2f8fd';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
	main: {
		temp: number;
		humidity: number;
	};
	wind: {
		speed: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
	name: string;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
	const response = await axios.get(`${BASE_URL}/weather`, {
		params: {
			q: city,
			appid: API_KEY,
			units: 'metric',
		},
	});
	return response.data;
};
