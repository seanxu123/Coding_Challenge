import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";

// Dynamic import for ChatEngine and MessageFormSocial components
const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  // Accessing context for user authentication state
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  // Check if the document is defined (for server-side rendering)
  useEffect(() => {
    if (typeof document !== "undefined") {
      setShowChat(true);
    }
  }, []);

  // Redirect to home page if username or secret is not provided
  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/");
  });

  // Render ChatEngine component if showChat is true
  if (!showChat) return <div />;
  
  return (
    <div className="background">
      <div className="shadow">
        {/* ChatEngine component to render the chat interface */}
        <ChatEngine
          height="calc(100ch - 200px)"
          projectID="9777dbc8-20c1-4545-9f24-f20583d50123" // Project ID for ChatEngine
          userName={username} // Username of the authenticated user
          userSecret={secret} // Secret key of the authenticated user
          rednerNewMessageForm={() => <MessageFormSocial />} // Custom new message form
        />
      </div>
    </div>
  );
}
