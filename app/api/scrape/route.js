// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import { promises as fs } from 'fs';
// import path from 'path';

// export async function GET(req) {
//     const url = req.nextUrl.searchParams.get('url');

//     if (!url) {
//         return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
//     }

//     try {
//         const { data } = await axios.get(url);
//         const $ = cheerio.load(data);

//         // Scrape professor's first and last name
//         const firstName = $('div.NameTitle__Name-dowf0z-0.cfjPUG span:first-of-type').text().trim();
//         const lastName = $('span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();
//         const professorName = `${firstName} ${lastName}`;

//         // Scrape all reviews for this professor
//         const reviews = $('div.Comments__StyledComments-dzzyvm-0.gRjWel').map((i, element) => {
//             return $(element).text().trim();
//         }).get();

//         // Scrape ratings associated with each review by looking for "Quality" headers
//         const ratings = [];
//         $('div.CardNumRating__CardNumRatingHeader-sc-17t4b9u-1.fVETNc').each((i, element) => {
//             const qualityLabel = $(element).text().trim();
//             if (qualityLabel === "Quality") {
//                 const ratingElement = $(element).next('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN');
//                 const rating = ratingElement.text().trim();
//                 if (rating) {
//                     ratings.push(rating);
//                 }
//             }
//         });

//         // Scrape the subject
//         const subject = $('div.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS').first().text().trim();

//         if (!professorName || reviews.length === 0 || ratings.length === 0 || !subject) {
//             throw new Error('Failed to scrape all necessary data.');
//         }

//         // Randomly select one review
//         const randomIndex = Math.floor(Math.random() * reviews.length);
//         const selectedReview = reviews[randomIndex];
//         const selectedRating = ratings[randomIndex];

//         // Save this review to the database (or JSON file)
//         const filePath = path.join(process.cwd(), 'reviews.json');
//         const fileContent = await fs.readFile(filePath, 'utf-8');
//         const reviewsData = JSON.parse(fileContent);

//         reviewsData.reviews.push({
//             professor: professorName,
//             subject: subject,
//             stars: parseFloat(selectedRating),
//             review: selectedReview
//         });

//         await fs.writeFile(filePath, JSON.stringify(reviewsData, null, 2));

//         return new Response(JSON.stringify({ 
//             name: professorName, 
//             rating: selectedRating, 
//             review: selectedReview,
//             subject: subject 
//         }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: `Failed to scrape and save the data: ${error.message}` }), { status: 500 });
//     }
// }



// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import { promises as fs } from 'fs';
// import path from 'path';

// export async function GET(req) {
//     const url = req.nextUrl.searchParams.get('url');

//     if (!url) {
//         return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
//     }

//     try {
//         // Make the request using ScraperAPI
//         const { data } = await axios.get('https://api.scraperapi.com', {
//             params: {
//                 api_key: process.env.SCRAPER_API_KEY, // Your ScraperAPI key from environment variables
//                 url: url,
//                 render: true, // Render JavaScript content if necessary
//             },
//         });

//         const $ = cheerio.load(data);

//         // Scrape professor's first and last name
//         const firstName = $('div.NameTitle__Name-dowf0z-0.cfjPUG span:first-of-type').text().trim();
//         const lastName = $('span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();
//         const professorName = `${firstName} ${lastName}`;

//         // Scrape all reviews for this professor
//         const reviews = $('div.Comments__StyledComments-dzzyvm-0.gRjWel').map((i, element) => {
//             return $(element).text().trim();
//         }).get();

//         // Scrape ratings associated with each review by looking for "Quality" headers
//         const ratings = [];
//         $('div.CardNumRating__CardNumRatingHeader-sc-17t4b9u-1.fVETNc').each((i, element) => {
//             const qualityLabel = $(element).text().trim();
//             if (qualityLabel === "Quality") {
//                 const ratingElement = $(element).next('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN');
//                 const rating = ratingElement.text().trim();
//                 if (rating) {
//                     ratings.push(rating);
//                 }
//             }
//         });

//         // Scrape the subject
//         const subject = $('div.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS').first().text().trim();

//         if (!professorName || reviews.length === 0 || ratings.length === 0 || !subject) {
//             throw new Error('Failed to scrape all necessary data.');
//         }

//         // Randomly select one review
//         const randomIndex = Math.floor(Math.random() * reviews.length);
//         const selectedReview = reviews[randomIndex];
//         const selectedRating = ratings[randomIndex];

