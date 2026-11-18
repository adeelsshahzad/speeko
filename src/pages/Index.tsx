import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCheck,
  Check,
  MessageSquare,
  CircleDashed,
  Users,
  PhoneCall,
  Search,
  Send,
  Smile,
  Paperclip,
  Mic,
  Video,
  Phone,
  MoreVertical,
  Lock,
  Pin,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

type Tab = "chats" | "updates" | "communities" | "calls";
type Status = 1 | 2 | 3;

interface Message {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
  status: Status;
}

interface Chat {
  id: number;
  name: string;
  color: string;
  about: string;
  online: boolean;
  lastSeen: string;
  pinned: boolean;
  unread: number;
  messages: Message[];
}

interface CallItem {
  id: number;
  name: string;
  color: string;
  kind: "voice" | "video";
  direction: "in" | "out" | "missed";
  time: string;
}

const seedChats: Chat[] = [
  {
    id: 1,
    name: "Ava Thompson",
    color: "bg-green-600",
    about: "Coffee first, then code",
    online: true,
    lastSeen: "online",
    pinned: true,
    unread: 2,
    messages: [
      { id: 1, from: "them", text: "Are we still meeting at 3?", time: "09:12", status: 3 },
      { id: 2, from: "me", text: "Yes, see you at the cafe!", time: "09:14", status: 3 },
      { id: 3, from: "them", text: "Perfect. I'll bring the sketches.", time: "09:15", status: 3 },
    ],
  },
  {
    id: 2,
    name: "Design Team",
    color: "bg-emerald-700",
    about: "Weekly design sync and reviews",
    online: false,
    lastSeen: "last seen today at 08:40",
    pinned: true,
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "New mockups are in the shared folder.", time: "08:40", status: 3 },
      { id: 2, from: "me", text: "Reviewing them now 👍", time: "08:44", status: 2 },
    ],
  },
  {
    id: 3,
    name: "Marco Rossi",
    color: "bg-teal-600",
    about: "Available",
    online: false,
    lastSeen: "last seen yesterday at 22:10",
    pinned: false,
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Did you get the travel tickets?", time: "Yesterday", status: 3 },
      { id: 2, from: "them", text: "Yes! Sending the PDF now.", time: "Yesterday", status: 3 },
    ],
  },
  {
    id: 4,
    name: "Family",
    color: "bg-lime-700",
    about: "Sunday lunch at mom's",
    online: false,
    lastSeen: "last seen today at 07:55",
    pinned: false,
    unread: 5,
    messages: [{ id: 1, from: "them", text: "Who is bringing dessert?", time: "07:55", status: 3 }],
  },
  {
    id: 5,
    name: "Priya Sharma",
    color: "bg-green-800",
    about: "Busy, text me",
    online: true,
    lastSeen: "online",
    pinned: false,
    unread: 0,
    messages: [{ id: 1, from: "them", text: "Thanks for the notes!", time: "Mon", status: 3 }],
  },
];

const seedCalls: CallItem[] = [
  { id: 1, name: "Ava Thompson", color: "bg-green-600", kind: "video", direction: "in", time: "Today, 09:02" },
  { id: 2, name: "Marco Rossi", color: "bg-teal-600", kind: "voice", direction: "out", time: "Yesterday, 18:30" },
  { id: 3, name: "Family", color: "bg-lime-700", kind: "voice", direction: "missed", time: "Yesterday, 12:11" },
  { id: 4, name: "Priya Sharma", color: "bg-green-800", kind: "video", direction: "out", time: "Mon, 16:45" },
];

const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function Avatar({ name, color, size = "h-11 w-11" }: { name: string; color: string; size?: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className={`${size} ${color} flex shrink-0 items-center justify-center rounded-full text-sm font-semibold text-green-50`}>
      {initials}
    </div>
  );
}

function Ticks({ status }: { status: Status }) {
  if (status === 1) return <Check className="h-3.5 w-3.5 text-stone-400" aria-label="Sent" />;
  if (status === 2) return <CheckCheck className="h-3.5 w-3.5 text-stone-400" aria-label="Delivered" />;
  return <CheckCheck className="h-3.5 w-3.5 text-sky-500" aria-label="Read" />;
}

