import { useState, useRef, useEffect } from "react";
export default function App(){
const [page,setPage]=useState("chats");
const [contacts,setContacts]=useState<any[]>([
{name:"Ammi",number:"0300-1234567"},
{name:"Abu",number:"0301-7654321"},
{name:"Bhai",number:"0321-1112222"},
{name:"My Moti Li...",number:"0300-9999999"}]);
const [sel,setSel]=useState<any>({name:"My Moti Li...",number:"0300-9999999"});
const [inChat,setInChat]=useState(false);
const [show,setShow]=useState(false);
const [nn,setNn]=useState("");
const [num,setNum]=useState("");
const [search,setSearch]=useState("");
const [msgs,setMsgs]=useState<any[]>([
{type:"text",content:"Hello"},
{type:"text",content:"Helloo"}]);
const [input,setInput]=useState("");
const [call,setCall]=useState<any>(null);
const [ct,setCt]=useState(0);
const [watchUrl,setWatchUrl]=useState("");
const [playing,setPlaying]=useState("");
const fileRef:any=useRef(null);
const videoRef:any=useRef(null);
useEffect(()=>{
if(!call) return;
const t:any=setInterval(()=>setCt((s:any)=>s+1),1000);
return()=>clearInterval(t);
},[call]);
useEffect(()=>{
if(call==="video"&&videoRef.current){
navigator.mediaDevices.getUserMedia({video:true,audio:true})
.then((s:any)=>{videoRef.current.srcObject=s;})
.catch(()=>{});
}},[call]);
const save=()=>{
if(!nn.trim()||!num.trim()) return;
const c={name:nn,number:num};
setContacts([...contacts,c]);
setSel(c);setNn("");setNum("");setShow(false);
};
const send=()=>{
if(!input.trim()) return;
setMsgs([...msgs,{type:"text",content:input}]);
setInput("");
};
const onFile=(e:any)=>{
const f=e.target.files[0];
if(!f) return;
const u=URL.createObjectURL(f);
const t=f.type.startsWith("video")?"video":"image";
setMsgs([...msgs,{type:t,content:u}]);
e.target.value="";
};
const filt=contacts.filter((c:any)=>
c.name.toLowerCase().includes(search.toLowerCase())
||c.number.includes(search));
const fmt=(s:any)=>{
const m=String(Math.floor(s/60)).padStart(2,"0");
const sec=String(s%60).padStart(2,"0");
return m+":"+sec;
};
const startWatch=()=>{
if(!watchUrl.trim()) return;
let u=watchUrl;
if(u.includes("watch?v=")){
u=u.split("v=")[1].split("&")[0];
u="https://www.youtube.com/embed/"+u;
}
if(u.includes("youtu.be/")){
u=u.split("youtu.be/")[1].split("?")[0];
u="https://www.youtube.com/embed/"+u;
}
setPlaying(u);
};
if(call){
return(
<div style={{background:"#111b21",color:"white",minHeight:"100vh",textAlign:"center",padding:20}}>
<h2>{sel.name}</h2>
<p>{call==="video"?"Video Call":"Voice Call"} - {fmt(ct)}</p>
{call==="video"&&<video ref={videoRef} autoPlay muted playsInline style={{width:"100%",maxWidth:320,borderRadius:14}}/>}
{call==="voice"&&<p style={{fontSize:40}}>🎙️</p>}
<button onClick={()=>{setCall(null);setCt(0);}} style={{background:"red",color:"white",border:0,width:52,height:52,borderRadius:"50%",marginTop:20}}>📞</button>
</div>);
}
if(inChat){
return(
<div style={{background:"#111b21",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
<div style={{display:"flex",alignItems:"center",padding:10,gap:6,background:"#0b141a"}}>
<button onClick={()=>setInChat(false)} style={{background:"none",border:0,color:"white",fontSize:22}}>‹</button>
<div style={{background:"#00a884",width:34,height:34,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{sel.name.charAt(0)}</div>
<div style={{flex:1,fontSize:18,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{sel.name}</div>
<button onClick={()=>setCall("video")} style={{background:"none",border:0,fontSize:20}}>🎥</button>
<button onClick={()=>setCall("voice")} style={{background:"none",border:0,fontSize:20}}>📞</button>
<button style={{background:"none",border:0,color:"white",fontSize:22}}>⋮</button>
</div>
<div style={{padding:"8px 10px"}}>
<button onClick={()=>setPage("watch")} style={{background:"#e91e63",color:"white",border:0,borderRadius:20,padding:"6px 12px",fontSize:12}}>🎬 Watch Together</button>
</div>
<div style={{flex:1,padding:12}}>
{msgs.map((m:any,i:any)=>(
<div key={i} style={{background:i%2===1?"#005c4b":"#202c33",padding:8,borderRadius:10,margin:6,maxWidth:"82%",marginLeft:i%2===1?"auto":0}}>
{m.type==="text"&&m.content}
{m.type==="image"&&<img src={m.content} style={{width:"100%",borderRadius:8}}/>}
{m.type==="video"&&<video src={m.content} controls style={{width:"100%",borderRadius:8}}/>}
</div>))}
</div>
<div style={{display:"flex",margin:12,gap:6,alignItems:"center"}}>
<input type="file" ref={fileRef} accept="image/*,video/*" onChange={onFile} style={{display:"none"}}/>
<button onClick={()=>fileRef.current?.click()} style={{background:"#2a3942",color:"white",border:0,borderRadius:"50%",width:42,height:42}}>📎</button>
<input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type a message..." style={{flex:1,padding:10,borderRadius:20,border:0}} onKeyDown={(e:any)=>{if(e.key==="Enter")send();}}/>
<button onClick={send} style={{background:"#00a884",color:"white",border:0,borderRadius:"50%",width:42,height:42}}>➤</button>
</div>
</div>);
}
return(
<div style={{background:"#111b21",color:"white",minHeight:"100vh",display:"flex",flexDirection:"column",paddingBottom:64}}>
<div style={{background:"#0b141a",padding:12,display:"flex",justifyContent:"space-between"}}>
<b style={{color:"#00a884",fontSize:20}}>Speeko</b>
<span>🔍 ⋮</span>
</div>
{page==="chats"&&(
<div style={{padding:12}}>
<input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." style={{width:"100%",padding:8,borderRadius:20,border:0,background:"#202c33",color:"white",boxSizing:"border-box"}}/>
<button onClick={()=>setShow(true)} style={{background:"#00a884",color:"white",border:0,borderRadius:8,padding:9,marginTop:8,width:"100%"}}>+ Add Contact</button>
{show&&(
<div style={{background:"#202c33",padding:12,borderRadius:10,marginTop:10}}>
<input value={nn} onChange={(e)=>setNn(e.target.value)} placeholder="Name" style={{width:"100%",padding:9,marginBottom:7,boxSizing:"border-box"}}/>
<input value={num} onChange={(e)=>setNum(e.target.value)} placeholder="Number" style={{width:"100%",padding:9,marginBottom:7,boxSizing:"border-box"}}/>
<button onClick={save} style={{background:"#00a884",color:"white",padding:9,border:0,borderRadius:8,width:"100%"}}>Save</button>
</div>)}
{filt.map((c:any,i:any)=>(
<div key={i} onClick={()=>{setSel(c);setInChat(true);}} style={{padding:10,borderBottom:"1px solid #222",display:"flex",gap:10,alignItems:"center"}}>
<div style={{background:"#00a884",width:38,height:38,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{c.name.charAt(0)}</div>
<div><div>{c.name}</div><div style={{fontSize:11,color:"#999"}}>{c.number}</div></div>
</div>))}
</div>)}
{page==="updates"&&(
<div style={{padding:14}}>
<h3>Updates / Status</h3>
<p style={{fontSize:13,color:"#aaa"}}>Ammi - 10 min ago</p>
<p style={{fontSize:13,color:"#aaa"}}>Bhai - 1 hr ago</p>
</div>)}
{page==="communities"&&(
<div style={{padding:14}}>
<h3>Communities</h3>
<p style={{fontSize:13}}>🏠 Family Group - 8 members</p>
<p style={{fontSize:13}}>👥 Friends Group - 12 members</p>
</div>)}
{page==="watch"&&(
<div style={{padding:14}}>
<h3>🎬 Watch Together</h3>
<p style={{fontSize:12,color:"#aaa"}}>With {sel.name}</p>
<input value={watchUrl} onChange={(e)=>setWatchUrl(e.target.value)} placeholder="YouTube link paste karo..." style={{width:"100%",padding:10,borderRadius:10,border:0,boxSizing:"border-box"}}/>
<button onClick={
