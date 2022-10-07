import { useState, useEffect, createRef } from "react";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import Pusher from "pusher-js";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [textMessage, setTextMessage] = useState("");

  const submitMessage = async () => {
    if (textMessage === "") return;
    try {
      const response = await axios.post("http://localhost:3000/api/message", {
        username,
        message: textMessage,
      });
      console.log(response);
      setTextMessage("");
    } catch (err) {
      console.error(err);
      setTextMessage("");
    }
  };

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY!, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER!,
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data: any) {
      console.log("Data: ", data);
      setMessages((messages) => [...messages, data.message]);
    });
  }, []);

  return (
    <div className="App">
      <h1
        style={{
          margin: "1rem 4rem",
          fontWeight: "bold",
        }}
      >
        Pusher
      </h1>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <ListGroup>
        {messages.map((message, index) => (
          <ListGroupItem key={index}>{message}</ListGroupItem>
        ))}
      </ListGroup>
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <Input
          type="textarea"
          placeholder="Message"
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          rows={4}
          style={{
            marginTop: "100%",
          }}
        />
        <Button
          onClick={submitMessage}
          color="primary"
          style={{
            marginTop: "1rem",
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default App;
