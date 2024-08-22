// 'use client'

// import { TextField, Box, Button, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
// import { useState, useContext } from "react";
// import { useRouter } from 'next/navigation';
// import { auth } from '../../firebase';
// import { signInWithEmailAndPassword } from "firebase/auth";
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { ThemeContext } from '../ThemeContext';

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  
//   const { mode, toggleTheme } = useContext(ThemeContext);

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       router.push('/ai-rmp');  // Redirect to chatbot page after login
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//     >
//       {/* Navbar */}
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Rate My Professor AI Assistant
//           </Typography>
//           <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
//             {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//           <Button color="inherit" onClick={() => router.push('/home')}>
//             Home
//           </Button>
//           <Button color="inherit" onClick={() => router.push('/signup')}>
//             Sign Up
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Main Content */}
//       <Box
//         flexGrow={1}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         p={3}
//       >
//         <Box
//           width="400px"
//           p={4}
//           border="1px solid black"
//           borderRadius={8}
//           sx={{
//             bgcolor: mode === 'dark' ? 'background.paper' : 'background.default',
//             color: mode === 'dark' ? 'text.primary' : 'text.secondary',
//           }}
//         >
//           <Typography variant="h5" mb={2}>
//             Login
//           </Typography>
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{ input: { color: mode === 'dark' ? 'text.primary' : 'text.secondary' } }}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={{ input: { color: mode === 'dark' ? 'text.primary' : 'text.secondary' } }}
//           />
//           {error && <Typography color="error">{error}</Typography>}
//           <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 3 }}>
//             Log In
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }


'use client'

import { TextField, Box, Button, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../ThemeContext';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { mode, toggleTheme } = useContext(ThemeContext);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/ai-rmp');  // Redirect to chatbot page after login
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
    >
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rate My Professor AI Assistant
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color="inherit" onClick={() => router.push('/home')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => router.push('/signup')}>
            Sign Up
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
          borderRadius={8}
          sx={{
            bgcolor: mode === 'dark' ? 'background.paper' : 'background.default',
            color: mode === 'dark' ? 'text.primary' : 'text.secondary',
            borderColor: mode === 'dark' ? 'text.primary' : 'text.secondary'
          }}
        >
          <Typography variant="h5" mb={2} sx={{
            fontSize: {
              xs: '1.5rem', // Smaller font on mobile
              sm: '2rem'   // Larger font on larger screens
            },
          }}>
            Login
          </Typography>
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
            onClick={handleLogin} 
            sx={{ 
              mt: 3,
              fontSize: {
                xs: '1rem', // Smaller font on mobile
                sm: '1.25rem' // Larger font on larger screens
              },
            }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
