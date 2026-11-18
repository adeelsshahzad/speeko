import { useState } from "react";

type Msg = { text: string; me: boolean; tick: number };

const translations: any = {
  en: { chats: "Chats", calls: "Calls", settings: "Settings", watch: "Watch Together", youtube: "YouTube link...", send: "Send", type: "Type a message...", language: "Language", account: "Account", privacy: "Privacy", lists: "Lists", appearance: "Appearance", broadcasts: "Broadcasts", events: "Events", voice: "Voice Call", video: "Video Call", start: "Start", end: "End Call", back: "Back" },
  ur: { chats: "چیٹ", calls: "کالز", settings: "سیٹنگز", watch: "ساتھ دیکھیں", youtube: "یوٹیوب لنک...", send: "بھیجیں", type: "پیغام لکھیں...", language: "زبان", account: "اکاؤنٹ", privacy: "پرائیویسی", lists: "لسٹس", appearance: "ظاہری شکل", broadcasts: "براڈکاسٹس", events: "ایونٹس", voice: "وائس کال", video: "ویڈیو کال", start: "شروع کریں", end: "کال ختم کریں", back: "واپس" },
  hi: { chats: "चैट", calls: "कॉल", settings: "सेटिंग्स", watch: "साथ देखें", youtube: "YouTube लिंक...", send: "भेजें", type: "संदेश लिखें...", language: "भाषा", account: "खाता", privacy: "गोपनीयता", lists: "सूचियाँ", appearance: "दिखावट", broadcasts: "प्रसारण", events: "कार्यक्रम", voice: "वॉयस कॉल", video: "वीडियो कॉल", start: "शुरू करें", end: "कॉल समाप्त करें", back: "पीछे" },
  zh: { chats: "聊天", calls: "通话", settings: "设置", watch: "一起看", youtube: "YouTube 链接...", send: "发送", type: "输入消息...", language: "语言", account: "账户", privacy: "隐私", lists: "列表", appearance: "外观", broadcasts: "广播", events: "活动", voice: "语音通话", video: "视频通话", start: "开始", end: "结束通话", back: "返回" },
  fr: { chats: "Discussions", calls: "Appels", settings: "Paramètres", watch: "Regarder ensemble", youtube: "Lien YouTube...", send: "Envoyer", type: "Écrire un message...", language: "Langue", account: "Compte", privacy: "Confidentialité", lists: "Listes", appearance: "Apparence", broadcasts: "Diffusions", events: "Événements", voice: "Appel vocal", video: "Appel vidéo", start: "Démarrer", end: "Terminer l'appel", back: "Retour" },
  es: { chats: "Chats", calls: "Llamadas", settings: "Ajustes", watch: "Ver juntos", youtube: "Enlace de YouTube...", send: "Enviar", type: "Escribe un mensaje...", language: "Idioma", account: "Cuenta", privacy: "Privacidad", lists: "Listas", appearance: "Apariencia", broadcasts: "Transmisiones", events: "Eventos", voice: "Llamada de voz", video: "Videollamada", start: "Iniciar", end: "Terminar llamada", back: "Atrás" },
  el: { chats: "Συνομιλίες", calls: "Κλήσεις", settings: "Ρυθμίσεις", watch: "Παρακολούθηση μαζί", youtube: "Σύνδεσμος YouTube...", send: "Αποστολή", type: "Γράψτε μήνυμα...", language: "Γλώσσα", account: "Λογαριασμός", privacy: "Απόρρητο", lists: "Λίστες", appearance: "Εμφάνιση", broadcasts: "Εκπομπές", events: "Εκδηλώσεις", voice: "Φωνητική κλήση", video: "Βιντεοκλήση", start: "Έναρξη", end: "Τερματισμός κλήσης", back: "Πίσω" },
  ja: { chats: "チャット", calls: "通話", settings: "設定", watch: "一緒に見る", youtube: "YouTubeリンク...", send: "送信", type: "メッセージを入力...", language: "言語", account: "アカウント", privacy: "プライバシー", lists: "リスト", appearance: "外観", broadcasts: "ブロードキャスト", events: "イベント", voice: "音声通話", video: "ビデオ通話", start: "開始", end: "通話を終了", back: "戻る" },
  ar: { chats: "الدردشات", calls: "المكالمات", settings: "الإعدادات", watch: "مشاهدة معا", youtube: "رابط يوتيوب...", send: "إرسال", type: "اكتب رسالة...", language: "اللغة", account: "الحساب", privacy: "الخصوصية", lists: "القوائم", appearance: "المظهر", broadcasts: "البث", events: "الأحداث", voice: "مكالمة صوتية", video: "مكالمة فيديو", start: "ابدأ", end: "إنهاء المكالمة", back: "رجوع" },
  de: { chats: "Chats", calls: "Anrufe", settings: "Einstellungen", watch: "Zusammen ansehen", youtube: "YouTube-Link...", send: "Senden", type: "Nachricht schreiben...", language: "Sprache", account: "Konto", privacy: "Datenschutz", lists: "Listen", appearance: "Aussehen", broadcasts: "Sendungen", events: "Events", voice: "Sprachanruf", video: "Videoanruf", start: "Starten", end: "Anruf beenden", back: "Zurück" },
  it: { chats: "Chat", calls: "Chiamate", settings: "Impostazioni", watch: "Guarda insieme", youtube: "Link YouTube...", send: "Invia", type: "Scrivi un messaggio...", language: "Lingua", account: "Account", privacy: "Privacy", lists: "Elenchi", appearance: "Aspetto", broadcasts: "Trasmissioni", events: "Eventi", voice: "Chiamata vocale", video: "Videochiamata", start: "Avvia", end: "Termina chiamata", back: "Indietro" },
  pt: { chats: "Conversas", calls: "Chamadas", settings: "Configurações", watch: "Assistir juntos", youtube: "Link do YouTube...", send: "Enviar", type: "Digite uma mensagem...", language: "Idioma", account: "Conta", privacy: "Privacidade", lists: "Listas", appearance: "Aparência", broadcasts: "Transmissões", events: "Eventos", voice: "Chamada de voz", video: "Videochamada", start: "Iniciar", end: "Encerrar chamada", back: "Voltar" },
  tr: { chats: "Sohbetler", calls: "Aramalar", settings: "Ayarlar", watch: "Birlikte İzle", youtube: "YouTube bağlantısı...", send: "Gönder", type: "Mesaj yaz...", language: "Dil", account: "Hesap", privacy: "Gizlilik", lists: "Listeler", appearance: "Görünüm", broadcasts: "Yayınlar", events: "Etkinlikler", voice: "Sesli Arama", video: "Görüntülü Arama", start: "Başlat", end: "Aramayı Bitir", back: "Geri" },
  ru: { chats: "Чаты", calls: "Звонки", settings: "Настройки", watch: "Смотреть вместе", youtube: "Ссылка YouTube...", send: "Отправить", type: "Введите сообщение...", language: "Язык", account: "Аккаунт", privacy: "Конфиденциальность", lists: "Списки", appearance: "Внешний вид", broadcasts: "Трансляции", events: "События", voice: "Голосовой звонок", video: "Видеозвонок", start: "Начать", end: "Завершить звонок", back: "Назад" },
  ko: { chats: "채팅", calls: "통화", settings: "설정", watch: "함께 보기", youtube: "YouTube 링크...", send: "보내기", type: "메시지 입력...", language: "언어", account: "계정", privacy: "개인정보", lists: "목록", appearance: "모양", broadcasts: "방송", events: "이벤트", voice: "음성 통화", video: "영상 통화", start: "시작", end: "통화 종료", back: "뒤로" },
};

