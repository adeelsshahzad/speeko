import { useState, useRef, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("contacts");
  const [contacts, setContacts] = useState<any[]>([
    { name: "Ammi", number: "0300-1234567" },
    { name: "Abu", number: "0301-7654321" },
    { name: "Bhai", number: "0321-1112222" },
  ]);
  const [selected, setSelected] = useState<any>({ name: "Ammi", number: "0300-1234567" });
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [msgs, setMsgs] = useState<any[]>([{ type: "text", content: "Hello" }, { type: "text", content: "Helloo" }]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");
  const [callType, setCallType] = useState<any>(null);
  const [callTime, setCallTime] = useState(0);
  const fileRef: any = useRef(null);
  const videoRef: any = useRef(null);

  useEffect(() => {
    if (!callType) return;
    const t: any = setInterval(() => setCallTime((s: any) => s + 1), 1000);
    return () => clearInterval(t);
  }, [callType]);

  useEffect(() => {
    if (callType === "video" && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((s: any) => { videoRef.current.srcObject = s; }).catch(() => {});
    }
  }, [callType]);

  const saveContact = () => {
    if (!newName.trim() || !newNumber.trim()) return;
    const c = { name: newName, number: newNumber };
    setContacts([...contacts, c]);
    setSelected(c);
    setNewName(""); setNewNumber(""); setShowAdd(false); setPage("chats");
  };

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { type: "text", content: input }]);
    setInput("");
  };

  const onFile = (e: any) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const isVideo = f.type.startsWith("video");
    setMsgs([...msgs, { type: isVideo ? "video" : "image", content: url }]);
    e.target.value = "";
  };

  const filtered = contacts.filter((c: any) => c.name.toLowerCase().includes(search.toLowerCase()) || c.number.includes(search));
  const fmt = (s: any) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const getTab = (name: any) => {
    const active = page === name;
    return { background: active ? "#00a884" : "#2a3942", color: "white", border: 0, fontSize: 12, padding: "7px 11px", borderRadius: 20, fontWeight: active ? "bold" : "normal" };
  };

  if (callType) {
    return (
      <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center" }}>
        <div style={{ background: "#00a884", width: 90, height: 90, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{selected.name.charAt(0)}</div>
        <h2 style={{ margin: "14px 0 4px 0" }}>{selected.name}</h2>
        <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>{callType === "video" ? "Video Call" : "Voice Call"} - {fmt(callTime)}</p>
        {callType === "video" && <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", maxWidth: 320, borderRadius: 14, marginTop: 14, background: "#000" }} />}
        {callType === "voice" && <p style={{ fontSize: 40, marginTop: 20 }}>🎙️</p>}
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <button style={{ background: "#2a3942", color: "white", border: 0, width: 52, height: 52, borderRadius: "50%", fontSize: 20 }}>🎤</button>
          <button style={{ background: "#2a3942", color: "white", border: 0, width: 52, height: 52, borderRadius: "50%", fontSize: 20 }}>🔊</button>
          <button onClick={() => { setCallType(null); setCallTime(0); setPage("chats"); }} style={{ background: "red", color: "white", border: 0, width: 52, height: 52, borderRadius: "50%", fontSize: 20 }}>📞</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <div style={{ background: "#0b141a", padding: "10px 12px 12px 12px" }}>
        <b style={{ color: "#00a884", fontSize: 20, display: "block", marginBottom: 9, marginLeft: 4 }}>Speeko</b>
        <div style={{ background: "#1f2c34", padding: 4, borderRadius: 25, display: "flex", gap: 4 }}>
          <button onClick={() => setPage("contacts")} style={getTab("contacts") as any}>Contacts</button>
          <button onClick={() => setPage("chats")} style={getTab("
