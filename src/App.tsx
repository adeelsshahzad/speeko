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

  const page = {
    width: "100%",
    minHeight: "100vh",
    background: "white",
    fontFamily: "sans-serif",
    paddingBottom: "80px",
  };

  const top = {
    background: green,
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const tab = {
    background: green,
    color: "white",
    display: "flex",
    paddingBottom: "10px",
  };

  const tbtn = {
    flex: 1,
    background: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    padding: "8px",
  };

  const nav = {
    display: "flex",
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: "white",
    borderTop: "1px solid #ddd",
    padding: "10px",
  };

  const nbtn = {
    flex: 1,
    background: "none",
    border: "none",
    fontSize: "14px",
    padding: "8px",
  };

  const plus = {
    background: light,
    color: "white",
    border: "none",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    fontSize: "28px",
    position: "fixed" as const,
    bottom: "75px",
    right: "15px",
  };

  const row = {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderBottom: "1px solid #eee",
  };

  const av = {
    width: "48px",
    height: "48px",
    background: "#ddd",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "12px",
    fontSize: "20px",
    flexShrink: 0 as const,
  };

  if (inC) {
    return (
      <div style={page}>
        <div style={top}>
          <button
            style={{ color: "white", background: "none", border: "none" }}
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
              padding: "10px",
              margin: "10px",
              borderRadius: "10px",
              maxWidth: "80%",
            }}
          >
            {m}
          </p>
        ))}
        <div style={{ display: "flex", padding: "10px" }}>
          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder="Message..."
            style={{ flex: 1, padding: "12px", borderRadius: "20px" }}
          />
          <button
            onClick={send}
            style={{
              background: light,
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              marginLeft: "8px",
            }}
          >
            ➤
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={page}>
      <div style={top}>
        <b style={{ fontSize: "22px" }}>Speeko</b>
        <span>🔍 &nbsp; ⋮</span>
      </div>

      <div style={tab}>
        <button style={tbtn} onClick={() => setP("chats")}>
          Chats
        </button>
        <button style={tbtn} onClick={() => setP("updates")}>
          Updates
        </button>
        <button style={tbtn} onClick={() => setP("calls")}>
          Calls
        </button>
      </div>

      {p === "chats" && (
        <div>
          {chats.map((c) => (
            <div
              key={c}
              style={row}
              onClick={() => {
                setS(c);
                setInC(true);
              }}
            >
              <div style={av}>{c[0]}</div>
              <div>
                <b>{c}</b>
                <p style={{ margin: 0, color: "#666" }}>Hi</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {p === "updates" && (
        <div style={{ padding: "15px" }}>
          <h3>Status</h3>
          <div style={row}>
            <div style={av}>A</div>
            <b>Ammi - New Status</b>
          </div>
          <h3>Watch</h3>
          <p>Video 1</p>
          <button onClick={() => setLike(like + 1)}>
            ❤️ Like {like}
          </button>
        </div>
      )}

      {p === "calls" && (
        <div>
          {chats.map((c) => (
            <div key={c} style={row}>
              <div style={av}>{c[0]}</div>
              <div style={{ flex: 1 }}>
                <b>{c}</b>
                <p style={{ margin: 0 }}>Missed Call</p>
              </div>
              <span style={{ fontSize: "22px" }}>📞</span>
              <span style={{ fontSize: "22px", marginLeft: "15px" }}>
                📹
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={nav}>
        <button style={nbtn} onClick={() => setP("chats")}>
          💬
          <br />
          Chats
        </button>
        <button style={nbtn} onClick={() => setP("updates")}>
          🟢
          <br />
          Updates
        </button>
        <button style={nbtn} onClick={() => setP("calls")}>
          📞
          <br />
          Calls
        </button>
      </div>

      <button style={plus} onClick={() => setP("calls")}>
        +
      </button>
    </div>
  );
}