const languages = [
  { code: "en", name: "English" },
  { code: "ur", name: "Urdu - اردو" },
  { code: "hi", name: "Hindi - हिन्दी" },
  { code: "zh", name: "Chinese - 中文" },
  { code: "fr", name: "French - Français" },
  { code: "es", name: "Spanish - Español" },
  { code: "el", name: "Greek - Ελληνικά" },
  { code: "ja", name: "Japanese - 日本語" },
  { code: "ar", name: "Arabic - العربية" },
  { code: "de", name: "German - Deutsch" },
  { code: "it", name: "Italian - Italiano" },
  { code: "pt", name: "Portuguese - Português" },
  { code: "tr", name: "Turkish - Türkçe" },
  { code: "ru", name: "Russian - Русский" },
  { code: "ko", name: "Korean - 한국어" },
];

export default function App() {
  const [page, setPage] = useState("chats");
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const [inCall, setInCall] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [watch, setWatch] = useState(false);
  const [ytLink, setYtLink] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { text: "Hello", me: false, tick: 2 },
    { text: "Helloo", me: true, tick: 2 },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { text: input, me: true, tick: 1 }]);
    setInput("");
  };

  const Tick = ({ tick }: { tick: number }) => {
    if (tick === 1) return <span>✓</span>;
    if (tick === 2) return <span style={{ color: "#53bdeb" }}>✓✓</span>;
    return <span style={{ color: "#53bdeb" }}>✓✓</span>;
  };

  if (inCall) {
    const members = ["Me", "Ammi", "Abu", "Bhai", "Baji", "Chacha", "Khala", "Mama", "Taya"];
    return (
      <div style={{ background: "#000", color: "white", minHeight: "100vh", padding: 12, textAlign: "center" }}>
        <h2>{t.watch}</h2>
        <div style={{ background: "#111", padding: 12, borderRadius: 12 }}>
          <h4>{t.watch}</h4>
          <input value={ytLink} onChange={(e) => setYtLink(e.target.value)} placeholder={t.youtube} style={{ width: "100%", padding: 10, borderRadius: 8 }} />
          {ytLink && <iframe width="100%" height="250" src={ytLink.replace("watch?v=", "embed/")} allowFullScreen style={{ marginTop: 10, borderRadius: 10 }}></iframe>}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
          {members.map((m) => (
            <div key={m} style={{ background: "#202c33", padding: 20, borderRadius: 12 }}>{isVideo ? "🎥 " : "🎤 "}{m}<br />{m === "Me" ? "You" : m}</div>
          ))}
        </div>
        <button onClick={() => setWatch(!watch)} style={{ background: "#FF0000", color: "white", padding: 12, border: 0, borderRadius: 8, margin: 8 }}>{t.watch}</button>
        <button onClick={() => setInCall(false)} style={{ background: "red", color: "white", padding: 12, border: 0, borderRadius: 8, margin: 8 }}>{t.end}</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#111b21", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#202c33", padding: 14, display: "flex", gap: 10 }}>
        <b style={{ color: "#00a884", fontSize: 20, flex: 1 }}>Speeko</b>
        <button onClick={() => setPage("chats")} style={{ background: "transparent", color: "white", border: 0 }}>{t.chats}</button>
        <button onClick={() => setPage("calls")} style={{ background: "transparent", color: "white", border: 0 }}>{t.calls}</button>
        <button onClick={() => setPage("settings")} style={{ background: "transparent", color: "white", border: 0 }}>{t.settings}</button>
      </div>

      {page === "calls" && (
        <div style={{ padding: 16 }}>
          <h3>{t.calls}</h3>
          <button onClick={() => { setIsVideo(false); setInCall(true); }} style={{ background: "#00a884", padding: 14, border: 0, borderRadius: 8, color: "white", margin: 5 }}>{t.voice} - Ammi</button>
          <button onClick={() => { setIsVideo(true); setInCall(true); }} style={{ background: "#00a884", padding: 14, border: 0, borderRadius: 8, color: "white", margin: 5 }}>{t.video} - Ammi</button>
        </div>
      )}

      {page === "settings" && (
        <div style={{ padding: 16 }}>
          <h3>{t.settings}</h3>
          <div style={{ background: "#00a884", padding: 14, borderRadius: 10, marginBottom: 12 }}>
            <b>🌍 {t.language}</b>
            <select value={lang} onChange={(e) => setLang(e.target.value)} style={{ width: "100%", padding: 12, marginTop: 8, borderRadius: 8, fontSize: 16 }}>
              {languages.map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
            </select>
          </div>
          {["account", "privacy", "lists", "chats", "appearance", "broadcasts", "events"].map((s) => (
            <div key={s} style={{ background: "#202c33", padding: 14, margin: 6, borderRadius: 8 }}>{(t as any)[s] || s}</div>
          ))}
        </div>
      )}

      {page === "chats" && (
        <>
          <div style={{ flex: 1, padding: 12 }}>
            <h3 style={{ textAlign: "center" }}>{t.chats} - Ammi</h3>
            {msgs.map((m, i) => (
              <div key={i} style={{ background: m.me ? "#005c4b" : "#202c33", padding: 10, borderRadius: 10, margin: 6, maxWidth: "80%", marginLeft: m.me ? "auto" : 0 }}>
                <span>{m.text}</span> <span style={{ float: "right", fontSize: 11 }}><Tick tick={m.tick} /></span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", margin: 12 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.type} style={{ flex: 1, padding: 12, borderRadius: 20, border: 0 }} onKeyDown={(e) => e.key === "Enter" && send()} />
            <button onClick={send} style={{ background: "#00a884", color: "white", border: 0, borderRadius: "50%", width: 45, height: 45, marginLeft: 8 }}>➤</button>
          </div>
        </>
      )}
    </div>
  );
}
