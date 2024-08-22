// 'use client'

// import { TextField, Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
// import { useState } from "react";
// import { useRouter } from 'next/navigation';
// import { auth } from '../../firebase';
// import { createUserWithEmailAndPassword } from "firebase/auth";

// export default function SignUp() {
//   const router = useRouter();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSignUp = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       router.push('/');  // Redirect to home page after sign up
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
//           <Button color="inherit" onClick={() => router.push('/')}>
//             Home
//           </Button>
//           <Button color="inherit" onClick={() => router.push('/login')}>
//             Login
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
//         >
//           <Typography variant="h5" mb={2}>
//             Sign Up
//           </Typography>
//           <TextField
//             label="Name"
//             fullWidth
//             margin="normal"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <Typography color="error">{error}</Typography>}
//           <Button variant="contained" fullWidth onClick={handleSignUp} sx={{ mt: 3 }}>
//             Sign Up
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

'use client'

import { TextField, Box, Button, AppBar, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    >
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rate My Professor AI Assistant
          </Typography>
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
      >
        <Box
          width="400px"
          p={4}
          border="1px solid black"
          borderRadius={8}
        >
          <Typography variant="h5" mb={2}>
            Sign Up
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" fullWidth onClick={handleSignUp} sx={{ mt: 3 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
