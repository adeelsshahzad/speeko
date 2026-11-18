import { useState } from "react";

export default function App() {
  const [p, setP] = useState("chats");
  const [s, setS] = useState("Ammi");
  const [inC, setInC] = useState(false);
  const [txt, setTxt] = useState("");
  const [msgs, setMsgs] = useState(["Hi"]);
  const [like, setLike] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [theme, setTheme] = useState(0);

  const chats = ["Ammi", "Bhai", "Ayesha", "My Moti", "Ali", "Sara"];

  const themes = [
    { bg: "#ECE5DD", name: "WhatsApp" },
    { bg: "#0B141A", name: "Black" },
    { bg: "#E8F5E9", name: "Green" },
    { bg: "#E3F2FD", name: "Blue" },
    { bg: "#FCE4EC", name: "Pink" },
    { bg: "#FFF3E0", name: "Orange" },
    { bg: "#F3E5F5", name: "Purple" },
    { bg: "#FFFDE7", name: "Yellow" },
    { bg: "#E0F2F1", name: "Teal" },
    { bg: "#EFEBE9", name: "Brown" },
  ];

  const bg = themes[theme].bg;
  const green = "#075E54";
  const light = "#25D366";

  function send() {
    if (!txt) return;
    setMsgs([...msgs, txt]);
    setTxt("");
    setShowEmoji(false);
  }

  const page = {
    width: "100%",
    minHeight: "100vh",
    background: bg,
    color: "black",
    fontFamily: "sans-serif",
    paddingBottom: "70px",
  };

  const top = {
    background: "#0B141A",
    color: "white",
    padding: "15px",
    paddingTop: "20px",
  };

  const searchBar = {
    background: "#202C33",
    color: "#8696A0",
    borderRadius: "25px",
    padding: "12px",
    paddingLeft: "18px",
    margin: "12px",
    marginTop: "15px",
    fontSize: "16px",
  };

  const nav = {
    display: "flex",
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: "#101D1B",
    padding: "10px",
  };

  const nbtn = {
    flex: 1,
    background: "none",
    border: "none",
    fontSize: "13px",
    padding: "5px",
    color: "white",
    textAlign: "center" as const,
  };

  const active = {
    background: "#1E3A32",
    borderRadius: "20px",
    padding: "6px",
    display: "inline-block",
  };

  const row = {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: "white",
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
        <div
          style={{
            background: "#0B141A",
            color: "white",
            padding: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            style={{
              color: "white",
              background: "none",
              border: "none",
              fontSize: "26px",
            }}
            onClick={() => setInC(false)}
          >
            ←
          </button>
          <div
            style={{
              width: "42px",
              height: "42px",
              background: "#00A8E8",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              marginLeft: "8px",
              marginRight: "10px",
            }}
          >
            {s[0]}
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: "19px" }}>{s}</b>
            <p style={{ margin: 0, fontSize: "12px", color: "#8696A0" }}>
              Online
            </p>
          </div>
          <span style={{ fontSize: "24px" }}>📞</span>
          <span style={{ fontSize: "24px", marginLeft: "24px" }}>📹</span>
          <span
            style={{ fontSize: "24px", marginLeft: "24px", marginRight: "5px" }}
          >
            ⋮
          </span>
        </div>

        <div style={{ padding: "10px" }}>
          {msgs.map((m, i) => (
            <p
              key={i}
              style={{
                background: "#DCF8C6",
                color: "black",
                padding: "10px",
                margin: "8px",
                borderRadius: "10px",
                maxWidth: "80%",
              }}
            >
              {m}
            </p>
          ))}
        </div>

        {showEmoji && (
          <div
            style={{
              background: "white",
              padding: "10px",
              display: "flex",
              flexWrap: "wrap" as const,
              gap: "8px",
              fontSize: "24px",
            }}
          >
            {["😀", "😂", "❤️", "😍", "👍", "🙏", "😢", "😡", "🎉", "🔥"].map(
              (e) => (
                <span key={e} onClick={() => setTxt(txt + e)}>
                  {e}
                </span>
              )
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            padding: "10px",
            position: "fixed" as const,
            bottom: 0,
            left: 0,
            right: 0,
            background: bg,
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setShowEmoji(!showEmoji)}
            style={{ fontSize: "24px", background: "none", border: "none" }}
          >
            😀
          </button>
          <button
            style={{ fontSize: "16px", background: "none", border: "none" }}
          >
            GIF
          </button>
          <button
            style={{ fontSize: "22px", background: "none", border: "none" }}
          >
            📷
          </button>
          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder="Message..."
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "20px",
              border: "none",
              marginLeft: "5px",
            }}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b style={{ fontSize: "26px" }}>Speeko</b>
          <div style={{ fontSize: "22px" }}>
            <span>🔍</span>
            <span style={{ marginLeft: "22px" }}>⋮</span>
          </div>
        </div>
        <div style={searchBar}>🔍 &nbsp; Ask Meta AI or Search</div>
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

      {p === "community" && (
        <div style={{ padding: "15px", background: "white" }}>
          <h3>Communities</h3>
          <p>Family Group</p>
          <p>Friends Group</p>
        </div>
      )}

      {p === "updates" && (
        <div style={{ padding: "15px", background: "white" }}>
          <h3>Status</h3>
          <div style={row}>
            <div style={av}>A</div>
            <b>Ammi - New Status</b>
          </div>
          <h3>Watch</h3>
          <p>Video 1</p>
          <button onClick={() => setLike(like + 1)}>❤️ Like {like}</button>
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
              <span style={{ fontSize: "22px", marginLeft: "20px" }}>📹</span>
            </div>
          ))}
        </div>
      )}

      {p === "settings" && (
        <div style={{ padding: "15px", background: "white" }}>
          <h3>Themes - 10 Themes</h3>
          {themes.map((t, i) => (
            <div
              key={t.name}
              style={{ padding: "12px", borderBottom: "1px solid #eee" }}
              onClick={() => setTheme(i)}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "25px",
                  height: "25px",
                  background: t.bg,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  marginRight: "10px",
                }}
              ></span>
              {t.name} {theme === i ? "✅" : ""}
            </div>
          ))}
          <h3>Settings</h3>
          <p>Profile</p>
          <p>Privacy</p>
          <p>Notifications</p>
        </div>
      )}

      <div style={nav}>
        <button style={nbtn} onClick={() => setP("chats")}>
          <span style={p === "chats" ? active : {}}>💬</span>
          <br />
          Chats
        </button>
        <button style={nbtn} onClick={() => setP("updates")}>
          <span>🟢</span>
          <br />
          Updates
        </button>
        <button style={nbtn} onClick={() => setP("community")}>
          <span>👥</span>
          <br />
          Community
        </button>
        <button style={nbtn} onClick={() => setP("calls")}>
          <span>📞</span>
          <br />
          Calls
        </button>
        <button style={nbtn} onClick={() => setP("settings")}>
          <span>⚙️</span>
          <br />
          Settings
        </button>
      </div>
    </div>
  );
}
