// 'use client'

// import { TextField, Box, Button, Stack, AppBar, Toolbar, Typography } from "@mui/material";
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from "react";
// import { auth } from '../../firebase';  // Adjust the path as needed
// import { onAuthStateChanged, signOut } from "firebase/auth";

// export default function AiRmp() {
//   const router = useRouter();
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: "Hi, I'm the Rate My Professor support assistant. How can I help you today?"
//     }
//   ]);

//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (!user) {
//         router.push('/login');  // Redirect to login if not authenticated
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const sendMessage = async () => {
//     setMessages((messages) => [
//       ...messages,
//       { role: "user", content: message },
//       { role: "assistant", content: '' }
//     ]);

//     setMessage('');
//     const response = fetch('/api/chat', {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify([...messages, { role: 'user', content: message }]),
//     }).then(async (res) => {
//       const reader = res.body.getReader();
//       const decoder = new TextDecoder();

//       let result = '';
//       return reader.read().then(function processText({ done, value }) {
//         if (done) {
//           return result;
//         }
//         const text = decoder.decode(value || new Uint8Array(), { stream: true });
//         setMessages((messages) => {
//           let lastMessage = messages[messages.length - 1];
//           let otherMessages = messages.slice(0, messages.length - 1);
//           return [
//             ...otherMessages,
//             { ...lastMessage, content: lastMessage.content + text },
//           ];
//         });

//         return reader.read().then(processText);
//       });
//     });
//   };

//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       router.push('/login');  // Redirect to login after logout
//     });
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
//           <Button color="inherit" onClick={() => router.push('/home')}>
//             Home
//           </Button>
//           <Button color="inherit" onClick={handleLogout}>
//             Logout
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
//         <Stack 
//           direction="column" 
//           width="500px" 
//           height="500px" 
//           border="1px solid black" 
//           p={2} 
//           spacing={3}
//         >
//           <Stack 
//             direction="column" 
//             spacing={2} 
//             flexGrow={1} 
//             overflow='auto'
//             maxHeight='100%'
//           >
//             {messages.map((message, index) => (
//               <Box 
//                 key={index} 
//                 display="flex" 
//                 justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
//               >
//                 <Box 
//                 bgcolor={ 
//                   message.role === 'assistant' ? 'primary.main': 'secondary.main'
//                 }
//                 color="white"
//                 borderRadius={16}
//                 p={3}
//                 >
//                   {message.content}
//                 </Box>
//               </Box>
//             ))}
//           </Stack>
//           <Stack direction="row" spacing={2}>
//             <TextField
//               label="Message"
//               fullWidth
//               value={message}
//               onChange={(e) => {
//                 setMessage(e.target.value)
//               }}
//             />
//             <Button variant='contained' onClick={sendMessage}>
//               Send
//             </Button>
//           </Stack>
//         </Stack>
//       </Box>
//     </Box>
//   )
// }


'use client'

import { TextField, Box, Button, Stack, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from "react";
import { auth } from '../../firebase';  // Adjust the path as needed
import { onAuthStateChanged, signOut } from "firebase/auth";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../ThemeContext';

export default function AiRmp() {
  const router = useRouter();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm the Rate My Professor support assistant. How can I help you today?"
    }
  ]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');  // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' }
    ]);

    setMessage('');
    const response = fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = '';
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });

        return reader.read().then(processText);
      });
    });
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/login');  // Redirect to login after logout
    });
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rate My Professor AI Assistant
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color="inherit" onClick={() => router.push('/home')}>
            Home
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
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
        <Stack 
          direction="column" 
          width="500px" 
          height="500px" 
          border="1px solid"
          borderColor={mode === 'dark' ? 'text.primary' : 'text.secondary'}
          p={2} 
          spacing={3}
          sx={{
            bgcolor: mode === 'dark' ? 'background.paper' : 'background.default',
            color: mode === 'dark' ? 'text.primary' : 'text.secondary',
          }}
        >
          <Stack 
            direction="column" 
            spacing={2} 
            flexGrow={1} 
            overflow='auto'
            maxHeight='100%'
          >
            {messages.map((message, index) => (
              <Box 
                key={index} 
                display="flex" 
                justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
              >
                <Box 
                bgcolor={ 
                  message.role === 'assistant' ? 'primary.main': 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
              sx={{ input: { color: mode === 'dark' ? 'text.primary' : 'text.secondary' } }}
            />
            <Button variant='contained' onClick={sendMessage}>
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}
