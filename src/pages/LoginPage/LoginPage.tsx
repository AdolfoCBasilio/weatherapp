import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
	const [input, setInput] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		const storedUsername = localStorage.getItem('username');
		if (storedUsername) {
			navigate('/weather');
		}
	}, [navigate]);

	const handleLogin = () => {
		localStorage.setItem('username', input);
		navigate('/weather');
	};

	return (
		<Container maxWidth="sm" sx={{ mt: 1 }}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}
			>
				<Typography variant="h4" component="h2" gutterBottom>
					Login
				</Typography>
				<TextField label="Username" variant="outlined" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your name" fullWidth margin="normal" />
				<Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }} fullWidth>
					Login
				</Button>
			</Box>
		</Container>
	);
};

export default LoginPage;
