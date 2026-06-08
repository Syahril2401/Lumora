#!/usr/bin/env python3
"""Build complete Lumora static HTML for Figma html.to.design import - Part 1: Head + Landing + Auth pages"""
import os

OUT = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\lumora-all-pages.html"

def w(f, s):
    f.write(s)
    f.write("\n")

with open(OUT, "w", encoding="utf-8") as f:
    # HEAD
    w(f, '<!DOCTYPE html>')
    w(f, '<html lang="en" class="">')
    w(f, '<head>')
    w(f, '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">')
    w(f, '<title>Lumora - Build Better Study Habits with Clarity</title>')
    w(f, '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&amp;display=swap" rel="stylesheet">')
    w(f, '<script src="https://cdn.tailwindcss.com"></script>')
    w(f, '<script>')
    w(f, 'tailwind.config={darkMode:"class",theme:{extend:{fontFamily:{sans:["DM Sans","sans-serif"]},colors:{brand:{50:"#FFF7ED",100:"#FFEDD5",200:"#FED7AA",300:"#FDBA74",400:"#FB923C",500:"#F97316",600:"#EA580C",700:"#C2410C",800:"#9A3412",900:"#7C2D12"},navy:{50:"#F0F4F8",100:"#D9E2EC",200:"#BCCCDC",300:"#9FB3C8",400:"#829AB1",500:"#627D98",600:"#486581",700:"#334E68",800:"#243B53",900:"#102A43"}},borderRadius:{"2xl":"16px","3xl":"20px","4xl":"24px"},boxShadow:{glow:"0 0 40px rgba(249,115,22,0.10)"},animation:{"fade-in":"fadeIn 0.3s ease-out","slide-up":"slideUp 0.4s ease-out","slide-down":"slideDown 0.3s ease-out","scale-in":"scaleIn 0.2s ease-out","float":"float 6s ease-in-out infinite","moving-line":"movingLine 3s linear infinite"},keyframes:{fadeIn:{"0%":{opacity:"0"},"100%":{opacity:"1"}},slideUp:{"0%":{opacity:"0",transform:"translateY(12px)"},"100%":{opacity:"1",transform:"translateY(0)"}},slideDown:{"0%":{opacity:"0",transform:"translateY(-8px)"},"100%":{opacity:"1",transform:"translateY(0)"}},scaleIn:{"0%":{opacity:"0",transform:"scale(0.95)"},"100%":{opacity:"1",transform:"scale(1)"}},float:{"0%,100%":{transform:"translateY(0)"},"50%":{transform:"translateY(-8px)"}},movingLine:{"0%":{transform:"translateX(-100%)"},"100%":{transform:"translateX(300%)"}}}}}}')
    w(f, '</script>')
    w(f, '<style>')
    w(f, 'html{scroll-behavior:smooth}body{font-family:"DM Sans",sans-serif;margin:0}')
    w(f, '::selection{background:#FED7AA;color:#7C2D12}')
    w(f, '::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:999px}')
    w(f, '.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}')
    w(f, '.glass{backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}')
    w(f, '.gradient-text{background:linear-gradient(135deg,#F97316,#EA580C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}')
    w(f, '.btn-primary{background:linear-gradient(135deg,#F97316 0%,#EA580C 100%);transition:all .3s ease}')
    w(f, '.btn-primary:hover{background:linear-gradient(135deg,#EA580C 0%,#C2410C 100%)}')
    w(f, '.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}')
    w(f, '</style>')
    w(f, '</head>')
    w(f, '<body class="bg-[#FDFDFF] text-slate-900 antialiased">')

    # ─── NAVBAR HELPER ───
    def nav_landing():
        w(f, '<nav class="glass bg-white/85 border-b border-[#D9E2EC]" style="height:64px;">')
        w(f, '  <div class="max-w-[1600px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">')
        w(f, '    <div class="flex items-center gap-10">')
        w(f, '      <div class="flex items-center gap-3"><div class="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-lg">L</div><span class="text-xl font-bold tracking-tight text-brand-500">Lumora</span></div>')
        w(f, '      <ul class="hidden lg:flex gap-8 text-sm font-medium text-navy-500"><li><a href="#" class="hover:text-navy-900 transition-colors">Features</a></li><li><a href="#" class="hover:text-navy-900 transition-colors">How it Works</a></li></ul>')
        w(f, '    </div>')
        w(f, '    <div class="flex items-center gap-4">')
        w(f, '      <button class="relative w-14 h-7 rounded-full bg-navy-200 transition-colors duration-300 focus:outline-none"><div class="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center"><svg class="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg></div></button>')
        w(f, '      <a href="#" class="text-sm font-medium text-navy-500 hover:text-navy-900 transition-colors">Log In</a>')
        w(f, '      <a href="#" class="btn-primary text-sm font-semibold px-5 py-2.5 rounded-lg text-white">Get Started</a>')
        w(f, '    </div>')
        w(f, '  </div>')
        w(f, '</nav>')

    def section_label(num, name):
        w(f, f'<div style="background:linear-gradient(135deg,#F97316,#EA580C);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">{num:02d} {name}</div>')

    # ═══════════════════════════════════════════════════════════════
    # PAGE 01: LANDING
    # ═══════════════════════════════════════════════════════════════
    w(f, '<section id="page-landing">')
    section_label(1, "Landing Page")
    w(f, '<div class="min-h-screen bg-[#FAFAF9] text-[#102A43] overflow-x-hidden">')
    nav_landing()

    # Hero
    w(f, '<section class="relative pt-32 pb-24 overflow-hidden">')
    w(f, '<div class="absolute top-10 right-0 w-[600px] h-[600px] bg-brand-300/10 rounded-full blur-[160px]"></div>')
    w(f, '<div class="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-navy-300/8 rounded-full blur-[120px]"></div>')
    w(f, '<div class="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">')
    w(f, '<div class="grid lg:grid-cols-5 gap-12 items-start">')
    w(f, '<div class="lg:col-span-2 pt-4">')
    w(f, '<div class="inline-flex items-center bg-brand-50 text-brand-600 text-[11px] font-mono font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-8 border border-brand-200"><span class="w-1.5 h-1.5 bg-brand-500 rounded-full mr-2"></span> The Intelligent Sanctuary</div>')
    w(f, '<h1 class="text-[52px] lg:text-[58px] font-bold text-navy-900 leading-[1.05] tracking-tight mb-6">Your intelligent sanctuary for <span class="gradient-text">self-regulated learning.</span></h1>')
    w(f, '<p class="text-navy-600 text-lg leading-relaxed mb-8">A smart dashboard, study planner, weekly targets, rich notes, and progress analytics — designed for how students actually learn.</p>')
    w(f, '<div class="flex flex-wrap gap-3 mb-8">')
    w(f, '<a href="#" class="btn-primary font-semibold px-8 py-4 rounded-xl shadow-glow text-sm">Get Started for Free</a>')
    w(f, '<a href="#" class="flex items-center gap-2 bg-white text-navy-700 font-semibold px-6 py-4 rounded-xl hover:bg-gray-50 transition-all border border-[#D9E2EC] text-sm"><svg class="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>See how it works</a>')
    w(f, '</div>')
    w(f, '<div class="flex items-center gap-4"><div class="flex -space-x-2"><div class="w-8 h-8 rounded-full bg-brand-100 border-2 border-white flex items-center justify-center text-brand-600 text-[9px] font-bold">EJ</div><div class="w-8 h-8 rounded-full bg-navy-100 border-2 border-white flex items-center justify-center text-navy-600 text-[9px] font-bold">MT</div><div class="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-navy-400 text-[9px] font-bold">+2k</div></div><div class="flex text-brand-500 gap-0.5 text-[10px]">★★★★★</div><span class="text-navy-400 text-xs">2,000+ students</span></div>')
    w(f, '</div>')
    # Right - Dashboard mockup
    w(f, '<div class="lg:col-span-3 relative">')
    w(f, '<div class="rounded-2xl border border-[#D9E2EC] shadow-2xl bg-white overflow-hidden">')
    w(f, '<div class="bg-gray-50 px-4 py-3 flex items-center gap-3 border-b border-[#E8EDF2]"><div class="flex gap-1.5"><div class="w-2.5 h-2.5 rounded-full bg-red-400/80"></div><div class="w-2.5 h-2.5 rounded-full bg-yellow-400/80"></div><div class="w-2.5 h-2.5 rounded-full bg-green-400/80"></div></div><div class="flex-1 flex justify-center"><div class="bg-white rounded-md px-4 py-1 text-[9px] text-navy-400 font-mono border border-[#E8EDF2]">app.lumora.ai/dashboard</div></div></div>')
    w(f, '<div class="p-5"><div class="mb-4"><h2 class="text-base font-bold text-navy-900">Good afternoon, User.</h2><p class="text-xs text-navy-500">Ready for a deep focus session?</p><div class="flex items-center gap-1.5 mt-1"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div><span class="text-[10px] text-navy-500">Your cognitive reading is at <span class="text-emerald-600 font-bold">94%</span> today.</span></div></div>')
    w(f, '<div class="grid grid-cols-5 gap-3"><div class="col-span-3 bg-[#102A43] rounded-xl p-3.5"><div class="flex items-center justify-between mb-3"><div><h3 class="text-xs font-bold text-white">Daily Overview</h3><p class="text-[9px] text-slate-400">Saturday, Jun 6</p></div><span class="text-[8px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">Full Schedule</span></div><div class="flex items-center gap-3 mb-2"><div class="text-xs font-bold text-white w-10">19:00</div><div class="flex-1 bg-white/5 rounded-lg p-2 border border-white/10"><div class="flex items-center justify-between"><div><p class="text-[11px] font-semibold text-white">Tonight\\'s Study Session</p><p class="text-[9px] text-slate-400">120m</p></div><span class="text-[8px] px-2 py-0.5 rounded-full bg-brand-500 text-white font-medium">PLANNED</span></div></div></div><div class="flex items-center gap-3 opacity-60"><div class="text-xs font-bold text-slate-400 w-10">21:00</div><div class="flex-1 bg-white/5 rounded-lg p-2 border border-white/10"><div class="flex items-center justify-between"><div><p class="text-[11px] font-semibold text-slate-300">Weekly Review</p><p class="text-[9px] text-slate-500">45m</p></div><span class="text-[8px] px-2 py-0.5 rounded-full bg-slate-600 text-slate-300 font-medium">SCHEDULED</span></div></div></div></div>')
    w(f, '<div class="col-span-2 space-y-2"><div class="flex items-center justify-between mb-1"><span class="text-[10px] font-bold text-navy-700">Recent Notes</span><span class="text-[8px] text-brand-500 font-semibold cursor-pointer">VIEW ALL</span></div><div class="bg-white rounded-lg p-2.5 border border-[#E8EDF2] shadow-sm"><div class="flex items-center gap-2 mb-1"><div class="w-4 h-4 rounded bg-brand-50 flex items-center justify-center"><svg class="w-2.5 h-2.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><span class="text-[10px] font-semibold text-navy-700 truncate">Weekly Study Targets</span></div><p class="text-[8px] text-navy-400 leading-relaxed">My Targets for this Week: - Target 1: Review class notes for 15-20 minutes every day...</p></div><div class="bg-white rounded-lg p-2.5 border border-[#E8EDF2] shadow-sm"><div class="flex items-center gap-2 mb-1"><div class="w-4 h-4 rounded bg-amber-50 flex items-center justify-center"><svg class="w-2.5 h-2.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg></div><span class="text-[10px] font-semibold text-navy-700 truncate">Waterfall Methodology</span></div><p class="text-[8px] text-navy-400 leading-relaxed">The Waterfall model is a classic, sequential design process often used in software development...</p></div></div></div>')
    w(f, '<div class="grid grid-cols-3 gap-3 mt-3"><div class="bg-white rounded-xl p-3 border border-[#E8EDF2]"><h4 class="text-[9px] font-bold text-navy-700 mb-2">This Week\\'s Targets</h4><p class="text-[9px] text-navy-400 text-center py-1">No active targets for this week.</p></div><div class="bg-white rounded-xl p-3 border border-[#E8EDF2]"><h4 class="text-[9px] font-bold text-navy-400 uppercase tracking-wider mb-2">Quick Actions</h4><div class="space-y-1.5"><div class="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAFAF9]"><div class="w-5 h-5 rounded bg-blue-100 flex items-center justify-center"><svg class="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></div><span class="text-[9px] text-navy-600">New Note</span></div><div class="flex items-center gap-2 p-1.5 rounded-lg bg-[#FAFAF9]"><div class="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center"><svg class="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div><span class="text-[9px] text-navy-600">Plan Session</span></div></div></div><div class="bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl p-3 relative overflow-hidden"><div class="absolute -right-2 -top-2 text-2xl text-white/20">"</div><p class="text-[9px] text-white italic leading-relaxed">Wisdom is not a product of schooling but of the lifelong attempt to acquire it.</p><p class="text-[8px] text-white/70 mt-2 uppercase tracking-wider">— ALBERT EINSTEIN</p></div></div>')
    w(f, '</div></div>')
    w(f, '<div class="absolute -bottom-3 -left-6 bg-white rounded-xl p-3 border border-[#D9E2EC] shadow-xl animate-float"><div class="flex items-center gap-2.5"><div class="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></div><div><p class="text-[11px] font-semibold text-navy-700">All caught up!</p><p class="text-[9px] text-navy-400 font-mono">Great work today</p></div></div></div>')
    w(f, '</div></div></div></section>')

    # Comparison
    w(f, '<section class="py-28 relative overflow-hidden"><div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/20 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div><div class="max-w-[1600px] mx-auto px-6 lg:px-12 relative"><div class="text-center mb-16"><div class="inline-flex items-center bg-navy-50 text-navy-600 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-navy-200">Why Lumora</div><h2 class="text-[42px] font-bold text-navy-900 mb-4 tracking-tight leading-[1.1] max-w-2xl mx-auto">Stop juggling. Start learning.</h2><p class="text-navy-500 text-lg leading-relaxed max-w-xl mx-auto">Generic to-do lists don\\'t understand your cognitive load. Lumora tracks your learning patterns, measures your focus, and helps you study smarter — not harder.</p></div>')
    w(f, '<div class="max-w-[1200px] mx-auto"><div class="grid md:grid-cols-2 gap-4 mb-6"><div class="flex items-center gap-2 px-1"><div class="w-2 h-2 rounded-full bg-red-400"></div><span class="text-xs font-semibold text-red-400 uppercase tracking-wider">The Old Way</span></div><div class="flex items-center gap-2 px-1"><div class="w-2 h-2 rounded-full bg-brand-500"></div><span class="text-xs font-semibold text-brand-500 uppercase tracking-wider">The Lumora Way</span></div></div>')
    w(f, '<div class="space-y-3">')
    rows = [
        ("Scattered notes across five different apps","One unified sanctuary for every lecture and task"),
        ("No feedback loop on study effectiveness","AI-driven study plans and personalized recommendations"),
        ("Overwhelmed by monolithic to-do lists","Weekly targets with reflective analytics"),
        ("Burnout from poor time management","Structured notes with bidirectional linking"),
    ]
    for old, new in rows:
        w(f, f'<div class="grid md:grid-cols-2 gap-3"><div class="bg-white rounded-xl p-4 border border-red-100 shadow-sm flex items-center gap-3 relative overflow-hidden"><div class="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div><div class="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg></div><p class="text-sm text-navy-700 font-medium">{old}</p></div><div class="bg-white rounded-xl p-4 border border-brand-100 shadow-sm flex items-center gap-3 relative overflow-hidden"><div class="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div><div class="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center shrink-0"><svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></div><p class="text-sm text-navy-700 font-medium">{new}</p></div></div>')
    w(f, '</div></div></div></section>')

    # Features
    w(f, '<section id="features" class="py-28 relative overflow-hidden"><div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy-100/20 rounded-full blur-[140px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div><div class="max-w-[1600px] mx-auto px-6 lg:px-12 relative"><div class="text-center mb-16"><div class="inline-flex items-center bg-brand-50 text-brand-600 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-brand-200">Features</div><h2 class="text-[42px] font-bold text-navy-900 mb-4 tracking-tight leading-[1.1]">Everything you need to excel.</h2><p class="text-navy-500 text-lg leading-relaxed max-w-xl mx-auto">A complete toolkit designed around how students actually learn.</p></div>')
    w(f, '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">')
    features = [
        ("Smart Dashboard","Your personal command center with cognitive readiness score, daily overview, and quick access to everything.","brand","M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"),
        ("Study Planner","Calendar view with daily, weekly, and monthly modes. Manage your intellectual flow and sync with Google Calendar.","violet","M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"),
        ("Weekly Targets","Set measurable goals, break them into subtasks, and track completion rate week by week.","emerald","M9 12l2 2 4-4M6 20l-2 4 4-2M18 20l2 4-4-2M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4z"),
        ("Smart Notes","Rich text editor with pinning, search, categories, and export. Organize your lecture notes efficiently.","amber","M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"),
        ("Progress Analytics","SRL score trend, dimension analysis, and consistency tracking to measure your learning development.","brand","M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"),
        ("Settings & Integrations","Customize your workspace with theme preferences, profile management, and Google Calendar sync.","rose","M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"),
    ]
    for title, desc, color, icon in features:
        w(f, f'<div class="bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-sm relative overflow-hidden group"><div class="w-11 h-11 bg-{color}-50 rounded-xl flex items-center justify-center text-{color}-500 mb-4"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{icon}" /></svg></div><h3 class="text-lg font-bold mb-2 text-navy-900">{title}</h3><p class="text-navy-500 text-sm mb-4 leading-relaxed">{desc}</p></div>')
    w(f, '</div></div></section>')

    # How it works
    w(f, '<section id="how" class="py-20 relative bg-white border-y border-[#D9E2EC]"><div class="max-w-[1600px] mx-auto px-6 lg:px-12"><div class="text-center mb-14"><div class="inline-flex items-center bg-brand-50 text-brand-600 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 border border-brand-200">How It Works</div><h2 class="text-[36px] font-semibold text-navy-900 mb-3">Mastery in three steps.</h2><p class="text-navy-500 text-sm">We\\'ve codified the science of learning into a simple workflow.</p></div>')
    w(f, '<div class="grid md:grid-cols-3 gap-8 lg:gap-16 relative"><div class="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-brand-500/20"></div>')
    steps = [("01","Plan","Plan Your Sessions","Create focus sessions in your planner. Set targets for the week and let Lumora organize your schedule."),("02","Focus","Focus & Take Notes","Work through your sessions and capture structured notes with bidirectional linking."),("03","Reflect","Reflect & Improve","Review your progress analytics and get AI-powered recommendations to study smarter.")]
    for num, short, title, desc in steps:
        w(f, f'<div class="text-center relative"><div class="w-24 h-24 bg-white rounded-2xl border border-[#D9E2EC] flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-brand-500/5"><div><div class="text-2xl font-bold text-brand-500">{num}</div><div class="text-[8px] font-mono text-brand-400 uppercase tracking-widest">{short}</div></div></div><h3 class="text-base font-semibold mb-2 text-navy-900">{title}</h3><p class="text-navy-500 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p></div>')
    w(f, '</div></div></section>')

    # Testimonials
    w(f, '<section class="py-20 relative overflow-hidden"><div class="max-w-[1600px] mx-auto px-6 lg:px-12"><div class="mb-12"><div class="inline-flex items-center bg-navy-50 text-navy-600 text-[10px] font-mono font-medium uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-navy-200">Testimonials</div><h2 class="text-[32px] font-semibold text-navy-900">Loved by students at 500+ universities.</h2></div>')
    w(f, '<div class="grid md:grid-cols-3 gap-6 lg:gap-8">')
    testimonials = [
        ("\"Lumora changed how I approach my med school exams. The AI-suggested study schedules actually made me feel human again.","EJ","Elena J.","Medical Student, Johns Hopkins"),
        ("\"The visual planner is a lifesaver. Being able to see my entire semester and where my focus needs to be is so empowering.","MT","Marcus T.","Law Student, Yale"),
        ("\"Finally, a tool that focuses on the learning process, not just checking boxes. The weekly targets keep me accountable.","SC","Sarah C.","Ph.D. Candidate, Stanford"),
    ]
    for quote, initials, name, role in testimonials:
        w(f, f'<div class="bg-white rounded-2xl p-6 border border-[#D9E2EC] shadow-sm"><div class="flex text-brand-500 gap-0.5 mb-4 text-xs">★★★★★</div><p class="text-navy-600 text-sm italic mb-6 leading-relaxed">{quote}</p><div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-[10px] font-bold">{initials}</div><div><p class="font-semibold text-navy-900 text-sm">{name}</p><p class="text-[10px] text-navy-400">{role}</p></div></div></div>')
    w(f, '</div></div></section>')

    # CTA
    w(f, '<section class="py-20 relative"><div class="max-w-[1200px] mx-auto px-6 lg:px-12"><div class="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-12 text-center relative overflow-hidden"><div class="absolute inset-0 opacity-15"><div class="absolute top-0 left-0 w-48 h-48 bg-brand-500 rounded-full blur-[80px]"></div></div><div class="relative z-10"><h2 class="text-[32px] font-semibold text-white mb-4 tracking-tight">Ready to transform your study habits?</h2><p class="text-navy-200 text-base mb-7 max-w-md mx-auto">Join thousands of students who have found their sanctuary of productivity.</p><a href="#" class="inline-block btn-primary font-bold px-10 py-4 rounded-xl mb-4 text-sm shadow-xl">Get Started for Free</a><p class="text-navy-400/50 text-[9px] font-mono uppercase tracking-widest">No credit card required · Free tier forever</p></div></div></div></section>')

    # Footer
    w(f, '<footer class="border-t border-[#D9E2EC] pt-12 pb-8 bg-white"><div class="max-w-[1600px] mx-auto px-6 lg:px-12"><div class="grid md:grid-cols-5 gap-8 mb-10"><div class="md:col-span-2"><div class="text-lg font-bold mb-2"><span class="text-brand-500">Lum</span><span class="text-navy-500">ora</span></div><p class="text-navy-400 text-sm leading-relaxed max-w-xs">Your AI-powered self-regulated learning platform. Build better study habits with clarity.</p></div><div><h4 class="text-navy-900 font-semibold mb-3 text-xs uppercase tracking-wider">Product</h4><ul class="space-y-2 text-sm text-navy-400"><li><a href="#" class="hover:text-brand-500 transition-colors">Features</a></li><li><a href="#" class="hover:text-brand-500 transition-colors">Pricing</a></li><li><a href="#" class="hover:text-brand-500 transition-colors">Changelog</a></li></ul></div><div><h4 class="text-navy-900 font-semibold mb-3 text-xs uppercase tracking-wider">Company</h4><ul class="space-y-2 text-sm text-navy-400"><li><a href="#" class="hover:text-brand-500 transition-colors">About</a></li><li><a href="#" class="hover:text-brand-500 transition-colors">Blog</a></li><li><a href="#" class="hover:text-brand-500 transition-colors">Careers</a></li></ul></div><div><h4 class="text-navy-900 font-semibold mb-3 text-xs uppercase tracking-wider">Legal</h4><ul class="space-y-2 text-sm text-navy-400"><li><a href="#" class="hover:text-brand-500 transition-colors">Privacy</a></li><li><a href="#" class="hover:text-brand-500 transition-colors">Terms</a></li></ul></div></div><div class="border-t border-[#D9E2EC] pt-6 flex flex-col md:flex-row justify-between items-center gap-3"><p class="text-navy-400 text-xs">© 2024 Lumora AI. Designed for focused minds.</p></div></div></footer>')

    w(f, '</div></section>')  # end page-landing

    # ═══════════════════════════════════════════════════════════════
    # PAGE 02: LOGIN
    # ═══════════════════════════════════════════════════════════════
    w(f, '<section id="page-login">')
    section_label(2, "Login Page")
    w(f, '<div class="min-h-screen bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden">')
    w(f, '<div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>')
    w(f, '<div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 rounded-full blur-[100px]"></div>')
    w(f, '<div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">')
    w(f, '<div class="text-center mb-10"><div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div><p class="text-navy-500 font-medium">Return to your Intelligent Sanctuary</p></div>')
    w(f, '<div class="w-full bg-white rounded-3xl p-10 md:p-12 shadow-xl border border-[#D9E2EC]">')
    w(f, '<form class="space-y-6">')
    w(f, '<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email/Username</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg></span><input type="email" placeholder="student@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all duration-300 outline-none"></div></div>')
    w(f, '<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></span><input type="password" placeholder="••••••••" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all duration-300 outline-none"><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button></div></div>')
    w(f, '<button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300 transform active:scale-[0.98] mt-4">Login</button>')
    w(f, '</form>')
    w(f, '<p class="text-center mt-8 text-sm font-medium text-navy-500">New to the sanctuary? <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Join now</a></p>')
    w(f, '</div>')
    w(f, '<div class="mt-10 flex gap-8 text-xs font-medium text-navy-400"><a href="#" class="hover:text-brand-500 transition-colors">Privacy Policy</a><a href="#" class="hover:text-brand-500 transition-colors">Terms of Service</a><a href="#" class="hover:text-brand-500 transition-colors">Contact Support</a></div>')
    w(f, '</div></div></section>')

    # ═══════════════════════════════════════════════════════════════
    # PAGE 03: REGISTER
    # ═══════════════════════════════════════════════════════════════
    w(f, '<section id="page-register">')
    section_label(3, "Register Page")
    w(f, '<div class="min-h-screen bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden py-12">')
    w(f, '<div class="absolute top-10 left-[-5%] w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>')
    w(f, '<div class="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-navy-300/8 rounded-full blur-[100px]"></div>')
    w(f, '<div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">')
    w(f, '<div class="text-center mb-8"><div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div><p class="text-navy-500 font-medium">Create your account to start your journey.</p></div>')
    w(f, '<div class="w-full bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#D9E2EC]">')
    w(f, '<form class="space-y-5">')
    w(f, '<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Full Name</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span><input type="text" placeholder="Enter your name" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all duration-300 outline-none"></div></div>')
    w(f, '<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email Address</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span><input type="email" placeholder="example@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all duration-300 outline-none"></div></div>')
    w(f, '<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></span><input type="password" placeholder="Create a password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all duration-300 outline-none"><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button></div></div>')
    w(f, '<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Confirm Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></span><input type="password" placeholder="Repeat your password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all duration-300 outline-none"><button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button></div></div>')
    w(f, '<p class="text-center text-xs text-navy-400 leading-relaxed px-4 pt-2">By registering, you agree to our <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Terms of Service</a> and <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Privacy Policy</a>.</p>')
    w(f, '<button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300 transform active:scale-[0.98] mt-2">Register</button>')
    w(f, '</form>')
    w(f, '<p class="text-center mt-8 text-sm font-medium text-navy-500">Already have an account? <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Login</a></p>')
    w(f, '</div></div></section>')

    # ═══════════════════════════════════════════════════════════════
    # PAGE 04: FORGOT PASSWORD
    # ═══════════════════════════════════════════════════════════════
    w(f, '<section id="page-forgot">')
    section_label(4, "Forgot Password")
    w(f, '<div class="min-h-screen bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden">')
    w(f, '<div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>')
    w(f, '<div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">')
    w(f, '<div class="text-center mb-10"><div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div><p class="text-navy-500 font-medium">Reset your password</p></div>')
    w(f, '<div class="w-full bg-white rounded-3xl p-10 md:p-12 shadow-xl border border-[#D9E2EC]">')
    w(f, '<div class="mb-4 text-sm text-navy-500">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.</div>')
    w(f, '<form class="space-y-6"><div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email</label><input type="email" placeholder="student@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 px-4 text-navy-700 font-medium transition-all duration-300 outline-none"></div>')
    w(f, '<button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300">Email Password Reset Link</button></form>')
    w(f, '</div></div></section>')

print("Part 1 done: Head + Landing + Auth pages written")