export default function Index() {
  const [tab, setTab] = useState<Tab>("chats");
  const [chats, setChats] = useState<Chat[]>(seedChats);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const visibleChats = useMemo(
    () =>
      chats
        .filter((c) => c.name.toLowerCase().includes(query.trim().toLowerCase()))
        .sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    [chats, query],
  );

  const active = chats.find((c) => c.id === activeId) ?? null;

  const setStatus = (chatId: number, msgId: number, status: Status) =>
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? { ...c, messages: c.messages.map((m) => (m.id === msgId ? { ...m, status } : m)) }
          : c,
      ),
    );

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || activeId === null) return;
    const msgId = Date.now();
    const time = nowTime();
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, { id: msgId, from: "me", text, time, status: 1 }],
            }
          : c,
      ),
    );
    setDraft("");
    setTimeout(() => setStatus(activeId, msgId, 2), 600);
    setTimeout(() => setStatus(activeId, msgId, 3), 1800);
  };

  const openChat = (id: number) => {
    setActiveId(id);
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const navItems: { key: Tab; label: string; icon: typeof MessageSquare; badge?: number }[] = [
    { key: "chats", label: "Chats", icon: MessageSquare, badge: chats.reduce((n, c) => n + c.unread, 0) },
    { key: "updates", label: "Updates", icon: CircleDashed },
    { key: "communities", label: "Communities", icon: Users },
    { key: "calls", label: "Calls", icon: PhoneCall },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-stone-100 text-stone-900">
      {/* Sidebar */}
      <aside
        className={`${active ? "hidden md:flex" : "flex"} w-full flex-col border-r border-stone-200 bg-white md:w-[380px]`}
      >
        <header className="flex items-center justify-between bg-green-700 px-4 py-3 text-green-50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold">S</div>
            <h1 className="text-lg font-semibold tracking-tight">Speeko</h1>
          </div>
          <MoreVertical className="h-5 w-5 opacity-80" />
        </header>

        {tab === "chats" && (
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 rounded-lg bg-stone-100 px-3 py-2">
              <Search className="h-4 w-4 text-stone-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or start a new chat"
                className="w-full bg-transparent text-sm outline-none placeholder:text-stone-500"
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {tab === "chats" &&
            visibleChats.map((c) => (
              <button
                key={c.id}
                onClick={() => openChat(c.id)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-stone-50 ${
                  activeId === c.id ? "bg-green-50" : ""
                }`}
              >
                <Avatar name={c.name} color={c.color} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{c.name}</span>
                    <span className="shrink-0 text-xs text-stone-500">
                      {c.messages[c.messages.length - 1]?.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-stone-500">
                      {c.messages[c.messages.length - 1]?.text}
                    </span>
                    <div className="flex items-center gap-1">
                      {c.pinned && <Pin className="h-3.5 w-3.5 text-stone-400" />}
                      {c.unread > 0 && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1.5 text-xs font-semibold text-green-50">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}

          {tab === "updates" && (
            <div>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200 text-xl font-light text-stone-600">
                    +
                  </div>
                </div>
                <div>
                  <p className="font-medium">My status</p>
                  <p className="text-sm text-stone-500">Tap to add a status update</p>
                </div>
              </div>
              <p className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-stone-500">Recent updates</p>
              {chats
                .filter((c) => c.online)
                .map((c) => (
                  <div key={c.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="rounded-full border-2 border-green-600 p-0.5">
                      <Avatar name={c.name} color={c.color} size="h-10 w-10" />
                    </div>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-stone-500">{c.about}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {tab === "communities" && (
            <div className="m-4 rounded-xl border border-dashed border-green-300 bg-green-50 p-5 text-center">
              <Users className="mx-auto h-8 w-8 text-green-700" />
              <p className="mt-2 font-semibold">Communities</p>
              <p className="mt-1 text-sm text-stone-600">Group together related chats. Coming in the next version.</p>
            </div>
          )}

          {tab === "calls" && (
            <div>
              <p className="px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-stone-500">Recent</p>
              {seedCalls.map((call) => (
                <div key={call.id} className="flex items-center gap-3 px-4 py-3">
                  <Avatar name={call.name} color={call.color} />
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium ${call.direction === "missed" ? "text-red-600" : ""}`}>{call.name}</p>
                    <p className="flex items-center gap-1 text-sm text-stone-500">
                      {call.direction === "out" ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
                      ) : (
                        <ArrowDownLeft
                          className={`h-3.5 w-3.5 ${call.direction === "missed" ? "text-red-600" : "text-green-600"}`}
                        />
                      )}
                      {call.time}
                    </p>
                  </div>
                  {call.kind === "video" ? (
                    <Video className="h-5 w-5 text-green-700" />
                  ) : (
                    <Phone className="h-5 w-5 text-green-700" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        <nav className="grid grid-cols-4 border-t border-stone-200 bg-white pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = tab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className="flex flex-col items-center gap-1 py-2.5 text-xs font-medium text-stone-600 transition-colors"
              >
                <span
                  className={`relative flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                    selected ? "bg-green-100 text-green-800" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.badge ? (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] text-green-50">
                      {item.badge}
                    </span>
                  ) : null}
                </span>
                <span className={selected ? "text-green-800" : ""}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Conversation panel */}
      <main className={`${active ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col`}>
        {!active ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-stone-50 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
              <MessageSquare className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-light text-stone-800">Speeko for web</h2>
            <p className="max-w-sm text-sm text-stone-500">
              Select a chat to start messaging. Your conversations are shown here.
            </p>
            <p className="mt-6 flex items-center gap-1 text-xs text-stone-400">
              <Lock className="h-3 w-3" /> Private messages
            </p>
          </div>
        ) : (
          <>
            <header className="flex items-center gap-3 border-b border-stone-200 bg-stone-100 px-3 py-2.5">
              <button
                onClick={() => setActiveId(null)}
                className="rounded-full p-2 text-stone-700 hover:bg-stone-200 md:hidden"
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Avatar name={active.name} color={active.color} size="h-10 w-10" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{active.name}</p>
                <p className="truncate text-xs text-stone-500">{active.online ? "online" : active.lastSeen}</p>
              </div>
              <Video className="h-5 w-5 text-stone-600" />
              <Phone className="h-5 w-5 text-stone-600" />
              <MoreVertical className="h-5 w-5 text-stone-600" />
            </header>

            <div
              className="flex-1 space-y-2 overflow-y-auto bg-[radial-gradient(circle_at_1px_1px,theme(colors.green.100)_1px,transparent_0)] [background-size:22px_22px] p-4"
            >
              <p className="mx-auto w-fit rounded-md bg-amber-50 px-3 py-1 text-xs text-stone-600 shadow-sm">
                <Lock className="mr-1 inline h-3 w-3" />
                Messages are private. About: {active.about}
              </p>
              {active.messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm shadow-sm sm:max-w-[60%] ${
                      m.from === "me" ? "rounded-tr-none bg-green-200" : "rounded-tl-none bg-white"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{m.text}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-stone-500">
                      <span>{m.time}</span>
                      {m.from === "me" && <Ticks status={m.status} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form
              className="flex items-center gap-2 bg-stone-100 px-3 py-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <button type="button" className="rounded-full p-2 text-stone-600 hover:bg-stone-200" aria-label="Emoji">
                <Smile className="h-5 w-5" />
              </button>
              <button type="button" className="rounded-full p-2 text-stone-600 hover:bg-stone-200" aria-label="Attach">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message"
                className="min-w-0 flex-1 rounded-full bg-white px-4 py-2.5 text-sm outline-none ring-green-500 focus:ring-2"
              />
              {draft.trim() ? (
                <button
                  type="submit"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-green-50 transition-colors hover:bg-green-700"
                  aria-label="Send"
                >
                  <Send className="h-5 w-5" />
                </button>
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-green-50">
                  <Mic className="h-5 w-5" />
                </div>
              )}
            </form>
          </>
        )}
      </main>
    </div>
  );
}
