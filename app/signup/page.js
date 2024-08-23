'use client'

import { TextField, Box, Button, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../ThemeContext';
import Image from 'next/image';  // Import Image component from Next.js

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { mode, toggleTheme } = useContext(ThemeContext);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/ai-rmp');  // Redirect to chatbot page after sign up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      sx={{
        bgcolor: mode === 'dark' ? 'background.default' : 'background.paper',
        color: mode === 'dark' ? 'text.primary' : 'text.secondary',
      }}
    >
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Image 
              src="/logo.png" // Path to your logo
              alt="Logo" 
              width={40} // Adjust the width as needed
              height={40} // Adjust the height as needed
            />
            <Typography variant="h6" sx={{ ml: 2 }}>
              ProfInsight AI
            </Typography>
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color="inherit" onClick={() => router.push('/home')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push('/login')}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        sx={{
          px: {
            xs: 2, // Padding for small screens
            sm: 3, // Padding for medium screens and up
          },
        }}
      >
        <Box
          width={{
            xs: '100%',  // Full width on small screens
            sm: '80%',   // 80% width on medium screens
            md: '400px'  // Fixed width on large screens
          }}
          p={4}
          border="1px solid"
          borderColor={mode === 'dark' ? 'text.primary' : 'text.secondary'}
          borderRadius={8}
          sx={{
            bgcolor: mode === 'dark' ? 'background.paper' : 'background.default',
            color: mode === 'dark' ? 'text.primary' : 'text.secondary',
          }}
        >
          <Typography variant="h5" mb={2} sx={{
            fontSize: {
              xs: '1.5rem', // Smaller font on mobile
              sm: '2rem'   // Larger font on larger screens
            },
          }}>
            Sign Up
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              input: { color: mode === 'dark' ? 'text.primary' : 'text.secondary' },
            }}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: mode === 'dark' ? 'text.primary' : 'text.secondary' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: mode === 'dark' ? 'text.primary' : 'text.secondary' },
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleSignUp} 
            sx={{ 
              mt: 3,
              fontSize: {
                xs: '1rem', // Smaller font on mobile
                sm: '1.25rem' // Larger font on larger screens
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
