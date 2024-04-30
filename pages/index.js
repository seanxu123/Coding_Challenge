import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/dist/client/router";
import axios from "axios";

export default function Auth() {
  // Accessing context for user authentication state
  const {
    username,
    secret,
    setUsername,
    setSecret
  } = useContext(Context);

  // Next.js router for navigation
  const router = useRouter();

  // Function to handle form submission
  function onSubmit(e) {
    e.preventDefault();

    // Ensure username and secret are provided
    if (username.length === 0 || secret.length === 0) return;

    // Access API key from environment variables
    const apiKey = process.env.REACT_APP_API_KEY;

    // Send user authentication data to ChatEngine API
    axios.put(
      'https://api.chatengine.io/users/',
      { username, secret },
      { headers: { "Private-key": apiKey } }
    )
    .then(r => router.push('/chats')) // Navigate to chat page on success
    .catch(error => {
      // Handle authentication error (if any)
      console.error("Authentication error:", error);
      // Optionally, provide feedback to the user about authentication failure
    });
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={e => onSubmit(e)}>
          <div className="auth-title">Chat Room</div>

          <div className="input-container">
            <input
              placeholder="Username or email"
              className="text-input"
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={e => setSecret(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="submit-button"
          >
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