//         // Save this review to the database (or JSON file)
//         const filePath = path.join(process.cwd(), 'reviews.json');
//         const fileContent = await fs.readFile(filePath, 'utf-8');
//         const reviewsData = JSON.parse(fileContent);

//         reviewsData.reviews.push({
//             professor: professorName,
//             subject: subject,
//             stars: parseFloat(selectedRating),
//             review: selectedReview
//         });

//         await fs.writeFile(filePath, JSON.stringify(reviewsData, null, 2));

//         return new Response(JSON.stringify({ 
//             name: professorName, 
//             rating: selectedRating, 
//             review: selectedReview,
//             subject: subject 
//         }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: `Failed to scrape and save the data: ${error.message}` }), { status: 500 });
//     }
// }



// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import { promises as fs } from 'fs';
// import path from 'path';

// export async function GET(req) {
//     const url = req.nextUrl.searchParams.get('url');

//     if (!url) {
//         return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
//     }

//     try {
//         // Use ScraperAPI to fetch the content from the provided URL
//         const { data } = await axios.get(`http://api.scraperapi.com`, {
//             params: {
//                 api_key: process.env.SCRAPER_API_KEY,
//                 url: url,
//             },
//             timeout: 10000,  // Add a timeout in milliseconds
//         });
    
//         // Load the HTML data using cheerio
//         const $ = cheerio.load(data);

//         // Scrape professor's first and last name
//         const firstName = $('div.NameTitle__Name-dowf0z-0.cfjPUG span:first-of-type').text().trim();
//         const lastName = $('span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();
//         const professorName = `${firstName} ${lastName}`;

//         // Scrape all reviews for this professor
//         const reviews = $('div.Comments__StyledComments-dzzyvm-0.gRjWel').map((i, element) => {
//             return $(element).text().trim();
//         }).get();

//         // Scrape ratings associated with each review by looking for "Quality" headers
//         const ratings = [];
//         $('div.CardNumRating__CardNumRatingHeader-sc-17t4b9u-1.fVETNc').each((i, element) => {
//             const qualityLabel = $(element).text().trim();
//             if (qualityLabel === "Quality") {
//                 const ratingElement = $(element).next('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN');
//                 const rating = ratingElement.text().trim();
//                 if (rating) {
//                     ratings.push(rating);
//                 }
//             }
//         });

//         // Scrape the subject
//         const subject = $('div.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS').first().text().trim();

//         if (!professorName || reviews.length === 0 || ratings.length === 0 || !subject) {
//             throw new Error('Failed to scrape all necessary data.');
//         }

//         // Randomly select one review
//         const randomIndex = Math.floor(Math.random() * reviews.length);
//         const selectedReview = reviews[randomIndex];
//         const selectedRating = ratings[randomIndex];

//         // Save this review to the database (or JSON file)
//         const filePath = path.join(process.cwd(), 'reviews.json');
//         const fileContent = await fs.readFile(filePath, 'utf-8');
//         const reviewsData = JSON.parse(fileContent);

//         reviewsData.reviews.push({
//             professor: professorName,
//             subject: subject,
//             stars: parseFloat(selectedRating),
//             review: selectedReview
//         });

//         await fs.writeFile(filePath, JSON.stringify(reviewsData, null, 2));

//         return new Response(JSON.stringify({ 
//             name: professorName, 
//             rating: selectedRating, 
//             review: selectedReview,
//             subject: subject 
//         }), { status: 200 });
//     } catch (error) {
//         console.error('Error occurred during scraping:', error.message);
//         return new Response(JSON.stringify({ error: `Failed to fetch and parse the data: ${error.message}` }), { status: 500 });
//     }
// }



// import axios from 'axios';
// import * as cheerio from 'cheerio';

// export async function GET(req) {
//     const url = req.nextUrl.searchParams.get('url');

//     if (!url) {
//         return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
//     }

//     try {
//         // Use ScraperAPI to fetch the content from the provided URL
//         const { data } = await axios.get(`http://api.scraperapi.com`, {
//             params: {
//                 api_key: process.env.SCRAPER_API_KEY,
//                 url: url,
//             },
//             timeout: 10000,  // Add a timeout in milliseconds
//         });

//         // Load the HTML data using cheerio
//         const $ = cheerio.load(data);

//         // Scrape professor's first and last name
//         const firstName = $('div.NameTitle__Name-dowf0z-0.cfjPUG span:first-of-type').text().trim();
//         const lastName = $('span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();
//         const professorName = `${firstName} ${lastName}`;

//         // Scrape all reviews for this professor
//         const reviews = $('div.Comments__StyledComments-dzzyvm-0.gRjWel').map((i, element) => {
//             return $(element).text().trim();
//         }).get();

