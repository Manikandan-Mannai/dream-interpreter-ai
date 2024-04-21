import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Cookies from 'js-cookie';
import styled from 'styled-components';

const Interpreter = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);

    const API_KEY = process.env.REACT_APP_API_KEY;
    

    useEffect(() => {
        const isAuthenticated = Cookies.get('authenticated');
        if (!isAuthenticated) {
            window.location.href = '/login';
        }
    }, []);

    async function generateAnswer(e) {
        e.preventDefault();
        setGeneratingAnswer(true);
        setAnswer("Loading your answer... \n It might take up to 10 seconds");
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: [{ parts: [{ text: question }] }],
                }
            );

            const dreamInterpretation = response.data.candidates[0].content.parts[0].text;

            setAnswer(`
                Dream Interpretation

                ${dreamInterpretation}
            `);

        } catch (error) {
            console.error(error);
            setAnswer("Sorry - Something went wrong. Please try again!");
        }

        setGeneratingAnswer(false);
    }

    return (
        <PageContainer>
            <FormContainer onSubmit={generateAnswer}>
                <p>Please describe your dream in detail:</p>
                <Textarea
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask anything"
                />
                <SubmitButton
                    type="submit"
                    disabled={generatingAnswer}
                >
                    {generatingAnswer ? 'Generating...' : 'Generate answer'}
                </SubmitButton>
            </FormContainer>
            <ResultContainer>
                <ReactMarkdown>{answer}</ReactMarkdown>
            </ResultContainer>
        </PageContainer>
    );
}

export default Interpreter;


const PageContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 800px;
  background-color: #f7fafc;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  width: 95%;
  margin: 0 auto;
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #63b3ed;
  color: #fff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #f7fafc;
  border-radius: 0.5rem;
  padding: 1rem;
`;
