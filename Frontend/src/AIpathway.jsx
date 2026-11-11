import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

export default function AIpathway() {
  const location = useLocation();
  const topStream = location?.state?.topStream;

  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [followupResponse, setFollowupResponse] = useState('');

  const generatePathway = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `Generate a career roadmap for a student interested in the ${topStream} stream. 
      Include education, skills, certifications, and job options in a friendly, visual format.`;

      const response = await axios.post('http://localhost:3000/ai/get-review', {
        code: prompt,
      });

      setReview(response.data);
      setFollowupResponse('');
    } catch (err) {
      setError("AI generation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowup = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await axios.post('http://localhost:3000/ai/followup', {
        previousPrompt: review,
        userMessage: userInput,
      });

      setFollowupResponse(response.data.response);
      setUserInput('');
    } catch (err) {
      setFollowupResponse("Failed to get a follow-up response.");
    }
  };

  useEffect(() => {
    generatePathway();
  }, []);

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
      minHeight: '100vh',
      padding: '40px',
      color: '#003366'
    }}>
      <h1 style={{ color: '#0277bd' }}>AI Career Pathway</h1>

      {isLoading ? (
        <p style={{ color: '#555' }}>AI is generating your personalized roadmap...</p>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button onClick={generatePathway}>Retry</button>
        </div>
      ) : (
        <>
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid #0277bd',
            borderRadius: '15px',
            padding: '20px',
            maxWidth: '800px',
            width: '100%',
            color: '#000',
          }}>
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>

          {/* Follow-up Input Section */}
          <div style={{ marginTop: '30px', width: '100%', maxWidth: '800px' }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              style={{
                width: 'calc(100% - 120px)',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                marginRight: '10px'
              }}
            />
            <button
              onClick={handleFollowup}
              style={{
                padding: '10px 20px',
                backgroundColor: '#0277bd',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>

          {/* Follow-up Response */}
          {followupResponse && (
            <div style={{
              marginTop: '20px',
              backgroundColor: '#f1f1f1',
              padding: '15px',
              borderRadius: '10px',
              maxWidth: '800px',
              width: '100%',
              color: '#000',
            }}>
              <Markdown rehypePlugins={[rehypeHighlight]}>{followupResponse}</Markdown>
            </div>
          )}
        </>
      )}
    </main>
  );
}
