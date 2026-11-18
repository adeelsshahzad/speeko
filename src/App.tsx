import {useState} from "react";
export default function App(){
const [p,setP]=useState("chats");
const [s,setS]=useState({n:"Ammi",m:"Hi"});
const [nn,setNn]=useState("");
const [wu,setWu]=useState("");
const [pl,setPl]=useState("");
const [call,setCall]=useState("");
const [inC,setInC]=useState(false);
const [txt,setTxt]=useState("");
const [msgs,setMsgs]=useState(["Hi","Kaisi ho?"]);
const [cts,setCts]=useState([{n:"Ammi",m:"Hi"},{n:"Bhai",m:"Kahan ho?"},{n:"Ayesha",m:"Movie dekhen?"}]);
const f=cts.filter(c=>c.n.toLowerCase().includes(nn.toLowerCase()));
function addNew(){
let n=prompt("Naam likhen:");
if(!n)return;
setCts([...cts,{n:n,m:"Hi"}]);
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
<div style={{background:"#202c33",padding:12}}><button onClick={()=>setInC(false)} style={{background:"none",border:0,color:"white"}}>Back</button> <b>{s.n}</b></div>
<div style={{padding:12}}>{msgs.map((m,i)=>(<div key={i} style={{background:i%2?"#005c4b":"#202c33",padding:8,borderRadius:10,margin:6,marginLeft:i%2?80:0}}>{m}</div>))}</div>
<div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",padding:8,background:"#0b141a"}}>
<input value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Message..." style={{flex:1,padding:10,borderRadius:20,border:0}}/>
<button onClick={send} style={{background:"#00a884",color:"white",border:0,borderRadius:20,padding:"10px 16px",marginLeft:6}}>Send</button>
</div></div>);
return(
<div style={{background:"#111b21",color:"white",minHeight:"100vh",paddingBottom:64}}>
<div style={{background:"#0b141a",padding:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><b style={{color:"#00a884",fontSize:20}}>Speeko</b><span>Search</span></div>
{p==="chats"&&(<div style={{padding:10}}>
<input value={nn} onChange={e=>setNn(e.target.value)} placeholder="Search..." style={{width:"100%",padding:7,borderRadius:20,border:0,background:"#202c33",color:"white",boxSizing:"border-box",fontSize:13}}/>
{f.map((c,i)=>(<div key={i} onClick={()=>{setS(c);setInC(true)}} style={{padding:10,borderBottom:"1px solid #222",display:"flex",gap:10}}><div style={{background:"#00a884",width:38,height:38,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>{c.n[0]}</div><div><div>{c.n}</div><div style={{fontSize:11,color:"#999"}}>{c.m}</div></div></div>))}
<button onClick={addNew} style={{position:"fixed",bottom:70,right:16,background:"#00a884",color:"white",border:0,width:50,height:50,borderRadius:"50%",fontSize:22}}>+</button>
</div>)}
{p==="updates"&&(<div style={{padding:14}}><h3>Status</h3>
<div style={{background:"#202c33",padding:10,borderRadius:10,marginBottom:10}}><b>Ammi - 10 min ago</b><p style={{fontSize:13,margin:"5px 0"}}>Like: Bhai, Ayesha ne kiya</p><p style={{fontSize:13,margin:0}}>Dekha: 5 logo ne dekha - Bhai, Ayesha, Chacha</p></div>
<div style={{background:"#202c33",padding:10,borderRadius:10,marginBottom:10}}><b>Bhai - 1 hr ago</b><p style={{fontSize:13,margin:"5px 0"}}>Like: Ammi ne kiya</p><p style={{fontSize:13,margin:0}}>Dekha: 3 logo ne dekha</p></div>
<div style={{background:"#202c33",padding:10,borderRadius:10,marginBottom:10}}><b>Ayesha - 2 hr ago</b><p style={{fontSize:13,margin:"5px 0"}}>Like: 3 likes - Ammi, Bhai, Sara</p><p style={{fontSize:13,margin:0}}>Dekha: 8 logo ne dekha</p></div>
<button onClick={()=>alert("Status lag gaya!")} style={{background:"#00a884",color:"white",border:0,padding:10,borderRadius:20,width:"100%",marginTop:5}}>+ Mera Status Lagao</button>
</div>)}
{p==="communities"&&(<div style={{padding:14}}><h3>Communities</h3><p>Family Group - 8 members</p><p>Friends Group - 12 members</p></div>)}
{p==="watch"&&(<div style={{padding:14}}><h3>Watch Together</h3><p>With {s.n}</p>
<input value={wu} onChange={e=>setWu(e.target.value)} placeholder="YouTube link..." style={{width:"100%",padding:10,borderRadius:10,border:0,boxSizing:"border-box"}}/>
<button onClick={goWatch} style={{background:"#e91e63",color:"white",border:0,padding:11,borderRadius:10,width:"100%",marginTop:8}}>Start Watching</button>
{pl&&(<div style={{marginTop:12}}><iframe src={pl} style={{width:"100%",height:220,border:0,borderRadius:12}} allowFullScreen></iframe>
