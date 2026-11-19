import React, { useEffect, useMemo, useRef, useState } from "react";

type Message = { id: string; text: string; time: string; mine: boolean; kind?: "text" | "file"; fileName?: string };
type Chat = { id: string; name: string; initials: string; color: string; online?: boolean; unread?: number; lastSeen?: string; messages: Message[]; group?: boolean };
type Tab = "Chats" | "Status" | "Calls" | "Groups" | "Settings";

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const makeMessage = (text: string, mine = true): Message => ({ id: `${Date.now()}-${Math.random()}`, text, time: now(), mine });

const initialChats: Chat[] = [
  { id: "1", name: "Ayesha Khan", initials: "AK", color: "#d8f3dc", online: true, lastSeen: "online", unread: 2, messages: [
    { id: "m1", text: "Assalam-o-Alaikum! How are you?", time: "10:24", mine: false },
    { id: "m2", text: "Wa Alaikum Assalam 😊 I am good!", time: "10:25", mine: true },
    { id: "m3", text: "Are we meeting today?", time: "10:26", mine: false },
  ]},
  { id: "2", name: "Ali Raza", initials: "AR", color: "#dbeafe", lastSeen: "last seen today at 9:40 AM", messages: [
    { id: "m4", text: "I have sent you the documents.", time: "09:40", mine: false },
    { id: "m5", text: "Thank you!", time: "09:42", mine: true },
  ]},
  { id: "3", name: "Family Group", initials: "FG", color: "#fce7f3", lastSeen: "3 members online", group: true, messages: [
    { id: "m6", text: "Dinner at 8 tonight 🍽️", time: "Yesterday", mine: false },
  ]},
  { id: "4", name: "Sara Ahmed", initials: "SA", color: "#fef3c7", lastSeen: "last seen yesterday", messages: [
    { id: "m7", text: "That picture looks beautiful!", time: "Yesterday", mine: false },
  ]},
  { id: "5", name: "SPEEKO Updates", initials: "S", color: "#d1fae5", lastSeen: "official updates", messages: [
    { id: "m8", text: "Welcome to SPEEKO. Stay connected!", time: "Monday", mine: false },
  ]},
];

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<string, React.ReactNode> = {
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/></>,
    status: <><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 9 9M12 7a5 5 0 0 1 5 5"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.2 10a16 16 0 0 0 6 6l1.6-1.8a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.5 2.8z"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-1.9l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.6-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.6.9l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 1.9z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    paperclip: <><path d="m21.4 11.1-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 0 1-2.6-2.6l8.5-8.5"/></>,
    video: <><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    more: <><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></>,
    smile: <><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  };
  return <svg {...common}>{paths[name] || paths.chat}</svg>;
}