//         // Scrape ratings associated with each review by looking for "Quality" headers
//         const ratings = [];
//         $('div.CardNumRating__CardNumRatingHeader-sc-17t4b9u-1.fVETNc').each((i, element) => {
//             const qualityLabel = $(element).text().trim();
//             if (qualityLabel === "Quality") {
//                 const ratingElement = $(element).next('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN');
//                 const rating = ratingElement.text().trim();
//                 if (rating) {
//                     ratings.push(rating);
//                 }
//             }
//         });

//         // Scrape the subject
//         const subject = $('div.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS').first().text().trim();

//         if (!professorName || reviews.length === 0 || ratings.length === 0 || !subject) {
//             throw new Error('Failed to scrape all necessary data.');
//         }

//         // Randomly select one review
//         const randomIndex = Math.floor(Math.random() * reviews.length);
//         const selectedReview = reviews[randomIndex];
//         const selectedRating = ratings[randomIndex];

//         // Return the data directly without writing it to a file
//         return new Response(JSON.stringify({ 
//             name: professorName, 
//             rating: selectedRating, 
//             review: selectedReview,
//             subject: subject 
//         }), { status: 200 });
//     } catch (error) {
//         console.error('Error occurred during scraping:', error.message);
//         return new Response(JSON.stringify({ error: `Failed to fetch and parse the data: ${error.message}` }), { status: 500 });
//     }
// }


// import axios from 'axios';
// import * as cheerio from 'cheerio';

// export async function GET(req) {
//     const url = req.nextUrl.searchParams.get('url');

//     if (!url) {
//         return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
//     }

//     try {
//         // Use ScraperAPI to fetch the content from the provided URL
//         const { data } = await axios.get(`http://api.scraperapi.com`, {
//             params: {
//                 api_key: process.env.SCRAPER_API_KEY,
//                 url: url,
//             },
//             timeout: 10000,  // Add a timeout in milliseconds
//         });

//         // Load the HTML data using cheerio
//         const $ = cheerio.load(data);

//         // Scrape professor's first and last name
//         const firstName = $('div.NameTitle__Name-dowf0z-0.cfjPUG span:first-of-type').text().trim();
//         const lastName = $('span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();
//         const professorName = `${firstName} ${lastName}`;

//         // Scrape all reviews for this professor
//         const reviews = $('div.Comments__StyledComments-dzzyvm-0.gRjWel').map((i, element) => {
//             return $(element).text().trim();
//         }).get();

//         // Scrape ratings associated with each review by looking for "Quality" headers
//         const ratings = [];
//         $('div.CardNumRating__CardNumRatingHeader-sc-17t4b9u-1.fVETNc').each((i, element) => {
//             const qualityLabel = $(element).text().trim();
//             if (qualityLabel === "Quality") {
//                 const ratingElement = $(element).next('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN');
//                 const rating = ratingElement.text().trim();
//                 if (rating) {
//                     ratings.push(rating);
//                 }
//             }
//         });

//         // Scrape the subject
//         const subject = $('div.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS').first().text().trim();

//         if (!professorName || reviews.length === 0 || ratings.length === 0 || !subject) {
//             throw new Error('Failed to scrape all necessary data.');
//         }

//         // Randomly select one review
//         const randomIndex = Math.floor(Math.random() * reviews.length);
//         const selectedReview = reviews[randomIndex];
//         const selectedRating = ratings[randomIndex];

//         // Return the data directly without writing it to a file
//         return new Response(JSON.stringify({ 
//             name: professorName, 
//             rating: selectedRating, 
//             review: selectedReview,
//             subject: subject 
//         }), { status: 200 });
//     } catch (error) {
//         console.error('Error occurred during scraping:', error.message);
//         return new Response(JSON.stringify({ error: `Failed to fetch and parse the data: ${error.message}` }), { status: 500 });
//     }
// }



// import axios from 'axios';
// import * as cheerio from 'cheerio';

// export async function GET(req) {
//     const url = req.nextUrl.searchParams.get('url');

//     if (!url) {
//         return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
//     }

//     try {
//         // Use ScraperAPI to fetch the content from the provided URL
//         const { data } = await axios.get(`http://api.scraperapi.com`, {
//             params: {
//                 api_key: process.env.SCRAPER_API_KEY,
//                 url: url,
//             },
//             timeout: 10000,  // Add a timeout in milliseconds
//         });

//         // Load the HTML data using cheerio
//         const $ = cheerio.load(data);

