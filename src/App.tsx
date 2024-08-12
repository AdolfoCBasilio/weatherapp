import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import LoginPage from './pages/LoginPage/LoginPage';
import WeatherPage from './pages/WeatherPage/WeatherPage';

const App: React.FC = () => {
	return (
		<WeatherProvider>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/weather" element={<WeatherPage />} />
				</Routes>
			</Router>
		</WeatherProvider>
	);
};

export default App;
