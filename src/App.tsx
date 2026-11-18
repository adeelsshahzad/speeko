import { useState, useRef, useEffect } from "react";
export default function App(){
const [page,setPage]=useState("chats");
const [contacts,setContacts]=useState<any[]>([{name:"Ammi",number:"0300-1234567"},{name:"Abu",number:"0301-7654321"},{name:"Bhai",number:"0321-1112222"},{name:"My Moti Li...",number:"0300-9999999"}]);
const [sel,setSel]=useState<any>({name:"My Moti Li...",number:"0300-9999999"});
const [inChat,setInChat]=useState(false);
const [show,setShow]=useState(false);
const [nn,setNn]=useState("");const [num,setNum]=useState("");const [search,setSearch]=useState("");
const [msgs,setMsgs]=useState<any[]>([{type:"text",content:"Hello"},{type:"text",content:"Helloo"}]);
const [input,setInput]=useState("");const [lang,setLang]=useState("en");
const [call,setCall]=useState<any>(null);const [ct,setCt]=useState(0);
const [watchUrl,setWatchUrl]=useState("");const [playing,setPlaying]=useState("");
const [status,setStatus]=useState<any[]>([{name:"Ammi",time:"10 min ago"},{name:"Bhai",time:"1 hr ago"}]);
const fileRef:any=useRef(null);const videoRef:any=useRef(null);
useEffect(()=>{if(!call)return;const t:any=setInterval(()=>setCt((s:any)=>s+1),1000);return()=>clearInterval(t);},[call]);
useEffect(()=>{if(call==="video"&&videoRef.current){navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((s:any)=>{videoRef.current.srcObject=s;}).catch(()=>{});}},[call]);
const save=()=>{if(!nn.trim()||!num.trim())return;const c={name:nn,number:num};setContacts([...contacts,c]);setSel(c);setNn("");setNum("");setShow(false);};
const send=()=>{if(!input.trim())return;setMsgs([...msgs,{type:"text",content:input}]);setInput("");};
const onFile=(e:any)=>{const f=e.target.files[0];if(!f)return;const u=URL.createObjectURL(f);const t=f.type.startsWith("video")?"video":"image";setMsgs([...msgs,{type:t,content:u}]);e.target.value="";};
const filt=contacts.filter((c:any)=>c.name.toLowerCase().includes(search.toLowerCase())||c.number.includes(search));
const fmt=(s:any)=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
const startWatch=()=>{if(!watchUrl.trim())return;let u=watchUrl;if(u.includes("watch?v=")){u=u.split("v=")[1].split("&")[0];u="https://www.youtube.com/embed/"+u;}if(u.includes("youtu.be/")){u=u.split("youtu.be/")[1].split("?")[0];u="https://www.youtube.com/embed/"+u;}setPlaying(u);};
const VideoIcon=()=>(<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="2" y="6" width="13" height="12" rx="2"/><path d="M15 10l7-4v12l-7-4"/></svg>);
const PhoneIcon=()=>(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>);
const ChatIcon=()=>(<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zM8 9h8v2H8V9zm0 4h5v2H8v-2z"/></svg>);
const UpIcon=()=>(<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2a10 10 0 019 6M12 2a10 10 0 00-9 6M12 22a10 10 0 01-9-6M12 22a10 10 0 009-6M2 12a10 10 0 016-9M2 12a10 10 0 006 9M22 12a10 10 0 00-6-9M22 12a10 10 0 01-6 9"/></svg>);
const ComIcon=()=>(<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="8" r="2"/><circle cx="19" cy="8" r="2"/><path d="M12 9a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4zM5 12a3 3 0 00-3 3v1h6v-1a3 3 0 00-3-3zM19 12a3 3 0 013 3v1h-6v-1a3 3 0 013-3z"/></svg>);
if(call){return(<div style={{background:"#111b21",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}><div style={{background:"#00a884",width:90,height:90,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:36}}>{sel.name.charAt(0)}</div><h2>{sel.name}</h2><p style={{color:"#aaa"}}>{call==="video"?"Video Call":"Voice Call"} - {fmt(ct)}</p>{call==="video"&&<video ref={videoRef} autoPlay muted playsInline style={{width:"100%",maxWidth:320,borderRadius:14}}/>}{call==="voice"&&<p style={{fontSize:40}}>🎙️</p>}<button onClick={()=>{setCall(null);setCt(0);}} style={{background:"red",color:"white",border:0,width:52,height:52,borderRadius:"50%",fontSize:20,marginTop:20}}>📞</button></div>);}
if(inChat){
return(<div style={{background:"#111b21",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
<div style={{display:"flex",alignItems:"center",padding:"10px 8px",background:"#0b141a",gap:6}}>
<button onClick={()=>setInChat(false)} style={{background:"none",border:0,color:"white",fontSize:22}}>‹</button>
<div style={{background:"#00a884",width:34,height:34,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>{sel.name.charAt(0)}</div>
<div style={{flex:1,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",fontSize:18}}>{sel.name}</div>
<button onClick={()=>setCall("video")} style={{background:"none",border:0,padding:6}}><VideoIcon/></button>
<button onClick={()=>setCall("voice")} style={{background:"none",border:0,padding:6}}><PhoneIcon/></button>
<button style={{background:"none",border:0,color:"white",fontSize:22,padding:"0 6px"}}>⋮</button>
</div>
<div style={{display:"flex",gap:6,padding:"8px 10px"}}><button onClick={()=>setPage("
