// import { useState } from 'react';
// import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';

// export default function SearchPage() {
//     const [subject, setSubject] = useState('');
//     const [minRating, setMinRating] = useState('');
//     const [discussionBased, setDiscussionBased] = useState(false);
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState(null);

//     const handleSearch = async () => {
//         setError(null); // Reset any previous errors
//         try {
//             const response = await fetch('/api/search', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ subject, minRating, discussionBased })
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setResults(data.results);
//             } else {
//                 setError('Failed to fetch results');
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//             setError('An unexpected error occurred');
//         }
//     };

//     return (
//         <Box sx={{ padding: '20px' }}>
//             <Typography variant="h4" gutterBottom>Advanced Search</Typography>
//             <TextField
//                 label="Subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="Minimum Rating"
//                 value={minRating}
//                 onChange={(e) => setMinRating(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <FormControlLabel
//                 control={
//                     <Checkbox
//                         checked={discussionBased}
//                         onChange={(e) => setDiscussionBased(e.target.checked)}
//                     />
//                 }
//                 label="Discussion-Based Teaching"
//             />
//             <Button variant="contained" onClick={handleSearch}>Search</Button>

//             {error && (
//                 <Typography color="error" mt={2}>
//                     {error}
//                 </Typography>
//             )}

//             <Box mt={4}>
//                 {results.length > 0 ? (
//                     results.map((result, index) => (
//                         <Box key={index} mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
//                             <Typography variant="h6">{result.professor}</Typography>
//                             <Typography>Subject: {result.subject}</Typography>
//                             <Typography>Rating: {result.stars}</Typography>
//                             <Typography>{result.review}</Typography>
//                         </Box>
//                     ))
//                 ) : (
//                     <Typography>No results found</Typography>
//                 )}
//             </Box>
//         </Box>
//     );
// }


// import { useState } from 'react';
// import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
// import { getDocs, collection, query, where } from 'firebase/firestore';
// import { db } from '../firebase'; // Adjust the path according to your project structure

// export default function SearchPage() {
//     const [subject, setSubject] = useState('');
//     const [minRating, setMinRating] = useState('');
//     const [discussionBased, setDiscussionBased] = useState(false);
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState(null);

//     const handleSearch = async () => {
//         setError(null); // Reset any previous errors
//         try {
//             // Create a query for Firestore
//             const reviewsRef = collection(db, 'reviews');
//             let q = query(reviewsRef);

//             if (subject) {
//                 q = query(reviewsRef, where('subject', '==', subject));
//             }

//             if (minRating) {
//                 q = query(reviewsRef, where('stars', '>=', parseFloat(minRating)));
//             }

//             if (discussionBased) {
//                 // Assuming that the reviews include a text check for "discussion-based"
//                 q = query(reviewsRef, where('review', 'array-contains', 'discussion-based'));
//             }

//             const querySnapshot = await getDocs(q);
//             const reviews = [];

//             querySnapshot.forEach((doc) => {
//                 reviews.push(doc.data());
//             });

//             setResults(reviews);

//         } catch (error) {
//             console.error('Fetch error:', error);
//             setError('An unexpected error occurred');
//         }
//     };

//     return (
//         <Box sx={{ padding: '20px' }}>
//             <Typography variant="h4" gutterBottom>Advanced Search</Typography>
//             <TextField
//                 label="Subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="Minimum Rating"
//                 value={minRating}
//                 onChange={(e) => setMinRating(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <FormControlLabel
//                 control={
//                     <Checkbox
//                         checked={discussionBased}
//                         onChange={(e) => setDiscussionBased(e.target.checked)}
//                     />
//                 }
//                 label="Discussion-Based Teaching"
//             />
//             <Button variant="contained" onClick={handleSearch}>Search</Button>

//             {error && (
//                 <Typography color="error" mt={2}>
//                     {error}
//                 </Typography>
//             )}

//             <Box mt={4}>
//                 {results.length > 0 ? (
//                     results.map((result, index) => (
//                         <Box key={index} mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
//                             <Typography variant="h6">{result.professor}</Typography>
//                             <Typography>Subject: {result.subject}</Typography>
//                             <Typography>Rating: {result.stars}</Typography>
//                             <Typography>{result.review}</Typography>
//                         </Box>
//                     ))
//                 ) : (
//                     <Typography>No results found</Typography>
//                 )}
//             </Box>
//         </Box>
//     );
// }



// import { useState, useEffect } from 'react';
// import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../firebase'; // Adjust the path to your Firebase setup

// export default function SearchPage() {
//     const [subject, setSubject] = useState('');
//     const [minRating, setMinRating] = useState('');
//     const [knowledgeable, setKnowledgeable] = useState(false);
//     const [engaging, setEngaging] = useState(false);
//     const [responsive, setResponsive] = useState(false);
//     const [criticalThinking, setCriticalThinking] = useState(false);
//     const [results, setResults] = useState([]);
//     const [error, setError] = useState(null);

//     const handleSearch = async () => {
//         setError(null); // Reset any previous errors
//         try {
//             const reviewsQuery = collection(db, "reviews");
//             let q = query(reviewsQuery);

//             if (subject) {
//                 q = query(q, where("subject", "==", subject));
//             }
//             if (minRating) {
//                 q = query(q, where("rating", ">=", parseFloat(minRating)));
//             }

