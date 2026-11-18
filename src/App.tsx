import { useState } from "react";

export default function App() {
  const [p, setP] = useState("chats");
  const [s, setS] = useState("Ammi");
  const [inC, setInC] = useState(false);
  const [txt, setTxt] = useState("");
  const [msgs, setMsgs] = useState(["Hi"]);
  const [like, setLike] = useState(0);

  const chats = ["Ammi", "Bhai", "Ayesha"];
  const green = "#075E54";
  const light = "#25D366";

  function send() {
    if (!txt) return;
    setMsgs([...msgs, txt]);
    setTxt("");
  }

  const top = {
    background: green,
    color: "white",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
  };

  const tab = {
    background: green,
    color: "white",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
  };

  const btn = {
    background: "none",
    border: "none",
    color: "white",
    fontSize: "15px",
  };

  const nav = {
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "white",
  };

  const plus = {
    background: light,
    color: "white",
    border: "none",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    fontSize: "30px",
    position: "fixed" as const,
    bottom: "70px",
    right: "20px",
  };

  if (inC) {
    return (
      <div>
        <div style={top}>
          <button
            style={btn}
            onClick={() => setInC(false)}
          >
            ← Back
          </button>
          <b>{s}</b>
          <span>📞 📹</span>
        </div>
        {msgs.map((m, i) => (
          <p
            key={i}
            style={{
              background: "#DCF8C6",
              padding: "8px",
              margin: "8px",
              borderRadius: "8px",
            }}
          >
            {m}
          </p>
        ))}
        <div style={{ display: "flex" }}>
          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder="Message..."
            style={{ flex: 1, padding: "10px" }}
          />
          <button
            onClick={send}
            style={{
              background: light,
              color: "white",
              border: "none",
              padding: "10px",
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "white" }}>
      <div style={top}>
        <b style={{ fontSize: "22px" }}>Speeko</b>
        <span>🔍 ⋮</span>
      </div>

      <div style={tab}>
        <button style={btn} onClick={() => setP("chats")}>
          Chats
        </button>
        <button style={btn} onClick={() => setP("updates")}>
          Updates
        </button>
        <button style={btn} onClick={() => setP("calls")}>
          Calls
        </button>
      </div>

      {p === "chats" && (
        <div>
          {chats.map((c) => (
            <div
              key={c}
              onClick={() => {
                setS(c);
                setInC(true);
              }}
              style={{
                display: "flex",
                padding: "12px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  background: "#ddd",
                  borderRadius: "50%",
                  textAlign: "center",
                  lineHeight: "45px",
                  marginRight: "12px",
                }}
              >
                {c[0]}
              </div>
              <div>
                <b>{c}</b>
                <p style={{ margin: 0 }}>Hi</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {p === "updates" && (
        <div style={{ padding: "12px" }}>
          <h3>Status</h3>
          <p>Ammi - New Status</p>
          <p>Bhai - New Status</p>
          <h3>Watch</h3>
          <p>Video 1</p>
          <button onClick={() => setLike(like + 1)}>
            ❤️ Like {like}
          </button>
        </div>
      )}

      {p === "calls" && (
        <div style={{ padding: "12px" }}>
          {chats.map((c) => (
            <p key={c}>
              {c} - Missed Call
              <button style={{ marginLeft: "10px" }}>
                📞
              </button>
              <button>📹</button>
            </p>
          ))}
        </div>
      )}

      <div style={nav}>
        <button onClick={() => setP("chats")}>
          💬 Chats
        </button>
        <button onClick={() => setP("updates")}>
          🟢 Updates
        </button>
        <button onClick={() => setP("calls")}>
          📞 Calls
        </button>
      </div>

      <button style={plus} onClick={() => setP("calls")}>
        +
      </button>
    </div>
  );
}
