import { useState, useEffect, useRef } from "react";

const LOGO_B64 = "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";

const LOGO_SRC = `data:image/jpeg;base64,${LOGO_B64}`;

const SERVER_IP = "play.erenforgesmp.net";
const DISCORD_INVITE = "https://discord.gg/erenforgesmp";
const STORE_URL = "https://store.erenforgesmp.net";

const PLUGINS = [
  { name: "AntiFreeCam", version: "1.0", category: "Security", desc: "Prevents players from using free-cam exploits and X-ray mods.", link: "#" },
  { name: "AntiHealthIndicator", version: "2.5.0", category: "Anti-Cheat", desc: "Hides exact health values from other players to prevent exploitation.", link: "https://www.spigotmc.org/resources/antihealthindicator.114841/" },
  { name: "AuctionHouse", version: "1.4.7", category: "Economy", desc: "Player-driven auction system for buying and selling items.", link: "https://www.spigotmc.org/resources/auction-house.61836/" },
  { name: "CoreProtect CE", version: "23.1", category: "Utility", desc: "Powerful block logging and rollback plugin for grief protection.", link: "https://www.spigotmc.org/resources/coreprotect.8631/" },
  { name: "DimensionControl", version: "1.0.3", category: "Utility", desc: "Controls player access to specific dimensions.", link: "#" },
  { name: "EconomyShopGUI", version: "6.16.3", category: "Economy", desc: "Feature-rich shop GUI for server economy with admin shop support.", link: "https://www.spigotmc.org/resources/economyshopgui.67640/" },
  { name: "EssentialsX", version: "2.22.0", category: "Utility", desc: "Core utility plugin providing essential commands and features.", link: "https://essentialsx.net/" },
  { name: "EssentialsXChat", version: "2.22.0", category: "Utility", desc: "Chat formatting and management addon for EssentialsX.", link: "https://essentialsx.net/" },
  { name: "Floodgate", version: "Latest", category: "Crossplay", desc: "Enables Bedrock Edition players to join Java servers via Geyser.", link: "https://geysermc.org/download" },
  { name: "Geyser", version: "Latest", category: "Crossplay", desc: "Bridge protocol allowing Bedrock clients to connect to Java servers.", link: "https://geysermc.org/download" },
  { name: "GrimAC", version: "2.3.74", category: "Anti-Cheat", desc: "Next-gen server-side anti-cheat with prediction-based movement checks.", link: "https://www.spigotmc.org/resources/grim-anticheat.99923/" },
  { name: "LoginSecurity", version: "3.3.1", category: "Security", desc: "Password-based login system for player account protection.", link: "https://www.spigotmc.org/resources/loginsecurity.19362/" },
  { name: "LuckPerms", version: "5.5.17", category: "Utility", desc: "Advanced permissions plugin with web editor and group management.", link: "https://luckperms.net/" },
  { name: "ProtocolLib", version: "Latest", category: "Utility", desc: "Library for safe and easy packet manipulation. Required by many plugins.", link: "https://www.spigotmc.org/resources/protocollib.1997/" },
  { name: "TAB", version: "6.0.2", category: "Utility", desc: "Complete TAB list and scoreboard management with animations.", link: "https://www.spigotmc.org/resources/tab-1-5-1-21-6.57806/" },
  { name: "Vault", version: "Latest", category: "Economy", desc: "Economy, permissions, and chat API used by many economy plugins.", link: "https://www.spigotmc.org/resources/vault.34315/" },
  { name: "ViaVersion", version: "5.9.2", category: "Crossplay", desc: "Allows newer Minecraft versions to connect to older server versions.", link: "https://www.spigotmc.org/resources/viaversion.19254/" },
  { name: "XaeroForceDisabler", version: "1.5", category: "Anti-Cheat", desc: "Disables Xaero's Minimap and Worldmap features that could be exploited.", link: "#" },
];

const POLLS = [
  { id: 1, title: "Next Build Competition Theme", desc: "Vote on the theme for our upcoming build competition! The winning theme will be announced next week.", options: ["Medieval Castle", "Futuristic City", "Underwater Kingdom", "Sky Islands"], votes: [42, 28, 19, 35], deadline: "2025-07-01", status: "active", banner: null },
  { id: 2, title: "New Server Event", desc: "Which event should we host next month? Your vote directly decides what we organize!", options: ["PvP Tournament", "Treasure Hunt", "Redstone Contest", "Parkour Race"], votes: [55, 31, 17, 44], deadline: "2025-06-20", status: "active", banner: null },
  { id: 3, title: "Community Rule Update: AFK Farms", desc: "Should we allow AFK farms in the overworld? This is an important community decision.", options: ["Yes, allow them", "No, ban them", "Allow with restrictions"], votes: [60, 22, 48], deadline: "2025-05-15", status: "ended", banner: null },
];

