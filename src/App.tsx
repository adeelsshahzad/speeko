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
const [cts,setCts]=useState([
{n:"Ammi",m:"Hi"},{n:"Bhai",m:"Kahan ho?"},
{n:"Ayesha",m:"Movie dekhen?"}]);
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
<div style={{background:"#202c33",padding:12}}><button onClick={()=>setInC(false)} style={{background:"none",border:0,color:"white"}}>← Back</button> <b>{s.n}</b></div>
<div style={{padding:12}}>{msgs.map((m,i)=>(<div key={i} style={{background:i%2?"#005c4b":"#202c33",padding:8,borderRadius:10,margin:6,marginLeft:i%2?80:0}}>{m}</div>))}</div>
<div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",padding:8,background:"#0b141a"}}>
<input value={txt} onChange={e=>setTxt(e.target.value)} placeholder="Message..." style={{flex:1,padding:10,borderRadius:20,border:0}}/>
<button onClick={send} style={{background:"#00a884",color:"white",border:0,borderRadius:20,padding:"10px 16px",marginLeft:6}}>Send</button>
</div></div>);
return(
<div style={{background:"#111b21",color:"white",minHeight:"100vh",padding
