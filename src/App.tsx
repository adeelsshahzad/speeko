import { useState } from "react";

export default function App() {
  const [p, setP] = useState("chats");
  const [s, setS] = useState("Ammi");
  const [inC, setInC] = useState(false);
  const [txt, setTxt] = useState("");
  const [msgs, setMsgs] = useState(["Hi"]);

  const chats = ["Ammi", "Bhai", "Ayesha"];

  function send() {
    if (!txt) return;
    setMsgs([...msgs, txt]);
    setTxt("");
  }

  if (inC) {
    return (
      <div>
        <button onClick={() => setInC(false)}>
          Back
        </button>
        <h3>{s}</h3>
        {msgs.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        <input
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={send}>Send</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Speeko</h2>
      {p === "chats" && (
        <div>
          <h3>Chats</h3>
          {chats.map((c) => (
            <p
              key={c}
              onClick={() => {
                setS(c);
                setInC(true);
              }}
            >
              {c}
            </p>
          ))}
        </div>
      )}
      {p === "calls" && (
        <div>
          <h3>Calls - {s}</h3>
          <button>Voice</button>
          <button>Video</button>
        </div>
      )}
      <div>
        <button onClick={() => setP("chats")}>
          Chats
        </button>
        <button onClick={() => setP("calls")}>
          Calls
        </button>
      </div>
    </div>
  );
}
