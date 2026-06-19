import { useState, useContext, createContext, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES & INTERFACE DESIGN
═══════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Figtree:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --teal:#nzx0d9488;--teal2:#14b8a6;--teal3:#5eead4;--teal-lt:#f0fdfa;--teal-md:#ccfbf1;
  --navy:#0c2340;--navy2:#1e3a5f;
  --slate:#334155;--muted:#64748b;--muted2:#94a3b8;
  --border:#e2e8f0;--border2:#cbd5e1;
  --bg:#f8fafc;--bg2:#f1f5f9;--white:#fff;
  --red:#ef4444;--red-lt:#fee2e2;
  --amber:#f59e0b;--amber-lt:#fef3c7;
  --green:#22c55e;--green-lt:#dcfce7;
  --blue:#3b82f6;--blue-lt:#dbeafe;
  --purple:#8b5cf6;--purple-lt:#ede9fe;
  --r:16px;--r2:12px;--r3:8px;
  --shadow:0 4px 20px rgba(12,35,64,.05), 0 1px 3px rgba(12,35,64,.02);
  --shadow2:0 12px 36px rgba(12,35,64,.1), 0 4px 12px rgba(12,35,64,.03);
  --font-serif:'Instrument Serif',Georgia,serif;
  --font:'Figtree',system-ui,sans-serif;
  --sidebar:260px;
  --nav:70px;
  --transition:all .25s cubic-bezier(.4,0,.2,1);
}
[data-dark]{
  --bg:#0b0f19;--bg2:#1e293b;--white:#111827;--border:#1f2937;--border2:#374151;
  --slate:#d1d5db;--muted:#9ca3af;--navy:#f3f4f6;--navy2:#f9fafb;
  --teal-lt:#042f2e;--teal-md:#134e4a;--shadow:0 4px 24px rgba(0,0,0,.4);
  --shadow2:0 12px 40px rgba(0,0,0,.55);
}

html,body{height:100%;font-family:var(--font);background:var(--bg);color:var(--slate);line-height:1.6;transition:background .3s,color .3s;letter-spacing:-0.01em}

::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:3px}

.topnav{position:fixed;top:0;left:0;right:0;height:var(--nav);background:rgba(258,250,252,.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;z-index:200;transition:var(--transition)}
[data-dark] .topnav{background:rgba(11,15,25,.8)}
.topnav-brand{display:flex;align-items:center;gap:.7rem;font-family:var(--font-serif);font-size:1.6rem;color:var(--teal);cursor:pointer;user-select:none;font-weight:600}
.topnav-brand .pulse{width:11px;height:11px;background:var(--teal);border-radius:50%;animation:pulse 2.3s infinite}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1;box-shadow:0 0 0 0 rgba(13,148,136,0.4)}50%{transform:scale(1.3);opacity:.5;box-shadow:0 0 0 8px rgba(13,148,136,0)}}
.topnav-right{display:flex;align-items:center;gap:.75rem}
.icon-btn{width:42px;height:42px;border-radius:var(--r2);border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--muted);transition:var(--transition);position:relative}
.icon-btn:hover{background:var(--bg2);color:var(--teal)}
.notif-badge{position:absolute;top:8px;right:8px;width:9px;height:9px;background:var(--red);border-radius:50%;border:2px solid var(--white)}
.avatar-btn{width:40px;height:40px;border-radius:var(--r2);background:linear-gradient(135deg, var(--teal), var(--teal2));color:white;border:none;cursor:pointer;font-family:var(--font);font-weight:600;font-size:.9rem;transition:var(--transition);box-shadow:0 2px 8px rgba(13,148,136,.2)}
.avatar-btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(13,148,136,.35)}
.hamburger{display:none;background:none;border:none;cursor:pointer;padding:.25rem;color:var(--slate);font-size:1.25rem}

.sidebar{position:fixed;top:var(--nav);left:0;width:var(--sidebar);height:calc(100vh - var(--nav));background:var(--white);border-right:1px solid var(--border);display:flex;flex-direction:column;padding:1.5rem 1rem;overflow-y:auto;transition:transform .3s ease,background .3s;z-index:150}
.sidebar-section-label{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted2);padding:.5rem .75rem;margin-top:1.25rem}
.nav-item{display:flex;align-items:center;gap:.85rem;padding:.75rem .95rem;border-radius:var(--r2);cursor:pointer;font-size:.9rem;font-weight:500;color:var(--muted);transition:var(--transition);white-space:nowrap;margin-bottom:2px}
.nav-item:hover{background:var(--bg2);color:var(--slate);transform:translateX(2px)}
.nav-item.active{background:var(--teal-lt);color:var(--teal);font-weight:600;box-shadow:inset 4px 0 0 var(--teal)}
.nav-item .ni{font-size:1.1rem;width:22px;text-align:center;flex-shrink:0}
.sidebar-bottom{margin-top:auto;padding-top:1.25rem;border-top:1px solid var(--border)}

.main{margin-left:var(--sidebar);margin-top:var(--nav);min-height:calc(100vh - var(--nav));padding:2.5rem;transition:margin .3s}
.page-enter{animation:pageIn .35s cubic-bezier(0.16, 1, 0.3, 1)}
@keyframes pageIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}

.public-wrap{min-height:100vh;display:flex;flex-direction:column}
.pub-nav{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 4rem;background:rgba(248,250,252,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100}
[data-dark] .pub-nav{background:rgba(11,15,25,.85)}
.pub-brand{font-family:var(--font-serif);font-size:1.6rem;color:var(--teal);display:flex;align-items:center;gap:.6rem;cursor:pointer;font-weight:600}
.pub-links{display:flex;align-items:center;gap:.75rem}

.btn{padding:.7rem 1.4rem;border-radius:var(--r2);border:none;font-family:var(--font);font-size:.9rem;font-weight:600;cursor:pointer;transition:var(--transition);display:inline-flex;align-items:center;justify-content:center;gap:.5rem;letter-spacing:-0.01em}
.btn-primary{background:linear-gradient(135deg, var(--teal), #0f766e);color:white;box-shadow:0 4px 14px rgba(13,148,136,.25)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,.35)}
.btn-outline{background:transparent;color:var(--teal);border:2px solid var(--teal)}
.btn-outline:hover{background:var(--teal-lt);transform:translateY(-1px)}
.btn-ghost{background:var(--bg2);color:var(--slate);border:1px solid var(--border)}
.btn-ghost:hover{background:var(--border);color:var(--navy)}
.btn-danger{background:var(--red-lt);color:var(--red)}
.btn-danger:hover{background:var(--red);color:white}
.btn-sm{padding:.45rem 1rem;font-size:.8rem;border-radius:8px}
.btn-lg{padding:.9rem 2.2rem;font-size:1.02rem;border-radius:14px}

.card{background:var(--white);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--shadow);transition:var(--transition);overflow:hidden}
.card-hover:hover{box-shadow:var(--shadow2);transform:translateY(-3px)}
.card-body{padding:1.75rem}
.card-sm .card-body{padding:1.25rem 1.5rem}

.form-group{margin-bottom:1.35rem}
.form-label{display:block;font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem}
.form-control{width:100%;padding:.75rem 1.1rem;border:1.5px solid var(--border);border-radius:var(--r2);font-family:var(--font);font-size:.92rem;color:var(--navy);background:var(--bg);outline:none;transition:var(--transition)}
.form-control:focus{border-color:var(--teal);background:var(--white);box-shadow:0 0 0 4px rgba(13,148,136,.12)}
.form-control.error{border-color:var(--red);box-shadow:0 0 0 4px rgba(239,68,68,.1)}
.form-error{font-size:.78rem;color:var(--red);margin-top:.4rem;font-weight:500}
.input-wrap{position:relative}
.input-wrap .form-control{padding-right:2.75rem}
.input-icon{position:absolute;right:1rem;top:50%;transform:translateY(-50%);cursor:pointer;color:var(--muted);font-size:1rem;background:none;border:none;padding:0;display:flex;align-items:center}

.hero{flex:1;display:grid;grid-template-columns:1.2fr 0.8fr;gap:4rem;align-items:center;padding:6rem 5rem;background:radial-gradient(circle at top right, rgba(13,148,136,0.08), transparent 45%), linear-gradient(135deg,var(--teal-lt) 0%,var(--bg) 60%,#f0f7ff 100%);position:relative;overflow:hidden}
.hero-eyebrow{display:inline-flex;align-items:center;gap:.5rem;background:var(--teal-md);color:var(--teal);font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.4rem .9rem;border-radius:30px;margin-bottom:1.5rem;box-shadow:0 2px 8px rgba(13,148,136,0.06)}
.hero h1{font-family:var(--font-serif);font-size:clamp(2.8rem,5vw,4.2rem);line-height:1.08;color:var(--navy);margin-bottom:1.5rem;font-weight:400}
.hero h1 em{color:var(--teal);font-style:italic}
.hero-desc{font-size:1.15rem;color:var(--muted);max-width:540px;margin-bottom:2.5rem;line-height:1.75}
.hero-cta{display:flex;gap:1rem;flex-wrap:wrap}
.hero-visual{display:flex;flex-direction:column;gap:1.1rem}
.feat-pill{background:var(--white);border-radius:16px;padding:1.25rem 1.5rem;display:flex;align-items:center;gap:1.25rem;box-shadow:var(--shadow);animation:slideIn .6s cubic-bezier(0.16, 1, 0.3, 1) both;border:1px solid var(--border)}
.feat-pill:nth-child(2){animation-delay:.12s;margin-left:2rem}
.feat-pill:nth-child(3){animation-delay:.24s}
.feat-pill:nth-child(4){animation-delay:.36s;margin-left:2rem}
@keyframes slideIn{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:none}}
.feat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.02)}
.feat-pill h4{font-size:.95rem;font-weight:600;color:var(--navy)}
.feat-pill p{font-size:.82rem;color:var(--muted);margin-top:.2rem}
.home-footer{background:var(--navy);color:rgba(255,255,255,.5);text-align:center;padding:1.75rem;font-size:.85rem;border-top:1px solid rgba(255,255,255,0.05)}
.home-footer a{color:var(--teal3);text-decoration:none}

.auth-page{flex:1;display:flex;align-items:center;justify-content:center;padding:3rem 2rem;background:linear-gradient(135deg,var(--teal-lt),var(--bg))}
.auth-card{background:var(--white);border-radius:24px;padding:3rem;width:100%;max-width:480px;box-shadow:0 20px 50px rgba(12,35,64,0.08);border:1px solid var(--border)}
.auth-card h2{font-family:var(--font-serif);font-size:2.2rem;color:var(--navy);margin-bottom:.4rem;font-weight:500}
.auth-card .auth-sub{color:var(--muted);font-size:.92rem;margin-bottom:2.25rem}
.auth-link-row{text-align:center;margin-top:1.5rem;font-size:.88rem;color:var(--muted)}
.auth-link-row span{color:var(--teal);font-weight:600;cursor:pointer}
.auth-link-row span:hover{text-decoration:underline}

.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem;margin-bottom:2.5rem}
.stat-card{padding:1.5rem;display:flex;gap:1.1rem;align-items:center}
.stat-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0}
.stat-label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.stat-val{font-family:var(--font-serif);font-size:2.2rem;color:var(--navy);line-height:1;margin-top:0.2rem}
.stat-sub{font-size:.78rem;color:var(--muted);margin-top:.25rem}

