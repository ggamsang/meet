import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

let _socket = null;
function App() {
  const [connected, setConnected] = useState(false);
  const init_socket = () => {
    //_socket = io("http://127.0.0.1:3000").on("welcom", (data) => {
    _socket = io("").on("welcom", (data) => {
      console.log(data);
      setConnected(true);
    });
  };
  const send_message = (msg) => {
    console.log(_socket);
    _socket.emit("sent", { message: msg });
  };

  console.log({ connected });
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
          <input type="text" id="input-text" />
          <button
            onClick={() =>
              send_message(document.getElementById("input-text").value)
            }
          >
            send
          </button>
        </>
      )}
    </div>
  );
}

export default App;