export default function App() {
  const [chats, setChats] = useState<Chat[]>(() => {
    try { const saved = localStorage.getItem("speeko-chats"); return saved ? JSON.parse(saved) : initialChats; }
    catch { return initialChats; }
  });
  const [activeId, setActiveId] = useState("1");
  const [tab, setTab] = useState<Tab>("Chats");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [newName, setNewName] = useState("");
  const [mobileChat, setMobileChat] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { localStorage.setItem("speeko-chats", JSON.stringify(chats)); }, [chats]);
  const activeChat = chats.find(c => c.id === activeId) || chats[0];
  const visibleChats = useMemo(() => chats.filter(c => c.name.toLowerCase().includes(search.toLowerCase())), [chats, search]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [activeChat?.messages.length, activeId]);

  function notify(text: string) { setToast(text); window.setTimeout(() => setToast(""), 2600); }
  function chooseChat(id: string) { setActiveId(id); setMobileChat(true); setTab("Chats"); }

  function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    const text = message.trim();
    if (!text || !activeChat) return;
    const msg = makeMessage(text);
    setChats(old => old.map(c => c.id === activeChat.id ? { ...c, messages: [...c.messages, msg], unread: 0 } : c));
    setMessage("");
  }

  function createChat(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const chat: Chat = { id: `${Date.now()}`, name, initials: name.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase(), color: "#d1fae5", lastSeen: "new contact", messages: [] };
    setChats(old => [chat, ...old]); setActiveId(chat.id); setNewName(""); setShowNewChat(false); setMobileChat(true); setTab("Chats");
  }

  function attachFile(file?: File) {
    if (!file || !activeChat) return;
    const msg: Message = { ...makeMessage(`📎 ${file.name}`), kind: "file", fileName: file.name };
    setChats(old => old.map(c => c.id === activeChat.id ? { ...c, messages: [...c.messages, msg] } : c));
    notify("Attachment added to this demo chat.");
  }

  const css = `
  *{box-sizing:border-box} :root{font-family:Arial,Helvetica,sans-serif;color:#111b21;background:#d9e1e5} body{margin:0}
  button,input{font:inherit} button{cursor:pointer}
  .sp-app{height:100dvh;min-height:560px;max-width:1600px;margin:0 auto;background:#fff;display:flex;overflow:hidden;box-shadow:0 4px 24px #0002}
  .sp-side{width:410px;min-width:340px;border-right:1px solid #e9edef;display:flex;flex-direction:column;background:#fff}
  .sp-top{height:62px;background:#f0f2f5;display:flex;align-items:center;padding:0 18px;justify-content:space-between}
  .sp-brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:21px;letter-spacing:1px;color:#075e54}
  .sp-logo{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#087e68;color:white;font-weight:900;font-size:21px;box-shadow:inset 0 0 0 2px #ffffff33}
  .sp-actions{display:flex;gap:8px}.sp-icon{border:0;background:transparent;color:#54656f;border-radius:50%;width:40px;height:40px;display:grid;place-items:center}.sp-icon:hover{background:#e3e7e9}
  .sp-tabs{display:flex;justify-content:space-around;border-bottom:1px solid #e9edef;background:#fff}.sp-tab{border:0;background:white;color:#667781;display:flex;align-items:center;justify-content:center;gap:7px;padding:14px 5px;flex:1;font-size:13px}.sp-tab.active{color:#008f75;border-bottom:3px solid #00a884;font-weight:700}
  .sp-search{margin:12px 14px 8px;background:#f0f2f5;border-radius:9px;padding:10px 12px;display:flex;align-items:center;gap:10px;color:#667781}.sp-search input{border:0;outline:0;background:transparent;width:100%;font-size:14px}
  .sp-list{overflow:auto;flex:1}.sp-row{display:flex;gap:12px;align-items:center;width:100%;padding:12px 15px;border:0;border-bottom:1px solid #f0f2f3;background:#fff;text-align:left}.sp-row:hover,.sp-row.sel{background:#f0f2f5}
  .sp-avatar{width:49px;height:49px;flex-shrink:0;border-radius:50%;display:grid;place-items:center;font-size:17px;font-weight:700;color:#075e54}.sp-rowbody{min-width:0;flex:1}.sp-rowhead{display:flex;justify-content:space-between;gap:8px}.sp-rowhead b{font-size:15px;font-weight:600}.sp-time{font-size:11px;color:#667781}.sp-preview{display:flex;justify-content:space-between;gap:5px;margin-top:6px;color:#667781;font-size:13px}.sp-preview span:first-child{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sp-unread{background:#25d366;color:#fff;border-radius:20px;min-width:19px;height:19px;display:grid;place-items:center;font-size:11px;padding:0 5px}
  .sp-foot{padding:13px 16px;color:#8696a0;border-top:1px solid #edf0f2;font-size:11px}.sp-online{display:inline-block;width:7px;height:7px;background:#25d366;border-radius:50%;margin-right:6px}
  .sp-main{flex:1;min-width:0;display:flex;flex-direction:column;background:#efeae2;position:relative}
  .sp-chathead{height:62px;background:#f0f2f5;display:flex;align-items:center;padding:0 16px;gap:12px;border-bottom:1px solid #e7ebed}.sp-chatname{flex:1;min-width:0}.sp-chatname b{display:block;font-size:15px}.sp-chatname small{display:block;color:#667781;margin-top:4px;font-size:12px}
  .sp-wall{flex:1;overflow:auto;padding:24px clamp(14px,5vw,78px);display:flex;flex-direction:column;gap:8px;background-color:#efeae2;background-image:radial-gradient(#d8d1c7 .65px,transparent .65px);background-size:18px 18px}
  .sp-bubble{max-width:min(75%,560px);padding:8px 10px 6px;border-radius:9px;box-shadow:0 1px 1px #0001;font-size:14px;line-height:1.45;overflow-wrap:anywhere;display:flex;flex-direction:column;gap:4px}.sp-mine{align-self:flex-end;background:#d9fdd3;border-top-right-radius:2px}.sp-theirs{align-self:flex-start;background:#fff;border-top-left-radius:2px}.sp-meta{display:flex;justify-content:flex-end;align-items:center;gap:4px;color:#718087;font-size:10px}
  .sp-compose{min-height:66px;display:flex;align-items:center;gap:8px;padding:10px 16px;background:#f0f2f5}.sp-compose input[type=text]{flex:1;min-width:0;border:0;outline:0;background:white;border-radius:24px;padding:13px 17px;font-size:14px}.sp-send{width:42px;height:42px;border:0;border-radius:50%;background:#008f75;color:white;display:grid;place-items:center}.sp-empty{margin:auto;text-align:center;color:#667781;padding:20px}.sp-empty h2{font-weight:400;color:#41525b}.sp-emptylogo{margin:auto auto 18px;width:82px;height:82px;border-radius:50%;display:grid;place-items:center;background:#087e68;color:white;font-size:42px;font-weight:900}
  .sp-section{flex:1;overflow:auto;padding:26px;background:#fff}.sp-section h2{font-size:20px;font-weight:500}.sp-status{display:flex;align-items:center;gap:14px;padding:13px 4px;border-bottom:1px solid #edf0f2}.sp-ring{width:52px;height:52px;border:3px solid #00a884;border-radius:50%;display:grid;place-items:center;color:#075e54;font-weight:700}.sp-call{display:flex;align-items:center;gap:13px;padding:14px 3px;border-bottom:1px solid #edf0f2}.sp-call small{display:block;color:#667781;margin-top:5px}
  .sp-settingsrow{padding:17px 5px;border-bottom:1px solid #edf0f2;display:flex;gap:14px;align-items:center;color:#34434b}.sp-modalback{position:fixed;inset:0;background:#0006;display:grid;place-items:center;z-index:10;padding:18px}.sp-modal{width:min(100%,390px);background:#fff;border-radius:12px;padding:22px;box-shadow:0 12px 40px #0003}.sp-modal h3{margin:0 0 16px}.sp-modal input{width:100%;padding:12px;border:1px solid #d9e0e3;border-radius:8px;outline-color:#00a884}.sp-modalactions{display:flex;justify-content:flex-end;gap:9px;margin-top:18px}.sp-modalactions button{padding:10px 15px;border:0;border-radius:7px}.sp-cancel{background:#edf0f2}.sp-create{background:#008f75;color:#fff}.sp-toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#263238;color:white;padding:12px 17px;border-radius:9px;z-index:20;font-size:13px}
  @media(max-width:720px){.sp-side{width:100%;min-width:0}.sp-main{width:100%}.sp-hide{display:none!important}.sp-tabs .sp-tab{flex-direction:column;gap:4px;font-size:11px;padding:9px 2px}.sp-tab svg{width:19px;height:19px}.sp-back{display:grid!important}.sp-wall{padding:15px 10px}.sp-bubble{max-width:88%}.sp-top{height:58px}.sp-chathead{height:58px}}
  @media(min-width:721px){.sp-back{display:none!important}}
  `;

  return <>
    <style>{css}</style>
    <div className="sp-app">
      <aside className={`sp-side ${mobileChat ? "sp-hide" : ""}`}>
        <header className="sp-top">
          <div className="sp-brand"><span className="sp-logo">S</span><span>SPEEKO</span></div>
          <div className="sp-actions">
            <button className="sp-icon" title="New chat" onClick={() => setShowNewChat(true)}><Icon name="plus"/></button>
            <button className="sp-icon" title="Menu" onClick={() => setTab("Settings")}><Icon name="more"/></button>
          </div>
        </header>
        <nav className="sp-tabs">
          {(["Chats","Status","Calls","Groups","Settings"] as Tab[]).map(t => <button key={t} className={`sp-tab ${tab===t?"active":""}`} onClick={() => {setTab(t);setMobileChat(false);}}>
            <Icon name={t==="Chats"?"chat":t==="Status"?"status":t==="Calls"?"phone":t==="Groups"?"users":"settings"} size={19}/><span>{t}</span>
          </button>)}
        </nav>
        {tab === "Chats" ? <>
          <div className="sp-search"><Icon name="search" size={18}/><input placeholder="Search or start a new chat" value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div className="sp-list">
            {visibleChats.map(c => {
              const last = c.messages[c.messages.length-1];
              return <button key={c.id} className={`sp-row ${activeId===c.id?"sel":""}`} onClick={() => chooseChat(c.id)}>
                <span className="sp-avatar" style={{background:c.color}}>{c.initials}</span>
                <span className="sp-rowbody">
                  <span className="sp-rowhead"><b>{c.name}</b><small className="sp-time">{last?.time || ""}</small></span>
                  <span className="sp-preview"><span>{last?.text || "Start a conversation"}</span>{c.unread ? <span className="sp-unread">{c.unread}</span> : null}</span>
                </span>
              </button>;
            })}
            {!visibleChats.length && <div className="sp-empty">No chats found.</div>}
          </div>
          <footer className="sp-foot"><span className="sp-online"/> SPEEKO · Your conversations</footer>
        </> : <div className="sp-section">
          {tab==="Status" && <><h2>Status</h2><div className="sp-status"><div className="sp-ring">S</div><div><b>My status</b><small style={{display:"block",color:"#667781",marginTop:5}}>Tap to add a status update</small></div><button className="sp-icon" onClick={()=>notify("Status publishing will be connected to your backend.")}><Icon name="plus"/></button></div><p style={{color:"#667781",fontSize:13}}>Recent updates</p><div className="sp-status"><div className="sp-ring">AK</div><div><b>Ayesha Khan</b><small style={{display:"block",color:"#667781",marginTop:5}}>Today, 10:30 AM</small></div></div></>}
          {tab==="Calls" && <><h2>Calls</h2><div className="sp-call"><span className="sp-avatar" style={{background:"#d8f3dc"}}>AK</span><div style={{flex:1}}><b>Ayesha Khan</b><small>Today, 10:15 AM · Incoming</small></div><button className="sp-icon" onClick={()=>notify("Voice calling needs WebRTC and a TURN server.")}><Icon name="phone"/></button></div><div className="sp-call"><span className="sp-avatar" style={{background:"#dbeafe"}}>AR</span><div style={{flex:1}}><b>Ali Raza</b><small>Yesterday · Outgoing</small></div><button className="sp-icon" onClick={()=>notify("Video calling needs WebRTC and a TURN server.")}><Icon name="video"/></button></div></>}
          {tab==="Groups" && <><h2>Groups</h2><p style={{color:"#667781"}}>Your group conversations appear here.</p>{chats.filter(c=>c.group).map(c=><button className="sp-row" key={c.id} onClick={()=>chooseChat(c.id)}><span className="sp-avatar" style={{background:c.color}}>{c.initials}</span><b>{c.name}</b></button>)}<button className="sp-create" style={{padding:12,border:0,borderRadius:8,marginTop:15}} onClick={()=>notify("Group member management will be added with the backend.")}>Create group</button></>}
          {tab==="Settings" && <><h2>Settings</h2><div className="sp-settingsrow"><span className="sp-avatar" style={{background:"#d1fae5"}}>S</span><div><b>SPEEKO User</b><small style={{display:"block",color:"#667781",marginTop:4}}>Hey there! I am using SPEEKO.</small></div></div>{["Account","Privacy","Chats","Notifications","Help","App info"].map(x=><div className="sp-settingsrow" key={x}><Icon name="settings" size={20}/>{x}</div>)}</>}
        </div>}
      </aside>

      <main className={`sp-main ${!mobileChat ? "sp-hide" : ""}`}>
        {activeChat ? <>
          <header className="sp-chathead">
            <button className="sp-icon sp-back" onClick={()=>setMobileChat(false)}><Icon name="back"/></button>
            <span className="sp-avatar" style={{width:41,height:41,background:activeChat.color}}>{activeChat.initials}</span>
            <div className="sp-chatname"><b>{activeChat.name}</b><small>{activeChat.online?"online":activeChat.lastSeen || "SPEEKO contact"}</small></div>
            <button className="sp-icon" title="Voice call" onClick={()=>notify("Voice calls require WebRTC signaling and a TURN server.")}><Icon name="phone"/></button>
            <button className="sp-icon" title="Video call" onClick={()=>notify("Video calls require WebRTC signaling and a TURN server.")}><Icon name="video"/></button>
            <button className="sp-icon" title="More"><Icon name="more"/></button>
          </header>
          <section className="sp-wall">
            {activeChat.messages.map(m=><div key={m.id} className={`sp-bubble ${m.mine?"sp-mine":"sp-theirs"}`}>
              <span>{m.text}</span><span className="sp-meta">{m.time}{m.mine?<span style={{color:"#53a6d1"}}>✓✓</span>:null}</span>
            </div>)}
            {!activeChat.messages.length && <div className="sp-empty"><div className="sp-emptylogo">S</div><h2>Say hello on SPEEKO</h2><p>Your messages will appear here.</p></div>}
            <div ref={bottomRef}/>
          </section>
          <form className="sp-compose" onSubmit={sendMessage}>
            <button type="button" className="sp-icon" title="Emoji" onClick={()=>setMessage(v=>v+"😊")}><Icon name="smile"/></button>
            <button type="button" className="sp-icon" title="Attach file" onClick={()=>fileRef.current?.click()}><Icon name="paperclip"/></button>
            <input type="file" ref={fileRef} hidden onChange={e=>attachFile(e.target.files?.[0])}/>
            <input type="text" placeholder="Type a message" value={message} onChange={e=>setMessage(e.target.value)}/>
            <button className="sp-send" type="submit" title="Send"><Icon name="send" size={19}/></button>
          </form>
        </> : <div className="sp-empty"><div className="sp-emptylogo">S</div><h2>Welcome to SPEEKO</h2><p>Select a chat to start messaging.</p></div>}
      </main>
    </div>
    {showNewChat && <div className="sp-modalback" onClick={()=>setShowNewChat(false)}><form className="sp-modal" onSubmit={createChat} onClick={e=>e.stopPropagation()}>
      <h3>New chat</h3><input autoFocus placeholder="Enter contact name" value={newName} onChange={e=>setNewName(e.target.value)}/>
      <div className="sp-modalactions"><button type="button" className="sp-cancel" onClick={()=>setShowNewChat(false)}>Cancel</button><button type="submit" className="sp-create">Create chat</button></div>
    </form></div>}
    {toast && <div className="sp-toast">{toast}</div>}
  </>;
}
