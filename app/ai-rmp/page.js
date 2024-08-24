'use client';

import { TextField, Box, Button, Stack, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from "react";
import { auth } from '../../firebase';  // Adjust the path as needed
import { onAuthStateChanged, signOut } from "firebase/auth";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../ThemeContext';
import Image from "next/image";  // Import Image component from Next.js

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
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Image 
              src="/logo.png"  // Path to your logo
              alt="Logo" 
              width={40}  // Adjust the width as needed
              height={40}  // Adjust the height as needed
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
        sx={{
          flexDirection: {
            xs: 'column', // Stack vertically on small screens
            md: 'row', // Align items side-by-side on medium and up screens
          }
        }}
      >
        <Stack 
          direction="column" 
          width={{
            xs: '100%', // Full width on small screens
            sm: '80%',  // 80% width on small screens
            md: '500px', // Fixed width on medium screens and up
          }}
          height={{
            xs: 'auto', // Auto height on small screens
            md: '600px', // Increased height on medium screens and up
          }}
          border="1px solid"
          borderColor={mode === 'dark' ? 'text.primary' : 'text.secondary'}
          borderRadius={2} // Rounded corners
          p={2} 
          spacing={3}
          sx={{
            bgcolor: mode === 'dark' ? 'background.paper' : 'background.default',
            color: mode === 'dark' ? 'text.primary' : 'text.secondary',
            boxShadow: 3, // Adding shadow for depth
          }}
        >
          <Stack 
            direction="column" 
            spacing={2} 
            flexGrow={1} 
            overflow='auto'
            maxHeight='100%'
            sx={{
              '&::-webkit-scrollbar': {
                width: '0.4em',
              },
              '&::-webkit-scrollbar-track': {
                background: mode === 'dark' ? '#444' : '#ddd',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: mode === 'dark' ? '#888' : '#aaa',
                borderRadius: '10px',
              },
            }}
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
                  p={2}
                  sx={{
                    maxWidth: {
                      xs: '100%', // Full width on small screens
                      sm: '75%', // 75% width on medium screens
                      md: '80%', // 60% width on large screens
                    },
                    boxShadow: 3, // Adding shadow to message boxes
                  }}
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
              sx={{
                input: { 
                  color: mode === 'dark' ? 'text.primary' : 'text.secondary',
                  backgroundColor: mode === 'dark' ? 'background.default' : 'background.paper', 
                  borderRadius: 1, 
                  padding: '10px 15px', // Adding padding for better touch experience
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'text.primary' : 'text.secondary',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? 'primary.light' : 'primary.dark',
                  },
                },
              }}
            />
            <Button 
              variant='contained' 
              onClick={sendMessage}
              sx={{
                width: {
                  xs: '100%', // Full width button on small screens
                  sm: 'auto', // Auto width on larger screens
                },
                bgcolor: 'secondary.main',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                },
              }}
            >
              Send
            </Button>
          </Stack>
          <Button 
            variant="contained" 
            onClick={() => router.push('/search')} 
            sx={{ mt: 2, width: '100%', bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}>
            Advanced Search
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
