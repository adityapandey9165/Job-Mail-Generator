import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import { gsap } from "gsap";
import JobForm from "./components/JobForm";
import GeneratedEmail from "./components/GeneratedEmail";

function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const api_key = "AIzaSyDJIBoLqh8z7IvDlBNk4pltdl-hpYON1PE";

  const formContainerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formContainerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  const generateEmail = async (jobDetails) => {
    setLoading(true);
    setError(null);
    try {
      const {
        recruiterName,
        jobTitle,
        companyName,
        specificInterest,
        resumeText,
      } = jobDetails;

      const prompt = `Generate a professional email applying for a job with the help of given details:
        Recruiter's Name: ${recruiterName}
        Job Title: ${jobTitle}
        Company Name: ${companyName}
        Additional info is ${specificInterest} `;

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
      });

      const emailTemplate = response.data.candidates[0].content.parts[0].text;
      setEmail(emailTemplate);
    } catch (error) {
      console.error("Error generating email:", error);
      setError(
        "An error occurred while generating the email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div ref={formContainerRef}>
        <JobForm onGenerateEmail={generateEmail} />
      </div>
      <div>
        <GeneratedEmail email={email} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default App;
