export async function fetchOpenAIResponse(query) {
    const prompt = `You are a highly intelligent FAQ bot. Answer the following question based on the knowledge from our support database and external sources:\nQuestion: ${query}`;
    try {
        console.log('API Key:', process.env.NEXT_PUBLIC_OPENAI_API_KEY);
        const response = await fetch('https://jamsapi.hackclub.dev/openai/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 700FJ6V2HMZG6Z6JJTFRL4KY5MXEVOR5R4I0VK23HQL826K4YL20RDULG0IB0VZA`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150,
            }),
        });
        const data = await response.json();
        
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content.trim();
        } else {
            console.error('No choices found in the response:', data);
            return 'Error: No response from OpenAI API';
        }
    } catch (error) {
        console.error('Error fetching OpenAI response:', error);
        return `Error: ${error.message}`;
    }
}
