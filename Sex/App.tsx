import { useState } from "react";

export default function App() {
  const [p, setP] = useState("chats");
  const [s, setS] = useState("Ammi");
  const [txt, setTxt] = useState("");
  const [msgs, setMsgs] = useState(["Hi"]);
  const [inC, setInC] = useState(false);
  const [call, setCall] = useState("");
  const [wu, setWu] = useState("");
  const [pl, setPl] = useState("");

  const chats = ["Ammi", "Bhai", "Ayesha"];

  function send() {
    if (!txt) return;
    setMsgs([...msgs, txt]);
    setTxt("");
  }

  function goWatch() {
    let id = wu.split("v=")[1];
    if (!id) id = wu.split("/").pop();
    setPl("https://www.youtube.com/embed/" + id);
  }

  if (call !== "") {
    return (
      <div style={{ background: "black" }}>
        <h2>Call With {s}</h2>
        <p>Connected...</p>
        <button onClick={() => setCall("")}>
          End Call
        </button>
      </div>
    );
  }

  if (inC) {
    return (
      <div>
        <button onClick={() => setInC(false)}>
          Back
        </button>
        <h3>{s}</h3>
        {msgs.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
        <input
          value={txt}
          onChange={(e) => setTxt(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={send}>Send</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Speeko</h2>

      {p === "chats" && (
        <div>
          <input placeholder="Search..." />
          {chats.map((c) => (
            <p
              key={c}
              onClick={() => {
                setS(c);
                setInC(true);
              }}
            >
              {c}
            </p>
          ))}
          <button>+</button>
        </div>
      )}

      {p === "updates" && (
        <div>
          <h3>Status</h3>
          <p>Ammi - Like: Bhai ne kiya</p>
          <p>Ammi - Dekha: 5 logo ne dekha</p>
          <p>Bhai - Like: Ammi ne kiya</p>
          <p>Bhai - Dekha: 3 logo ne dekha</p>
          <button>Mera Status Lagao</button>
        </div>
      )}

      {p === "watch" && (
        <div>
          <h3>Watch Together</h3>
          <p>With {s}</p>
          <input
            value={wu}
            onChange={(e) => setWu(e.target.value)}
            placeholder="YouTube link..."
          />
          <button onClick={goWatch}>
            Start Watching
          </button>
          {pl !== "" && (
            <div>
              <iframe src={pl} title="watch"></iframe>
              <button onClick={() => setCall("v")}>
                Video Call Ke Sath Dekho
              </button>
            </div>
          )}
        </div>
      )}

      {p === "calls" && (
        <div>
          <h3>Calls - {s}</h3>
          <button onClick={() => setCall("a")}>
            Voice
          </button>
          <button onClick={() => setCall("v")}>
            Video
          </button>
        </div>
      )}

      <div>
        <button onClick={() => setP("chats")}>
          Chats
        </button>
        <button onClick={() => setP("updates")}>
          Updates
        </button>
        <button onClick={() => setP("watch")}>
          Watch
        </button>
        <button onClick={() => setP("calls")}>
          Calls
        </button>
      </div>
    </div>
  );
}
