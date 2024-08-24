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



// import { readFile } from 'fs/promises';
// import path from 'path';

// export async function POST(req) {
//     const data = await req.json();
//     const text = data[data.length - 1].content.toLowerCase();

//     // Load the latest reviews from reviews.json
//     const filePath = path.join(process.cwd(), 'reviews.json');
//     const jsonData = await readFile(filePath, 'utf8');
//     const reviews = JSON.parse(jsonData).reviews;

//     // Debugging: Log the user query and reviews data
//     console.log("User Query:", text);
//     console.log("Loaded reviews from JSON:", reviews);

//     // Manual matching logic - case-insensitive matching
//     const manualMatches = reviews.filter((review) =>
//         review.professor.toLowerCase().includes(text) ||
//         review.subject.toLowerCase().includes(text) ||
//         text.includes(String(review.stars)) ||
//         review.review.toLowerCase().includes(text)
//     );

//     // Debugging: Log the matched reviews
//     console.log("Manual matches found:", manualMatches);

//     let resultString = '\n\nReturned results from manual matches: ';
//     if (manualMatches.length > 0) {
//         manualMatches.forEach((match) => {
//             resultString += `Professor: ${match.professor}\nSubject: ${match.subject}\nStars: ${match.stars}\nReview: ${match.review}\n\n`;
//         });
//     } else {
//         resultString += "No manual matches found.";
//     }

//     // (Pinecone search logic would go here)

//     const lastMessage = data[data.length - 1];
//     const lastMessageContent = lastMessage.content + resultString;
//     const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
//     const completion = await openai.chat.completions.create({
//         messages: [
//             { role: 'system', content: systemPrompt },
//             ...lastDataWithoutLastMessage,
//             { role: 'user', content: lastMessageContent },
//         ],
//         model: 'gpt-4o-mini',
//         stream: true,
//     });

//     const stream = new ReadableStream({
//         async start(controller) {
//             const encoder = new TextEncoder();
//             try {
//                 for await (const chunk of completion) {
//                     const content = chunk.choices[0]?.delta?.content;
//                     if (content) {
//                         const text = encoder.encode(content);
//                         controller.enqueue(text);
//                     }
//                 }
//             } catch (err) {
//                 controller.error(err);
//             } finally {
//                 controller.close();
//             }
//         },
//     });

//     return new NextResponse(stream);
// }
