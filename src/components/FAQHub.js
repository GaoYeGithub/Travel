import React, { useState } from 'react';
import { fetchOpenAIResponse } from '../services/openai';
import ReactMarkdown from 'react-markdown';
const FAQHub = () => {
const [query, setQuery] = useState('');
const [response, setResponse] = useState('');
const handleInputChange = (e) => {
setQuery(e.target.value);
};
const handleSubmit = async (e) => {
e.preventDefault();
const aiResponse = await fetchOpenAIResponse(query);
setResponse(aiResponse);
};
return (
<div>
<h1>FAQ Hub</h1>
<form onSubmit={handleSubmit}>
<input
type="text"
value={query}
onChange={handleInputChange}
placeholder="Ask a question..."
/>
<button type="submit">Get Answer</button>
</form>
<div>
<ReactMarkdown>{response}</ReactMarkdown>
</div>
</div>
);
};
export default FAQHub;