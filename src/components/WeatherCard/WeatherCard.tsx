import React from 'react';
import { WeatherData } from '../../api/weatherService';
import { Card, CardContent, Typography, IconButton, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface WeatherCardProps {
	city: string;
	onRemove: () => void;
	data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ onRemove, data }) => {
	return (
		<Card
			sx={{
				border: '1px solid #ccc',
				borderRadius: '8px',
				padding: '16px',
				margin: '8px',
				position: 'relative',
				maxWidth: 300,
			}}
		>
			<CardContent>
				<Typography variant="h6" component="div">
					{data.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Temperature: {data.main.temp} °C
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Humidity: {data.main.humidity} %
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Wind Speed: {data.wind.speed} m/s
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{data.weather[0].description}
				</Typography>
				<CardMedia component="img" image={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].description} sx={{ width: 100, height: 100, marginTop: 2 }} />
				<IconButton
					onClick={onRemove}
					sx={{
						position: 'absolute',
						top: '8px',
						right: '8px',
						cursor: 'pointer',
					}}
					aria-label="remove"
				>
					<CloseIcon />
				</IconButton>
			</CardContent>
		</Card>
	);
};

export default WeatherCard;
