import { useState, useRef, useEffect } from "react";

type Contact = { name: string; number: string };
type Msg = { type: "text" | "image" | "video"; content: string };

export default function App() {
  const [page, setPage] = useState("contacts");
  const [contacts, setContacts] = useState<Contact[]>([
    { name: "Ammi", number: "0300-1234567" },
    { name: "Abu", number: "0301-7654321" },
    { name: "Bhai", number: "0321-1112222" },
  ]);
  const [selected, setSelected] = useState<Contact>({ name: "Ammi", number: "0300-1234567" });
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([{ type: "text", content: "Hello" }, { type: "text", content: "Helloo" }]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");
  const [callType, setCallType] = useState<"voice" | "video" | null>(null);
  const [callTime, setCallTime] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!callType) return;
    const t = setInterval(() => setCallTime(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [callType]);

  useEffect(() => {
    if (callType === "video" && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(s => { if (videoRef.current) videoRef.current.srcObject = s; }).catch(() => {});
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

  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.number.includes(search));
  const tabStyle = (name: string) => ({
    background: page === name ? "#00a884" : "#2a3942",
    color: "white", border: 0, fontSize: 12, padding: "7px 11px", borderRadius: 20,
    fontWeight: page === name ? "bold" as const : "normal" as const,
  });

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (callType) {
    return (
      <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, textAlign: "center" }}>
        <div style={{ background: "#00a884", width: 90, height: 90, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{selected.name.charAt(0)}</div>
        <h2 style={{ margin: "14px 0 4px 0" }}>{selected.name}</h2>
        <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>{callType === "video" ? "Video Call" : "Voice Call"} - {fmt(callTime)}</p>
        {callType === "video" && <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", maxWidth: 320, borderRadius: 14, marginTop: 14, background: "#000" }} />}
        {callType === "voice" && <p style={{ fontSize: 40, marginTop: 20 }}>🎙️</p>}
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <button style={{ background: "#2a3942", color: "white", border: 0, width: 52
