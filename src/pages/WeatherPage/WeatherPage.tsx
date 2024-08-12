import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useWeather } from '../../context/WeatherContext';
import { fetchWeather, WeatherData } from '../../api/weatherService';
import SearchInput from '../../components/SearchInput/SearchInput';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import { Box, Button, Typography, List, ListItem, Alert, Container } from '@mui/material';

const WeatherPage: React.FC = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string | null>(null);
	const [cities, setCities] = useState<string[]>([]);
	const [weatherData, setWeatherData] = useState<Array<{ city: string; data: WeatherData }>>([]);
	const { loading, setLoading, error, setError } = useWeather();

	useEffect(() => {
		const storedUsername = localStorage.getItem('username');
		if (!storedUsername) {
			navigate('/');
		} else {
			setUsername(storedUsername);
		}
	}, [navigate]);

	const handleLogout = () => {
		localStorage.removeItem('username');
		navigate('/');
	};

	const handleSearch = async (city: string) => {
		if (weatherData.some((entry) => entry.city.toLowerCase() === city.toLowerCase())) {
			setError(`The city "${city}" is already in the list.`);
			return;
		}
		setLoading(true);
		try {
			const data = await fetchWeather(city);
			setWeatherData([...weatherData, { city, data }]);
			setError(null);
			if (!cities.includes(city)) {
				setCities([...cities, city]);
			}
		} catch (err) {
			setError('Failed to fetch weather data');
		} finally {
			setLoading(false);
		}
	};

	const handleRemoveCity = (cityToRemove: string) => {
		setCities(cities.filter((city) => city !== cityToRemove));
		setWeatherData(weatherData.filter((entry) => entry.city !== cityToRemove));
	};

	interface ArrowProps {
		className?: string;
		style?: React.CSSProperties;
		onClick?: () => void;
		currentSlide?: number;
		slideCount?: number;
	}

	const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick, currentSlide, slideCount }) => {
		if (currentSlide !== undefined && slideCount !== undefined && currentSlide >= slideCount - 3) {
			return null;
		}
		return <div className={className} style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }} onClick={onClick} />;
	};

	const SamplePrevArrow: React.FC<ArrowProps> = ({ className, style, onClick, currentSlide }) => {
		if (currentSlide === 0) return null;
		return <div className={className} style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }} onClick={onClick} />;
	};

	const slidesToShow = Math.min(3, weatherData.length);

	const settings = {
		dots: true,
		infinite: false,
		speed: 300,
		slidesToShow,
		slidesToScroll: 1,
		nextArrow: weatherData.length > slidesToShow ? <SampleNextArrow /> : undefined,
		prevArrow: weatherData.length > slidesToShow ? <SamplePrevArrow /> : undefined,
	};

	return (
		<Container maxWidth="md" sx={{ mt: 1 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mb={2} borderBottom={1} borderColor="divider" pb={1}>
				<Typography variant="h6">Welcome, {username}!</Typography>
				<Button variant="contained" color="primary" onClick={handleLogout}>
					Logout
				</Button>
			</Box>
			{error && (
				<Alert severity="error" sx={{ mt: 2 }}>
					{error}
				</Alert>
			)}
			<SearchInput onSearch={handleSearch} />
			{cities.length > 0 && (
				<List sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 0 }}>
					{cities.map((city) => (
						<ListItem key={city} sx={{ padding: '0 10px', width: 'auto' }}>
							{city}
						</ListItem>
					))}
				</List>
			)}
			{weatherData.length > 0 && (
				<Box sx={{ mt: 0, width: '100%' }}>
					<Slider {...settings}>
						{weatherData.map((entry) => (
							<Box key={entry.city} p={2}>
								<WeatherCard city={entry.city} onRemove={() => handleRemoveCity(entry.city)} data={entry.data} />
							</Box>
						))}
					</Slider>
				</Box>
			)}
			{loading && <LoadingSpinner />}
		</Container>
	);
};

export default WeatherPage;
