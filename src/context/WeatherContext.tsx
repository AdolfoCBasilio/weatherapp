import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WeatherData } from '../api/weatherService';

interface WeatherContextType {
	weatherData: WeatherData | null;
	setWeatherData: (data: WeatherData | null) => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
	error: string | null;
	setError: (error: string | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = (): WeatherContextType => {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error('useWeather must be used within a WeatherProvider');
	}
	return context;
};

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	return (
		<WeatherContext.Provider
			value={{
				weatherData,
				setWeatherData,
				loading,
				setLoading,
				error,
				setError,
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
};
