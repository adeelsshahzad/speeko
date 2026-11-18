// src/App.tsx - Speeko V2 Phase 1
import { useState } from "react";

type Msg = { text: string; me: boolean; tick: number };

const contacts = [
  { name: "امی", last: "بیٹا کھانا کھا لیا؟", time: "5:44" },
  { name: "ابو", last: "کل آ جانا", time: "5:20" },
  { name: "دوست گروپ", last: "8 بندے آ گئے", time: "4:10" },
];

export default function App() {
  const [page, setPage] = useState("chats");
  const [openChat, setOpenChat] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([
    { text: "السلام علیکم", me: false, tick: 2 },
    { text: "وعلیکم السلام، کیسے ہو؟", me: true, tick: 2 },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { text: input, me: true, tick: 1 }]);
    setInput("");
    // 2 سیکنڈ بعد ڈبل ٹک، 4 سیکنڈ بعد نیلا ٹک - ڈیمو کے لیے
    setTimeout(() => {
      setMsgs((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, tick: 2 } : x)));
    }, 2000);
  };

  const Tick = ({ tick }: { tick: number }) => {
    if (tick === 1) return <span>✓</span>;
    if (tick === 2) return <span>✓✓</span>;
    return <span style={{ color: "#53bdeb" }}>✓✓</span>;
  };

  if (page === "settings") {
    return (
      <div style={{ background: "#111b21", color: "white", minHeight: "100vh", padding: 16 }}>
        <h2>Settings</h2>
        {["Account", "Privacy", "Lists", "Chats", "Appearance", "Broadcasts", "Events"].map((s) => (
          <div key={s} style={{ background: "#202c33", padding: 14, margin: 8, borderRadius: 10 }}>{s}</div>
        ))}
        <button onClick={() => setPage("chats")} style={{ background: "#00a884", padding: 12, border: 0, borderRadius: 10, color: "white", width: "100%" }}>واپس چیٹس پر</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#202c33", padding: 14, display: "flex", justifyContent: "space-between" }}>
        <b style={{ fontSize: 20, color: "#00a884" }}>Speeko</b>
        <button onClick={() => setPage("settings")} style={{ background: "transparent", color: "white", border: 0 }}>⚙️ Settings</button>
      </div>

      <div style={{ flex: 1, padding: 12 }}>
        <h3>چیٹ: {contacts[openChat].name}</h3>
        {msgs.map((m, i) => (
          <div key={i} style={{ background: m.me ? "#005c4b" : "#202c33", padding: 10, borderRadius: 10, margin: 6, marginLeft: m.me ? 60 : 0, marginRight: m.me ? 0 : 60 }}>
            {m.text} <span style={{ fontSize: 11, float: "right" }}>{m.me && <Tick tick={m.tick} />}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", padding: 10, background: "#202c33" }}>
        <button style={{ fontSize: 20, background: "transparent", border: 0 }}>😊 📎 📷</button>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="میسج لکھیں..." style={{ flex: 1, padding: 10, borderRadius: 20, border: 0, margin: "0 8px" }} />
        <button onClick={send} style={{ background: "#00a884", color: "white", border: 0, borderRadius: "50%", width: 45, height: 45 }}>➤</button>
      </div>
    </div>
  );
}
