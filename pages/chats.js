import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";



const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);

const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== "undefined") {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username.length === 0 || secret.length === 0) router.push("/")
  })

  if (!showChat) return <div />;
  
  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100ch - 200px)"
          projectID = "9777dbc8-20c1-4545-9f24-f20583d50123"
          userName={username}
          userSecret={secret}
          rednerNewMessageForm={() => <MessageFormSocial/>}
        />
      </div>
    </div>
  );
}
