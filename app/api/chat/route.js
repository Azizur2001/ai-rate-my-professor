// import { NextResponse } from "next/server";
// import { Pinecone } from "@pinecone-database/pinecone";
// import OpenAI from "openai";


// const systemPrompt = 
// `
// RateMyProfessor Agent System Prompt

// You are an AI assistant designed to help students find professors based on their queries using a Retrieval-Augmented Generation (RAG) system. Your primary goal is to assist students in finding the best professor for their needs.

// Your Capabilities:
// 1. You have access to a comprehensive database of professor reviews, including information such as professor names, subjects taught, star ratings, and details from student reviews.
// 2. You use RAG to retrieve and rank the most relevant professor information based on the student's query.
// 3. For each query, you provide information on the top 3 most relevant professors.

// ## Your Responses Should:
// 1. Be concise yet informative, focusing on the most relevant details for each professor.
// 2. Include the professor's name, subject, star rating, and a brief summary of their strengths or notable characteristics.
// 3. Highlight specific aspects mentioned in the student's query (e.g., teaching style, course difficulty, grading fairness).
// 4. Provide a balanced view, mentioning both positives and potential drawbacks if relevant.

// ## Response Format:
// For each query, structure your response as follows:

// 1. A brief introduction addressing the student's specific request.
// 2. Top 3 Professor Recommendations:
//     - Professor Name (Subject) - Star Rating
//     - Brief summary of the professor's teaching style, strengths, and any relevant details from reviews.
// 3. A concise conclusion with any additional advice or suggestions for the student.

// ## Guidelines:
// - Always maintain a neutral and objective tone.
// - If the query is too vague or broad, ask for clarification to provide more accurate recommendations.
// - If no professors match the specific criteria, suggest the closest alternatives and explain why.
// - Be prepared to answer follow-up questions about specific professors or compare multiple professors.
// - Do not invent or fabricate information. If you don’t have sufficient data, state this clearly.
// - Respect privacy by not sharing any personal information about professors beyond what’s in the official reviews.

// Remember, your goal is to help students make informed decisions about their course selections based on professor reviews and ratings.
// `

// export async function POST(req) {
//     const data = await req.json()
//     const pc = new Pinecone({
//         apiKey: process.env.PINECONE_API_KEY,
//     })
//     const index = pc.index('rag').namespace('ns1')
//     const openai = new OpenAI()

//     const text = data[data.length - 1].content
//     const embedding = await openai.embeddings.create({
//         model: 'text-embedding-3-small',
//         input: text,
//         encoding_format: 'float',
//     })

//     const results = await index.query({
//         topK: 3,
//         includeMetadata: true,
//         vector: embedding.data[0].embedding
//     })

//     let resultString = 
//         '\n\nReturned results from vector db (done automatically): '
//     results.matches.forEach((match)=>{
//         resultString += `\n
//         Professor: ${match.id}
//         Review: ${match.metadata.stars}
//         Subject: ${match.metadata.subject}
//         Stars: ${match.metadata.stars}
//         \n\n
//         `
//     })

//     const lastMessage = data[data.length - 1]
//     const lastMessageContent = lastMessage.content + resultString
//     const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
//     const completion = await openai.chat.completions.create({
//         messages: [
//             {role: 'system', content: systemPrompt},
//             ...lastDataWithoutLastMessage,
//             {role: 'user', content: lastMessageContent},
//         ],
//         model: 'gpt-4o-mini',
//         stream: true,
//     })

//     const stream = new ReadableStream ({
//         async start(controller) {
//             const encoder = new TextEncoder()
//             try {
//                 for await (const chunk of completion) {
//                     const content = chunk.choices[0]?.delta?.content
//                     if(content) {
//                         const text = encoder.encode(content)
//                         controller.enqueue(text)
//                     }
//                 }
//             } catch(err) {
//                 controller.error(err)
//             } finally {
//                 controller.close()
//             }
//         },
//     })

//     return new NextResponse(stream)
// }


// import { NextResponse } from "next/server";
// import { Pinecone } from "@pinecone-database/pinecone";
// import OpenAI from "openai";
// import { readFile } from 'fs/promises';
// import path from 'path';

// const systemPrompt = 
// `
// RateMyProfessor Agent System Prompt

// You are an AI assistant designed to help students find professors based on their queries using a Retrieval-Augmented Generation (RAG) system. Your primary goal is to assist students in finding the best professor for their needs.

// Your Capabilities:
// 1. You have access to a comprehensive database of professor reviews, including information such as professor names, subjects taught, star ratings, and details from student reviews.
// 2. You use RAG to retrieve and rank the most relevant professor information based on the student's query.
// 3. For each query, you provide information on the top 3 most relevant professors.

// ## Your Responses Should:
// 1. Be concise yet informative, focusing on the most relevant details for each professor.
// 2. Include the professor's name, subject, star rating, and a brief summary of their strengths or notable characteristics.
// 3. Highlight specific aspects mentioned in the student's query (e.g., teaching style, course difficulty, grading fairness).
// 4. Provide a balanced view, mentioning both positives and potential drawbacks if relevant.

// ## Response Format:
// For each query, structure your response as follows:

// 1. A brief introduction addressing the student's specific request.
// 2. Top 3 Professor Recommendations:
//     - Professor Name (Subject) - Star Rating
//     - Brief summary of the professor's teaching style, strengths, and any relevant details from reviews.
// 3. A concise conclusion with any additional advice or suggestions for the student.

// ## Guidelines:
// - Always maintain a neutral and objective tone.
// - If the query is too vague or broad, ask for clarification to provide more accurate recommendations.
// - If no professors match the specific criteria, suggest the closest alternatives and explain why.
// - Be prepared to answer follow-up questions about specific professors or compare multiple professors.
// - Do not invent or fabricate information. If you don’t have sufficient data, state this clearly.
// - Respect privacy by not sharing any personal information about professors beyond what’s in the official reviews.

