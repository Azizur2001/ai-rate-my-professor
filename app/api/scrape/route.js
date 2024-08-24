import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(req) {
    const url = req.nextUrl.searchParams.get('url');

    if (!url) {
        return new Response(JSON.stringify({ error: 'No URL provided' }), { status: 400 });
    }

    try {
        const { data } = await axios.get(url);
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

        // Save this review to the database (or JSON file)
        const filePath = path.join(process.cwd(), 'reviews.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const reviewsData = JSON.parse(fileContent);

        reviewsData.reviews.push({
            professor: professorName,
            subject: subject,
            stars: parseFloat(selectedRating),
            review: selectedReview
        });

        await fs.writeFile(filePath, JSON.stringify(reviewsData, null, 2));

        return new Response(JSON.stringify({ 
            name: professorName, 
            rating: selectedRating, 
            review: selectedReview,
            subject: subject 
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: `Failed to scrape and save the data: ${error.message}` }), { status: 500 });
    }
}



