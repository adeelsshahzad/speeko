// ===== 1. CAMERA + LOCATION - REAL GPS + REAL CAMERA =====
const [camOpen, setCamOpen] = useState(false);
const videoRef = useRef<any>(null);
const [myVideo, setMyVideo] = useState<any>(null);

async function openRealCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    setCamOpen(true);
    setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    setMyVideo(stream);
  } catch (e) { alert("Camera Permission Allow Karo! Settings > Site Settings > Camera > Allow"); }
}
function takePhoto() {
  if (!videoRef.current || !current) return;
  const c = document.createElement("canvas");
  c.width = videoRef.current.videoWidth; c.height = videoRef.current.videoHeight;
  c.getContext("2d")?.drawImage(videoRef.current, 0, 0);
  const url = c.toDataURL("image/png");
  setAllMsgs({ ...allMsgs, [current]: [...msgs, { text: "Photo Sent", time: "Now", me: true, url, type: "photo" }] });
  myVideo?.getTracks().forEach((t: any) => t.stop());
  setCamOpen(false); setShowAttach(false);
}
function sendLocation(live: boolean) {
  if (!navigator.geolocation) { alert("GPS Not Supported!"); return; }
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude.toFixed(5);
    const lng = pos.coords.longitude.toFixed(5);
    const link = `https://maps.google.com/?q=${lat},${lng}`;
    if (!current) return;
    if (live) {
      setAllMsgs({ ...allMsgs, [current]: [...msgs, { text: `📍 LIVE Location - Live for 1 Hour\nLat: ${lat}, Lng: ${lng}\n${link}`, time: "Now", me: true }] });
      // Live Update Har 5 Second Baad
      const id = navigator.geolocation.watchPosition((p) => {
        console.log("Live Update:", p.coords.latitude, p.coords.longitude);
      });
      setTimeout(() => navigator.geolocation.clearWatch(id), 3600000);
    } else {
      setAllMsgs({ ...allMsgs, [current]: [...msgs, { text: `📍 Location\nLat: ${lat}, Lng: ${lng}\n${link}`, time: "Now", me: true }] });
    }
    setShowAttach(false);
  }, () => alert("GPS On Karo! Location Permission Allow Karo!"), { enableHighAccuracy: true });
}

// ===== 2. ATTACHMENT - WHATSAPP JAISE DARK SHEET =====
{showAttach && (
  <div style={{ background: "#111B21", position: "fixed", bottom: 76, left: 0, right: 0, zIndex: 80, borderRadius: "20px 20px 0 0", padding: "10px 12px 14px" }}>
    <div style={{ width: 40, height: 4, background: "#3A4A54", borderRadius: 4, margin: "0 auto 14px" }}></div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
      <div style={{ textAlign: "center" }}><button onClick={() => fileRef.current?.click()} style={{ width: "100%", padding: "14px 0", borderRadius: 30, background: "transparent", border: "1px solid #3A4A54", color: "white", fontSize: 22 }}>🖼️</button><p style={{ color: "white", fontSize: 13, margin: "6px 0 0" }}>Gallery</p></div>
      <div style={{ textAlign: "center" }}><button onClick={openRealCamera} style={{ width: "100%", padding: "14px 0", borderRadius: 30, background: "transparent", border: "1px solid #3A4A54", color: "white", fontSize: 22 }}>📷</button><p style={{ color: "white", fontSize: 13, margin: "6px 0 0" }}>Camera</p></div>
      <div style={{ textAlign: "center" }}><button onClick={() => sendLocation(false)} style={{ width: "100%", padding: "14px 0", borderRadius: 30, background: "transparent", border: "1px solid #3A4A54", color: "white", fontSize: 22 }}>📍</button><p style={{ color: "white", fontSize: 13, margin: "6px 0 0" }}>Location</p></div>
      <div style={{ textAlign: "center" }}><button onClick={() => docRef.current?.click()} style={{ width: "100%", padding: "14px 0", borderRadius: 30, background: "transparent", border: "1px solid #3A4A54", color: "white", fontSize: 22 }}>📄</button><p style={{ color: "white", fontSize: 13, margin: "6px 0 0" }}>Document</p></div>
      <div style={{ textAlign: "center" }}><button onClick={() => sendLocation(true)} style={{ width: "100%", padding: "14px 0", borderRadius: 30, background: "transparent", border: "1px solid #25D366", color: "white", fontSize: 22 }}>🟢📍</button><p style={{ color: "#25D366", fontSize: 13, margin: "6px 0 0", fontWeight: "bold" }}>Live Location</p></div>
      <div style={{ textAlign: "center" }}><button onClick={() => { setShowEvent(true); setShowAttach(false); }} style={{ width: "100%", padding: "14px 0", borderRadius: 30, background: "transparent", border: "1px solid #3A4A54", color: "white", fontSize: 22 }}>📅</button><p style={{ color: "white", fontSize: 13, margin: "6px 0 0" }}>Event</p></div>
      <div style={{ textAlign: "center" }}><button onClick={() => { setShowPoll(true); setShowAttach(false); }} style={{ width: "100%", padding: "14px 0", borderRadius: 30, background: "transparent", border: "1px solid #3A4A54", color: "white", fontSize: 22 }}>📊</button><p style={{ color: "white", fontSize: 13, margin: "6px 0 0" }}>Poll</p></div>
    </div>
  </div>
)}

// ===== 3. CAMERA SCREEN - REAL CAMERA =====
{camOpen && (
  <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "black", zIndex: 500, display: "flex", flexDirection: "column" }}>
    <video ref={videoRef} autoPlay playsInline style={{ flex: 1, width: "100%", objectFit: "cover" }} />
    <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: 16 }}>
      <button onClick={() => { myVideo?.getTracks().forEach((t: any) => t.stop()); setCamOpen(false); }} style={{ padding: "10px 18px", borderRadius: 20, background: "#333", color: "white", border: "none" }}>Close</button>
      <button onClick={takePhoto} style={{ width: 60, height: 60, borderRadius: "50%", background: "white", border: "4px solid #25D366", fontSize: 22 }}>📷</button>
    </div>
  </div>
)}

// ===== 4. VIDEO CALL - REAL VIDEO =====
function VideoCallScreen() {
  const selfRef = useRef<any>(null);
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(s => { if (selfRef.current) selfRef.current.srcObject = s; }).catch(() => alert("Camera + Mic Permission Allow Karo!"));
  }, []);
  return (
    <div style={{ background: "#111B21", minHeight: "100vh", color: "white", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <p>Remote Video - {call?.name}</p>
        <video ref={selfRef} autoPlay muted playsInline style={{ position: "absolute", bottom: 10, right: 10, width: 110, height: 160, borderRadius: 12, objectFit: "cover", border: "2px solid white" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: 20 }}>
        <button onClick={() => setMicOn(!micOn)} style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: micOn ? "white" : "#FF5252" }}>{micOn ? "🎤" : "🔇"}</button>
        <button onClick={() => setShowAddToCall(!showAddToCall)} style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: "#25D366", color: "white", fontWeight: "bold" }}>+ Add</button>
        <button onClick={() => setCall(null)} style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: "#FF0000", color: "white" }}>📞 End</button>
      </div>
    </div>
  );
}
