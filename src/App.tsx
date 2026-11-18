import { useState } from "react";

type Contact = { name: string; number: string };

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
  const [msgs, setMsgs] = useState<string[]>(["Hello", "Helloo"]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");

  const saveContact = () => {
    if (!newName.trim() || !newNumber.trim()) return;
    const c = { name: newName, number: newNumber };
    setContacts([...contacts, c]);
    setSelected(c);
    setNewName("");
    setNewNumber("");
    setShowAdd(false);
    setPage("chats");
  };

  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.number.includes(search));

  return (
    <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#202c33", padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
        <b style={{ color: "#00a884", fontSize: 22, flex: 1 }}>Speeko</b>
        <button onClick={() => setPage("contacts")} style={{ background: "transparent", color: "white", border: 0, fontSize: 16 }}>Contacts</button>
        <button onClick={() => setPage("chats")} style={{ background: "transparent", color: "white", border: 0, fontSize: 16 }}>Chats</button>
        <button onClick={() => setPage("calls")} style={{ background: "transparent", color: "white", border: 0, fontSize: 16 }}>Calls</button>
        <button onClick={() => setPage("settings")} style={{ background: "transparent", color: "white", border: 0, fontSize: 16 }}>Settings</button>
      </div>

      {page === "contacts" && (
        <div style={{ padding: 16 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." style={{ width: "100%", padding: 12, borderRadius: 10, border: 0, marginBottom: 12, boxSizing: "border-box" }} />
          <button onClick={() => setShowAdd(true)} style={{ background: "#00a884", color: "white", padding: 14, border: 0, borderRadius: 10, width: "100%", fontSize: 17, fontWeight: "bold" }}>+ Add New Contact</button>
          <button onClick={() => setShowAdd(true)} style={{ background: "#25D366", color: "white", padding: 12, border: 0, borderRadius: 10, width: "100%", marginTop: 8 }}>📞 Add From Phonebook</button>
          {showAdd && (
            <div style={{ background: "#202c33", padding: 14, borderRadius: 12, marginTop: 12 }}>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name - نام" style={{ width: "100%", padding: 12, borderRadius: 8, border: 0, marginBottom: 8, boxSizing: "border-box" }} />
              <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} placeholder="Number - نمبر" style={{ width: "100%", padding: 12, borderRadius: 8, border: 0, marginBottom: 8, boxSizing: "border-box" }} />
              <button onClick={saveContact} style={{ background: "#00a884", color: "white", padding: 12, border: 0, borderRadius: 8, width: "100%", fontSize: 16 }}>Save Contact</button>
            </div>
          )}
          {filtered.map((c, i) => (
            <div key={i} onClick={() => { setSelected(c); setPage("chats"); }} style={{ background: "#202c33", padding: 14, marginTop: 8, borderRadius: 10, display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
              <b>👤 {c.name}</b><span style={{ color: "#aaa" }}>{c.number}</span>
            </div>
          ))}
        </div>
      )}

      {page === "chats" && (
        <>
          <div style={{ flex: 1, padding: 12 }}>
            <h3 style={{ textAlign: "center" }}>{selected.name} - {selected.number}</h3>
            {msgs.map((m, i) => (
              <div key={i} style={{ background: i === 1 ? "#005c4b" : "#202c33", padding: 10, borderRadius: 10, margin: 6, maxWidth: "80%", marginLeft: i === 1 ? "auto" : 0 }}>{m}</div>
            ))}
          </div>
          <div style={{ display: "flex", margin: 12 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: 12, borderRadius: 20, border: 0 }} onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { setMsgs([...msgs, input]); setInput(""); } }} />
            <button onClick={() => { if (input.trim()) { setMsgs([...msgs, input]); setInput(""); } }} style={{ background: "#00a884", color: "white", border: 0, borderRadius: "50%", width: 45, height: 45, marginLeft: 8 }}>➤</button>
          </div>
        </>
      )}

      {page === "calls" && (
        <div style={{ padding: 16 }}>
          <h3>Calls - {selected.name}</h3>
          <p>Voice Call and Video Call - coming in next part</p>
        </div>
      )}

      {page === "settings" && (
        <div style={{ padding: 16 }}>
          <h3>Settings</h3>
          <p>Language</p>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 8 }}>
            <option value="en">English</option>
            <option value="ur">Urdu - اردو</option>
            <option value="hi">Hindi - हिन्दी</option>
            <option value="ar">Arabic - العربية</option>
            <option value="zh">Chinese - 中文</option>
            <option value="fr">French - Français</option>
            <option value="es">Spanish - Español</option>
            <option value="tr">Turkish - Türkçe</option>
            <option value="ru">Russian - Русский</option>
            <option value="ko">Korean - 한국어</option>
            <option value="ja">Japanese - 日本語</option>
            <option value="de">German - Deutsch</option>
            <option value="it">Italian - Italiano</option>
            <option value="pt">Portuguese - Português</option>
            <option value="el">Greek - Ελληνικά</option>
          </select>
          <p style={{ marginTop: 12 }}>Current: {lang}</p>
        </div>
      )}
    </div>
  );
}