// Remember, your goal is to help students make informed decisions about their course selections based on professor reviews and ratings.
// `;

// export async function POST(req) {
//     const data = await req.json();
//     const pc = new Pinecone({
//         apiKey: process.env.PINECONE_API_KEY,
//     });
//     const index = pc.index('rag').namespace('ns1');
//     const openai = new OpenAI();

//     const text = data[data.length - 1].content;
//     const embedding = await openai.embeddings.create({
//         model: 'text-embedding-3-small',
//         input: text,
//         encoding_format: 'float',
//     });

//     const results = await index.query({
//         topK: 3,
//         includeMetadata: true,
//         vector: embedding.data[0].embedding,
//     });

//     let resultString = '\n\nReturned results from vector db (done automatically): ';
//     results.matches.forEach((match) => {
//         resultString += `\n
//         Professor: ${match.id}
//         Review: ${match.metadata.review}
//         Subject: ${match.metadata.subject}
//         Stars: ${match.metadata.stars}
//         \n\n`;
//     });

//     // Integrate results from `reviews.json`
//     const filePath = path.join(process.cwd(), 'reviews.json');
//     const jsonData = await readFile(filePath, 'utf8');
//     const reviews = JSON.parse(jsonData).reviews;

//     const manualMatches = reviews.filter((review) =>
//         text.toLowerCase().includes(review.professor.toLowerCase()) ||
//         text.toLowerCase().includes(review.subject.toLowerCase()) ||
//         text.includes(String(review.stars)) ||
//         text.toLowerCase().includes(review.review.toLowerCase())
//     );

//     if (manualMatches.length > 0) {
//         resultString += '\n\nAdditional matches from the database:\n';
//         manualMatches.forEach((match) => {
//             resultString += `
//             Professor: ${match.professor}
//             Subject: ${match.subject}
//             Stars: ${match.stars}
//             Review: ${match.review}\n\n`;
//         });
//     }

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






import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Make sure this path is correct

const systemPrompt = 
`
RateMyProfessor Agent System Prompt

You are an AI assistant designed to help students find professors based on their queries using a Retrieval-Augmented Generation (RAG) system. Your primary goal is to assist students in finding the best professor for their needs.

Your Capabilities:
1. You have access to a comprehensive database of professor reviews, including information such as professor names, subjects taught, star ratings, and details from student reviews.
2. You use RAG to retrieve and rank the most relevant professor information based on the student's query.
3. For each query, you provide information on the top 3 most relevant professors.

## Your Responses Should:
1. Be concise yet informative, focusing on the most relevant details for each professor.
2. Include the professor's name, subject, star rating, and a brief summary of their strengths or notable characteristics.
3. Highlight specific aspects mentioned in the student's query (e.g., teaching style, course difficulty, grading fairness).
4. Provide a balanced view, mentioning both positives and potential drawbacks if relevant.

## Response Format:
For each query, structure your response as follows:

1. A brief introduction addressing the student's specific request.
2. Top 3 Professor Recommendations:
    - Professor Name (Subject) - Star Rating
    - Brief summary of the professor's teaching style, strengths, and any relevant details from reviews.
3. A concise conclusion with any additional advice or suggestions for the student.

## Guidelines:
- Always maintain a neutral and objective tone.
- If the query is too vague or broad, ask for clarification to provide more accurate recommendations.
- If no professors match the specific criteria, suggest the closest alternatives and explain why.
- Be prepared to answer follow-up questions about specific professors or compare multiple professors.
- Do not invent or fabricate information. If you don’t have sufficient data, state this clearly.
- Respect privacy by not sharing any personal information about professors beyond what’s in the official reviews.

Remember, your goal is to help students make informed decisions about their course selections based on professor reviews and ratings.
`;

export async function POST(req) {
    const data = await req.json();
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index('rag').namespace('ns1');
    const openai = new OpenAI();

    const text = data[data.length - 1].content;
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    });

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
    });

    let resultString = '\n\nReturned results from vector db (done automatically): ';
    results.matches.forEach((match) => {
        resultString += `
        Professor: ${match.id}
        Review: ${match.metadata.review}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n`;
    });

    // Fetching reviews from Firebase Firestore
    try {
       // Fetching reviews from Firebase Firestore
        const reviewsCollection = collection(db, 'reviews'); // Correct the reference here
        const q = query(reviewsCollection);
        const querySnapshot = await getDocs(q);
        const firebaseReviews = [];
        querySnapshot.forEach((doc) => {
            firebaseReviews.push(doc.data());
        });

        const manualMatches = firebaseReviews.filter((review) =>
            text.toLowerCase().includes(review.professor.toLowerCase()) ||
            text.toLowerCase().includes(review.subject.toLowerCase()) ||
            text.includes(String(review.stars)) ||
            text.toLowerCase().includes(review.review.toLowerCase())
        );

        if (manualMatches.length > 0) {
            resultString += '\n\nAdditional matches from Firebase:\n';
            manualMatches.forEach((match) => {
                resultString += `
                Professor: ${match.professor}
                Subject: ${match.subject}
                Stars: ${match.stars}
                Review: ${match.review}\n\n`;
            });
        }
    } catch (error) {
        console.error('Error fetching reviews from Firebase:', error);
        resultString += '\n\n(Failed to fetch additional reviews from Firebase.)';
    }

    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            ...lastDataWithoutLastMessage,
            { role: 'user', content: lastMessageContent },
        ],
        model: 'gpt-4o-mini',
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        },
    });

    return new NextResponse(stream);
}