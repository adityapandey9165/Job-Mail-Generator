import React, { useState } from "react";
import "./JobForm.css";

const JobForm = ({ onGenerateEmail }) => {
  const [jobDetails, setJobDetails] = useState({
    recruiterName: "",
    jobTitle: "",
    companyName: "",
    specificInterest: "",
    resume: null,
    resumeText: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      [name]: value,
    }));
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      resume: file,
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      const resumeText = e.target.result;
      setJobDetails((prevJobDetails) => ({
        ...prevJobDetails,
        resumeText,
      }));
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateEmail(jobDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Job Mail Generator</h1>
      <div className="form-group">
        <label>Recruiter's Name</label>
        <input
          className="input"
          type="text"
          placeholder="Recruiter's Name"
          name="recruiterName"
          value={jobDetails.recruiterName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Job Title</label>
        <input
          className="input"
          type="text"
          placeholder="Job Title"
          name="jobTitle"
          value={jobDetails.jobTitle}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Company Name</label>
        <input
          className="input"
          type="text"
          placeholder="Company Name"
          name="companyName"
          value={jobDetails.companyName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Specific Interest</label>
        <input
          className="input"
          type="text"
          placeholder="Specific Interest"
          name="specificInterest"
          value={jobDetails.specificInterest}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Resume</label>
        <input
          className="file-input"
          type="file"
          onChange={handleResumeUpload}
        />
      </div>
      <button className="button" type="submit">
        Generate Email
      </button>
    </form>
  );
};

export default JobForm;
