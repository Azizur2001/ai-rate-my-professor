import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const { subject, minRating, discussionBased, keywords } = await req.json();

  try {
    const filePath = path.join(process.cwd(), 'reviews.json');
    const jsonData = await readFile(filePath, 'utf8');
    const reviews = JSON.parse(jsonData).reviews;

    let filteredReviews = reviews;

    if (subject) {
      filteredReviews = filteredReviews.filter(review =>
        review.subject.toLowerCase() === subject.toLowerCase()
      );
    }

    if (minRating) {
      filteredReviews = filteredReviews.filter(review =>
        review.stars >= minRating
      );
    }

    if (keywords && keywords.length > 0) {
      filteredReviews = filteredReviews.filter(review =>
        keywords.some(keyword => review.review.toLowerCase().includes(keyword.toLowerCase()))
      );
    }

    return new Response(JSON.stringify({ results: filteredReviews }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