const RULES = [
  { num: 1, title: "Respect Everyone", desc: "Treat all players with respect. Harassment, discrimination, hate speech, or toxicity of any kind will not be tolerated." },
  { num: 2, title: "No Cheating or Hacking", desc: "Using hacked clients, X-ray texture packs, or any unfair advantage is strictly prohibited and will result in a permanent ban." },
  { num: 3, title: "No Griefing", desc: "Destroying or stealing from other players' builds without permission is not allowed. CoreProtect logs all block changes." },
  { num: 4, title: "No Exploiting Bugs", desc: "If you find a bug or exploit, report it to staff. Exploiting bugs for personal gain is a bannable offense." },
  { num: 5, title: "Keep Chat Clean", desc: "No spamming, excessive caps, advertising other servers, or sharing inappropriate content in any chat channel." },
  { num: 6, title: "English in Global Chat", desc: "Please use English in the global chat so all players can understand. Use /msg for other languages." },
  { num: 7, title: "No Lag Machines", desc: "Creating intentional lag machines or farms that cause excessive server lag is not permitted." },
  { num: 8, title: "Staff Decisions are Final", desc: "Respect the decisions of server staff. If you believe a decision was unfair, appeal via Discord — not in-game." },
];

const CATEGORY_COLORS = {
  "Economy": { bg: "#7f1d1d", text: "#fca5a5" },
  "Security": { bg: "#1e3a5f", text: "#93c5fd" },
  "Anti-Cheat": { bg: "#581c87", text: "#d8b4fe" },
  "Utility": { bg: "#14532d", text: "#86efac" },
  "Crossplay": { bg: "#78350f", text: "#fcd34d" },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080808; color: #e5e5e5; font-family: 'DM Sans', sans-serif; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 3px; }
  .display { font-family: 'Oxanium', sans-serif; }
  .glow { text-shadow: 0 0 20px rgba(220,38,38,0.7), 0 0 40px rgba(220,38,38,0.3); }
  .card { background: linear-gradient(135deg, #111 0%, #0d0d0d 100%); border: 1px solid #1f1f1f; border-radius: 16px; position: relative; overflow: hidden; }
  .card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(220,38,38,0.04) 0%,transparent 60%); pointer-events:none; }
  .btn-red { background: linear-gradient(135deg, #dc2626, #991b1b); color: white; border: none; border-radius: 10px; padding: 12px 28px; font-family: 'Oxanium', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 1px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; }
  .btn-red:hover { background: linear-gradient(135deg, #ef4444, #dc2626); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(220,38,38,0.4); }
  .btn-outline { background: transparent; color: #dc2626; border: 1.5px solid #dc2626; border-radius: 10px; padding: 11px 28px; font-family: 'Oxanium', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 1px; cursor: pointer; transition: all 0.2s; text-transform: uppercase; }
  .btn-outline:hover { background: rgba(220,38,38,0.1); transform: translateY(-1px); }
  .nav-link { color: #888; font-size: 14px; font-weight: 500; cursor: pointer; transition: color 0.2s; padding: 8px 12px; border-radius: 8px; }
  .nav-link:hover, .nav-link.active { color: #dc2626; }
  input, textarea, select { background: #0d0d0d; border: 1px solid #2a2a2a; border-radius: 8px; color: #e5e5e5; padding: 10px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; width: 100%; outline: none; transition: border 0.2s; }
  input:focus, textarea:focus, select:focus { border-color: #dc2626; }
  .pixel-border { border: 2px solid #dc2626; box-shadow: 0 0 0 1px #080808, 0 0 0 2px #dc2626; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse-red { 0%,100% { box-shadow: 0 0 15px rgba(220,38,38,0.3); } 50% { box-shadow: 0 0 30px rgba(220,38,38,0.6); } }
  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .logo-glow { animation: pulse-red 3s ease-in-out infinite; }
`;

function Navbar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: "Home", id: "home" }, { label: "Store", id: "store" },
    { label: "Voting", id: "voting" }, { label: "Plugins", id: "plugins" },
    { label: "Rules", id: "rules" }, { label: "How To Join", id: "join" },
    { label: "Login", id: "login" },
  ];
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a", padding: "0 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <img src={LOGO_SRC} alt="Logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
          <span className="display" style={{ color: "#fff", fontWeight: 800, fontSize: 18, letterSpacing: 1 }}>EREN<span style={{ color: "#dc2626" }}> FORGE</span></span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {links.map(l => (
            <button key={l.id} className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => setPage(l.id)} style={{ background: "none", border: "none" }}>{l.label}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HomePage({ setPage }) {
  const [copied, setCopied] = useState(false);
  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 56 }} className="fade-up">
        <div style={{ display: "inline-block", marginBottom: 16, padding: "6px 20px", background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 20 }}>
          <span style={{ color: "#ef4444", fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>⚔ Now Online — Java & Bedrock</span>
        </div>
        <h1 className="display glow" style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          EREN FORGE<br /><span style={{ color: "#dc2626" }}>SMP</span>
        </h1>
        <p style={{ color: "#888", fontSize: 18, maxWidth: 540, margin: "0 auto 32px" }}>A Survival Multiplayer experience built for community, competition, and creativity.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-red" onClick={copyIP}>{copied ? "✓ COPIED!" : "COPY IP"}</button>
          <button className="btn-outline" onClick={() => setPage("join")}>HOW TO JOIN</button>
        </div>
      </div>

      {/* Top 3 Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 20 }}>
        {/* IP Card */}
        <div className="card logo-glow" style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <img src={LOGO_SRC} alt="Eren Forge Logo" style={{ width: 100, height: 100, borderRadius: 16, objectFit: "cover", border: "3px solid #dc2626" }} />
          <div style={{ textAlign: "center" }}>
            <div className="display" style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>EREN FORGE SMP</div>
            <div style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>Survival Multiplayer · Java & Bedrock</div>
            <div style={{ background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: 10, padding: "10px 20px", marginBottom: 16, fontFamily: "monospace", color: "#dc2626", fontSize: 15 }}>{SERVER_IP}</div>
            <button className="btn-red" onClick={copyIP} style={{ width: "100%" }}>{copied ? "✓ COPIED!" : "COPY IP"}</button>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#666" }}>
            <span>📦 Paper 1.21</span><span>⚡ Crossplay</span>
          </div>
        </div>

        {/* Store Card */}
        <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(135deg, #0f0a0a 0%, #1a0808 100%)" }}>
          <div>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🛒</div>
            <div className="display" style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Store</div>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>Support the server and unlock exclusive ranks, cosmetics, and perks. All purchases keep the server running!</p>
          </div>
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              {["Ranks", "Keys", "Perks"].map(t => (
                <div key={t} style={{ flex: 1, textAlign: "center", padding: "8px", background: "rgba(220,38,38,0.1)", borderRadius: 8, border: "1px solid rgba(220,38,38,0.2)", color: "#ef4444", fontSize: 12, fontWeight: 600 }}>{t}</div>
              ))}
            </div>
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-red" style={{ width: "100%" }}>OPEN STORE</button>
            </a>
          </div>
        </div>

        {/* Discord Card */}
        <div className="card" style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(135deg, #0a0a12 0%, #0d0d1a 100%)" }}>
          <div>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 28 }}>💬</div>
            <div className="display" style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Discord</div>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>Join our community Discord for announcements, events, support, and to connect with other players.</p>
          </div>
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: "12px 16px", background: "rgba(88,101,242,0.1)", borderRadius: 10, border: "1px solid rgba(88,101,242,0.2)" }}>
              <div style={{ width: 8, height: 8, background: "#23d18b", borderRadius: "50%" }}></div>
              <span style={{ color: "#23d18b", fontSize: 14, fontWeight: 600 }}>1,240+ Members</span>
            </div>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ width: "100%", background: "#5865f2", color: "white", border: "none", borderRadius: 10, padding: "12px", fontFamily: "'Oxanium',sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>JOIN DISCORD</button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom 2 Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
        {/* Voting Card */}
        <div className="card" style={{ padding: 40, cursor: "pointer" }} onClick={() => setPage("voting")}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ fontSize: 48 }}>🗳️</div>
            <div>
              <div className="display" style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Community Voting</div>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>Shape the future of Eren Forge! Vote on upcoming events, build competition themes, new features, and server rules. Your voice matters.</p>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <div style={{ textAlign: "center", padding: "10px 16px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 8 }}>
                  <div className="display" style={{ color: "#dc2626", fontSize: 22, fontWeight: 800 }}>2</div>
                  <div style={{ color: "#888", fontSize: 11 }}>Active</div>
                </div>
                <div style={{ textAlign: "center", padding: "10px 16px", background: "#111", border: "1px solid #222", borderRadius: 8 }}>
                  <div className="display" style={{ color: "#888", fontSize: 22, fontWeight: 800 }}>1</div>
                  <div style={{ color: "#888", fontSize: 11 }}>Ended</div>
                </div>
              </div>
              <button className="btn-red" style={{ marginTop: 20 }}>VIEW POLLS</button>
            </div>
          </div>
        </div>

        {/* How To Join Card */}
        <div className="card" style={{ padding: 40, cursor: "pointer" }} onClick={() => setPage("join")}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
            <div style={{ fontSize: 48 }}>🎮</div>
            <div style={{ flex: 1 }}>
              <div className="display" style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 8 }}>How To Join</div>
              <p style={{ color: "#888", fontSize: 14, marginBottom: 16 }}>Get started on Eren Forge SMP in just a few steps. Java & Bedrock supported!</p>
              {[
                { step: "1", text: "Open Minecraft Java or Bedrock" },
                { step: "2", text: "Add server: " + SERVER_IP },
                { step: "3", text: "Join and start your adventure!" },
              ].map(s => (
                <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, background: "#dc2626", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oxanium',sans-serif", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{s.step}</div>
                  <span style={{ color: "#ccc", fontSize: 14 }}>{s.text}</span>
                </div>
              ))}
              <button className="btn-outline" style={{ marginTop: 16 }}>FULL GUIDE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StorePage() {
  const items = [
    { name: "VIP Rank", price: "$4.99", color: "#f59e0b", desc: "Access to VIP commands, colored name, and exclusive kit.", icon: "⭐" },
    { name: "MVP Rank", price: "$9.99", color: "#dc2626", desc: "All VIP perks plus extra homes, fly in your claims, and more.", icon: "🔥" },
    { name: "ELITE Rank", price: "$19.99", color: "#8b5cf6", desc: "The ultimate rank. All perks, exclusive cosmetics, priority slots.", icon: "💎" },
    { name: "Key Bundle ×5", price: "$2.99", color: "#22c55e", desc: "5 crate keys for a chance to win rare in-game items.", icon: "🗝️" },
    { name: "Chunk Buster", price: "$1.99", color: "#06b6d4", desc: "Instantly clears a chunk for fast base building.", icon: "💣" },
    { name: "Custom Tag", price: "$3.49", color: "#f97316", desc: "Display a custom prefix tag in chat alongside your name.", icon: "🏷️" },
  ];
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="display glow" style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>SERVER <span style={{ color: "#dc2626" }}>STORE</span></div>
        <p style={{ color: "#888", fontSize: 16 }}>Support Eren Forge SMP and unlock exclusive in-game perks.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {items.map(item => (
          <div key={item.name} className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 36 }}>{item.icon}</div>
              <div>
                <div className="display" style={{ fontSize: 20, fontWeight: 800, color: item.color }}>{item.name}</div>
                <div className="display" style={{ fontSize: 16, color: "#888" }}>{item.price}</div>
              </div>
            </div>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{item.desc}</p>
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-red" style={{ width: "100%" }}>BUY NOW</button>
            </a>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 40, padding: 24, background: "#0d0d0d", borderRadius: 12, border: "1px solid #1a1a1a" }}>
        <p style={{ color: "#666", fontSize: 13 }}>All purchases are processed securely. In-game perks are cosmetic only and do not provide a gameplay advantage over non-donators in a way that violates EULA.</p>
      </div>
    </div>
  );
}

function VotingPage({ user }) {
  const [votes, setVotes] = useState({});
  const [filter, setFilter] = useState("all");

  const handleVote = (pollId, optionIdx) => {
    if (!user) { alert("You must be logged in to vote!"); return; }
    if (votes[pollId] !== undefined) return;
    setVotes(v => ({ ...v, [pollId]: optionIdx }));
  };

  const filtered = filter === "all" ? POLLS : POLLS.filter(p => p.status === filter);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="display glow" style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>COMMUNITY <span style={{ color: "#dc2626" }}>VOTING</span></div>
        <p style={{ color: "#888", fontSize: 16 }}>Your vote shapes the future of Eren Forge SMP.</p>
        {!user && <div style={{ marginTop: 16, padding: "12px 24px", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 10, display: "inline-block", color: "#ef4444", fontSize: 14 }}>🔒 Login to vote on polls</div>}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {["all", "active", "ended"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${filter === f ? "#dc2626" : "#222"}`, background: filter === f ? "rgba(220,38,38,0.15)" : "transparent", color: filter === f ? "#dc2626" : "#888", cursor: "pointer", fontFamily: "'Oxanium',sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>{f}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {filtered.map(poll => {
          const totalVotes = poll.votes.reduce((a, b) => a + b, 0) + (votes[poll.id] !== undefined ? 1 : 0);
          const myVote = votes[poll.id];
          const isEnded = poll.status === "ended";
          return (
            <div key={poll.id} className="card" style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <span style={{ padding: "3px 12px", borderRadius: 20, background: isEnded ? "rgba(255,255,255,0.05)" : "rgba(220,38,38,0.15)", border: `1px solid ${isEnded ? "#333" : "rgba(220,38,38,0.3)"}`, color: isEnded ? "#666" : "#ef4444", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{poll.status}</span>
                    <span style={{ color: "#555", fontSize: 12 }}>Deadline: {poll.deadline}</span>
                  </div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{poll.title}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="display" style={{ fontSize: 20, color: "#dc2626", fontWeight: 800 }}>{totalVotes}</div>
                  <div style={{ color: "#666", fontSize: 11 }}>total votes</div>
                </div>
              </div>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{poll.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {poll.options.map((opt, idx) => {
                  const voteCount = poll.votes[idx] + (myVote === idx ? 1 : 0);
                  const pct = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                  const isMyVote = myVote === idx;
                  const showResults = isEnded || myVote !== undefined;
                  return (
                    <div key={idx} onClick={() => !isEnded && handleVote(poll.id, idx)} style={{ position: "relative", padding: "14px 18px", borderRadius: 10, border: `1px solid ${isMyVote ? "#dc2626" : "#222"}`, cursor: isEnded ? "default" : "pointer", overflow: "hidden", transition: "border-color 0.2s" }}>
                      {showResults && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: isMyVote ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.03)", transition: "width 0.5s ease", borderRadius: 10 }} />}
                      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {isMyVote && <span style={{ color: "#dc2626", fontSize: 14 }}>✓</span>}
                          <span style={{ color: isMyVote ? "#fff" : "#ccc", fontSize: 14, fontWeight: isMyVote ? 600 : 400 }}>{opt}</span>
                        </div>
                        {showResults && <span style={{ color: isMyVote ? "#ef4444" : "#666", fontSize: 13, fontWeight: 700, fontFamily: "'Oxanium',sans-serif" }}>{pct}%</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              {myVote !== undefined && !isEnded && <p style={{ color: "#22c55e", fontSize: 13, marginTop: 16, textAlign: "center" }}>✓ Your vote has been recorded!</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PluginsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Object.keys(CATEGORY_COLORS)];
  const filtered = PLUGINS.filter(p =>
    (cat === "All" || p.category === cat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div className="display glow" style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>SERVER <span style={{ color: "#dc2626" }}>PLUGINS</span></div>
        <p style={{ color: "#888", fontSize: 16 }}>{PLUGINS.length} plugins powering the Eren Forge experience.</p>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search plugins..." style={{ flex: 1, minWidth: 200 }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: "8px 16px", borderRadius: 8, border: `1px solid ${cat === c ? "#dc2626" : "#222"}`, background: cat === c ? "rgba(220,38,38,0.15)" : "transparent", color: cat === c ? "#dc2626" : "#888", cursor: "pointer", fontFamily: "'Oxanium',sans-serif", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{c}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtered.map(p => {
          const col = CATEGORY_COLORS[p.category] || { bg: "#1a1a1a", text: "#888" };
          return (
            <div key={p.name} className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div className="display" style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{p.name}</div>
                <span style={{ padding: "3px 10px", borderRadius: 20, background: col.bg, color: col.text, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", marginLeft: 8 }}>{p.category}</span>
              </div>
              <div style={{ color: "#555", fontSize: 12, marginBottom: 10 }}>v{p.version}</div>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.desc}</p>
              {p.link !== "#" ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button className="btn-outline" style={{ fontSize: 12, padding: "8px 16px" }}>OFFICIAL PAGE ↗</button>
                </a>
              ) : (
                <button style={{ background: "#111", border: "1px solid #222", borderRadius: 8, color: "#555", padding: "8px 16px", fontSize: 12, cursor: "default", fontFamily: "'Oxanium',sans-serif" }}>PRIVATE PLUGIN</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RulesPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="display glow" style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>SERVER <span style={{ color: "#dc2626" }}>RULES</span></div>
        <p style={{ color: "#888", fontSize: 16 }}>Please read and follow all rules. Ignorance is not an excuse.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {RULES.map(r => (
          <div key={r.num} className="card" style={{ padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div className="display" style={{ fontSize: 32, fontWeight: 800, color: "#dc2626", minWidth: 40, lineHeight: 1 }}>#{r.num}</div>
            <div>
              <div className="display" style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{r.title}</div>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32, padding: 24, background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 12, textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontSize: 14, fontWeight: 600 }}>⚠ Rule violations may result in warnings, mutes, kicks, temporary bans, or permanent bans depending on severity.</p>
      </div>
    </div>
  );
}

function JoinPage() {
  const [copied, setCopied] = useState(false);
  const copyIP = () => { navigator.clipboard.writeText(SERVER_IP).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="display glow" style={{ fontSize: 48, fontWeight: 800, marginBottom: 12 }}>HOW TO <span style={{ color: "#dc2626" }}>JOIN</span></div>
        <p style={{ color: "#888", fontSize: 16 }}>Get into Eren Forge SMP in minutes. Both Java and Bedrock supported!</p>
      </div>

      {/* Server Info */}
      <div className="card" style={{ padding: 32, marginBottom: 24 }}>
        <div className="display" style={{ fontSize: 20, fontWeight: 700, color: "#dc2626", marginBottom: 20 }}>Server Information</div>
        {[
          ["Server Name", "Eren Forge SMP"],
          ["Server Address", SERVER_IP],
          ["Version", "Java 1.21.1 (Paper)"],
          ["Bedrock", "Supported via Geyser/Floodgate"],
          ["Bedrock Port", "19132"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #1a1a1a", flexWrap: "wrap", gap: 8 }}>
            <span style={{ color: "#888", fontSize: 14 }}>{k}</span>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: k === "Server Address" ? "monospace" : "inherit" }}>{v}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button className="btn-red" onClick={copyIP}>{copied ? "✓ COPIED!" : "COPY IP"}</button>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-outline">JOIN DISCORD</button>
          </a>
        </div>
      </div>

      {/* Java Guide */}
      <div className="card" style={{ padding: 32, marginBottom: 24 }}>
        <div className="display" style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 20 }}>☕ Java Edition</div>
        {[
          ["Launch Minecraft", "Open the official Minecraft Java Launcher and log in."],
          ["Go to Multiplayer", "Click 'Multiplayer' on the main menu."],
          ["Add Server", `Click 'Add Server', enter "${SERVER_IP}" as the address.`],
          ["Join & Play!", "Click the server and hit 'Join Server'. Welcome to Eren Forge!"],
        ].map(([title, desc], i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, background: "#dc2626", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oxanium',sans-serif", fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ color: "#888", fontSize: 14 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bedrock Guide */}
      <div className="card" style={{ padding: 32 }}>
        <div className="display" style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>📱 Bedrock Edition</div>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 20 }}>Bedrock support is provided via Geyser. Follow the same steps but use Bedrock's "Add Server" option.</p>
        {[["Server Address", SERVER_IP], ["Port", "19132"]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1a1a1a" }}>
            <span style={{ color: "#888", fontSize: 14 }}>{k}</span>
            <span style={{ color: "#fff", fontSize: 14, fontFamily: "monospace" }}>{v}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: 12, background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: 8 }}>
          <p style={{ color: "#fbbf24", fontSize: 13 }}>⚠ Note: Some features may be limited on Bedrock. Join our Discord for Bedrock-specific support.</p>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ user, setUser }) {
  const [step, setStep] = useState(1);
  const [ign, setIgn] = useState("");
  const [code, setCode] = useState("");
  const [genCode, setGenCode] = useState("");
  const [msg, setMsg] = useState("");

  const generateCode = () => {
    if (!ign.trim()) { setMsg("Please enter your Minecraft username."); return; }
    const c = "EF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setGenCode(c); setStep(2); setMsg("");
  };

  const verifyCode = () => {
    if (code.trim().toUpperCase() === genCode) {
      setUser({ ign: ign.trim(), uuid: "mock-uuid-" + Date.now(), linked: true });
      setStep(3);
    } else {
      setMsg("Invalid code. Please run the command in-game and try again.");
    }
  };

  if (user) return (
    <div style={{ maxWidth: 500, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div className="card" style={{ padding: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <div className="display" style={{ fontSize: 24, fontWeight: 800, color: "#22c55e", marginBottom: 8 }}>LINKED!</div>
        <p style={{ color: "#888", marginBottom: 8 }}>Logged in as</p>
        <div className="display" style={{ fontSize: 20, color: "#fff", fontWeight: 700 }}>{user.ign}</div>
        <button className="btn-outline" style={{ marginTop: 24 }} onClick={() => setUser(null)}>UNLINK ACCOUNT</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 540, margin: "60px auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div className="display glow" style={{ fontSize: 40, fontWeight: 800, marginBottom: 8 }}>LINK <span style={{ color: "#dc2626" }}>ACCOUNT</span></div>
        <p style={{ color: "#888", fontSize: 14 }}>Securely link your Minecraft account to vote and access member features.</p>
      </div>

      {/* Steps indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
        {["Enter IGN", "In-Game Verify", "Done"].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: 4, background: step > i + 1 ? "#dc2626" : step === i + 1 ? "#dc2626" : "#222", borderRadius: 2, marginBottom: 8, opacity: step === i + 1 ? 1 : step > i + 1 ? 0.8 : 0.3 }} />
            <span style={{ color: step === i + 1 ? "#dc2626" : "#555", fontSize: 12 }}>{s}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 36 }}>
        {step === 1 && (
          <div>
            <label style={{ color: "#888", fontSize: 14, display: "block", marginBottom: 8 }}>Your Minecraft Username (IGN)</label>
            <input value={ign} onChange={e => setIgn(e.target.value)} placeholder="e.g. Steve123" style={{ marginBottom: 16 }} onKeyDown={e => e.key === "Enter" && generateCode()} />
            {msg && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{msg}</p>}
            <button className="btn-red" style={{ width: "100%" }} onClick={generateCode}>GENERATE CODE</button>
            <p style={{ color: "#555", fontSize: 12, marginTop: 16, textAlign: "center" }}>We will never ask for your Minecraft password.</p>
          </div>
        )}
        {step === 2 && (
          <div>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 20 }}>Run this command in-game on <strong style={{ color: "#fff" }}>Eren Forge SMP</strong>:</p>
            <div style={{ background: "#0a0a0a", border: "1px solid #dc2626", borderRadius: 10, padding: "16px 20px", marginBottom: 24, fontFamily: "monospace", color: "#ef4444", fontSize: 15, textAlign: "center", letterSpacing: 1 }}>
              /linkwebsite {genCode}
            </div>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 16 }}>After running the command, enter your verification code below:</p>
            <input value={code} onChange={e => setCode(e.target.value)} placeholder="Enter code (e.g. EF-ABC123)" style={{ marginBottom: 16, textAlign: "center", fontFamily: "monospace", letterSpacing: 2 }} />
            {msg && <p style={{ color: "#ef4444", fontSize: 13, marginBottom: 12 }}>{msg}</p>}
            <button className="btn-red" style={{ width: "100%" }} onClick={verifyCode}>VERIFY & LINK</button>
            <p style={{ color: "#555", fontSize: 11, marginTop: 16, textAlign: "center" }}>Demo: Enter the code shown above to simulate linking.</p>
          </div>
        )}
        {step === 3 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <div className="display" style={{ fontSize: 22, color: "#22c55e", fontWeight: 800 }}>Successfully Linked!</div>
            <p style={{ color: "#888", marginTop: 8 }}>Welcome, {ign}! You can now vote on polls and access member features.</p>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: 20, marginTop: 20 }}>
        <div className="display" style={{ fontSize: 14, color: "#888", marginBottom: 8 }}>HOW IT WORKS</div>
        <div style={{ fontSize: 13, color: "#666", lineHeight: 1.8 }}>
          <div>1. Enter your IGN → we generate a secure code</div>
          <div>2. Join the server → run /linkwebsite CODE</div>
          <div>3. Our plugin verifies your identity via UUID</div>
          <div>4. Your account is linked — no passwords needed!</div>
        </div>
      </div>
    </div>
  );
}

function AdminPage({ user }) {
  const [serverIP, setServerIPVal] = useState(SERVER_IP);
  const [discordUrl, setDiscordUrl] = useState(DISCORD_INVITE);
  const [storeUrl, setStoreUrlVal] = useState(STORE_URL);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const tabs = [
    { id: "settings", label: "⚙ Settings" },
    { id: "polls", label: "🗳️ Polls" },
    { id: "plugins", label: "🔌 Plugins" },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <div style={{ width: 44, height: 44, background: "#dc2626", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🛡</div>
        <div>
          <div className="display" style={{ fontSize: 28, fontWeight: 800 }}>Admin <span style={{ color: "#dc2626" }}>Dashboard</span></div>
          <div style={{ color: "#666", fontSize: 13 }}>Eren Forge SMP Control Panel</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "10px 20px", borderRadius: 8, border: `1px solid ${activeTab === t.id ? "#dc2626" : "#222"}`, background: activeTab === t.id ? "rgba(220,38,38,0.15)" : "#0d0d0d", color: activeTab === t.id ? "#dc2626" : "#888", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14 }}>{t.label}</button>
        ))}
      </div>

      {activeTab === "settings" && (
        <div className="card" style={{ padding: 36 }}>
          <div className="display" style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Server Configuration</div>
          {[
            { label: "Server IP", val: serverIP, set: setServerIPVal },
            { label: "Discord Invite URL", val: discordUrl, set: setDiscordUrl },
            { label: "Store URL", val: storeUrl, set: setStoreUrlVal },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 20 }}>
              <label style={{ color: "#888", fontSize: 13, display: "block", marginBottom: 6 }}>{f.label}</label>
              <input value={f.val} onChange={e => f.set(e.target.value)} />
            </div>
          ))}
          <button className="btn-red" onClick={save}>{saved ? "✓ SAVED!" : "SAVE CHANGES"}</button>
        </div>
      )}

      {activeTab === "polls" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div className="display" style={{ fontSize: 18, fontWeight: 700 }}>Manage Polls</div>
            <button className="btn-red" style={{ fontSize: 13, padding: "10px 20px" }}>+ CREATE POLL</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {POLLS.map(p => (
              <div key={p.id} className="card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ padding: "2px 10px", borderRadius: 12, background: p.status === "active" ? "rgba(220,38,38,0.15)" : "#1a1a1a", color: p.status === "active" ? "#ef4444" : "#555", fontSize: 11 }}>{p.status}</span>
                    <span style={{ color: "#555", fontSize: 12 }}>Ends: {p.deadline}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-outline" style={{ fontSize: 12, padding: "8px 14px" }}>EDIT</button>
                  <button style={{ background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", color: "#ef4444", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontFamily: "'Oxanium',sans-serif" }}>DELETE</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "plugins" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div className="display" style={{ fontSize: 18, fontWeight: 700 }}>Plugin List ({PLUGINS.length})</div>
            <button className="btn-red" style={{ fontSize: 13, padding: "10px 20px" }}>+ ADD PLUGIN</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {PLUGINS.map(p => {
              const col = CATEGORY_COLORS[p.category] || { bg: "#1a1a1a", text: "#888" };
              return (
                <div key={p.name} className="card" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <span style={{ color: "#555", fontSize: 12 }}>v{p.version}</span>
                      <span style={{ padding: "2px 8px", borderRadius: 10, background: col.bg, color: col.text, fontSize: 10 }}>{p.category}</span>
                    </div>
                  </div>
                  <button style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 18 }}>✏</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid #1a1a1a", padding: "40px 24px", marginTop: 60 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src={LOGO_SRC} alt="Logo" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} />
              <span className="display" style={{ fontWeight: 800, fontSize: 16 }}>EREN<span style={{ color: "#dc2626" }}> FORGE</span></span>
            </div>
            <p style={{ color: "#555", fontSize: 13, lineHeight: 1.7 }}>A Survival Multiplayer server built for the community. Java & Bedrock.</p>
          </div>
          <div>
            <div className="display" style={{ color: "#dc2626", fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>NAVIGATION</div>
            {[["Home","home"],["Store","store"],["Voting","voting"],["Plugins","plugins"],["Rules","rules"],["How To Join","join"]].map(([l,id]) => (
              <div key={id} onClick={() => setPage(id)} style={{ color: "#666", fontSize: 13, marginBottom: 8, cursor: "pointer" }} onMouseEnter={e => e.target.style.color="#dc2626"} onMouseLeave={e => e.target.style.color="#666"}>{l}</div>
            ))}
          </div>
          <div>
            <div className="display" style={{ color: "#dc2626", fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>COMMUNITY</div>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" style={{ color: "#666", fontSize: 13, display: "block", marginBottom: 8, textDecoration: "none" }}>Discord Server</a>
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#666", fontSize: 13, display: "block", marginBottom: 8, textDecoration: "none" }}>Server Store</a>
          </div>
          <div>
            <div className="display" style={{ color: "#dc2626", fontSize: 13, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>SERVER INFO</div>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 6 }}>🖥 {SERVER_IP}</div>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 6 }}>📦 Paper 1.21.1</div>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 6 }}>⚡ Java & Bedrock</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "#444", fontSize: 12 }}>© 2025 Eren Forge SMP. All rights reserved.</div>
          <div style={{ display: "flex", gap: 16 }}>
            <span onClick={() => setPage("rules")} style={{ color: "#444", fontSize: 12, cursor: "pointer" }}>Rules</span>
            <span onClick={() => setPage("login")} style={{ color: "#444", fontSize: 12, cursor: "pointer" }}>Login</span>
            <span onClick={() => setPage("admin")} style={{ color: "#444", fontSize: 12, cursor: "pointer" }}>Admin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage setPage={setPage} />;
      case "store": return <StorePage />;
      case "voting": return <VotingPage user={user} />;
      case "plugins": return <PluginsPage />;
      case "rules": return <RulesPage />;
      case "join": return <JoinPage />;
      case "login": return <LoginPage user={user} setUser={setUser} />;
      case "admin": return <AdminPage user={user} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: "100vh", background: "#080808" }}>
        <Navbar page={page} setPage={setPage} />
        {renderPage()}
        <Footer setPage={setPage} />
      </div>
    </>
  );
}
