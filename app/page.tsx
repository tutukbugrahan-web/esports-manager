 "use client";

import { useState } from "react";
import {
  LayoutDashboard, Shield, Users, Wallet, Package, Bell, StickyNote,
  Trophy, FileText, Settings, Search, Plus, TrendingUp, TrendingDown,
  CalendarDays, ChevronDown, Menu, X, Gamepad2, CircleHelp
} from "lucide-react";

const nav = [
  { title: "GENEL", items: [{name:"Genel Bakış", icon:LayoutDashboard},{name:"Takımlar",icon:Shield},{name:"Oyuncular",icon:Users}] },
  { title: "YÖNETİM", items: [{name:"Muhasebe",icon:Wallet},{name:"İhtiyaç & Envanter",icon:Package},{name:"Turnuvalar",icon:Trophy},{name:"Sözleşmeler",icon:FileText}] },
  { title: "ARAÇLAR", items: [{name:"Hatırlatıcılar",icon:Bell},{name:"Notlar",icon:StickyNote},{name:"Ayarlar",icon:Settings}] }
];

const stats = [
  {label:"TOPLAM TAKIM",value:"0",sub:"Henüz takım eklenmedi",icon:Shield,tone:"violet"},
  {label:"AKTİF OYUNCU",value:"0",sub:"Oyuncu kayıtlarını bekliyor",icon:Users,tone:"blue"},
  {label:"TOPLAM GELİR",value:"₺0,00",sub:"Bu ay",icon:TrendingUp,tone:"green"},
  {label:"TOPLAM GİDER",value:"₺0,00",sub:"Bu ay",icon:TrendingDown,tone:"red"}
];

