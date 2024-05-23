import React from "react";
import "./GeneratedEmail.css";

const GeneratedEmail = ({ email, loading, error }) => {
  return (
    <div className="text-mail">
      {loading ? (
        <p className="loading">
          <span className="spinner"></span>Loading...
        </p>
      ) : (
        email && (
          <textarea className="email-output" readOnly value={email}></textarea>
        )
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GeneratedEmail;
