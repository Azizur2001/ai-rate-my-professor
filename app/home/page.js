// 'use client'

// import { Box, Button, Typography, AppBar, Toolbar } from "@mui/material";
// import { useRouter } from 'next/navigation';

// export default function Home() {
//   const router = useRouter();

//   const handleGetStarted = () => {
//     router.push('/signup');  // Redirect to the signup page
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
//         <Box textAlign="center">
//           <Typography variant="h3" gutterBottom>
//             Welcome to Rate My Professor AI Assistant
//           </Typography>
//           <Typography variant="h6" gutterBottom>
//             Your journey to better professor reviews starts here.
//           </Typography>
//           <Button 
//             variant="contained" 
//             color="primary" 
//             size="large" 
//             onClick={handleGetStarted}
//             sx={{ mt: 4 }}
//           >
//             Get Started
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }



// 'use client'

// import { Box, Typography, Button, AppBar, Toolbar } from "@mui/material";
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";

// export default function Home() {
//   const router = useRouter();
  
//   // State declarations
//   const [fadeInHero, setFadeInHero] = useState(false);
//   const [fadeInFeatures, setFadeInFeatures] = useState(false);
//   const [fadeInCTA, setFadeInCTA] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY + window.innerHeight;

//       if (scrollPosition > document.getElementById('hero-section').offsetTop + 200) {
//         setFadeInHero(true);
//       }
//       if (scrollPosition > document.getElementById('features-section').offsetTop + 200) {
//         setFadeInFeatures(true);
//       }
//       if (scrollPosition > document.getElementById('cta-section').offsetTop + 200) {
//         setFadeInCTA(true);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleGetStarted = () => {
//     router.push('/signup');  // Redirect to the signup page
//   };

//   return (
//     <Box
//       width="100vw"
//       display="flex"
//       flexDirection="column"
//       style={{ scrollBehavior: "smooth" }}
//     >
//       {/* Navbar */}
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Rate My Professor AI Assistant
//           </Typography>
//           <Button color="inherit" onClick={() => router.push('/login')}>
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <Box
//         id="hero-section"
//         height="100vh"
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         textAlign="center"
//         bgcolor="primary.main"
//         color="white"
//         style={{
//           opacity: fadeInHero ? 1 : 0,
//           transform: fadeInHero ? 'translateY(0)' : 'translateY(20px)',
//           transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
//         }}
//       >
//         <Typography variant="h3" gutterBottom>
//           Welcome to the Future of Professor Ratings
//         </Typography>
//         <Typography variant="h6" gutterBottom>
//           Discover insights with our AI-powered chatbot designed to give you the information you need, fast.
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="secondary" 
//           size="large" 
//           onClick={handleGetStarted}
//           sx={{ mt: 4 }}
//         >
//           Get Started
//         </Button>
//       </Box>

//       {/* Features Section */}
//       <Box
//         id="features-section"
//         height="100vh"
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         textAlign="center"
//         bgcolor="secondary.main"
//         color="white"
//         p={3}
//         style={{
//           opacity: fadeInFeatures ? 1 : 0,
//           transform: fadeInFeatures ? 'translateY(0)' : 'translateY(20px)',
//           transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Why Choose Our AI Chatbot?
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Our chatbot leverages advanced AI to analyze and deliver comprehensive professor reviews, so you can make informed decisions about your education.
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Seamlessly interact with a system that learns from your queries, providing more accurate results over time.
//         </Typography>
//       </Box>

//       {/* Call to Action Section */}
//       <Box
//         id="cta-section"
//         height="100vh"
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         textAlign="center"
//         bgcolor="primary.light"
//         color="black"
//         p={3}
//         style={{
//           opacity: fadeInCTA ? 1 : 0,
//           transform: fadeInCTA ? 'translateY(0)' : 'translateY(20px)',
//           transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Get Started Today
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Join thousands of students who are using our AI-powered platform to get ahead in their academic journey.
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           size="large" 
//           onClick={handleGetStarted}
//           sx={{ mt: 4 }}
//         >
//           Sign Up Now
//         </Button>
//       </Box>
//     </Box>
//   );
// }




"use client";

import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Home() {
  const router = useRouter();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  const [fadeInHero, setFadeInHero] = useState(false);
  const [fadeInFeatures, setFadeInFeatures] = useState(false);
  const [fadeInCTA, setFadeInCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      const heroSection = document.getElementById("hero-section");
      const featuresSection = document.getElementById("features-section");
      const ctaSection = document.getElementById("cta-section");

      if (
        heroSection &&
        scrollPosition > heroSection.offsetTop + heroSection.offsetHeight / 2
      ) {
        setFadeInHero(true);
      }
      if (
        featuresSection &&
        scrollPosition > featuresSection.offsetTop + featuresSection.offsetHeight / 2
      ) {
        setFadeInFeatures(true);
      }
      if (
        ctaSection &&
        scrollPosition > ctaSection.offsetTop + ctaSection.offsetHeight / 2
      ) {
        setFadeInCTA(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    router.push("/signup"); // Redirect to the signup page
  };

  return (
    <Box width="100%" minHeight="100vh" bgcolor={theme.palette.background.default}>
      {/* Navbar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rate My Professor AI Assistant
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        id="hero-section"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        px={3}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          opacity: fadeInHero ? 1 : 0,
          transform: fadeInHero ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease-in-out",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Future of Professor Ratings
        </Typography>
        <Typography variant="h6" gutterBottom>
          Discover insights with our AI-powered chatbot designed to give you the information you need, fast.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleGetStarted}
          sx={{ mt: 4 }}
        >
          Get Started
        </Button>
      </Box>

      {/* Features Section */}
      <Box
        id="features-section"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        px={3}
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          opacity: fadeInFeatures ? 1 : 0,
          transform: fadeInFeatures ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease-in-out",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Why Choose Our AI Chatbot?
        </Typography>
        <Typography variant="body1" paragraph maxWidth="600px">
          Our chatbot leverages advanced AI to analyze and deliver comprehensive professor reviews, so you can make informed decisions about your education.
        </Typography>
        <Typography variant="body1" paragraph maxWidth="600px">
          Seamlessly interact with a system that learns from your queries, providing more accurate results over time.
        </Typography>
      </Box>

      {/* Call to Action Section */}
      <Box
        id="cta-section"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        px={3}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          opacity: fadeInCTA ? 1 : 0,
          transform: fadeInCTA ? "translateY(0)" : "translateY(20px)",
          transition: "all 1s ease-in-out",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Get Started Today
        </Typography>
        <Typography variant="body1" paragraph maxWidth="600px">
          Join thousands of students who are using our AI-powered platform to get ahead in their academic journey.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
          sx={{ mt: 4 }}
        >
          Sign Up Now
        </Button>
      </Box>
    </Box>
  );
}