.page-header{margin-bottom:2.25rem}
.page-header h1{font-family:var(--font-serif);font-size:2.1rem;color:var(--navy);margin-bottom:.3rem;font-weight:500}
.page-header p{color:var(--muted);font-size:.95rem}
.page-header-row{display:flex;align-items:center;justify-content:space-between;gap:1.2rem;margin-bottom:2.5rem;flex-wrap:wrap}

.badge{display:inline-flex;align-items:center;gap:.3rem;padding:.25rem .75rem;border-radius:30px;font-size:.75rem;font-weight:600;letter-spacing:-0.01em}
.badge-teal{background:var(--teal-md);color:var(--teal)}
.badge-green{background:var(--green-lt);color:#166534}
.badge-amber{background:var(--amber-lt);color:#9a3412}
.badge-red{background:var(--red-lt);color:#991b1b}
.badge-blue{background:var(--blue-lt);color:#1e40af}
.badge-purple{background:var(--purple-lt);color:#5b21b6}
.badge-gray{background:var(--bg2);color:var(--muted)}

.upload-zone{border:2px dashed var(--border2);border-radius:var(--r);padding:4rem 2rem;text-align:center;cursor:pointer;transition:var(--transition);background:var(--bg)}
.upload-zone:hover,.upload-zone.drag{border-color:var(--teal);background:var(--teal-lt);box-shadow:0 0 0 1px var(--teal)}
.upload-zone h4{font-size:1.05rem;font-weight:600;color:var(--navy);margin:.9rem 0 .4rem}
.upload-zone p{font-size:.85rem;color:var(--muted)}
.upload-icon{font-size:3.2rem;display:inline-block}

.type-pills{display:flex;gap:.5rem;flex-wrap:wrap;margin:1.5rem 0}
.type-pill{padding:.4rem 1.05rem;border-radius:30px;border:1.5px solid var(--border);background:var(--white);font-size:.82rem;font-weight:600;cursor:pointer;transition:var(--transition);color:var(--slate)}
.type-pill.active{border-color:var(--teal);background:var(--teal);color:white}
.search-row{display:flex;gap:.85rem;margin-bottom:1.5rem;flex-wrap:wrap}
.search-row .form-control{max-width:340px}

.record-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem}
.record-card{padding:1.4rem;border-top:4px solid var(--teal);transition:var(--transition)}
.record-card:hover{transform:translateY(-3px);box-shadow:var(--shadow2)}
.record-type-badge{font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--teal);margin-bottom:.6rem}
.record-name{font-weight:600;color:var(--navy);font-size:.95rem;margin-bottom:.3rem;word-break:break-word;line-height:1.4}
.record-date{font-size:.8rem;color:var(--muted);margin-bottom:1.15rem}
.record-actions{display:flex;gap:.5rem}
.empty{text-align:center;padding:5rem 2rem;color:var(--muted)}
.empty-icon{font-size:4rem;margin-bottom:.9rem;opacity:.4}

.appt-toolbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.75rem;flex-wrap:wrap;gap:.85rem}
.view-toggle{display:flex;gap:.25rem;background:var(--bg2);border-radius:11px;padding:.25rem}
.view-btn{padding:.45rem 1rem;border-radius:8px;border:none;background:none;font-family:var(--font);font-size:.85rem;font-weight:600;cursor:pointer;color:var(--muted);transition:var(--transition)}
.view-btn.active{background:var(--white);color:var(--teal);box-shadow:0 2px 6px rgba(12,35,64,.06)}

.appt-list{display:flex;flex-direction:column;gap:1rem}
.appt-card{display:flex;align-items:center;gap:1.5rem;padding:1.4rem 1.6rem;transition:var(--transition)}
.appt-card:hover{transform:translateY(-2px);box-shadow:var(--shadow2)}
.appt-date-box{min-width:58px;text-align:center;background:var(--teal-lt);border-radius:12px;padding:.65rem}
.appt-day{font-family:var(--font-serif);font-size:1.65rem;line-height:1;color:var(--teal);font-weight:600}
.appt-mon{font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--teal);margin-top:2px}
.appt-body{flex:1}
.appt-title{font-weight:600;color:var(--navy);font-size:.98rem;line-height:1.4}
.appt-meta{font-size:.82rem;color:var(--muted);margin-top:.2rem}
.appt-actions{display:flex;gap:.5rem;flex-shrink:0}

.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:.5rem;margin-top:1.25rem}
.cal-hd{text-align:center;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted2);padding:.5rem 0}
.cal-day{aspect-ratio:1;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:.85rem;cursor:pointer;transition:var(--transition);color:var(--slate);background:var(--white);border:1px solid var(--border);position:relative}
.cal-day:hover{background:var(--teal-lt);border-color:var(--teal);color:var(--teal)}
.cal-day.today{background:linear-gradient(135deg, var(--teal), var(--teal2));color:white;border-color:var(--teal);font-weight:700;box-shadow:0 4px 10px rgba(13,148,136,0.3)}
.cal-day.has-appt::after{content:'';width:6px;height:6px;border-radius:50%;background:var(--amber);display:block;margin-top:4px;position:absolute;bottom:8px}
.cal-day.today.has-appt::after{background:white}
.cal-month-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem}

