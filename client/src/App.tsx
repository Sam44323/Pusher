import { useState, useEffect } from "react";
import { Button, Input, ListGroup, ListGroupItem } from "reactstrap";
import axios from "axios";
import Pusher from "pusher-js";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [textMessage, setTextMessage] = useState("");

  const submitMessage = async () => {
    if (textMessage === "") return;
    const response = await axios.post("/api/messages", {
      message: textMessage,
    });
    console.log(response);
    setTextMessage("");
  };

  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher("83b6c03d17b3a2afb50b", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data: any) {
      alert(JSON.stringify(data));
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
