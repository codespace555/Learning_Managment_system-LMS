import openai from './openAi.confg.js';

async function generateQueryVector(queryText) {
    if (!queryText || typeof queryText !== 'string') {
        throw new Error('Invalid input: queryText must be a non-empty string.');
    }

    try {
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: queryText,
        });

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        // Access the query vector (embedding)
        const queryVector = response.data.data[0].embedding;
        return queryVector;
    } catch (error) {
        console.error('Error generating query vector:', error);
        
        // You can add specific error handling here (e.g., rate limit errors, network errors, etc.)
        if (error.response && error.response.status === 429) {
            console.error('Rate limit exceeded. Please wait before making more requests.');
        }
        
        throw error;
    }
}

export default generateQueryVector;
