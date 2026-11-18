import { useState } from "react";

export default function App() {
  const [p, setP] = useState("chats");
  const [s, setS] = useState("Ammi");
  const [inC, setInC] = useState(false);
  const [txt, setTxt] = useState("");
  const [msgs, setMsgs] = useState(["Hi"]);
  const [like, setLike] = useState(0);

  const chats = ["Ammi", "Bhai", "Ayesha"];
  const updates = ["Ammi", "Bhai", "Ayesha"];
  const reels = ["Video 1", "Video 2", "Video 3"];

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
        <p>Online</p>
        {msgs.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        <input
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={send}>Send</button>
        <button>Mic</button>
        <button>Photo</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Speeko</h2>

      {p === "chats" && (
        <div>
          <h3>Chats</h3>
          <input placeholder="Search..." />
          {chats.map((c) => (
            <p
              key={c}
              onClick={() => {
                setS(c);
                setInC(true);
              }}
            >
              {c} - Hi
            </p>
          ))}
        </div>
      )}

      {p === "calls" && (
        <div>
          <h3>Calls</h3>
          {chats.map((c) => (
            <p key={c}>
              {c}
              <button>Voice</button>
              <button>Video</button>
            </p>
          ))}
        </div>
      )}

      {p === "updates" && (
        <div>
          <h3>Updates</h3>
          <button>My Status</button>
          {updates.map((u) => (
            <p key={u}>{u} - New Status</p>
          ))}
        </div>
      )}

      {p === "watch" && (
        <div>
          <h3>Watch</h3>
          {reels.map((r) => (
            <div key={r}>
              <p>{r}</p>
              <button
                onClick={() => setLike(like + 1)}
              >
                Like {like}
              </button>
              <button>Comment</button>
              <button>Share</button>
            </div>
          ))}
        </div>
      )}

      <div>
        <button onClick={() => setP("chats")}>
          Chats
        </button>
        <button onClick={() => setP("calls")}>
          Calls
        </button>
        <button onClick={() => setP("updates")}>
          Updates
        </button>
        <button onClick={() => setP("watch")}>
          Watch
        </button>
      </div>
    </div>
  );
}
