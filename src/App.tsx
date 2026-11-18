// Speeko V2 - مکمل - Phase 1 + Phase 2
import { useState } from "react";

type Msg = { text: string; me: boolean; tick: number };

export default function App() {
  const [page, setPage] = useState("chats");
  const [inCall, setInCall] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [watch, setWatch] = useState(false);
  const [ytLink, setYtLink] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { text: "السلام علیکم", me: false, tick: 2 },
    { text: "وعلیکم السلام", me: true, tick: 2 },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { text: input, me: true, tick: 1 }]);
    setInput("");
  };

  const Tick = ({ tick }: { tick: number }) => {
    if (tick === 1) return <span>✓</span>;
    if (tick === 2) return <span>✓✓</span>;
    return <span style={{ color: "#53bdeb" }}>✓✓</span>;
  };

  if (inCall) {
    const members = ["آپ", "امی", "ابو", "بھائی", "دوست 1", "دوست 2", "دوست 3", "دوست 4"];
    return (
      <div style={{ background: "#000", color: "white", minHeight: "100vh", padding: 12, textAlign: "center" }}>
        <h3>{isVideo ? "ویڈیو کال - 8 بندے" : "آڈیو کال - 8 بندے"}</h3>
        {watch && (
          <div style={{ background: "#111", padding: 12, borderRadius: 12 }}>
            <h4>📺 Watch Together</h4>
            <input value={ytLink} onChange={(e) => setYtLink(e.target.value)} placeholder="YouTube لنک ڈالیں..." style={{ width: "90%", padding: 10, borderRadius: 10 }} />
            {ytLink && <iframe width="100%" height="250" src={ytLink.replace("watch?v=", "embed/")} allowFullScreen style={{ borderRadius: 10, marginTop: 10 }} />}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          {members.map((m) => (
            <div key={m} style={{ background: "#202c33", padding: 20, borderRadius: 12 }}>{isVideo ? "📹" : "🎤"}<br />{m}</div>
          ))}
        </div>
        <button onClick={() => setWatch(!watch)} style={{ background: "#FF0000", color: "white", padding: 12, border: 0, borderRadius: 10, margin: 10 }}>▶️ YouTube Together</button>
        <button onClick={() => setInCall(false)} style={{ background: "red", color: "white", padding: 12, border: 0, borderRadius: 10 }}>📞 کال بند کریں</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#202c33", padding: 14, display: "flex", gap: 10 }}>
        <b style={{ color: "#00a884", fontSize: 20 }}>Speeko</b>
        <button onClick={() => setPage("chats")} style={{ background: "transparent", color: "white", border: 0 }}>💬 چیٹس</button>
        <button onClick={() => setPage("calls")} style={{ background: "transparent", color: "white", border: 0 }}>📞 کالز</button>
        <button onClick={() => setPage("settings")} style={{ background: "transparent", color: "white", border: 0 }}>⚙️ Settings</button>
      </div>

      {page === "calls" ? (
        <div style={{ padding: 16 }}>
          <h3>گروپ کال - 8 بندے</h3>
          <button onClick={() => { setIsVideo(false); setInCall(true); }} style={{ background: "#00a884", padding: 14, border: 0, borderRadius: 10, color: "white", width: "100%", marginTop: 10 }}>🎤 آڈیو گروپ کال</button>
          <button onClick={() => { setIsVideo(true); setInCall(true); }} style={{ background: "#00a884", padding: 14, border: 0, borderRadius: 10, color: "white", width: "100%", marginTop: 10 }}>📹 ویڈیو گروپ کال</button>
        </div>
      ) : page === "settings" ? (
        <div style={{ padding: 16 }}>
          <h3>Settings</h3>
          {["Account", "Privacy", "Lists", "Chats", "Appearance", "Broadcasts", "Events"].map((s) => (
            <div key={s} style={{ background: "#202c33", padding: 14, margin: 8, borderRadius: 10 }}>{s}</div>
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, padding: 12 }}>
          <h3>چیٹ: امی</h3>
          {msgs.map((m, i) => (
            <div key={i} style={{ background: m.me ? "#005c4b" : "#202c33", padding: 10, borderRadius: 10, margin: 6, marginLeft: m.me ? 60 : 0, marginRight: m.me ? 0 : 60 }}>
              {m.text} <span style={{ float: "right", fontSize: 11 }}>{m.me && <Tick tick={m.tick} />}</span>
            </div>
          ))}
          <div style={{ display: "flex", marginTop: 12 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="میسج لکھیں..." style={{ flex: 1, padding: 10, borderRadius: 20, border: 0 }} />
            <button onClick={send} style={{ background: "#00a884", color: "white", border: 0, borderRadius: "50%", width: 45, height: 45, marginLeft: 8 }}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}
