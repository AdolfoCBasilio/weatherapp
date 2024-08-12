import React, { useState } from 'react';
import { countries } from '../../constants/countries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { TextField, InputAdornment, IconButton, List, ListItem, ListItemIcon, ListItemText, Box, Typography, Paper } from '@mui/material';

interface SearchInputProps {
	onSearch: (city: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
	const [city, setCity] = useState('');
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCity(value);

		if (value.length > 0) {
			const filteredSuggestions = countries.filter((country) => country.toLowerCase().startsWith(value.toLowerCase()));
			setSuggestions(filteredSuggestions);
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = (suggestion: string) => {
		setCity(suggestion);
		setSuggestions([]);
		onSearch(suggestion);
		setCity('');
	};

	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				minWidth: 300,
				mt: 2,
				mb: 2,
			}}
		>
			<Typography variant="subtitle2" sx={{ ml: 2, color: '#34495e' }}>
				Country input
			</Typography>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					backgroundColor: '#2c3e50',
					borderRadius: 1,
					p: 1,
					mt: 1,
				}}
			>
				<InputAdornment position="start">
					<FontAwesomeIcon icon={faUser} style={{ color: 'white', marginRight: 8 }} />
				</InputAdornment>
				<TextField
					value={city}
					onChange={handleChange}
					placeholder="Text Input (autocomplete)..."
					fullWidth
					variant="standard"
					InputProps={{
						disableUnderline: true,
						sx: {
							color: 'white',
							'&::placeholder': {
								color: 'white',
								opacity: 1,
							},
						},
					}}
				/>
				<IconButton sx={{ color: 'white' }}>
					<FontAwesomeIcon icon={faChevronDown} />
				</IconButton>
			</Box>
			{suggestions.length > 0 && (
				<Paper sx={{ mt: 1, borderRadius: 1, boxShadow: 1 }}>
					<List
						sx={{
							maxHeight: 200,
							overflowY: 'auto',
							bgcolor: 'background.paper',
						}}
					>
						{suggestions.map((suggestion, index) => (
							<ListItem
								key={index}
								button
								onClick={() => handleSuggestionClick(suggestion)}
								sx={{
									display: 'flex',
									alignItems: 'center',
									'&:hover': {
										bgcolor: '#f0f0f0',
									},
								}}
							>
								<ListItemIcon>
									<FontAwesomeIcon icon={faUser} style={{ color: '#34495e', marginRight: 8 }} />
								</ListItemIcon>
								<ListItemText primary={suggestion} />
							</ListItem>
						))}
					</List>
				</Paper>
			)}
		</Box>
	);
};

export default SearchInput;