.timeline{position:relative;padding-left:2.5rem}
.timeline::before{content:'';position:absolute;left:.75rem;top:4px;bottom:4px;width:2px;background:linear-gradient(to bottom,var(--teal),var(--teal3),transparent)}
.tl-item{position:relative;margin-bottom:2rem;animation:pageIn .45s ease both}
.tl-dot{position:absolute;left:-2.5rem;top:.45rem;width:18px;height:18px;border-radius:50%;border:4px solid var(--white);box-shadow:0 0 0 2px var(--teal);background:var(--teal);transition:var(--transition)}
[data-dark] .tl-dot{border-color:var(--white)}
.tl-card{padding:1.25rem 1.5rem;margin-left:.5rem}
.tl-card:hover .tl-dot{background:var(--white)}
.tl-date{font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-bottom:.4rem}
.tl-title{font-weight:600;color:var(--navy);font-size:.98rem}
.tl-desc{font-size:.85rem;color:var(--muted);margin-top:.35rem;line-height:1.55}

.notif-dropdown{position:absolute;top:calc(100% + .75rem);right:0;width:380px;background:var(--white);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--shadow2);overflow:hidden;animation:popIn .25s cubic-bezier(0.16, 1, 0.3, 1);z-index:300}
@keyframes popIn{from{opacity:0;transform:translateY(-10px) scale(.98)}to{opacity:1;transform:none}}
.notif-hd{display:flex;align-items:center;justify-content:space-between;padding:1.15rem 1.4rem;border-bottom:1px solid var(--border);background:var(--bg)}
.notif-hd h3{font-size:.95rem;font-weight:700;color:var(--navy)}
.notif-list{max-height:360px;overflow-y:auto}
.notif-item{display:flex;gap:1rem;padding:1rem 1.4rem;border-bottom:1px solid var(--border);cursor:pointer;transition:var(--transition)}
.notif-item:hover{background:var(--bg2)}
.notif-item.unread{background:var(--teal-lt)}
.notif-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.notif-body{flex:1}
.notif-title{font-size:.87rem;font-weight:600;color:var(--navy);line-height:1.4}
.notif-time{font-size:.75rem;color:var(--muted);margin-top:.25rem}
.notif-dot{width:8px;height:8px;border-radius:50%;background:var(--teal);flex-shrink:0;margin-top:.4rem}

.profile-hero{background:linear-gradient(135deg, var(--navy), #020617);border-radius:var(--r);padding:2.5rem;color:white;margin-bottom:2rem;display:flex;gap:1.75rem;align-items:center;box-shadow:var(--shadow)}
.profile-avatar{width:80px;height:80px;border-radius:20px;background:linear-gradient(135deg, var(--teal), var(--teal2));display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:white;flex-shrink:0;box-shadow:0 4px 14px rgba(13,148,136,0.3)}
.profile-name{font-family:var(--font-serif);font-size:1.75rem;font-weight:500}
.profile-email{opacity:.75;font-size:.9rem;margin-top:.25rem}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}

.emergency-card{border-left:4px solid var(--red);padding:1.5rem}
.emergency-card h3{font-family:var(--font-serif);font-size:1.25rem;color:var(--red);margin-bottom:1.25rem;display:flex;align-items:center;gap:.6rem;font-weight:500}
.info-row{display:flex;justify-content:space-between;padding:.65rem 0;border-bottom:1px solid var(--border);font-size:.9rem}
.info-row:last-child{border-bottom:none}
.info-label{font-weight:600;color:var(--muted)}
.info-val{color:var(--navy);text-align:right;max-width:65%;word-break:break-word;font-weight:500}

.toast-wrap{position:fixed;bottom:2rem;right:2rem;display:flex;flex-direction:column;gap:.6rem;z-index:1000}
.toast{display:flex;align-items:center;gap:.85rem;padding:.9rem 1.4rem;border-radius:14px;background:var(--white);color:var(--slate);font-size:.9rem;font-weight:600;box-shadow:0 12px 32px rgba(0,0,0,.12);border:1px solid var(--border);animation:toastIn .35s cubic-bezier(0.16, 1, 0.3, 1);min-width:280px;max-width:380px}
@keyframes toastIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:none}}
.toast.success{border-left:4px solid var(--green)}
.toast.error{border-left:4px solid var(--red)}
.toast.info{border-left:4px solid var(--blue)}

.overlay{position:fixed;inset:0;background:rgba(15,23,42,.4);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:500;padding:1.5rem}
.modal{background:var(--white);border-radius:24px;padding:2.5rem;width:100%;max-width:540px;box-shadow:var(--shadow2);animation:popIn .25s cubic-bezier(0.16, 1, 0.3, 1);max-height:85vh;overflow-y:auto}
.modal h3{font-family:var(--font-serif);font-size:1.65rem;color:var(--navy);margin-bottom:1.5rem;font-weight:500}
.modal-footer{display:flex;gap:.85rem;justify-content:flex-end;margin-top:1.75rem;padding-top:1.25rem;border-top:1px solid var(--border)}