//         // Scrape professor's first and last name
//         const firstName = $('div.NameTitle__Name-dowf0z-0.cfjPUG span:first-of-type').text().trim();
//         const lastName = $('span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();
//         const professorName = `${firstName} ${lastName}`;

//         // Scrape all reviews for this professor
//         const reviews = $('div.Comments__StyledComments-dzzyvm-0.gRjWel').map((i, element) => {
//             return $(element).text().trim();
//         }).get();

//         // Scrape ratings associated with each review by looking for "Quality" headers
//         const ratings = [];
//         $('div.CardNumRating__CardNumRatingHeader-sc-17t4b9u-1.fVETNc').each((i, element) => {
//             const qualityLabel = $(element).text().trim();
//             if (qualityLabel === "Quality") {
//                 const ratingElement = $(element).next('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN');
//                 const rating = ratingElement.text().trim();
//                 if (rating) {
//                     ratings.push(rating);
//                 }
//             }
//         });

//         // Scrape the subject
//         const subject = $('div.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS').first().text().trim();

//         if (!professorName || reviews.length === 0 || ratings.length === 0 || !subject) {
//             throw new Error('Failed to scrape all necessary data.');
//         }

//         // Randomly select one review
//         const randomIndex = Math.floor(Math.random() * reviews.length);
//         const selectedReview = reviews[randomIndex];
//         const selectedRating = ratings[randomIndex];

//         // Return the data directly without writing it to a file
//         return new Response(JSON.stringify({ 
//             name: professorName, 
//             rating: selectedRating, 
//             review: selectedReview,
//             subject: subject 
//         }), { status: 200 });
//     } catch (error) {
//         console.error('Error occurred during scraping:', error.message);
//         return new Response(JSON.stringify({ error: `Failed to fetch and parse the data: ${error.message}` }), { status: 500 });
//     }
// }




import axios from 'axios';
import * as cheerio from 'cheerio';
import { db } from '../../../firebase'; // Make sure the path to your firebase.js is correct
import { collection, addDoc } from 'firebase/firestore';

export async function GET(req) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
    }

    try {
        // Use ScraperAPI to fetch the content from the provided URL
        const { data } = await axios.get(`http://api.scraperapi.com`, {
            params: {
                api_key: process.env.SCRAPER_API_KEY,
                url: url,
            },
            timeout: 10000,  // Add a timeout in milliseconds
        });

        // Load the HTML data using cheerio
        const $ = cheerio.load(data);

        // Scrape professor's first and last name
        const firstName = $('div.NameTitle__Name-dowf0z-0.cfjPUG span:first-of-type').text().trim();
        const lastName = $('span.NameTitle__LastNameWrapper-dowf0z-2').text().trim();
        const professorName = `${firstName} ${lastName}`;

        // Scrape all reviews for this professor
        const reviews = $('div.Comments__StyledComments-dzzyvm-0.gRjWel').map((i, element) => {
            return $(element).text().trim();
        }).get();

        // Scrape ratings associated with each review by looking for "Quality" headers
        const ratings = [];
        $('div.CardNumRating__CardNumRatingHeader-sc-17t4b9u-1.fVETNc').each((i, element) => {
            const qualityLabel = $(element).text().trim();
            if (qualityLabel === "Quality") {
                const ratingElement = $(element).next('div.CardNumRating__CardNumRatingNumber-sc-17t4b9u-2.gcFhmN');
                const rating = ratingElement.text().trim();
                if (rating) {
                    ratings.push(rating);
                }
            }
        });

        // Scrape the subject
        const subject = $('div.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS').first().text().trim();

        if (!professorName || reviews.length === 0 || ratings.length === 0 || !subject) {
            throw new Error('Failed to scrape all necessary data.');
        }

        // Randomly select one review
        const randomIndex = Math.floor(Math.random() * reviews.length);
        const selectedReview = reviews[randomIndex];
        const selectedRating = ratings[randomIndex];

        // Store the scraped data in Firestore
        await addDoc(collection(db, "reviews"), {
            professor: professorName,
            subject: subject,
            stars: parseFloat(selectedRating),
            review: selectedReview,
            scrapedAt: new Date().toISOString() // Adding a timestamp for reference
        });

        // Return the data directly
        return new Response(JSON.stringify({ 
            name: professorName, 
            rating: selectedRating, 
            review: selectedReview,
            subject: subject 
        }), { status: 200 });
    } catch (error) {
        console.error('Error occurred during scraping:', error.message);
        return new Response(JSON.stringify({ error: `Failed to fetch and parse the data: ${error.message}` }), { status: 500 });
    }
}

