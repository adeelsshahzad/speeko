import { useState } from "react";

export default function App() {
  const [p, setP] = useState("chats");
  const [s, setS] = useState("Ammi");
  const [inC, setInC] = useState(false);
  const [txt, setTxt] = useState("");
  const [msgs, setMsgs] = useState(["Hi"]);
  const [theme, setTheme] = useState(0);
  const [call, setCall] = useState("");
  const [callType, setCallType] = useState("Audio");
  const [emoji, setEmoji] = useState(false);
  const [like, setLike] = useState(0);

  const chats = ["Ammi", "Bhai", "Ayesha", "My Moti", "Ali", "Sara", "Mama", "Baba"];
  const themes = ["#ECE5DD", "#0B141A", "#E8F5E9", "#E3F2FD", "#FCE4EC", "#FFF3E0"];
  const themeNames = ["WhatsApp", "Black", "Green", "Blue", "Pink", "Orange"];
  const bg = themes[theme];

  function send() {
    if (!txt) return;
    setMsgs([...msgs, txt]);
    setTxt("");
    setEmoji(false);
  }

  function startCall(name: string, type: string) {
    setS(name);
    setCallType(type);
    setCall(name);
  }

  const row = { display: "flex", alignItems: "center", padding: "7px 12px", background: "white", borderBottom: "1px solid #eee" };
  const av = { width: "40px", height: "40px", background: "#ddd", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", fontSize: "18px" };
  const nbtn = { flex: 1, background: "none", border: "none", fontSize: "12px", color: "white", textAlign: "center" as const };

  if (call) {
    return (
      <div style={{ background: "#0B141A", color: "white", minHeight: "100vh", textAlign: "center", paddingTop: "80px" }}>
        <div style={{ width: "100px", height: "100px", background: "#00A8E8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto" }}>{call[0]}</div>
        <h2>{call}</h2>
        <p>{callType} Calling...</p>
        <div style={{ marginTop: "60px", display: "flex", justifyContent: "center", gap: "20px" }}>
          <button style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", fontSize: "22px" }}>🎤</button>
          <button style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", fontSize: "22px" }}>📹</button>
          <button onClick={() => setCall("")} style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", background: "red", fontSize: "22px" }}>📞</button>
        </div>
      </div>
    );
  }

  if (inC) {
    return (
      <div style={{ width: "100%", minHeight: "100vh", background: bg, fontFamily: "sans-serif" }}>
        <div style={{ background: "#0B141A", color: "white", padding: "8px", display: "flex", alignItems: "center" }}>
          <button onClick={() => setInC(false)} style={{ color: "white", background: "none", border: "none", fontSize: "24px" }}>←</button>
          <div style={{ width: "38px", height: "38px", background: "#00A8E8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginLeft: "6px", marginRight: "8px" }}>{s[0]}</div>
          <div style={{ flex: 1 }}>
            <b style={{ fontSize: "17px" }}>{s}</b>
            <p style={{ margin: 0, fontSize: "11px", color: "#8696A0" }}>Online</p>
          </div>
          <span style={{ fontSize: "22px" }} onClick={() => startCall(s, "Audio")}>📞</span>
          <span style={{ fontSize: "22px", marginLeft: "20px" }} onClick={() => startCall(s, "Video")}>📹</span>
          <span style={{ fontSize: "22px", marginLeft: "20px", marginRight: "5px" }}>⋮</span>
        </div>
        <div style={{ padding: "8px" }}>
          {msgs.map((m, i) => (
            <p key={i} style={{ background: "#DCF8C6", padding: "8px", margin: "6px", borderRadius: "10px", maxWidth: "80%" }}>{m}</p>
          ))}
        </div>
        {emoji && (
          <div style={{ background: "white", padding: "8px", display: "flex", gap: "8px", fontSize: "22px" }}>
            {["😀", "😂", "❤️", "😍", "👍", "🙏", "🎉", "🔥"].map((e) => (
              <span key={e} onClick={() => setTxt(txt + e)}>{e}</span>
            ))}
          </div>
        )}
        <div style={{ display: "flex", padding: "8px", position: "fixed" as const, bottom: 0, left: 0, right: 0, background: bg, alignItems: "center", boxSizing: "border-box" as const }}>
          <button onClick={() => setEmoji(!emoji)} style={{ fontSize: "22px", background: "none", border: "none" }}>😀</button>
          <button style={{ fontSize: "14px", background: "none", border: "none" }}>GIF</button>
          <button style={{ fontSize: "20px", background: "none", border: "none" }}>📷</button>
          <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Message..." style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "none", marginLeft: "5px", minWidth: 0 }} />
          <button onClick={send} style={{ background: "#25D366", color: "white", border: "none", borderRadius: "50%", width: "42px", height: "42px", marginLeft: "6px", flexShrink: 0 as const }}>➤</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: bg, fontFamily: "sans-serif", paddingBottom: "60px", boxSizing: "border-box" as const }}>
      <div style={{ background: "#0B141A", color: "white", padding: "6px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <b style={{ fontSize: "20px" }}>Speeko</b>
          <div style={{ fontSize: "20px" }}>
            <span>🔍</span>
            <span style={{ marginLeft: "18px" }}>⋮</span>
          </div>
        </div>
        <div style={{ background: "#202C33", color: "#8696A0", borderRadius: "20px", padding: "6px", paddingLeft: "12px", margin: "6px 0px", fontSize: "13px" }}>🔍 Ask Meta AI or Search</div>
      </div>

      {p === "chats" && (
        <div>
          {chats.map((c) => (
            <div key={c} style={row} onClick={() => { setS(c); setInC(true); }}>
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
              <span style={{ fontSize: "20px" }} onClick={() => startCall(c, "Audio")}>📞</span>
              <span style={{ fontSize: "20px", marginLeft: "18px" }} onClick={() => startCall(c, "Video")}>📹</span>
            </div>
          ))}
        </div>
      )}

      {p === "settings" && (
        <div style={{ padding: "12px", background: "white" }}>
          <h3>Themes - 6 Themes</h3>
          {themes.map((t, i) => (
            <div key={t} style={{ padding: "10px", borderBottom: "1px solid #eee" }} onClick={() => setTheme(i)}>
              <span style={{ display: "inline-block", width: "22px", height: "22px", background: t, borderRadius: "50%", border: "1px solid #ddd", marginRight: "10px" }}></span>
              {themeNames[i]} {theme === i ? "✅" : ""}
            </div>
          ))}
          <h3>Settings</h3>
          <p>Profile</p>
          <p>Privacy</p>
          <p>Notifications</p>
        </div>
      )}

      <div style={{ display: "flex", position: "fixed" as const, bottom: 0, left: 0, right: 0, background: "#101D1B", padding: "6px" }}>
        <button style={nbtn} onClick={() => setP("chats")}>💬<br />Chats</button>
        <button style={nbtn} onClick={() => setP("updates")}>🟢<br />Updates</button>
        <button style={nbtn} onClick={() => setP("community")}>👥<br />Community</button>
        <button style={nbtn} onClick={() => setP("calls")}>📞<br />Calls</button>
        <button style={nbtn} onClick={() => setP("settings")}>⚙️<br />Settings</button>
      </div>
    </div>
  );
}