export default function Home() {
  const [active, setActive] = useState("Genel Bakış");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState<string[]>([]);

  function addTeam(e: React.FormEvent) {
    e.preventDefault();
    if (teamName.trim()) { setTeams([...teams, teamName.trim()]); setTeamName(""); setShowNew(false); setActive("Takımlar"); }
  }

  return <main className="shell">
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Gamepad2 size={21}/></div><div><b>ESPORTS<span>MANAGER</span></b><small>ORGANIZATION CONTROL</small></div><button className="close-mobile" onClick={()=>setMobileOpen(false)}><X/></button></div>
      <div className="workspace"><div className="workspace-icon">EM</div><div><b>My Organization</b><small>Personal workspace</small></div><ChevronDown size={15}/></div>
      {nav.map(group=><div className="nav-group" key={group.title}><p>{group.title}</p>{group.items.map(item=><button key={item.name} onClick={()=>{setActive(item.name);setMobileOpen(false)}} className={`nav-item ${active===item.name?"selected":""}`}><item.icon size={18}/><span>{item.name}</span>{item.name==="Hatırlatıcılar"&&<i>0</i>}</button>)}</div>)}
      <div className="sidebar-bottom"><div className="help"><CircleHelp size={17}/><span>Yardım & Destek</span></div><div className="profile"><div className="avatar">A</div><div><b>Yönetici</b><small>Owner account</small></div><Settings size={16}/></div></div>
    </aside>
    {mobileOpen&&<div className="scrim" onClick={()=>setMobileOpen(false)}/>}
    <section className="main">
      <header className="topbar"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="crumb">Workspace <span>/</span> <b>{active}</b></div><div className="top-actions"><div className="search"><Search size={16}/><input placeholder="Ara..." /></div><button className="icon-btn"><Bell size={18}/><i/></button><div className="top-avatar">A</div></div></header>
      <div className="content">
        <div className="welcome-row"><div><div className="eyebrow">27 KASIM 2026 · PERŞEMBE</div><h1>{active==="Genel Bakış"?"Kontrol Merkezi":active}</h1><p>Organizasyonunun tüm operasyonlarını tek yerden yönet.</p></div><button className="primary" onClick={()=>setShowNew(true)}><Plus size={17}/> Yeni Takım</button></div>
        {active==="Genel Bakış" ? <>
          <div className="stats">{stats.map(s=><div className="stat-card" key={s.label}><div className="stat-top"><span>{s.label}</span><div className={`stat-icon ${s.tone}`}><s.icon size={18}/></div></div><strong>{s.value}</strong><small>{s.sub}</small></div>)}</div>
          <div className="dashboard-grid">
            <div className="panel wide"><div className="panel-head"><div><h2>Finansal Özet</h2><p>Gelir ve gider hareketlerin</p></div><button className="period">Bu ay <ChevronDown size={14}/></button></div><div className="empty-chart"><div className="chart-icon"><Wallet size={22}/></div><b>Henüz finansal veri yok</b><span>Gelir veya gider eklediğinde grafik burada görüntülenecek.</span></div></div>
            <div className="panel"><div className="panel-head"><div><h2>Hatırlatıcılar</h2><p>Yaklaşan işler</p></div><button className="text-btn" onClick={()=>setActive("Hatırlatıcılar")}>Tümünü gör</button></div><div className="empty-small"><Bell size={20}/><span>Bekleyen hatırlatıcı bulunmuyor.</span></div></div>
            <div className="panel"><div className="panel-head"><div><h2>Takımlarım</h2><p>Organizasyon kadroları</p></div><button className="text-btn" onClick={()=>setActive("Takımlar")}>Tümünü gör</button></div>{teams.length===0?<div className="empty-small"><Shield size={20}/><span>Henüz takım oluşturmadın.</span><button onClick={()=>setShowNew(true)}>İlk takımını ekle</button></div>:<div className="team-list">{teams.map((t,i)=><div className="team-row" key={i}><div className="team-badge">{t.slice(0,2).toUpperCase()}</div><b>{t}</b><span>Aktif</span></div>)}</div>}</div>
            <div className="panel"><div className="panel-head"><div><h2>Son İşlemler</h2><p>En son kaydedilen hareketler</p></div></div><div className="empty-small"><CalendarDays size={20}/><span>Henüz işlem kaydedilmedi.</span></div></div>
          </div>
        </> : active==="Takımlar" ? <div className="panel"><div className="panel-head"><div><h2>Takım Listesi</h2><p>Oluşturduğun tüm takımlar</p></div><button className="primary small" onClick={()=>setShowNew(true)}><Plus size={15}/> Takım Ekle</button></div>{teams.length===0?<div className="empty-chart"><Shield size={25}/><b>Henüz takım yok</b><span>İlk takımını oluşturarak organizasyonunu yönetmeye başla.</span></div>:<div className="team-list">{teams.map((t,i)=><div className="team-row" key={i}><div className="team-badge">{t.slice(0,2).toUpperCase()}</div><b>{t}</b><span>Aktif</span></div>)}</div>}</div> : <div className="panel empty-section"><div className="chart-icon"><Settings size={22}/></div><h2>{active} modülü hazırlanıyor</h2><p>Bu bölümün veritabanı bağlantısı ve kayıt ekranları sonraki geliştirme adımında eklenecek.</p></div>}
      </div>
    </section>
    {showNew&&<div className="modal-backdrop" onClick={()=>setShowNew(false)}><form className="modal" onSubmit={addTeam} onClick={e=>e.stopPropagation()}><div className="modal-head"><div><h2>Yeni Takım Oluştur</h2><p>Organizasyonuna yeni bir takım ekle.</p></div><button type="button" className="icon-btn" onClick={()=>setShowNew(false)}><X size={18}/></button></div><label>Takım adı</label><input autoFocus value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder="Örn. Team Alpha" required/><div className="modal-actions"><button type="button" className="secondary" onClick={()=>setShowNew(false)}>Vazgeç</button><button className="primary" type="submit"><Plus size={16}/> Takım Oluştur</button></div></form></div>}
  </main>;
}
