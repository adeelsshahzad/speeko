import {useState,useRef,useEffect} from "react";
</div>
</div>
))}
</div>
)}

{p==="updates" && (
<div style={{padding:14}}>
<h3>Updates / Status</h3>
<p>Ammi - 10 min ago</p>
<p>Bhai - 1 hr ago</p>
</div>
)}

{p==="communities" && (
<div style={{padding:14}}>
<h3>Communities</h3>
<p>Family Group - 8 members</p>
<p>Friends Group - 12 members</p>
</div>
)}
 {p==="watch" && (
<div style={{padding:14}}>
<h3>Watch Together</h3>
<p style={{fontSize:12}}>
With {s.n}
</p>
<input
value={wu}
onChange={e=>setWu(e.target.value)}
placeholder="YouTube link..."
style={{width:"100%",padding:10,
borderRadius:10,border:0,
boxSizing:"border-box"}}
/>
<button
onClick={goWatch}
style={{background:"#e91e63",
color:"white",border:0,padding:11,
borderRadius:10,width:"100%",
marginTop:8}}>
Start Watching Together
</button>
{pl && (
<div style={{marginTop:12}}>
<iframe
src={pl}
style={{width:"100%",height:220,
border:0,borderRadius:12}}
allowFullScreen
></iframe>
<button
onClick={()=>setCall("v")}
style={{background:"#00a884",
color:"white",border:0,padding:10,
borderRadius:20,width:"100%",
marginTop:8}}>
Video Call Ke Sath Dekho
</button>
</div>
)}
</div>
)}

{p==="calls" && (
<div style={{padding:16}}>
<h3>Calls - {s.n}</h3>
<button
onClick={()=>setCall("a")}
style={{background:"#00a884",
color:"white",border:0,padding:10,
borderRadius:20,marginRight:8}}>
Voice
</button>
<button
onClick={()=>setCall("v")}
style={{background:"#25D366",
color:"white",border:0,padding:10,
borderRadius:20}}>
Video
</button>
</div>
)} 
  <div style={{position:"fixed",
bottom:0,left:0,right:0,
background:"#0b141a",display:"flex",
padding:"8px 0",
borderTop:"1px solid #222"}}>
<button
onClick={()=>setP("chats")}
style={{flex:1,background:"none",
border:0,color:"white"}}>
<div style={{fontSize:20}}>💬</div>
<div style={{fontSize:13}}>Chats</div>
</button>
<button
onClick={()=>setP("updates")}
style={{flex:1,background:"none",
border:0,color:"white"}}>
<div style={{fontSize:20}}>⭕</div>
<div style={{fontSize:13}}>Updates</div>
</button>
<button
onClick={()=>setP("communities")}
style={{flex:1,background:"none",
border:0,color:"white"}}>
<div style={{fontSize:20}}>👥</div>
<div style={{fontSize:13}}>Communiti...</div>
</button>
<button
onClick={()=>setP("calls")}
style={{flex:1,background:"none",
border:0,color:"white"}}>
<div style={{fontSize:20}}>📞</div>
<div style={{fontSize:13}}>Calls</div>
</button>
</div>
</div>
);
}
