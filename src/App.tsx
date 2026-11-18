import { useState } from "react";
export default function App() {
  const [p, setP] = useState("chats");
  const [s, setS] = useState("Ammi");
  const [inC, setInC] = useState(false);
  const [txt, setTxt] = useState("");
  const [msgs, setMsgs] = useState(["Hi"]);
  const [theme, setTheme] = useState(1);
  const [call, setCall] = useState("");
  const [callType, setCallType] = useState("Audio");
  const [emoji, setEmoji] = useState(false);
  const [like, setLike] = useState(0);
  const [yt, setYt] = useState("");
  const [myName, setMyName] = useState("Adeel");
  const [lang, setLang] = useState("Urdu");
  const [tab, setTab] = useState("All");
  const [groups, setGroups] = useState(["Family Group", "Friends Group"]);
  const [newGroup, setNewGroup] = useState("");
  const chats = ["Ammi", "Bhai", "Ayesha", "My Moti", "Ali", "Sara", "Mama", "Baba"];
  const themes = ["#ECE5DD", "#1F2C34", "#E8F5E9", "#E3F2FD", "#FCE4EC", "#FFF3E0"];
  const names = ["WhatsApp", "Dark Grey", "Green", "Blue", "Pink", "Orange"];
  const langs = ["Urdu", "Hindi", "English", "Arabic", "Chinese", "Japanese", "German", "Greek", "Portuguese", "Spanish"];
  const bg = themes[theme];
  function send() { if (!txt) return; setMsgs([...msgs, txt]); setTxt(""); setEmoji(false); }
  function startCall(n: string, t: string) { setS(n); setCallType(t); setCall(n); }
  function onPhoto(e: any) { const f = e.target.files[0]; if (!f) return; setMsgs([...msgs, "📷 Photo Sent: " + f.name]); }
  function onMainPhoto(e: any) { const f = e.target.files[0]; if (!f) return; alert("Photo Li Gayi: " + f.name + " - Ab Chat Mein Bhej Sakte Ho"); }
  const row = { display: "flex", alignItems: "center", padding: "7px 12px", background: "white", borderBottom: "1px solid #eee" };
  const av = { width: "40px", height: "40px", background: "#ddd", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", fontSize: "18px" };
  const nbtn = { flex: 1, background: "none", border: "none", fontSize: "12px", color: "white", textAlign: "center" as const };
  const srow = { padding: "12px", borderBottom: "1px solid #eee", background: "white", color: "black" };
  const tabStyle = (t: string) => ({ padding: "6px 14px", borderRadius: "20px", border: "none", background: tab === t ? "#25D366" : "#202C33", color: "white", fontSize: "13px" });
  if (call) return (
    <div style={{ background: "#111B21", color: "white", minHeight: "100vh", textAlign: "center", paddingTop: "80px" }}>
      <div style={{ width: "100px", height: "100px", background: "#00A8E8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto" }}>{call[0]}</div>
      <h2>{call}</h2><p>{callType} Calling...</p>
      <div style={{ marginTop: "60px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", fontSize: "22px" }}>🎤</button>
        <button style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", fontSize: "22px" }}>📹</button>
        <button onClick={() => setCall("")} style={{ width: "55px", height: "55px", borderRadius: "50%", border: "none", background: "red", fontSize: "22px" }}>📞</button>
      </div>
    </div>
  );
  if (inC) return (
    <div style={{ width: "100%", minHeight: "100vh", background: bg }}>
      <div style={{ background: "#111B21", color: "white", padding: "8px", display: "flex", alignItems: "center" }}>
        <button onClick={() => setInC(false)} style={{ color: "white", background: "none", border: "none", fontSize: "24px" }}>←</button>
        <div style={{ width: "38px", height: "38px", background: "#00A8E8", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "6px", marginRight: "8px" }}>{s[0]}</div>
        <div style={{ flex: 1 }}><b>{s}</b><p style={{ margin: 0, fontSize: "11px", color: "#AEBAC1" }}>Online</p></div>
        <span style={{ fontSize: "22px" }} onClick={() => startCall(s, "Audio")}>📞</span>
        <span style={{ fontSize: "22px", marginLeft: "20px" }} onClick={() => startCall(s, "Video")}>📹</span>
        <span style={{ fontSize: "22px", marginLeft: "20px" }}>⋮</span>
      </div>
      <div style={{ padding: "8px", paddingBottom: "90px" }}>{msgs.map((m, i) => (<p key={i} style={{ background: "#DCF8C6", color: "black", padding: "8px", margin: "6px", borderRadius: "10px", maxWidth: "80%" }}>{m}</p>))}</div>
      {emoji && <div style={{ background: "white", padding: "8px", display: "flex", gap: "8px", fontSize: "22px", position: "fixed" as const, bottom: "60px", left: 0, right: 0 }}>{["😀", "😂", "❤️", "😍", "👍", "🙏", "🎉", "🔥"].map((e) => (<span key={e} onClick={() => setTxt(txt + e)}>{e}</span>))}</div>}
      <div style={{ display: "flex", padding: "8px", position: "fixed" as const, bottom: 0, left: 0, right: 0, background: "#111B21", alignItems: "center", boxSizing: "border-box" as const }}>
        <button onClick={() => setEmoji(!emoji)} style={{ fontSize: "22px", background: "none", border: "none" }}>😀</button>
        <button style={{ background: "none", border: "none", color: "white" }}>GIF</button>
        <label style={{ fontSize: "20px", marginLeft: "6px" }}>📷<input type="file" accept="image/*" onChange={onPhoto} style={{ display: "none" }} /></label>
        <input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Message..." style={{ flex: 1, padding: "10px", borderRadius: "20px", border: "none", marginLeft: "5px", minWidth: 0, background: "white", color: "black" }} />
        <button onClick={send} style={{ background: "#25D366", color: "white", border: "none", borderRadius: "50%", width: "42px", height: "42px", marginLeft: "6px", flexShrink: 0 as const }}>➤</button>
      </div>
    </div>
  );
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: bg, paddingBottom: "60px", boxSizing: "border-box" as const }}>
      <div style={{ background: "#111B21", color: "white", padding: "10px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><b style={{ fontSize: "20px" }}>Speeko</b><div style={{ fontSize: "20px", display: "flex", alignItems: "center", gap: "15px" }}><label>📷<input type="file" accept="image/*" capture="environment" onChange={onMainPhoto} style={{ display: "none" }} /></label><span>⋮</span></div></div>
      </div>
      {p === "chats" && <div><div style={{ display: "flex", gap: "8px", padding: "8px", background: "#111B21" }}><button style={tabStyle("All")} onClick={() => setTab("All")}>All</button><button style={tabStyle("Unread")} onClick={() => setTab("Unread")}>Unread</button><button style={tabStyle("Messages")} onClick={() => setTab("Messages")}>Messages</button><button style={tabStyle("Groups")} onClick={() => setTab("Groups")}>Groups</button></div>{tab === "Groups" ? <div><div style={{ padding: "10px", background: "white" }}><b>New Group Banao</b><br /><input value={newGroup} onChange={(e) => setNewGroup(e.target.value)} placeholder="Group Ka Naam Likhein" style={{ padding: "10px", width: "65%", marginTop: "6px", borderRadius: "10px", border: "1px solid #ccc" }} /><button onClick={() => { if (newGroup) { setGroups([...groups, newGroup]); setNewGroup(""); } }} style={{ padding: "10px", marginLeft: "6px", background: "#25D366", color: "white", border: "none", borderRadius: "10px" }}>+ Banao</button></div>{groups.map((g) => (<div key={g} style={row} onClick={() => { setS(g); setInC(true); }}><div style={av}>👥</div><div><b>{g}</b><p style={{ margin: 0, color: "#666", fontSize: "13px" }}>Group Chat</p></div></div>))}</div> : <div>{chats.map((c) => (<div key={c} style={row} onClick={() => { setS(c); setInC(true); }}><div style={av}>{c[0]}</div><div><b>{c}</b><p style={{ margin: 0, color: "#666", fontSize: "13px" }}>{tab === "Unread" ? "● 1 Unread" : "Hi"}</p></div></div>))}</div>}</div>}
      {p === "updates" && <div style={{ padding: "12px", background: "white", color: "black" }}><h3>Status Only</h3><div style={row}><div style={av}>A</div><b>Ammi - New Status</b></div><div style={row}><div style={av}>B</div><b>Bhai - New Status</b></div><h3>Watch</h3><p>Video 1</p><button onClick={() => setLike(like + 1)}>❤️ Like {like}</button></div>}
      {p === "youtube" && <div style={{ padding: "15px", background: "white", color: "black", textAlign: "center" as const }}><h2>▶️ Watch Together</h2><p>Apne Dost Ke Sath YouTube Dekhein</p><button onClick={() => window.open("https://www.youtube.com", "_blank")} style={{ padding: "15px 30px", background: "red", color: "white", border: "none", borderRadius: "12px", fontSize: "18px", width: "100%" }}>▶️ Open My YouTube</button><br /><br /><p>Ya Link Paste Karein:</p><input value={yt} onChange={(e) => setYt(e.target.value)} placeholder="YouTube Link Paste Karein" style={{ width: "95%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc" }} /><br /><br /><button onClick={() => { if (yt) window.open(yt, "_blank"); }} style={{ padding: "12px 25px", background: "#25D366", color: "white", border: "none", borderRadius: "10px", width: "100%" }}>▶ Watch Together - Play</button></div>}
      {p === "calls" && <div>{chats.map((c) => (<div key={c} style={row}><div style={av}>{c[0]}</div><div style={{ flex: 1 }}><b>{c}</b><p style={{ margin: 0 }}>Missed Call</p></div><span style={{ fontSize: "20px" }} onClick={() => startCall(c, "Audio")}>📞</span><span style={{ fontSize: "20px", marginLeft: "18px" }} onClick={() => startCall(c, "Video")}>📹</span></div>))}</div>}
      {p === "settings" && <div><div style={srow}><b>My Profile - {myName}</b><p style={{ margin: 0 }}>Apna Naam Likhein</p><input value={myName} onChange={(e) => setMyName(e.target.value)} style={{ padding: "8px", marginTop: "6px", width: "90%", color: "black", background: "white" }} /></div><div style={srow}><b>👤 Profile - Photo / About</b><p style={{ margin: 0 }}>Apni Profile Set Karein</p></div><div style={srow}><b>🔒 Privacy</b><p style={{ margin: 0 }}>Last Seen, Profile Photo, About</p></div><div style={srow}><b>🚫 Blocked List</b><p style={{ margin: 0 }}>Block / Unblock Yahan Se</p></div><div style={srow}><b>🔔 Notifications</b><p style={{ margin: 0 }}>On / Off</p></div><div style={srow}><b>🌍 Language - {lang}</b>{langs.map((l) => (<div key={l} style={{ padding: "8px 0px", borderBottom: "1px solid #eee" }} onClick={() => setLang(l)}>{l} {lang === l ? "✅" : ""}</div>))}</div><div style={srow}><b>🎨 Themes - 6 Themes</b>{themes.map((t, i) => (<div key={t} style={{ padding: "10px 0px", borderBottom: "1px solid #eee", background: "white", color: "black" }} onClick={() => setTheme(i)}><span style={{ display: "inline-block", width: "25px", height: "25px", background: t, borderRadius: "50%", border: "2px solid #333", marginRight: "10px" }}></span><b>{names[i]}</b> {theme === i ? "✅ Selected" : ""}</div>))}</div><div style={srow}><b>💬 Chats Backup</b><p style={{ margin: 0 }}>Backup / History</p></div></div>}
      <div style={{ display: "flex", position: "fixed" as const, bottom: 0, left: 0, right: 0, background: "#111B21", padding: "6px" }}>
        <button style={nbtn} onClick={() => setP("chats")}>💬<br />Chats</button>
        <button style={nbtn} onClick={() => setP("updates")}>🟢<br />Updates</button>
        <button style={nbtn} onClick={() => setP("youtube")}>▶️<br />YouTube</button>
        <button style={nbtn} onClick={() => setP("calls")}>📞<br />Calls</button>
        <button style={nbtn} onClick={() => setP("settings")}>⚙️<br />Settings</button>
      </div>
    </div>
  );
}
