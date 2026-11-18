import {useState} from "react";
export default function App(){
const [p,setP]=useState("chats");
const [s,setS]=useState({n:"Ammi",m:"Hi"});
const [nn,setNn]=useState("");
const [nm,setNm]=useState("");
const [wu,setWu]=useState("");
const [pl,setPl]=useState("");
const [call,setCall]=useState("");
const [inC,setInC]=useState(false);
const [txt,setTxt]=useState("");
const [msgs,setMsgs]=useState(["Hi","Kaisi ho?"]);
const [cts,setCts]=useState([
{n:"Ammi",m:"Hi"},{n:"Bhai",m:"Kahan ho?"},
{n:"Ayesha",m:"Movie dekhen?"}]);
const f=cts.filter(c=>c.n.toLowerCase().includes(nn.toLowerCase()));
function save(){
if(!nn)return;
setCts([...cts,{n:nn,m:nm||"Hi"}]);
setNn("");setNm("");
}
function goWatch(){
let id=wu.split("v=")[1]?.split("&")[0]||wu.split("/").pop();
setPl("https://www.youtube.com/embed/"+id);
}
function send(){
if(!txt)return;
setMsgs([...msgs,txt]);setTxt("");
}
if(call)return(
<div style={{background:"black",color:"white",minHeight:"100vh",textAlign:"center",paddingTop:80}}>
<h2>{call==="v"?"Video Call":"Voice Call"}</h2>
<p>With {s.n}</p>
<div style={{fontSize:80}}>👤</div>
<p>Connected...</p>
<button onClick={()=>setCall("")} style={{background:"red",color:"white",border:0,padding:12,borderRadius:20}}>End Call</button>
</div>);
if(inC)return(
<div style={{background:"#111b21",color:"white",minHeight:"100vh"}}>
<div style={{background:"#202c33",padding:12}}><button onClick={()=>setInC(false)} style={{background:"none",border:0,color:"white"}}>← Back</button> <b>{s.n}</b></div>
<div style={{padding:12}}>{msgs.map((m,i)=>(<div key={i} style={{background:i%2?"#005c4b":"#202c33",padding:8,borderRadius:10,margin:6,marginLeft:i%2?80:0}}>{m}</div>))}</div>
<div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",padding:8,background:"#0b141a"}}>
<input value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Message..." style={{flex:1,padding:10,borderRadius:20,border:0}}/>
<button onClick={send} style={{background:"#00a884",color:"white",border:0,borderRadius:20,padding:"10px 16px",marginLeft:6}}>Send</button>
</div></div>);
return(
<div style={{background:"#111b21",color:"white",minHeight:"100vh",paddingBottom:64}}>
<div style={{background:"#0b141a",padding:12,display:"flex",justifyContent:"space-between"}}><b style={{color:"#00a884",fontSize:20}}>Speeko</b><span>🔍 ⋮</span></div>
{p==="chats"&&(<div style={{padding:12}}>
<input value={nn} onChange={e=>setNn(e.target.value)} placeholder="Search / Name" style={{width:"100%",padding:8,borderRadius:20,border:0,background:"#202c33",color:"white",boxSizing:"border-box"}}/>
<input value={nm} onChange={e=>setNm(e.target.value)} placeholder="Number / Last msg" style={{width:"100%",padding:8,marginTop:6,boxSizing:"border-box"}}/>
<button onClick={save} style={{background:"#00a884",color:"white",border:0,padding:9,borderRadius:8,width:"100%",marginTop:6}}>+ Add Contact</button>
{f.map((c,i)=>(<div key={i} onClick={()=>{setS(c);setInC(true)}} style={{padding:10,borderBottom:"1px solid #222",display:"flex",gap:10}}><div style={{background:"#00a884",width:38,height:38,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{c.n[0]}</div><div><div>{c.n}</div><div style={{fontSize:11,color:"#999"}}>{c.m}</div></div></div>))}
</div>)}
{p==="updates"&&(<div style={{padding:14}}><h3>Updates</h3><p>Ammi - 10 min ago</p><p>Bhai - 1 hr ago</p></div>)}
{p==="communities"&&(<div style={{padding:14}}><h3>Communities</h3><p>Family Group - 8 members</p><p>Friends Group - 12 members</p></div>)}
{p==="watch"&&(<div style={{padding:14}}><h3>Watch Together</h3><p>With {s.n}</p>
<input value={wu} onChange={e=>setWu(e.target.value)} placeholder="YouTube link..." style={{width:"100%",padding:10,borderRadius:10,border:0,boxSizing:"border-box"}}/>
<button onClick={goWatch} style={{background:"#e91e63",color:"white",border:0,padding:11,borderRadius:10,width:"100%",marginTop:8}}>Start Watching</button>
{pl&&(<div style={{marginTop:12}}><iframe src={pl} style={{width:"100%",height:220,border:0,borderRadius:12}} allowFullScreen></iframe>
<button onClick={()=>setCall("v")} style={{background:"#00a884",color:"white",border:0,padding:10,borderRadius:20,width:"100%",marginTop:8}}>Video Call Ke Sath Dekho</button></div>)}
</div>)}
{p==="calls"&&(<div style={{padding:16}}><h3>Calls - {s.n}</h3>
<button onClick={()=>setCall("a")} style={{background:"#00a884",color:"white",border:0,padding:10,borderRadius:20,marginRight:8}}>Voice</button>
<button onClick={()=>setCall("v")} style={{background:"#25D366",color:"white",border:0,padding:10,borderRadius:20}}>Video</button></div>)}
<div style={{position:"fixed",bottom:0,left:0,right:0,background:"#0b141a",display:"flex",padding:"8px 0",borderTop:"1px solid #222"}}>
<button onClick={()=>setP("chats")} style={{flex:1,background:"none",border:0,color:"white"}}>💬<div style={{fontSize:12}}>Chats</div></button>
<button onClick={()=>setP("updates")} style={{flex:1,background:"none",border:0,color:"white"}}>⭕<div style={{fontSize:12}}>Updates</div></button>
<button onClick={()=>setP("communities")} style={{flex:1,background:"none",border:0,color:"white"}}>👥<div style={{fontSize:12}}>Groups</div></button>
<button onClick={()=>setP("watch")} style={{flex:1,background:"none",border:0,color:"white"}}>🎬<div style={{fontSize:12}}>Watch</div></button>
<button onClick={()=>setP("calls")} style={{flex:1,background:"none",border:0,color:"white"}}>📞<div style={{fontSize:12}}>Calls</div></button>
</div></div>);
}