@media(max-width:900px){
  .hero{grid-template-columns:1fr;padding:4rem 2rem;gap:3rem}
  .hero-visual{display:none}
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:none}
  .main{margin-left:0;padding:1.75rem}
  .hamburger{display:block}
  .two-col{grid-template-columns:1fr}
  .stat-grid{grid-template-columns:1fr 1fr}
  .record-grid{grid-template-columns:1fr}
  .profile-hero{flex-direction:column;text-align:center}
  .notif-dropdown{width:calc(100vw - 2rem);right:-1rem}
}
@media(max-width:480px){
  .hero h1{font-size:2.2rem}
  .stat-grid{grid-template-columns:1fr}
  .pub-nav{padding:1rem}
  .hero{padding:3rem 1rem}
  .main{padding:1.25rem}
  .appt-card{flex-wrap:wrap}
}
`;

/* ═══════════════════════════════════════════════════════════
   CONTEXTS
═══════════════════════════════════════════════════════════ */
const ToastCtx = createContext(null);
const ThemeCtx = createContext(null);
const useToast = () => useContext(ToastCtx);
const useDark  = () => useContext(ThemeCtx);

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const uid    = () => Math.random().toString(36).slice(2,9);
const fmtDate= (iso) => { const d=new Date(iso); return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
const today  = () => new Date().toISOString().slice(0,10);

const DOC_TYPES   = ["Prescription","Blood Test","Scan / Imaging","X-Ray","Bill","Report","Vaccination","Discharge Summary","Other"];
const SPECIALTIES = ["General Physician","Cardiologist","Dermatologist","Neurologist","Orthopedic","Pediatrician","Psychiatrist","Ophthalmologist","ENT Specialist","Other"];
const BLOOD_GROUPS= ["A+","A−","B+","B−","AB+","AB−","O+","O−","Unknown"];
const APPT_STATUSES=["Upcoming","Completed","Cancelled"];

/* ═══════════════════════════════════════════════════════════
   TOAST PROVIDER
═══════════════════════════════════════════════════════════ */
function ToastProvider({children}) {
  const [toasts, setToasts] = useState([]);
  const show = (msg, type="success") => {
    const id = uid();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3000);
  };
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="toast-wrap">
        {toasts.map(t=>(
          <div key={t.id} className={`toast ${t.type}`}>
            {t.type==="success"?"✓":t.type==="error"?"✕":"ℹ"} {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ═══════════════════════════════════════════════════════════
   HASH ROUTER WITH TAB-SYNC STATE
═══════════════════════════════════════════════════════════ */
function useRouter() {
  const [path, setPath] = useState(window.location.hash || "#/");
  
  useEffect(() => {
    const h = () => setPath(window.location.hash || "#/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  
  const navigate = (to) => { 
    window.location.hash = to; 
  };
  
  return { path, navigate };
}

/* ═══════════════════════════════════════════════════════════
   SHARED COMPONENTS
═══════════════════════════════════════════════════════════ */
function Field({label,error,children}){
  return (
    <div className="form-group">
      {label&&<label className="form-label">{label}</label>}
      {children}
      {error&&<div className="form-error">{error}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PUBLIC NAV
═══════════════════════════════════════════════════════════ */
function PubNav({navigate}){
  const {dark,toggle}=useDark();
  return (
    <nav className="pub-nav">
      <div className="pub-brand" onClick={()=>navigate("#/")}>
        <span style={{fontSize:"1.6rem"}}>⚕</span> MediVault
      </div>
      <div className="pub-links">
        <button className="btn btn-ghost btn-sm" onClick={toggle}>{dark?"☀️":"🌙"}</button>
        <button className="btn btn-ghost btn-sm" onClick={()=>navigate("#/")}>Home</button>
        <button className="btn btn-ghost btn-sm" onClick={()=>navigate("#/login")}>Login</button>
        <button className="btn btn-primary btn-sm" onClick={()=>navigate("#/signup")}>Signup</button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════ */
function HomePage({navigate}){
  const feats=[
    {icon:"📁",bg:"var(--teal-lt)",t:"Secure Document Storage",d:"Upload any medical document safely"},
    {icon:"📅",bg:"var(--blue-lt)",t:"Appointment Tracker",d:"Calendar view & reminders"},
    {icon:"📋",bg:"var(--purple-lt)",t:"Medical History Timeline",d:"Chronological health record"},
    {icon:"🚨",bg:"var(--amber-lt)",t:"Emergency Info",d:"Blood group, allergies & contacts"},
  ];
  return (
    <div className="public-wrap">
      <PubNav navigate={navigate}/>
      <div className="hero">
        <div>
          <div className="hero-eyebrow">⚕ Healthcare Platform</div>
          <h1>Your health records,<br/><em>always at hand.</em></h1>
          <p className="hero-desc">MediVault helps you organise, upload, and access all your personal medical records — prescriptions, reports, scans — securely from one place.</p>
          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={()=>navigate("#/signup")}>Get Started Free</button>
            <button className="btn btn-outline btn-lg" onClick={()=>navigate("#/login")}>Sign In</button>
          </div>
        </div>
        <div className="hero-visual">
          {feats.map(f=>(
            <div className="feat-pill card" key={f.t}>
              <div className="feat-icon" style={{background:f.bg}}>{f.icon}</div>
              <div><h4>{f.t}</h4><p>{f.d}</p></div>
            </div>
          ))}
        </div>
      </div>
      <footer className="home-footer">© 2026 MediVault · Built for personal health management · <a href="#">Privacy</a></footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════════════════ */
function LoginPage({navigate,onLogin}){
  const [form,setForm]=useState({email:"",password:""});
  const [errs,setErrs]=useState({});
  const [showPw,setShowPw]=useState(false);
  const toast=useToast();
  const set=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:""}));};
  const submit=()=>{
    const e={};
    if(!form.email.trim()) e.email="Email is required";
    else if(!/\S+@\S+\.\S+/.test(form.email)) e.email="Enter a valid email";
    if(!form.password) e.password="Password is required";
    if(Object.keys(e).length){setErrs(e);return;}
    onLogin({name:form.email.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g,c=>c.toUpperCase()),email:form.email});
    toast("Welcome back to MediVault!");
    navigate("#/dashboard");
  };
  return (
    <div className="public-wrap">
      <PubNav navigate={navigate}/>
      <div className="auth-page">
        <div className="auth-card">
          <h2>Welcome back</h2>
          <p className="auth-sub">Sign in to access your medical records</p>
          <Field label="Email" error={errs.email}>
            <input className={`form-control${errs.email?" error":""}`} type="email" placeholder="you@example.com" value={form.email} onChange={e=>set("email",e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          </Field>
          <Field label="Password" error={errs.password}>
            <div className="input-wrap">
              <input className={`form-control${errs.password?" error":""}`} type={showPw?"text":"password"} placeholder="••••••••" value={form.password} onChange={e=>set("password",e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
              <button className="input-icon" onClick={()=>setShowPw(s=>!s)}>{showPw?"🙈":"👁"}</button>
            </div>
          </Field>
          <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={submit}>Login to MediVault</button>
          <div className="auth-link-row">Don't have an account? <span onClick={()=>navigate("#/signup")}>Create one</span></div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIGNUP
═══════════════════════════════════════════════════════════ */
function SignupPage({navigate,onLogin}){
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [errs,setErrs]=useState({});
  const [showPw,setShowPw]=useState(false);
  const toast=useToast();
  const set=(k,v)=>{setForm(f=>({...f,[k]:v}));setErrs(e=>({...e,[k]:""}));};
  const submit=()=>{
    const e={};
    if(!form.name.trim()) e.name="Full name is required";
    if(!form.email.trim()) e.email="Email is required";
    else if(!/\S+@\S+\.\S+/.test(form.email)) e.email="Enter a valid email";
    if(!form.password) e.password="Password is required";
    else if(form.password.length<6) e.password="At least 6 characters required";
    if(!form.confirm) e.confirm="Please confirm your password";
    else if(form.password!==form.confirm) e.confirm="Passwords do not match";
    if(Object.keys(e).length){setErrs(e);return;}
    onLogin({name:form.name.trim(),email:form.email.trim()});
    toast("Account created! Welcome 🎉");
    navigate("#/dashboard");
  };
  return (
    <div className="public-wrap">
      <PubNav navigate={navigate}/>
      <div className="auth-page">
        <div className="auth-card">
          <h2>Create account</h2>
          <p className="auth-sub">Start managing your health records today</p>
          <Field label="Full Name" error={errs.name}>
            <input className={`form-control${errs.name?" error":""}`} placeholder="Jane Doe" value={form.name} onChange={e=>set("name",e.target.value)}/>
          </Field>
          <Field label="Email" error={errs.email}>
            <input className={`form-control${errs.email?" error":""}`} type="email" placeholder="you@example.com" value={form.email} onChange={e=>set("email",e.target.value)}/>
          </Field>
          <Field label="Password" error={errs.password}>
            <div className="input-wrap">
              <input className={`form-control${errs.password?" error":""}`} type={showPw?"text":"password"} placeholder="Min 6 characters" value={form.password} onChange={e=>set("password",e.target.value)}/>
              <button className="input-icon" onClick={()=>setShowPw(s=>!s)}>{showPw?"🙈":"👁"}</button>
            </div>
          </Field>
          <Field label="Confirm Password" error={errs.confirm}>
            <input className={`form-control${errs.confirm?" error":""}`} type="password" placeholder="Repeat password" value={form.confirm} onChange={e=>set("confirm",e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          </Field>
          <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={submit}>Create Account</button>
          <div className="auth-link-row">Already have an account? <span onClick={()=>navigate("#/login")}>Sign in</span></div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APP SHELL
═══════════════════════════════════════════════════════════ */
const NAV_ITEMS=[
  {id:"dashboard",label:"Overview",    icon:"🏠",section:null},
  {id:"records",     label:"My Records",  icon:"📁",section:"Records"},
  {id:"upload",      label:"Upload",      icon:"⬆️",section:null},
  {id:"appointments",label:"Appointments",icon:"📅",section:"Health"},
  {id:"timeline",    label:"Timeline",    icon:"📋",section:null},
  {id:"notifications",label:"Notifications",icon:"🔔",section:null},
  {id:"profile",     label:"Profile",     icon:"👤",section:"Account"},
  {id:"emergency",   label:"Emergency Info",icon:"🚨",section:null},
];

function AppShell({user,onLogout,activeTab,setTab,notifications,children}){
  const {dark,toggle}=useDark();
  const [sideOpen,setSideOpen]=useState(false);
  const [notifOpen,setNotifOpen]=useState(false);
  const notifRef=useRef();
  const unread=notifications.filter(n=>!n.read).length;

  useEffect(()=>{
    const h=(e)=>{ if(notifOpen && notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown",h);
    return ()=>document.removeEventListener("mousedown",h);
  },[notifOpen]);

  const clickNav=(id)=>{
    setTab(id);
    setSideOpen(false);
  };

  return (
    <div className="app-layout">
      <header className="topnav">
        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
          <button className="hamburger" onClick={()=>setSideOpen(s=>!s)}>☰</button>
          <div className="topnav-brand" onClick={()=>clickNav("dashboard")}>
            <span>⚕</span> MediVault <div className="pulse"></div>
          </div>
        </div>
        <div className="topnav-right">
          <button className="icon-btn" onClick={toggle}>{dark?"☀️":"🌙"}</button>
          <div style={{position:"relative"}} ref={notifRef}>
            <button className="icon-btn" onClick={()=>setNotifOpen(o=>!o)}>
              🔔 {unread>0&&<div className="notif-badge"></div>}
            </button>
            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-hd">
                  <h3>Notifications</h3>
                  <button className="btn btn-ghost btn-sm" onClick={()=>clickNav("notifications")}>View All</button>
                </div>
                <div className="notif-list">
                  {notifications.length===0?<div className="empty" style={{padding:"2rem"}}>No notifications</div>:(
                    notifications.slice(0,4).map(n=>(
                      <div className={`notif-item${!n.read?" unread":""}`} key={n.id} onClick={()=>clickNav("notifications")}>
                        <div className="notif-icon" style={{background:n.read?"var(--bg2)":"var(--teal-lt)"}}>
                          {n.type==="appointment"?"📅":"📁"}
                        </div>
                        <div className="notif-body">
                          <div className="notif-title">{n.msg}</div>
                          <div className="notif-time">{fmtDate(n.date)}</div>
                        </div>
                        {!n.read && <div className="notif-dot"></div>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="avatar-btn" onClick={()=>clickNav("profile")}>
            {user.name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}
          </button>
        </div>
      </header>

      <aside className={`sidebar${sideOpen?" open":""}`}>
        {NAV_ITEMS.map((item,i)=>{
          const active=activeTab===item.id;
          return (
            <div key={item.id}>
              {item.section && <div className="sidebar-section-label">{item.section}</div>}
              <div className={`nav-item${active?" active":""}`} onClick={()=>clickNav(item.id)}>
                <span className="ni">{item.icon}</span> {item.label}
              </div>
            </div>
          );
        })}
        <div className="sidebar-bottom">
          <div className="nav-item" onClick={onLogout} style={{color:"var(--red)"}}>
            <span className="ni">🚪</span> Logout
          </div>
        </div>
      </aside>

      <main className="main">
        <div className="page-enter" key={activeTab}>
          {children}
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD / OVERVIEW
═══════════════════════════════════════════════════════════ */
function DashboardPage({user,records,appointments,notifications,setTab}){
  const up=appointments.filter(a=>a.status==="Upcoming").sort((a,b)=>new Date(a.date)-new Date(b.date));
  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {user.name}</h1>
        <p>Here is an summary overview of your personal health vault dashboard.</p>
      </div>

      <div className="stat-grid">
        <div className="card stat-card card-hover" onClick={()=>setTab("records")} style={{cursor:"pointer"}}>
          <div className="stat-icon" style={{background:"var(--teal-lt)",color:"var(--teal)"}}>📁</div>
          <div>
            <div className="stat-label">Total Records</div>
            <div className="stat-val">{records.length}</div>
            <div className="stat-sub">Uploaded health assets</div>
          </div>
        </div>
        <div className="card stat-card card-hover" onClick={()=>setTab("appointments")} style={{cursor:"pointer"}}>
          <div className="stat-icon" style={{background:"var(--blue-lt)",color:"var(--blue)"}}>📅</div>
          <div>
            <div className="stat-label">Appointments</div>
            <div className="stat-val">{up.length}</div>
            <div className="stat-sub">Upcoming doctor visits</div>
          </div>
        </div>
        <div className="card stat-card card-hover" onClick={()=>setTab("timeline")} style={{cursor:"pointer"}}>
          <div className="stat-icon" style={{background:"var(--purple-lt)",color:"var(--purple)"}}>📋</div>
          <div>
            <div className="stat-label">Health Timeline</div>
            <div className="stat-val">
              {records.length+appointments.filter(a=>a.status==="Completed").length}
            </div>
            <div className="stat-sub">Chronological events</div>
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-body">
            <div style={{display:"flex",justifyContent:"between",alignItems:"center",marginBottom:"1rem"}}>
              <h3 style={{fontFamily:"var(--font-serif)",fontSize:"1.2rem",color:"var(--navy)"}}>Recent Uploaded Records</h3>
              <button className="btn btn-ghost btn-sm" onClick={()=>setTab("records")}>View All</button>
            </div>
            {records.length===0?<div className="empty"><div className="empty-icon">📁</div><p>No health documents found.</p></div>:(
              <div style={{display:"flex",flexDirection:"column",gap:".75rem"}}>
                {records.slice(0,3).map(r=>(
                  <div key={r.id} className="card card-sm" style={{borderLeft:"3px solid var(--teal)"}}>
                    <div className="card-body" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:".9rem",color:"var(--navy)"}}>{r.name}</div>
                        <div style={{fontSize:".75rem",color:"var(--muted)"}}>{r.type} · {fmtDate(r.date)}</div>
                      </div>
                      <span className="badge badge-teal">{r.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div style={{display:"flex",justifyContent:"between",alignItems:"center",marginBottom:"1rem"}}>
              <h3 style={{fontFamily:"var(--font-serif)",fontSize:"1.2rem",color:"var(--navy)"}}>Next Appointment</h3>
              <button className="btn btn-ghost btn-sm" onClick={()=>setTab("appointments")}>Schedule</button>
            </div>
            {up.length===0?<div className="empty"><div className="empty-icon">📅</div><p>No scheduled visits.</p></div>:(
              <div className="appt-card card" style={{boxShadow:"none",background:"var(--bg)"}}>
                <div className="appt-date-box">
                  <div className="appt-day">{up[0].date.split("-")[2]}</div>
                  <div className="appt-mon">{MONTHS[parseInt(up[0].date.split("-")[1])-1]}</div>
                </div>
                <div className="appt-body">
                  <div className="appt-title">{up[0].doctor}</div>
                  <div className="appt-meta">📍 {up[0].specialty} · 🕒 {up[0].time}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RECORDS MANAGEMENT PAGE
═══════════════════════════════════════════════════════════ */
function RecordsPage({records,setRecords,setTab}){
  const [filter,setFilter]=useState("All");
  const [search,setSearch]=useState("");
  const [viewRecord,setViewRecord]=useState(null);
  const toast=useToast();

  const del=(id)=>{
    if(window.confirm("Are you sure you want to delete this record?")){
      setRecords(r=>r.filter(x=>x.id!==id));
      toast("Medical record deleted permanently","info");
    }
  };

  const filtered=records.filter(r=>{
    const mType=filter==="All"||r.type===filter;
    const mSearch=r.name.toLowerCase().includes(search.toLowerCase())||(r.notes&&r.notes.toLowerCase().includes(search.toLowerCase()));
    return mType && mSearch;
  });

  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{marginBottom:0}}>
          <h1>My Medical Records</h1>
          <p>Manage, look into, and organize all your uploaded medical documents.</p>
        </div>
        <button className="btn btn-primary" onClick={()=>setTab("upload")}>➕ Upload New Record</button>
      </div>

      <div className="card" style={{marginBottom:"1.5rem"}}>
        <div className="card-body" style={{padding:"1.25rem 1.5rem"}}>
          <div className="search-row">
            <input className="form-control" placeholder="🔍 Search documents name or notes..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div className="type-pills" style={{margin:0}}>
            {["All",...DOC_TYPES].map(t=>(
              <div key={t} className={`type-pill${filter===t?" active":""}`} onClick={()=>setFilter(t)}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {filtered.length===0?<div className="card empty"><div className="empty-icon">📂</div><h3>No documents found</h3><p>Try clearing filters or upload items.</p></div>:(
        <div className="record-grid">
          {filtered.map(r=>(
            <div key={r.id} className="card record-card card-hover">
              <div className="record-type-badge">{r.type}</div>
              <div className="record-name">{r.name}</div>
              <div className="record-date">📅 {fmtDate(r.date)}</div>
              <div className="record-actions">
                <button className="btn btn-ghost btn-sm" style={{flex:1}} onClick={()=>setViewRecord(r)}>👁️ View</button>
                <button className="btn btn-danger btn-sm" onClick={()=>del(r.id)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewRecord && (
        <div className="overlay">
          <div className="modal">
            <h3>Medical Document Details</h3>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              <Field label="Document Name"><input className="form-control" value={viewRecord.name} readOnly/></Field>
              <div className="two-col">
                <Field label="Category"><input className="form-control" value={viewRecord.type} readOnly/></Field>
                <Field label="Document Date"><input className="form-control" value={fmtDate(viewRecord.date)} readOnly/></Field>
              </div>
              <Field label="Doctor / Institution"><input className="form-control" value={viewRecord.doctor||"Not Specified"} readOnly/></Field>
              <Field label="Notes & Prescriptions Details">
                <textarea className="form-control" style={{minHeight:"100px",resize:"vertical"}} value={viewRecord.notes||"No description provided."} readOnly/>
              </Field>
              {viewRecord.file && (
                <div style={{padding:"1rem",background:"var(--bg2)",borderRadius:"var(--r2)",display:"flex",alignItems:"center",gap:".5rem",fontSize:".85rem"}}>
                  📎 <strong>Attachment:</strong> {viewRecord.file.name} ({viewRecord.file.size})
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={()=>setViewRecord(null)}>Close Document</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   UPLOAD FORM PAGE
═══════════════════════════════════════════════════════════ */
function UploadPage({records,setRecords,addNotif}){
  const [form,setForm]=useState({name:"",type:"Prescription",date:today(),doctor:"",notes:""});
  const [file,setFile]=useState(null);
  const [drag,setDrag]=useState(false);
  const [errs,setErrs]=useState({});
  const toast=useToast();

  const handleFile=(f)=>{
    if(f){ setFile({name:f.name,size:(f.size/1024).toFixed(1)+" KB"}); setErrs(e=>({...e,file:""})); }
  };

  const submit=()=>{
    const e={};
    if(!form.name.trim()) e.name="Document name is required";
    if(!form.date) e.date="Date is required";
    if(!file) e.file="Please choice or attach a file asset";
    if(Object.keys(e).length){setErrs(e);return;}

    const newRec={ id:uid(), ...form, file, created:new Date().toISOString() };
    setRecords(r=>[newRec,...r]);
    addNotif(`Successfully uploaded new asset document: ${form.name}`,"record");
    toast("Document added inside vault repository!");
    setForm({name:"",type:"Prescription",date:today(),doctor:"",notes:""});
    setFile(null);
  };

  return (
    <div style={{maxWidth:"640px",margin:"0 auto"}}>
      <div className="page-header">
        <h1>Upload Medical Asset</h1>
        <p>Safeguard your prescription sheets, clinical diagnostics tests, or scanning logs securely.</p>
      </div>

      <div className="card">
        <div className="card-body">
          <Field label="Document Title Name" error={errs.name}>
            <input className="form-control" placeholder="e.g., Blood Sugar Report, Aug Prescription" value={form.name} onChange={e=>{setForm(f=>({...f,name:e.target.value}));setErrs(x=>({...x,name:""}));}}/>
          </Field>

          <div className="two-col">
            <Field label="Document Category Type">
              <select className="form-control" value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
                {DOC_TYPES.map(t=>(<option key={t} value={t}>{t}</option>))}
              </select>
            </Field>
            <Field label="Issued Date" error={errs.date}>
              <input className="form-control" type="date" value={form.date} onChange={e=>{setForm(f=>({...f,date:e.target.value}));setErrs(x=>({...x,date:""}));}}/>
            </Field>
          </div>

          <Field label="Physician / Clinic Medical Lab">
            <input className="form-control" placeholder="e.g., Dr. Apollos, Healthify Diagnostics" value={form.doctor} onChange={e=>setForm(f=>({...f,doctor:e.target.value}))}/>
          </Field>

          <Field label="Clinical Notes / Medication List Summary">
            <textarea className="form-control" style={{minHeight:"90px",resize:"vertical"}} placeholder="Extract prescription items or notes details here..." value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
          </Field>

          <Field label="File Attachment Upload" error={errs.file}>
            <div className={`upload-zone${drag?" drag":""}`} 
                 onDragOver={e=>{e.preventDefault();setDrag(true);}} 
                 onDragLeave={()=>setDrag(false)} 
                 onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}>
              <span className="upload-icon">📄</span>
              <h4>Drag & drop prescription file here</h4>
              <p>Supports PDFs, JPGs, PNGs image formats</p>
              <div style={{margin:"1rem 0"}}>or</div>
              <input type="file" id="f-pick" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
              <label htmlFor="f-pick" className="btn btn-ghost btn-sm" style={{display:"inline-flex"}}>Browse Device Storage</label>
              {file && <div style={{marginTop:"1rem",color:"var(--teal)",fontWeight:600}}>✓ Attached: {file.name} ({file.size})</div>}
            </div>
          </Field>

          <button className="btn btn-primary" style={{width:"100%",marginTop:"1rem"}} onClick={submit}>🔒 Commit & Save securely inside Vault</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   APPOINTMENTS TRACKER & CALENDAR PAGE
═══════════════════════════════════════════════════════════ */
function AppointmentsPage({appointments,setAppointments,addNotif}){
  const [view,setView]=useState("list");
  const [form,setForm]=useState({doctor:"",specialty:"General Physician",date:today(),time:"10:00",notes:""});
  const [errs,setErrs]=useState({});
  const [openModal,setOpenModal]=useState(false);
  const [calDate,setCalDate]=useState(new Date());
  const toast=useToast();

  const openAddForm=()=> {
    setForm({doctor:"",specialty:"General Physician",date:today(),time:"10:00",notes:""});
    setErrs({});
    setOpenModal(true);
  };

  const submit=()=>{
    const e={};
    if(!form.doctor.trim()) e.doctor="Doctor name designation is required";
    if(!form.date) e.date="Date specification is missing";
    if(!form.time) e.time="Time duration slot is required";
    if(Object.keys(e).length){setErrs(e);return;}

    const newAppt={ id:uid(), ...form, status:"Upcoming" };
    setAppointments(a=>[...a,newAppt]);
    addNotif(`Scheduled appointment with ${form.doctor} on ${fmtDate(form.date)}`,"appointment");
    toast("Doctor appointment slotted successfully!");
    setOpenModal(false);
  };

  const toggleStatus=(id,st)=>{
    setAppointments(arr=>arr.map(x=>x.id===id?{...x,status:st}:x));
    toast(`Appointment categorized as ${st}`,"info");
  };

  // Calendar Engine Core Computations
  const year=calDate.getFullYear();
  const month=calDate.getMonth();
  const firstDayIdx=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const calDays=[];
  for(let i=0;i<firstDayIdx;i++) calDays.push(null);
  for(let d=1;d<=daysInMonth;d++) calDays.push(d);

  return (
    <div>
      <div className="page-header-row">
        <div className="page-header" style={{marginBottom:0}}>
          <h1>Doctor Consultations & Appointments</h1>
          <p>Organize, schedule checkups, and check operational consultation logs timeline.</p>
        </div>
        <button className="btn btn-primary" onClick={openAddForm}>📅 Add Appointment</button>
      </div>

      <div className="appt-toolbar">
        <div className="view-toggle">
          <button className={`view-btn${view==="list"?" active":""}`} onClick={()=>setView("list")}>📋 List Grid View</button>
          <button className={`view-btn${view==="calendar"?" active":""}`} onClick={()=>setView("calendar")}>📅 Monthly Calendar</button>
        </div>
      </div>

      {view==="list"?(
        appointments.length===0?<div className="card empty"><div className="empty-icon">📅</div><h3>No appointments scheduled</h3><p>Click top button to log a checkup.</p></div>:(
          <div className="appt-list">
            {appointments.sort((a,b)=>new Date(a.date)-new Date(b.date)).map(a=>(
              <div key={a.id} className="card appt-card">
                <div className="appt-date-box">
                  <div className="appt-day">{a.date.split("-")[2]}</div>
                  <div className="appt-mon">{MONTHS[parseInt(a.date.split("-")[1])-1]}</div>
                </div>
                <div className="appt-body">
                  <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
                    <span className="appt-title">{a.doctor}</span>
                    <span className={`badge ${a.status==="Upcoming"?"badge-blue":a.status==="Completed"?"badge-green":"badge-red"}`}>{a.status}</span>
                  </div>
                  <div className="appt-meta">🩺 <strong>{a.specialty}</strong> · 🕒 {a.time}</div>
                  {a.notes&&<div style={{fontSize:".8rem",marginTop:".4rem",color:"var(--muted)",fontStyle:"italic"}}>Notes: {a.notes}</div>}
                </div>
                <div className="appt-actions">
                  {a.status==="Upcoming"&&(
                    <>
                      <button className="btn btn-ghost btn-sm" onClick={()=>toggleStatus(a.id,"Completed")}>✓ Finish</button>
                      <button className="btn btn-danger btn-sm" onClick={()=>toggleStatus(a.id,"Cancelled")}>✕ Cancel</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ):(
        <div className="card" style={{maxWidth:"600px",margin:"0 auto"}}>
          <div className="card-body">
            <div className="cal-month-hd">
              <button className="btn btn-ghost btn-sm" onClick={()=>setCalDate(new Date(year,month-1,1))}>◀ Back</button>
              <h3 style={{fontFamily:"var(--font-serif)",fontSize:"1.3rem"}}>{MONTHS[month]} {year}</h3>
              <button className="btn btn-ghost btn-sm" onClick={()=>setCalDate(new Date(year,month+1,1))}>Next ▶</button>
            </div>
            <div className="calendar-grid">
              {DAYS.map(d=>(<div key={d} className="cal-hd">{d}</div>))}
              {calDays.map((d,idx)=>{
                if(!d) return <div key={`empty-${idx}`} style={{background:"var(--bg2)",borderRadius:"9px"}}/>;
                const dateStr=`${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
                const hasAppt=appointments.some(a=>a.date===dateStr);
                const isToday=today()===dateStr;
                return (
                  <div key={`day-${d}`} className={`cal-day${isToday?" today":""}${hasAppt?" has-appt":""}`}>
                    {d}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {openModal && (
        <div className="overlay">
          <div className="modal">
            <h3>Schedule Health Consultation</h3>
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              <Field label="Medical Provider Doctor Name" error={errs.doctor}>
                <input className="form-control" placeholder="e.g., Dr. Aris Smith" value={form.doctor} onChange={e=>setForm(f=>({...f,doctor:e.target.value}))}/>
              </Field>
              <Field label="Clinical Department Specialty">
                <select className="form-control" value={form.specialty} onChange={e=>setForm(f=>({...f,specialty:e.target.value}))}>
                  {SPECIALTIES.map(s=>(<option key={s} value={s}>{s}</option>))}
                </select>
              </Field>
              <div className="two-col">
                <Field label="Target Date" error={errs.date}>
                  <input className="form-control" type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
                </Field>
                <Field label="Consultation Time" error={errs.time}>
                  <input className="form-control" type="time" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))}/>
                </Field>
              </div>
              <Field label="Symptoms / Purpose Description">
                <textarea className="form-control" style={{minHeight:"70px"}} placeholder="Describe symptoms or clinical objectives brief notes..." value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/>
              </Field>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={()=>setOpenModal(false)}>Dismiss</button>
              <button className="btn btn-primary" onClick={submit}>Secure Consultation Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CHRONOLOGICAL TIMELINE VIEW PAGE
═══════════════════════════════════════════════════════════ */
function TimelinePage({records,appointments}){
  const items=[];
  records.forEach(r=>{ items.push({ date:r.date, title:r.name, desc:`[Vault Record Uploaded] Category: ${r.type}. Provider: ${r.doctor||"Not stated"}`, icon:"📁", type:"record" }); });
  appointments.filter(a=>a.status==="Completed").forEach(a=>{
    items.push({ date:a.date, title:`Consultation Completed: ${a.doctor}`, desc:`Department: ${a.specialty}. Notes: ${a.notes||"None logged"}`, icon:"✓", type:"appointment" });
  });

  const sorted=items.sort((a,b)=>new Date(b.date)-new Date(a.date));

  return (
    <div style={{maxWidth:"720px",margin:"0 auto"}}>
      <div className="page-header">
        <h1>Chronological Health History Timeline</h1>
        <p>A Unified health directory charting your clinical events and uploaded reports documentation.</p>
      </div>

      {sorted.length===0?<div className="card empty"><div className="empty-icon">📊</div><h3>Timeline view empty</h3><p>Add medical records or clear appointments logs to compile timeline charts data.</p></div>:(
        <div className="timeline">
          {sorted.map((item,idx)=>(
            <div className="tl-item" key={idx}>
              <div className="tl-dot"></div>
              <div className="card tl-card card-hover">
                <div className="tl-date">{fmtDate(item.date)}</div>
                <div style={{display:"flex",alignItems:"center",gap:".5rem",fontWeight:600,color:"var(--navy)"}}>
                  <span>{item.icon}</span> <span className="tl-title">{item.title}</span>
                </div>
                <div className="tl-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NOTIFICATIONS MANAGEMENT CENTER
═══════════════════════════════════════════════════════════ */
function NotificationsPage({notifications,setNotifications}){
  const toast=useToast();
  const clearAll=()=>{
    if(notifications.length===0) return;
    setNotifications([]);
    toast("Cleared notifications dashboard log directory","info");
  };
  const toggleRead=(id)=>{
    setNotifications(arr=>arr.map(n=>n.id===id?{...n,read:true}:n));
  };

  return (
    <div style={{maxWidth:"680px",margin:"0 auto"}}>
      <div className="page-header-row">
        <div className="page-header" style={{marginBottom:0}}>
          <h1>System Alerts & Logs</h1>
          <p>Read contextual automation notes concerning medical document operations.</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={clearAll}>🗑️ Clear Folder</button>
      </div>

      <div className="card">
        <div className="notif-list" style={{maxHeight:"none"}}>
          {notifications.length===0?<div className="empty"><div className="empty-icon">🔔</div><p>No operational logs recorded.</p></div>:(
            notifications.map(n=>(
              <div className={`notif-item${!n.read?" unread":""}`} key={n.id} onClick={()=>toggleRead(n.id)} style={{cursor:n.read?"default":"pointer"}}>
                <div className="notif-icon" style={{background:n.read?"var(--bg2)":"var(--teal-lt)"}}>
                  {n.type==="appointment"?"📅":"📁"}
                </div>
                <div className="notif-body">
                  <div className="notif-title" style={{fontWeight:n.read?500:600}}>{n.msg}</div>
                  <div className="notif-time">{fmtDate(n.date)}</div>
                </div>
                {!n.read && <div className="notif-dot" style={{alignSelf:"center"}}></div>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ACCOUNT PROFILE PAGE
═══════════════════════════════════════════════════════════ */
function ProfilePage({user,setUser}){
  const [form,setForm]=useState({name:user.name,email:user.email,phone:"",blood:"Unknown",allergies:"",conditions:""});
  const toast=useToast();

  useEffect(()=>{
    // Read supplementary profile values inside active local profile cache if available
    const localProf=localStorage.getItem("medivault_profile_meta");
    if(localProf){
      try{ setForm(JSON.parse(localProf)); }catch(err){}
    }else{
      setForm(f=>({...f,name:user.name,email:user.email}));
    }
  },[user]);

  const save=()=>{
    if(!form.name.trim()) { toast("Account holder name cannot be empty strings!","error"); return; }
    setUser({name:form.name.trim(),email:form.email.trim()});
    localStorage.setItem("medivault_profile_meta", JSON.stringify(form));
    toast("Profile demographic parameters updated!");
  };

  return (
    <div style={{maxWidth:"720px",margin:"0 auto"}}>
      <div className="profile-hero">
        <div className="profile-avatar">
          {user.name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}
        </div>
        <div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">Protected Account Access · {user.email}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 style={{fontFamily:"var(--font-serif)",fontSize:"1.3rem",marginBottom:"1.25rem",color:"var(--navy)"}}>Profile Parameters</h3>
          <div className="two-col">
            <Field label="Full Account Name"><input className="form-control" value={form.name} onChange={e=>setForm(x=>({...x,name:e.target.value}))}/></Field>
            <Field label="Contact Email Address"><input className="form-control" value={form.email} readOnly style={{opacity:.6,cursor:"not-allowed"}}/></Field>
          </div>
          <div className="two-col">
            <Field label="Telephone Number"><input className="form-control" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e=>setForm(x=>({...x,phone:e.target.value}))}/></Field>
            <Field label="Blood Group Matrix Type">
              <select className="form-control" value={form.blood} onChange={e=>setForm(x=>({...x,blood:e.target.value}))}>
                {BLOOD_GROUPS.map(b=>(<option key={b} value={b}>{b}</option>))}
              </select>
            </Field>
          </div>
          <Field label="Allergies Registries (Food, Pharmaceutical Drug Agents)">
            <input className="form-control" placeholder="e.g., Penicillin, Peanuts, Latex allergens" value={form.allergies} onChange={e=>setForm(x=>({...x,allergies:e.target.value}))}/>
          </Field>
          <Field label="Chronic Clinical Conditions Diagnostics History">
            <textarea className="form-control" style={{minHeight:"70px"}} placeholder="e.g., Hypertension, Type-2 Diabetes Mellitus" value={form.conditions} onChange={e=>setForm(x=>({...x,conditions:e.target.value}))}/>
          </Field>

          <button className="btn btn-primary" style={{marginTop:"1rem"}} onClick={save}>💾 Save Structural Information Metadata</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EMERGENCY INFO HUB PAGE
═══════════════════════════════════════════════════════════ */
function EmergencyPage({emergency,setEmergency}){
  const [form,setForm]=useState({...emergency});
  const [isEdit,setIsEdit]=useState(false);
  const toast=useToast();
  
  // Read extra context values directly out of profile metadata matching criteria values
  const [profileMeta,setProfileMeta]=useState({blood:"Unknown",allergies:"None specified",conditions:"None logged"});

  useEffect(()=>{
    const localProf=localStorage.getItem("medivault_profile_meta");
    if(localProf){
      try{
        const parsed=JSON.parse(localProf);
        setProfileMeta({
          blood:parsed.blood||"Unknown",
          allergies:parsed.allergies||"None specified",
          conditions:parsed.conditions||"None logged"
        });
      }catch(e){}
    }
  },[]);

  const save=()=>{
    setEmergency(form);
    setIsEdit(false);
    toast("Emergency contingency matrices configured!");
  };

  return (
    <div style={{maxWidth:"640px",margin:"0 auto"}}>
      <div className="page-header">
        <h1>Emergency Medical Matrix Hub</h1>
        <p>Critical critical diagnostics variables parameters readable by hospital medical responders staff.</p>
      </div>

      <div className="card emergency-card" style={{background:"var(--white)"}}>
        <div className="card-body">
          <div style={{display:"flex",justifyContent:"between",alignItems:"center",marginBottom:"1.5rem"}}>
            <h3>🚨 Emergency Responders Panel Dashboard</h3>
            <button className="btn btn-ghost btn-sm" onClick={()=>{ if(isEdit) save(); else setIsEdit(true); }}>
              {isEdit?"💾 Save Parameters":"📝 Modify Grid Parameters"}
            </button>
          </div>

          {isEdit ? (
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              <div className="two-col">
                <Field label="Emergency Contact Guardian Name"><input className="form-control" value={form.contactName} onChange={e=>setForm(x=>({...x,contactName:e.target.value}))}/></Field>
                <Field label="Contact Relationship"><input className="form-control" value={form.contactRel} onChange={e=>setForm(x=>({...x,contactRel:e.target.value}))}/></Field>
              </div>
              <Field label="Primary Contact Phone Hotline"><input className="form-control" type="tel" value={form.contactPhone} onChange={e=>setForm(x=>({...x,contactPhone:e.target.value}))}/></Field>
              <Field label="Personal Health Insurance Provider Number Details"><input className="form-control" value={form.insurance} onChange={e=>setForm(x=>({...x,insurance:e.target.value}))}/></Field>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:".25rem"}}>
              <div className="info-row"><span className="info-label">Blood Group Phenotype</span><span className="info-val" style={{color:"var(--red)",fontWeight:700}}>{profileMeta.blood}</span></div>
              <div className="info-row"><span className="info-label">Active Drug Allergies</span><span className="info-val">{profileMeta.allergies}</span></div>
              <div className="info-row"><span className="info-label">Diagnosed Critical Conditions</span><span className="info-val">{profileMeta.conditions}</span></div>
              <div className="info-row"><span className="info-label">Emergency Contact Personnel</span><span className="info-val">{form.contactName||"Unconfigured"} ({form.contactRel||"N/A"})</span></div>
              <div className="info-row"><span className="info-label">Primary Guardian Hotline</span><span className="info-val" style={{fontWeight:600}}>{form.contactPhone||"Unspecified"}</span></div>
              <div className="info-row"><span className="info-label">Insurance Policy Number</span><span className="info-val">{form.insurance||"No Policy Matrix linked"}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CENTRAL ROOT APPLICATION CONTROLLER
═══════════════════════════════════════════════════════════ */
export default function App() {
  const {path,navigate}=useRouter();

  // Lazy Initialization: Load all state fields securely straight out of persistent localStorage repositories
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("medivault_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("medivault_records");
    return saved ? JSON.parse(saved) : [];
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("medivault_appointments");
    return saved ? JSON.parse(saved) : [
      {id:"1",doctor:"Dr. Alexander Fleming",specialty:"General Physician",date:today(),time:"14:30",notes:"Routine checkup diagnostic analysis",status:"Upcoming"}
    ];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("medivault_notifications");
    return saved ? JSON.parse(saved) : [
      {id:"n1",msg:"Welcome to your secure health vault profile environment registry.",date:new Date().toISOString(),read:false,type:"system"}
    ];
  });

  const [emergency, setEmergency] = useState(() => {
    const saved = localStorage.getItem("medivault_emergency");
    return saved ? JSON.parse(saved) : {contactName:"John Doe",contactRel:"Spouse/Guardian",contactPhone:"+1 (555) 019-2834",insurance:"Cigna Premium #9283-11"};
  });

  const [tab, setTab] = useState(() => {
    // Read address routing configurations parameters from active window locations strings tokens parsing
    const currentHash = window.location.hash;
    if (currentHash.startsWith("#/")) {
      const parsedTab = currentHash.replace("#/", "");
      const validTabs = ["dashboard", "records", "upload", "appointments", "timeline", "notifications", "profile", "emergency"];
      if (validTabs.includes(parsedTab)) return parsedTab;
    }
    return "dashboard";
  });

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("medivault_theme") === "dark";
  });

  // State Sync Interceptor Effect: Auto-serialize database updates across runtime operations bounds
  useEffect(() => {
    if (user) {
      localStorage.setItem("medivault_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("medivault_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("medivault_records", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem("medivault_appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("medivault_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("medivault_emergency", JSON.stringify(emergency));
  }, [emergency]);

  // Synchronize layout panels to hash updates cleanly
  useEffect(() => {
    if (user) {
      const currentHash = window.location.hash;
      if (currentHash.startsWith("#/")) {
        const routeTab = currentHash.replace("#/", "");
        const validTabs = ["dashboard", "records", "upload", "appointments", "timeline", "notifications", "profile", "emergency"];
        if (validTabs.includes(routeTab) && routeTab !== tab) {
          setTab(routeTab);
        }
      }
    }
  }, [path, user]);

  // Sync internal layout navigation modifications outward onto browser URI hashes state entries
  const handleTabChange = (targetTab) => {
    setTab(targetTab);
    if (user) {
      navigate(`#/${targetTab}`);
    }
  };

  // Enforce access control protections parameters routing locks structures
  useEffect(() => {
    if (!user) {
      const publicRoutes = ["#/", "#/login", "#/signup"];
      if (!publicRoutes.includes(window.location.hash)) {
        navigate("#/");
      }
    } else {
      if (window.location.hash === "#/" || window.location.hash === "#/login" || window.location.hash === "#/signup") {
        navigate(`#/${tab}`);
      }
    }
  }, [user, path]);

  // Global theme handling parameters configurations controls structures
  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute("data-dark", "true");
      localStorage.setItem("medivault_theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-dark");
      localStorage.setItem("medivault_theme", "light");
    }
  }, [dark]);

  const toggleTheme = () => setDark(d => !d);

  const addNotif = (msg, type = "system") => {
    const newN = { id: uid(), msg, date: new Date().toISOString(), read: false, type };
    setNotifications(prev => [newN, ...prev]);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("medivault_user");
    navigate("#/");
  };

  const renderPublic = () => {
    if (path === "#/login") return <LoginPage navigate={navigate} onLogin={setUser} />;
    if (path === "#/signup") return <SignupPage navigate={navigate} onLogin={setUser} />;
    return <HomePage navigate={navigate} />;
  };

  const pages = {
    dashboard: <DashboardPage user={user} records={records} appointments={appointments} notifications={notifications} setTab={handleTabChange} />,
    records: <RecordsPage records={records} setRecords={setRecords} setTab={handleTabChange} />,
    upload: <UploadPage records={records} setRecords={setRecords} addNotif={addNotif} />,
    appointments: <AppointmentsPage appointments={appointments} setAppointments={setAppointments} addNotif={addNotif} />,
    timeline: <TimelinePage records={records} appointments={appointments} />,
    notifications: <NotificationsPage notifications={notifications} setNotifications={setNotifications} />,
    profile: <ProfilePage user={user} setUser={setUser} />,
    emergency: <EmergencyPage emergency={emergency} setEmergency={setEmergency} />,
  };

  return (
    <ThemeCtx.Provider value={{ dark, toggle: toggleTheme }}>
      <ToastProvider>
        <style>{CSS}</style>
        {!user ? renderPublic() : (
          <AppShell user={user} onLogout={handleLogout} activeTab={tab} setTab={handleTabChange} notifications={notifications}>
            {pages[tab] || pages.dashboard}
          </AppShell>
        )}
      </ToastProvider>
    </ThemeCtx.Provider>
  );
}

