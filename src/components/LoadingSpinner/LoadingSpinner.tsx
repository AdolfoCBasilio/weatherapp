import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner: React.FC = () => {
	return (
		<Box display="flex" justifyContent="center" alignItems="center" height="10vh">
			<CircularProgress />
		</Box>
	);
};

export default LoadingSpinner;
