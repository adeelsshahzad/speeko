import { useState, useRef, useEffect } from "react";

export default function App() {
  const [page, setPage] = useState("contacts");
  const [contacts, setContacts] = useState<any[]>([
    { name: "Ammi", number: "0300-1234567" },
    { name: "Abu", number: "0301-7654321" },
    { name: "Bhai", number: "0321-1112222" },
  ]);
  const [selected, setSelected] = useState<any>(
    { name: "Ammi", number: "0300-1234567" }
  );
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [msgs, setMsgs] = useState<any[]>([
    { type: "text", content: "Hello" },
    { type: "text", content: "Helloo" },
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("en");
  const [callType, setCallType] = useState<any>(null);
  const [callTime, setCallTime] = useState(0);
  const fileRef: any = useRef(null);
  const videoRef: any = useRef(null);

  useEffect(() => {
    if (!callType) return;
    const t: any = setInterval(() => {
      setCallTime((s: any) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [callType]);

  useEffect(() => {
    if (callType === "video" && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((s: any) => {
          videoRef.current.srcObject = s;
        })
        .catch(() => {});
    }
  }, [callType]);

  const saveContact = () => {
    if (!newName.trim()) return;
    if (!newNumber.trim()) return;
    const c = { name: newName, number: newNumber };
    setContacts([...contacts, c]);
    setSelected(c);
    setNewName("");
    setNewNumber("");
    setShowAdd(false);
    setPage("chats");
  };

  const sendMsg = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { type: "text", content: input }]);
    setInput("");
  };

  const onFile = (e: any) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    const isVideo = f.type.startsWith("video");
    const t = isVideo ? "video" : "image";
    setMsgs([...msgs, { type: t, content: url }]);
    e.target.value = "";
  };

  const filtered = contacts.filter((c: any) => {
