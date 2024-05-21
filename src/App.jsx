// const api_key = "AIzaSyDJIBoLqh8z7IvDlBNk4pltdl-hpYON1PE";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jobDetails, setJobDetails] = useState({
    recruiterName: "",
    jobTitle: "",
    companyName: "",
    specificInterest: "",
    resume: null,
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_key = "AIzaSyDJIBoLqh8z7IvDlBNk4pltdl-hpYON1PE";

  async function generateEmail() {
    setLoading(true);
    setError(null);
    try {
      const { recruiterName, jobTitle, companyName, specificInterest } =
        jobDetails;
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [
                { text: `Recruiter's Name: ${recruiterName}` },
                { text: `Job Title: ${jobTitle}` },
                { text: `Company Name: ${companyName}` },
                { text: `Specific Interest: ${specificInterest}` },
              ],
            },
          ],
        },
      });

      const emailTemplate = `Subject: Application for ${jobTitle} Position\n\nDear ${recruiterName},\n\nI hope this message finds you well. My name is [Your Name], and I am writing to express my interest in the ${jobTitle} position at ${companyName}. With a strong foundation in Python programming and a passion for continuous learning, I am excited about the opportunity to contribute to your esteemed organization.\n\nAs a recent graduate, I have acquired a comprehensive understanding of Python's syntax, data structures, and libraries. My academic journey has equipped me with hands-on experience in data analysis, machine learning, and web development using Python. I have completed several projects that demonstrate my proficiency in these areas, and I am well-versed in software engineering best practices such as version control, testing, and agile methodologies.\n\nBeyond my academic achievements, I actively engage in online communities and forums to share my knowledge and collaborate with fellow developers. This has enabled me to stay current with the latest advancements in Python and continuously enhance my skills. I am particularly drawn to the opportunity to apply my expertise in ${specificInterest}, which aligns with your company's vision and industry focus.\n\nI am confident that my collaborative and results-oriented approach would make me a valuable asset to your team. I thrive in fast-paced and challenging environments and am eager to contribute my technical abilities and innovative thinking to ${companyName}.\n\nThank you for considering my application. I am enthusiastic about the possibility of joining your team and contributing to the success of your organization. I look forward to the opportunity to discuss my application further.\n\nBest regards,\n\n[Your Full Name]\n[Your Email Address]\n[Your Phone Number]\n[LinkedIn Profile] (if applicable)\n[GitHub Profile] (if applicable)`;

      setEmail(emailTemplate);
    } catch (error) {
      console.error("Error generating email:", error);
      setError(
        "An error occurred while generating the email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      resume: file,
    }));
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>Gemini AI - Job Application Email Generator</h1>
        <input
          className="input"
          type="text"
          placeholder="Recruiter's Name"
          value={jobDetails.recruiterName}
          onChange={(e) =>
            setJobDetails((prevJobDetails) => ({
              ...prevJobDetails,
              recruiterName: e.target.value,
            }))
          }
        />
        <input
          className="input"
          type="text"
          placeholder="Job Title"
          value={jobDetails.jobTitle}
          onChange={(e) =>
            setJobDetails((prevJobDetails) => ({
              ...prevJobDetails,
              jobTitle: e.target.value,
            }))
          }
        />
        <input
          className="input"
          type="text"
          placeholder="Company Name"
          value={jobDetails.companyName}
          onChange={(e) =>
            setJobDetails((prevJobDetails) => ({
              ...prevJobDetails,
              companyName: e.target.value,
            }))
          }
        />
        <input
          className="input"
          type="text"
          placeholder="Specific Interest"
          value={jobDetails.specificInterest}
          onChange={(e) =>
            setJobDetails((prevJobDetails) => ({
              ...prevJobDetails,
              specificInterest: e.target.value,
            }))
          }
        />
        <input
          className="file-input"
          type="file"
          onChange={handleResumeUpload}
        />
        <button className="button" onClick={generateEmail} disabled={loading}>
          {loading ? "Generating..." : "Generate Email"}
        </button>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <textarea className="email-output" readOnly value={email}></textarea>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