//             const querySnapshot = await getDocs(q);
//             const resultsArray = [];
//             querySnapshot.forEach((doc) => {
//                 const data = doc.data();
//                 if (
//                     (!knowledgeable || data.review.includes("knowledgeable")) &&
//                     (!engaging || data.review.includes("engaging")) &&
//                     (!responsive || data.review.includes("responsive")) &&
//                     (!criticalThinking || data.review.includes("critical thinking"))
//                 ) {
//                     resultsArray.push(data);
//                 }
//             });

//             setResults(resultsArray);
//         } catch (error) {
//             console.error('Fetch error:', error);
//             setError('An unexpected error occurred');
//         }
//     };

//     return (
//         <Box sx={{ padding: '20px' }}>
//             <Typography variant="h4" gutterBottom>Advanced Search</Typography>
//             <TextField
//                 label="Subject"
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <TextField
//                 label="Minimum Rating"
//                 value={minRating}
//                 onChange={(e) => setMinRating(e.target.value)}
//                 fullWidth
//                 margin="normal"
//             />
//             <FormControlLabel
//                 control={
//                     <Checkbox
//                         checked={knowledgeable}
//                         onChange={(e) => setKnowledgeable(e.target.checked)}
//                     />
//                 }
//                 label="Knowledgeable"
//             />
//             <FormControlLabel
//                 control={
//                     <Checkbox
//                         checked={engaging}
//                         onChange={(e) => setEngaging(e.target.checked)}
//                     />
//                 }
//                 label="Engaging"
//             />
//             <FormControlLabel
//                 control={
//                     <Checkbox
//                         checked={responsive}
//                         onChange={(e) => setResponsive(e.target.checked)}
//                     />
//                 }
//                 label="Responsive"
//             />
//             <FormControlLabel
//                 control={
//                     <Checkbox
//                         checked={criticalThinking}
//                         onChange={(e) => setCriticalThinking(e.target.checked)}
//                     />
//                 }
//                 label="Critical Thinking"
//             />
//             <Button variant="contained" onClick={handleSearch}>Search</Button>

//             {error && (
//                 <Typography color="error" mt={2}>
//                     {error}
//                 </Typography>
//             )}

//             <Box mt={4}>
//                 {results.length > 0 ? (
//                     results.map((result, index) => (
//                         <Box key={index} mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
//                             <Typography variant="h6">{result.professor}</Typography>
//                             <Typography>Subject: {result.subject}</Typography>
//                             <Typography>Rating: {result.rating}</Typography>
//                             <Typography>{result.review}</Typography>
//                         </Box>
//                     ))
//                 ) : (
//                     <Typography>No results found</Typography>
//                 )}
//             </Box>
//         </Box>
//     );
// }


import { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct
import axios from 'axios'; // Import axios for Pinecone API call

export default function SearchPage() {
    const [subject, setSubject] = useState('');
    const [minRating, setMinRating] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [allReviews, setAllReviews] = useState([]); // To hold all fetched reviews

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch reviews from Firebase
                const reviewsCollection = collection(db, 'professor_reviews/reviews');
                const q = query(reviewsCollection);
                const querySnapshot = await getDocs(q);
                const firebaseReviews = [];

                querySnapshot.forEach((doc) => {
                    console.log('Fetched review:', doc.data()); // Debug log
                    firebaseReviews.push(doc.data());
                });

                setAllReviews(firebaseReviews); // Store all fetched reviews
                setResults(firebaseReviews); // Display all fetched reviews initially
            } catch (error) {
                console.error('Error fetching reviews from Firebase:', error);
                setError('An unexpected error occurred while fetching reviews');
            }
        };

        fetchData();
    }, []);

    const handleSearch = async () => {
        try {
            // Fetch results from Firebase
            const filteredResults = allReviews.filter(review => {
                return (
                    (subject ? review.subject.toLowerCase().includes(subject.toLowerCase()) : true) &&
                    (minRating ? review.stars >= parseFloat(minRating) : true)
                );
            });

            console.log('Filtered Results from Firebase:', filteredResults);

            // Fetch results from Pinecone
            const pineconeResponse = await axios.post('/api/pineconeSearch', {
                subject,
                minRating: parseFloat(minRating) || 0,
            });

            const pineconeResults = pineconeResponse.data.results || [];
            console.log('Results from Pinecone:', pineconeResults);

            // Combine both results
            const combinedResults = [...filteredResults, ...pineconeResults];

            if (combinedResults.length === 0) {
                setError('No results found');
            } else {
                setError(null);
            }

            setResults(combinedResults);
        } catch (error) {
            console.error('Error during search:', error);
            setError('An unexpected error occurred during the search');
        }
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Advanced Search</Typography>
            <TextField
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Minimum Rating"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                fullWidth
                margin="normal"
                type="number"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={minRating > 0}
                        onChange={(e) => setMinRating(e.target.checked ? '1' : '')}
                    />
                }
                label="Minimum Rating 1+"
            />
            <Button variant="contained" onClick={handleSearch}>Search</Button>

            {error && (
                <Typography color="error" mt={2}>
                    {error}
                </Typography>
            )}

            <Box mt={4}>
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <Box key={index} mb={3} p={2} border="1px solid #ddd" borderRadius="4px">
                            <Typography variant="h6">{result.professor}</Typography>
                            <Typography>Subject: {result.subject}</Typography>
                            <Typography>Rating: {result.stars}</Typography>
                            <Typography>{result.review}</Typography>
                        </Box>
                    ))
                ) : (
                    !error && <Typography>No results found</Typography>
                )}
            </Box>
        </Box>
    );
}
