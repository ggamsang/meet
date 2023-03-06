import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [connected, setConnected] = useState(false);
  let _socket = null;
  const init_socket = () => {
    _socket = io("http://127.0.0.1:3000").on("welcom", (data) => {
      console.log(data);
      setConnected();
    });
  };
  const send_message = (msg) => {};

  return (
    <div className="App">
      {!connected ? (
        <button onClick={() => init_socket()}>
          connect to socket server...
        </button>
      ) : (
        <>
          connected
          <br />
          <input type="text" />
          <button>send</button>
        </>
      )}
    </div>
  );
}

export default App;
