import { useState } from "react";
import { Input, ListGroup, ListGroupItem } from "reactstrap";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [textMessage, setTextMessage] = useState("");

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
        />
      </div>
    </div>
  );
}

export default App;
