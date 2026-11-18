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
  const [call, setCall] = useState("");
  const [callType, setCallType] = useState("Audio");

  const chats = ["Ammi", "Bhai", "Ayesha", "My Moti", "Ali", "Sara", "Mama", "Baba"];

  const themes = [
    { bg: "#ECE5DD", name: "WhatsApp" },
    { bg: "#0B141A", name: "Black" },
    { bg: "#E8F5E9", name: "Green" },
    { bg: "#E3F2FD", name: "Blue" },
    { bg: "#FCE4EC", name: "Pink" },
    { bg: "#FFF3E0", name: "Orange" },
  ];

  const bg = themes[theme].bg;
  const light = "#25D366";

  function send() {
    if (!txt) return;
    setMsgs([...msgs, txt]);
    setTxt("");
    setShowEmoji(false);
  }

  function startCall(name: string, type: string) {
    setS(name);
    setCallType(type);
    setCall(name);
  }

  const page = {
    width: "100%",
    minHeight: "100vh",
    background: bg,
    color: "black",
    fontFamily: "sans-serif",
    paddingBottom: "60px",
    boxSizing: "border-box" as const,
    overflowX: "hidden" as const,
  };

  // اوپر والا پتلا کر دیا
  const top = {
    background: "#0B141A",
    color: "white",
    padding: "6px 12px 6px 12px",
  };

  const searchBar = {
    background: "#202C33",
    color: "#8696A0",
    borderRadius: "20px",
    padding: "6px",
    paddingLeft: "12px",
    margin: "6px 0px 6px 0px",
    fontSize: "13px",
  };

  const nav = {
    display: "flex",
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: "#101D1B",
    padding: "6px",
  };

  const nbtn = {
    flex: 1,
    background: "none",
    border: "none",
    fontSize: "12px",
    padding: "3px",
    color: "white",
    textAlign: "center" as const,
  };

  const active = {
    background: "#1E3A32",
    borderRadius: "15px",
    padding: "4px",
    display: "inline-block",
  };

  // Row چھوٹی کر دی تاکہ 6-7 نظر آئیں
  const row = {
    display: "flex",
    alignItems: "center",
    padding: "7px 12px",
    background: "white",
    borderBottom: "1px solid #eee",
  };

  const av = {
    width: "40px",
    height: "40px",
    background: "#ddd",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    fontSize: "18px",
    flexShrink: 0 as const,
  };

  // CALL SCREEN
  if (call) {
    return (
      <div
        style={{
          background: "#0B141A",
          color: "white",
          minHeight: "100vh",
          textAlign: "center",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            background: "#00A8E8",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "40px",
            margin: "0 auto",
          }}
        >
          {call[0]}
        </div>
        <h2 style={{ marginTop: "20px" }}>{call}</h2>
        <p>{callType} Calling...</p>
        <p>00:00</p>
        <div style={{ marginTop: "80px", display: "flex", justifyContent: "center", gap: "20px" }}>
          <button style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", fontSize: "22px" }}>
            🎤
          </button>
          <button style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", fontSize: "22px" }}>
            📹
          </button>
          <button
            onClick={() => setCall("")}
            style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", background: "red", fontSize: "22px" }}
          >
            📞
          </button>
        </div>
        <p style={{ marginTop: "20px", color: "#8696A0" }}>Call لگ گئی ہے، سامنے والا اٹھائے گا</p>
      </div>
    );
  }

  if (inC) {
    return (
      <div style={page}>
        <div
          style={{
            background: "#0B141A",
            color: "white",
            padding: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            style={{ color: "white", background: "none", border: "none", fontSize: "24px" }}
            onClick={() => setInC(false)}
          >
            ←
          </button>
          <div
            style={{
              width: "38px",
              height: "38px",
              background: "#00A8E8",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              marginLeft: "6px",
              marginRight: "8px",
            }}
          >
            {s[0]}
          </div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: "17px" }}>{s}</b>
            <p style={{ margin: 0, fontSize: "11px", color: "#8696A0" }}>Online</p>
          </div>
          <span style={{ fontSize: "22px" }} onClick={() => startCall(s, "Audio")}>
            📞
          </span>
          <span style={{ fontSize: "22px", marginLeft: "20px" }} onClick={() => startCall(s, "Video")}>
            📹
          </span>
          <span style={{ fontSize: "22px", marginLeft: "20px", marginRight: "5px" }}>⋮</span>
        </div>

        <div style={{ padding: "8px" }}>
          {msgs.map((m, i) => (
            <p
              key={i}
              style={{
                background: "#DCF8C6",
                color: "black",
                padding: "8px",
                margin: "6px",
                borderRadius: "10px",
                maxWidth: "80%",
              }}
            >
              {m}
            </p>
          ))}
        </div>

        {showEmoji && (
          <div style={{ background: "white", padding: "8px", display: "flex", flexWrap: "wrap" as const, gap: "8px", fontSize: "22px" }}>
            {["😀", "😂", "❤️", "😍", "👍", "🙏", "😢", "😡", "🎉", "🔥"].map((e) => (
              <span key={e} onClick={() => setTxt(txt + e)}>{e}</span>
            ))}
          </div>
        )}

        {/* Send والا بٹن اب اندر آ جائے گا */}
        <div
          style={{
            display: "flex",
            padding: "8px",
            position: "fixed" as const,
            bottom: 0,
            left: 0,
            right: 0,
            background: bg,
            alignItems: "center",
            boxSizing: "border-box" as const,
          }}
        >
          <button onClick={() => setShowEmoji(!showEmoji)} style={{ fontSize: "22px", background: "none", border: "none", flexShrink: 0 as const }}>
            😀
          </button>
          <button style={{ fontSize: "14px", background: "none", border: "none", flexShrink: 0 as const }}>
            GIF
          </button>
          <button style={{ fontSize: "20px", background: "none", border: "none", flexShrink: 0 as const }}>
            📷
          </button>
          <input
            value={txt}
            onChange={(e) => setTxt(e.target.value)}
            placeholder="Message..."
            style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "none", marginLeft: "5px", minWidth: 0 }}
          />
          <button
            onClick={send}
            style={{
              background: light,
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "42px",
              height: "42px",
              marginLeft: "6px",
              flexShrink: 0 as const,
              fontSize: "18px",
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ fontSize: "20px" }}>Speeko</b>
          <div style={{ fontSize: "20px", display: "flex" }}>
            <span>🔍</span>
            <span style={{ marginLeft: "18px" }}>⋮</span>
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
                <b style={{ fontSize: "15px" }}>{c}</b>
                <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>Hi</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {p === "community" && (
        <div style={{ padding: "12px", background: "white" }}>
          <h3>Communities</h3>
          <p>Family Group</p>
          <p>Friends Group</p>
        </div>
      )}

      {p === "updates" && (
        <div style={{ padding: "12px", background: "white" }}>
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
              <span style={{ fontSize: "20px" }} onClick={() => startCall(c, "Audio")}>
                📞
              </span>
              <span style={{ fontSize: "20px", marginLeft: "18px" }} onClick={() => startCall(c, "Video")}>
                📹
              </span>
            </div>
          ))}
        </div>
      )}

      {p === "settings" && (
        <div style={{ padding: "12px", background: "white" }}>
          <h3>Themes - 6 Themes</h3>
          {themes.map((t, i) => (
            <div key={t.name} style={{ padding: "10px", borderBottom: "1px solid #eee" }} onClick={() => setTheme(i)}>
              <span style={{ display: "inline-block", width: "22px", height: "22px", background: t.bg, borderRadius: "50%", border: "1px solid #ddd", marginRight: "10px" }}></span>
              {t.name} {theme === i ? "✅" : ""}
            </div>
          ))}
          <h3>Settings</h3>
          <p>Profile</p>
          <p
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
