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
    <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <div style={{ background: "#202c33", padding: "10px 14px", display: "flex", gap: 14, alignItems: "center" }}>
        <b style={{ color: "#00a884", fontSize: 19, flex: 1 }}>Speeko</b>
        <button onClick={() => setPage("contacts")} style={{ background: "transparent", color: "white", border: 0, fontSize: 13 }}>Contacts</button>
        <button onClick={() => setPage("chats")} style={{ background: "transparent", color: "white", border: 0, fontSize: 13 }}>Chats</button>
        <button onClick={() => setPage("calls")} style={{ background: "transparent", color: "white", border: 0, fontSize: 13 }}>Calls</button>
        <button onClick={() => setPage("settings")} style={{ background: "transparent", color: "white", border: 0, fontSize: 13 }}>Settings</button>
      </div>

      {page === "contacts" && (
        <div style={{ padding: 12, position: "relative", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <h3 style={{ fontSize: 15, margin: 0, fontWeight: 500 }}>Contacts <span style={{ color: "#888", fontSize: 12 }}>({contacts.length})</span></h3>
            <button onClick={() => setShowAdd(true)} style={{ background: "#00a884", color: "white", border: 0, borderRadius: "50%", width: 32, height: 32, fontSize: 20, lineHeight: "1" }}>+</button>
          </div>

          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ width: "100%", padding: "8px 12px", borderRadius: 20, border: 0, marginBottom: 10, boxSizing: "border-box", fontSize: 13, background: "#202c33", color: "white" }} />

          {showAdd && (
            <div style={{ background: "#202c33", padding: 12, borderRadius: 10, marginBottom: 10 }}>
              <p style={{ fontSize: 13, margin: "0 0 8px 0" }}>New Contact</p>
              <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" style={{ width: "100%", padding: 9, borderRadius: 8, border: 0, marginBottom: 7, boxSizing: "border-box", fontSize: 13 }} />
              <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} placeholder="Number" style={{ width: "100%", padding: 9, borderRadius: 8, border: 0, marginBottom: 7, boxSizing: "border-box", fontSize: 13 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setShowAdd(false)} style={{ background: "#333", color: "white", padding: 9, border: 0, borderRadius: 8, flex: 1, fontSize: 13 }}>Cancel</button>
                <button onClick={saveContact} style={{ background: "#00a884", color: "white", padding: 9, border: 0, borderRadius: 8, flex: 1, fontSize: 13 }}>Save</button>
              </div>
              <button onClick={() => setShowAdd(true)} style={{ background: "transparent", color: "#25D366", border: 0, width: "100%", marginTop: 6, fontSize: 12 }}>📞 Import from Phonebook</button>
            </div>
          )}

          {filtered.map((c, i) => (
            <div key={i} onClick={() => { setSelected(c); setPage("chats"); }} style={{ padding: "10px 4px", borderBottom: "1px solid #222", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={{ background: "#00a884", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{c.name.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{c.number}</div>
              </div>
              <span style={{ fontSize: 12, color: "#888" }}>›</span>
            </div>
          ))}

          <button onClick={() => setShowAdd(true)} style={{ position: "fixed", bottom: 20, right: 16, background: "#00a884", color: "white", border: 0, borderRadius: "50%", width: 52, height: 52, fontSize: 28, boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}>+</button>
        </div>
      )}

      {page === "chats" && (
        <>
          <div style={{ flex: 1, padding: 12 }}>
            <p style={{ textAlign: "center", fontSize: 13, color: "#aaa" }}>{selected.name} - {selected.number}</p>
            {msgs.map((m, i) => (
              <div key={i} style={{ background: i === 1 ? "#005c4b" : "#202c33", padding: "8px 12px", borderRadius: 10, margin: 6, maxWidth: "80%", marginLeft: i === 1 ? "auto" : 0, fontSize: 14 }}>{m}</div>
            ))}
          </div>
          <div style={{ display: "flex", margin: 12 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: 10, borderRadius: 20, border: 0, fontSize: 13 }} onKeyDown={(e) => { if (e.key === "Enter" && input.trim()) { setMsgs([...msgs, input]); setInput(""); } }} />
            <button onClick={() => { if (input.trim()) { setMsgs([...msgs, input]); setInput(""); } }} style={{ background: "#00a884", color: "white", border: 0, borderRadius: "50%", width: 42, height: 42, marginLeft: 8 }}>➤</button>
          </div>
        </>
      )}

      {page === "calls" && (
        <div style={{ padding: 16 }}>
          <h3 style={{ fontSize: 15 }}>Calls - {selected.name}</h3>
          <p style={{ fontSize: 13, color: "#aaa" }}>Voice & Video Call - next part</p>
        </div>
      )}

      {page === "settings" && (
        <div style={{ padding: 16 }}>
          <h3 style={{ fontSize: 15 }}>Settings</h3>
          <p style={{ fontSize: 13 }}>Language</p>
          <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, fontSize: 13 }}>
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
        </div>
      )}
    </div>
  );
}
