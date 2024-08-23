// 'use client'

// import { useState, useContext } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   AppBar,
//   Toolbar,
//   IconButton,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Card,
//   CardContent,
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { ThemeContext } from '../ThemeContext';

// export default function SearchPage() {
//   const [subject, setSubject] = useState('');
//   const [minRating, setMinRating] = useState('');
//   const [discussionBased, setDiscussionBased] = useState(false);
//   const [keywords, setKeywords] = useState({
//     knowledgeable: false,
//     engaging: false,
//     responsive: false,
//     criticalThinking: false,
//   });
//   const [results, setResults] = useState([]);
//   const [error, setError] = useState('');

//   const theme = useTheme();
//   const { mode, toggleTheme } = useContext(ThemeContext);

//   const handleSearch = async () => {
//     try {
//       const searchCriteria = {
//         subject,
//         minRating: parseInt(minRating) || 0,
//         discussionBased,
//         keywords: Object.keys(keywords).filter((key) => keywords[key]),
//       };

//       const response = await fetch('/api/search', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(searchCriteria),
//       });

//       if (!response.ok) {
//         throw new Error('An unexpected error occurred');
//       }

//       const data = await response.json();
//       setResults(data.results);
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
//       sx={{
//         bgcolor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//       }}
//     >
//       {/* Navbar */}
//       <AppBar position="static" color="primary" sx={{ padding: '0 2rem' }}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h6">Rate My Professor AI Assistant</Typography>
//           <Box>
//             <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
//               {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
//             </IconButton>
//             <Button color="inherit" onClick={() => window.history.back()}>
//               Back
//             </Button>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Search Form */}
//       <Box my={3} mx={4}>
//         <Typography variant="h4" gutterBottom>
//           Advanced Search
//         </Typography>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Subject"
//               variant="outlined"
//               fullWidth
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextField
//               label="Minimum Rating"
//               variant="outlined"
//               fullWidth
//               type="number"
//               value={minRating}
//               onChange={(e) => setMinRating(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//           </Grid>
//         </Grid>

//         {/* Keywords Filter */}
//         <Box mt={2}>
//           <Typography variant="h6">Filter by Keywords:</Typography>
//           <Grid container spacing={1}>
//             {Object.keys(keywords).map((key) => (
//               <Grid item key={key}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={keywords[key]}
//                       onChange={(e) =>
//                         setKeywords({ ...keywords, [key]: e.target.checked })
//                       }
//                     />
//                   }
//                   label={key.charAt(0).toUpperCase() + key.slice(1)}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Box mt={3}>
//           <Button variant="contained" color="primary" onClick={handleSearch}>
//             Search
//           </Button>
//         </Box>

//         {/* Error Message */}
//         {error && (
//           <Typography color="error" mt={2}>
//             {error}
//           </Typography>
//         )}

//         {/* Search Results */}
//         <Box mt={4}>
//           {results.length > 0 ? (
//             results.map((result, index) => (
//               <Card key={index} sx={{ mb: 2 }}>
//                 <CardContent>
//                   <Typography variant="h6">{result.professor}</Typography>
//                   <Typography variant="body2">
//                     <strong>Subject:</strong> {result.subject}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Rating:</strong> {result.stars}
//                   </Typography>
//                   <Typography variant="body2">{result.review}</Typography>
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Typography>No results found</Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }


'use client';

import { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '../ThemeContext';

export default function SearchPage() {
  const [subject, setSubject] = useState('');
  const [minRating, setMinRating] = useState('');
  const [discussionBased, setDiscussionBased] = useState(false);
  const [keywords, setKeywords] = useState({
    knowledgeable: false,
    engaging: false,
    responsive: false,
    criticalThinking: false,
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const theme = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const handleSearch = async () => {
    try {
      const searchCriteria = {
        subject,
        minRating: parseInt(minRating) || 0,
        discussionBased,
        keywords: Object.keys(keywords).filter((key) => keywords[key]),
      };

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchCriteria),
      });

      if (!response.ok) {
        throw new Error('An unexpected error occurred');
      }

      const data = await response.json();
      setResults(data.results);
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
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Navbar */}
      <AppBar position="static" color="primary" sx={{ padding: { xs: '0 1rem', md: '0 2rem' } }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Rate My Professor AI Assistant</Typography>
          <Box>
            <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button color="inherit" onClick={() => window.history.back()}>
              Back
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search Form */}
      <Box my={3} mx={{ xs: 2, md: 4 }}>
        <Typography variant="h4" gutterBottom>
          Advanced Search
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Minimum Rating"
              variant="outlined"
              fullWidth
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
          </Grid>
        </Grid>

        {/* Keywords Filter */}
        <Box mt={2}>
          <Typography variant="h6">Filter by Keywords:</Typography>
          <Grid container spacing={1}>
            {Object.keys(keywords).map((key) => (
              <Grid item xs={6} sm={4} md={2} key={key}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={keywords[key]}
                      onChange={(e) =>
                        setKeywords({ ...keywords, [key]: e.target.checked })
                      }
                    />
                  }
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth={{ xs: true, sm: false }}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Search
          </Button>
        </Box>

        {/* Error Message */}
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        {/* Search Results */}
        <Box mt={4}>
          {results.length > 0 ? (
            results.map((result, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{result.professor}</Typography>
                  <Typography variant="body2">
                    <strong>Subject:</strong> {result.subject}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Rating:</strong> {result.stars}
                  </Typography>
                  <Typography variant="body2">{result.review}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No results found</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
