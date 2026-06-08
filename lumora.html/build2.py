#!/usr/bin/env python3
"""Build pages 2-8 of Lumora HTML."""
import os

OUT = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\lumora-all-pages.html"

def w(s):
    with open(OUT, 'a', encoding='utf-8') as f:
        f.write(s)

def sidebar(active):
    items=[("Dashboard","page-dashboard","M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"),("Planner","page-planner","M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"),("Weekly Targets","page-targets","M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"),("Notes","page-notes","M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"),("Progress","page-progress","M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"),("Settings","page-settings","M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z")]
    nav=""
    for label,pid,icon in items:
        cls="bg-brand-500 text-white shadow-lg shadow-brand-900/20" if pid==active else "text-navy-500 hover:bg-navy-50 hover:text-navy-900"
        nav+=f'<a href="#{pid}" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all {cls}"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="{icon}"/></svg><span>{label}</span></a>\n'
    return f'''<aside class="w-72 bg-[#F8FAFC] border-r border-[#D9E2EC] flex flex-col shrink-0">
<div class="p-6 pb-6 flex items-center justify-between"><div class="flex items-center gap-3"><div class="bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-[#D9E2EC] inline-flex"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div></div><div><span class="text-lg font-bold text-brand-500 tracking-tight block">Lumora</span><span class="text-[10px] font-mono text-brand-600 uppercase tracking-widest bg-brand-100 px-2 py-0.5 rounded">Intelligent Sanctuary</span></div></div></div>
<nav class="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">{nav}</nav>
<div class="px-4 pb-6 mt-auto space-y-4"><button onclick="document.getElementById('modal-logout').style.display='flex'" class="flex items-center gap-3 text-sm font-semibold text-navy-500 hover:text-rose-600 hover:bg-rose-50 transition-all py-2.5 px-3 rounded-xl w-full"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg><span>Logout</span></button><div class="border-t border-[#D9E2EC] pt-4"><div class="p-2 rounded-xl flex items-center gap-3 border border-transparent"><div class="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-lg relative shrink-0"><div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div></div><div class="min-w-0"><p class="text-[13px] font-black text-navy-900 truncate leading-tight">pamungkas</p><p class="text-[10px] font-bold text-navy-400 truncate mt-0.5">Free Plan</p></div></div></div></div>
</aside>'''

def topbar():
    return '''<header class="h-20 px-10 flex items-center justify-between bg-white z-30 shrink-0 border-b border-[#D9E2EC]">
<div class="flex-1 flex items-center gap-6"><button class="p-2 -ml-2 rounded-xl text-navy-400 hover:bg-[#F8FAFC] hover:text-navy-900 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg></button><button onclick="document.getElementById('modal-search').style.display='flex'" class="hidden sm:flex items-center gap-3 bg-[#F8FAFC] hover:bg-[#E8EDF2] transition-colors border border-transparent text-navy-400 px-4 py-2.5 rounded-full w-[280px] lg:w-[400px] text-sm font-medium group"><svg class="w-4 h-4 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span class="flex-1 text-left">Search sessions, notes, or targets...</span></button></div>
<div class="flex items-center gap-6"><div class="flex items-center gap-3 cursor-pointer group"><span class="text-xs font-black text-navy-900 group-hover:text-brand-500 transition-colors">pamungkas</span><div class="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-sm relative shrink-0"><div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div></div></div></div>
</header>'''

# PAGE 02: LOGIN
w('''<!-- PAGE 02: LOGIN -->
<section id="page-login" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">02 Login</div>
<div class="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center px-4 relative overflow-hidden">
<div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>
<div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
<div class="text-center mb-10"><div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div><p class="text-navy-500 font-medium">Return to your Intelligent Sanctuary</p></div>
<div class="w-full bg-white rounded-3xl p-10 shadow-xl border border-[#D9E2EC]">
<form class="space-y-6">
<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email/Username</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg></span><input type="email" placeholder="student@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all outline-none"></div></div>
<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg></span><input type="password" placeholder="••••••••" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all outline-none"></div></div>
<div class="flex items-center justify-between"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 rounded border-[#D9E2EC] text-brand-500 focus:ring-brand-500"><span class="text-sm text-navy-600">Remember me</span></label><a href="#page-forgot-password" class="text-sm text-brand-500 hover:text-brand-600 font-medium">Forgot password?</a></div>
<button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all">Login</button>
</form>
<p class="text-center mt-8 text-sm font-medium text-navy-500">New to the sanctuary? <a href="#page-register" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Join now</a></p>
</div>
<div class="mt-10 flex gap-8 text-xs font-medium text-navy-400"><a href="#" class="hover:text-brand-500 transition-colors">Privacy Policy</a><a href="#" class="hover:text-brand-500 transition-colors">Terms of Service</a></div>
</div>
</div>
</section>
''')

# PAGE 03: REGISTER
w('''<!-- PAGE 03: REGISTER -->
<section id="page-register" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">03 Register</div>
<div class="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center px-4 relative overflow-hidden py-12">
<div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
<div class="text-center mb-8"><div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div><p class="text-navy-500 font-medium">Create your account to start your journey.</p></div>
<div class="w-full bg-white rounded-3xl p-8 shadow-xl border border-[#D9E2EC]">
<form class="space-y-5">
<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Full Name</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></span><input type="text" placeholder="Enter your name" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all outline-none"></div></div>
<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email Address</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg></span><input type="email" placeholder="example@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all outline-none"></div></div>
<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg></span><input type="password" placeholder="Create a password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all outline-none"></div></div>
<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Confirm Password</label><div class="relative"><span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></span><input type="password" placeholder="Repeat your password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all outline-none"></div></div>
<p class="text-center text-xs text-navy-400 leading-relaxed px-4 pt-2">By registering, you agree to our <a href="#" class="text-brand-500 font-bold">Terms of Service</a> and <a href="#" class="text-brand-500 font-bold">Privacy Policy</a>.</p>
<button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all mt-2">Register</button>
</form>
<p class="text-center mt-8 text-sm font-medium text-navy-500">Already have an account? <a href="#page-login" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Login</a></p>
</div>
</div>
</div>
</section>
''')

# PAGE 04: FORGOT PASSWORD
w('''<!-- PAGE 04: FORGOT PASSWORD -->
<section id="page-forgot-password" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">04 Forgot Password</div>
<div class="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center px-4 relative overflow-hidden">
<div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
<div class="text-center mb-10"><div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div><p class="text-navy-500 font-medium">Reset your password</p></div>
<div class="w-full bg-white rounded-3xl p-10 shadow-xl border border-[#D9E2EC]">
<p class="text-sm text-navy-500 mb-6">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.</p>
<form class="space-y-6">
<div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email</label><input type="email" placeholder="student@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 px-4 text-navy-700 font-medium transition-all outline-none"></div>
<button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all">Email Password Reset Link</button>
</form>
<p class="text-center mt-6 text-sm font-medium text-navy-500"><a href="#page-login" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">&larr; Back to Login</a></p>
</div>
</div>
</div>
</section>
''')

# PAGE 05: ONBOARDING SANCTUARY
w('''<!-- PAGE 05: ONBOARDING SANCTUARY -->
<section id="page-onboarding-sanctuary" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#059669,#0D9488);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">05 Onboarding Sanctuary</div>
<div class="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4 py-16 relative overflow-hidden">
<div class="absolute top-10 right-[-5%] w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>
<div class="relative z-10 w-full max-w-[1000px] bg-white rounded-[40px] shadow-2xl border border-[#D9E2EC] flex flex-col md:flex-row overflow-hidden">
<div class="w-full md:w-[45%] bg-[#F3F4F6] p-12 flex flex-col justify-between relative overflow-hidden border-r border-[#D9E2EC]">
<div class="relative z-10 flex items-center gap-3 mb-12"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div><span class="text-2xl font-bold tracking-tight text-brand-500">Lumora</span></div>
<div class="relative z-10 flex flex-col items-center">
<div class="w-full max-w-[320px] aspect-square rounded-[40px] overflow-hidden shadow-xl border border-white/20 mb-10 rotate-[-2deg]"><div class="w-full h-full bg-gradient-to-br from-brand-400 via-purple-400 to-brand-300"></div></div>
<div class="relative px-6"><svg class="absolute top-[-10px] left-2 w-6 h-6 text-brand-500/30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg><p class="text-navy-500 font-medium italic text-center text-[15px] leading-relaxed max-w-[280px]">"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."</p></div>
</div>
</div>
<div class="w-full md:w-[55%] p-12 md:p-16 flex flex-col justify-center">
<div class="mb-12">
<div class="inline-flex items-center gap-2 bg-brand-50 text-brand-500 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-brand-100">Step 01 / 03</div>
<h1 class="text-[36px] md:text-[44px] font-bold text-navy-900 leading-[1.15] mb-6">Welcome to your <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400">Sanctuary of Focus.</span></h1>
<p class="text-navy-500 text-lg leading-relaxed font-medium">Lumora is designed to help you transform your academic journey through AI-driven strategies and intentional habit building.</p>
</div>
<div class="space-y-8 mb-12">
<div class="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#FAFAF9] border border-transparent hover:border-[#E8EDF2] transition-all group"><div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z"/></svg></div><div><h3 class="text-lg font-bold text-navy-900 mb-1">Intelligent Assistance</h3><p class="text-[14px] text-navy-500 font-medium leading-relaxed">Personalized AI models that adapt to your unique study patterns.</p></div></div>
<div class="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#FAFAF9] border border-transparent hover:border-[#E8EDF2] transition-all group"><div class="w-14 h-14 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div><div><h3 class="text-lg font-bold text-navy-900 mb-1">Focused Sessions</h3><p class="text-[14px] text-navy-500 font-medium leading-relaxed">Minimize distractions with curated productivity environments.</p></div></div>
</div>
<div class="flex items-center"><a href="#page-onboarding-questionnaire" class="btn-primary text-white font-bold px-10 py-4 rounded-xl flex items-center gap-3 shadow-glow transition-all active:scale-[0.98]">Let's Begin <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></a></div>
</div>
</div>
<div class="absolute bottom-8 inset-x-0 text-center"><p class="text-[10px] font-mono font-bold text-navy-400 uppercase tracking-[0.2em] mb-4">Secured by Lumora Intelligence</p></div>
</div>
</section>
''')

# PAGE 06: ONBOARDING QUESTIONNAIRE
w('''<!-- PAGE 06: ONBOARDING QUESTIONNAIRE -->
<section id="page-onboarding-questionnaire" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#059669,#0D9488);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">06 Onboarding Questionnaire</div>
<div class="min-h-screen bg-[#FAFAF9] pb-20 relative overflow-hidden">
<div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>
<nav class="fixed top-0 inset-x-0 z-50 glass bg-white/85 border-b border-[#D9E2EC] h-16 flex items-center justify-between px-8"><div class="flex items-center gap-3"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div><span class="text-xl font-bold tracking-tight text-brand-500">Lumora</span></div><button class="text-sm font-bold text-navy-500 hover:text-navy-900 transition-colors">Save &amp; Exit</button></nav>
<div class="max-w-[1200px] mx-auto pt-32 px-6 flex flex-col lg:flex-row gap-12 relative z-10">
<div class="flex-1">
<div class="mb-16"><p class="text-[11px] font-mono text-navy-400 uppercase tracking-widest mb-2">Progress</p><h2 class="text-lg font-bold text-brand-500 mb-8">Step 01: Planning Habits</h2><div class="relative"><div class="absolute top-1/2 left-0 w-full h-[2px] bg-[#E8EDF2] -translate-y-1/2"></div><div class="absolute top-1/2 left-0 h-[2px] bg-brand-500 -translate-y-1/2 shadow-[0_0_10px_rgba(249,115,22,0.5)]" style="width:0%"></div><div class="relative flex justify-between"><div class="flex flex-col items-center"><div class="w-4 h-4 rounded-full border-2 bg-brand-500 border-brand-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] z-10"></div><span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-brand-500 font-bold">Planning</span></div><div class="flex flex-col items-center"><div class="w-4 h-4 rounded-full border-2 bg-white border-[#D9E2EC] z-10"></div><span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-navy-400">Time Mgmt</span></div><div class="flex flex-col items-center"><div class="w-4 h-4 rounded-full border-2 bg-white border-[#D9E2EC] z-10"></div><span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-navy-400">Cognitive</span></div><div class="flex flex-col items-center"><div class="w-4 h-4 rounded-full border-2 bg-white border-[#D9E2EC] z-10"></div><span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-navy-400">Reflection</span></div></div></div></div>
<div class="text-center mb-12"><h1 class="text-[26px] md:text-[30px] font-bold text-navy-900 leading-tight mb-2 px-4">I make a study schedule before starting to study</h1><p class="text-lg text-brand-500 font-medium mb-4 px-4">Saya membuat jadwal belajar sebelum mulai belajar</p><p class="text-sm text-navy-500 font-medium max-w-xl mx-auto mt-6">Understanding your rhythm helps us tailor the sanctuary to your natural productivity flow.</p></div>
<div class="space-y-4 max-w-xl mx-auto">
<button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-[#E8EDF2] hover:border-brand-300 transition-all duration-300 group"><div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F3F4F6] text-navy-400 group-hover:text-brand-400 group-hover:scale-110 transition-all"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg></div><div class="text-left flex-1"><h3 class="text-lg font-bold text-navy-900">Never</h3><p class="text-[13px] font-medium text-navy-500">Sangat Tidak Setuju / Tidak Pernah</p></div></button>
<button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-brand-500 shadow-[0_4px_20px_rgba(249,115,22,0.15)] transition-all duration-300 group"><div class="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500 text-white shadow-glow group-hover:scale-110 transition-all"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div class="text-left flex-1"><h3 class="text-lg font-bold text-brand-500">Sometimes</h3><p class="text-[13px] font-medium text-brand-400">Netral / Kadang-kadang</p></div><div class="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div></button>
<button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-[#E8EDF2] hover:border-brand-300 transition-all duration-300 group"><div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F3F4F6] text-navy-400 group-hover:text-brand-400 group-hover:scale-110 transition-all"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg></div><div class="text-left flex-1"><h3 class="text-lg font-bold text-navy-900">Often</h3><p class="text-[13px] font-medium text-navy-500">Setuju / Sering</p></div></button>
</div>
<div class="mt-16 flex items-center justify-between max-w-xl mx-auto"><div></div><button class="btn-primary text-white font-bold px-12 py-4 rounded-xl shadow-glow transition-all active:scale-[0.98]">Continue</button></div>
</div>
<div class="w-full lg:w-[320px] space-y-6 relative">
<div class="bg-white rounded-3xl p-8 border border-[#D9E2EC] shadow-lg relative overflow-hidden group"><div class="w-12 h-12 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center mb-6"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div><h3 class="text-xl font-bold text-navy-900 mb-3">Strategic Planning</h3><p class="text-navy-500 text-[14px] leading-relaxed font-medium">Good planning is half the battle won. We learn how you prepare so we can help you build bulletproof study sessions.</p></div>
<div class="rounded-3xl overflow-hidden shadow-lg border border-[#D9E2EC] rotate-1 hover:rotate-0 transition-transform duration-500"><div class="w-full h-[280px] bg-gradient-to-br from-brand-200 via-brand-100 to-navy-100"></div></div>
</div>
</div>
</div>
</section>
''')

# PAGE 07: ONBOARDING RESULT
w('''<!-- PAGE 07: ONBOARDING RESULT -->
<section id="page-onboarding-result" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#059669,#0D9488);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">07 Onboarding Result</div>
<div class="min-h-screen bg-[#FAFAF9] pb-32 pt-16 px-6 relative overflow-hidden">
<div class="max-w-[960px] mx-auto relative z-10">
<div class="text-center mb-14"><div class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest mb-8 border border-emerald-100 shadow-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Assessment Complete</div><h1 class="text-[34px] md:text-[42px] font-bold text-navy-900 leading-tight mb-5">Your Study Profile: <span class="text-brand-500">The Focused Achiever</span></h1><p class="text-navy-500 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">We've analyzed your responses and created a personalized roadmap for your academic success.</p></div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div class="bg-white rounded-3xl p-6 shadow-lg border border-[#D9E2EC] flex flex-col items-center text-center"><div class="relative w-24 h-24 mb-4 flex items-center justify-center"><svg class="w-full h-full transform -rotate-90"><circle cx="48" cy="48" r="40" stroke="#E8EDF2" stroke-width="8" fill="transparent"/><circle cx="48" cy="48" r="40" stroke="#F97316" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="20" stroke-linecap="round"/></svg><span class="absolute text-xl font-bold text-navy-900">92%</span></div><h4 class="text-sm font-bold text-navy-900 mb-1">Deep Work Capacity</h4><p class="text-[11px] text-navy-400 font-medium">Kemampuan fokus mendalam</p></div>
<div class="bg-white rounded-3xl p-6 shadow-lg border border-[#D9E2EC] flex flex-col items-center text-center"><div class="relative w-24 h-24 mb-4 flex items-center justify-center"><svg class="w-full h-full transform -rotate-90"><circle cx="48" cy="48" r="40" stroke="#E8EDF2" stroke-width="8" fill="transparent"/><circle cx="48" cy="48" r="40" stroke="#10B981" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="90" stroke-linecap="round"/></svg><span class="absolute text-xl font-bold text-navy-900">64%</span></div><h4 class="text-sm font-bold text-navy-900 mb-1">Learning Consistency</h4><p class="text-[11px] text-navy-400 font-medium">Kestabilan jadwal belajar</p></div>
<div class="bg-white rounded-3xl p-6 shadow-lg border border-[#D9E2EC] flex flex-col items-center text-center"><div class="relative w-24 h-24 mb-4 flex items-center justify-center"><svg class="w-full h-full transform -rotate-90"><circle cx="48" cy="48" r="40" stroke="#E8EDF2" stroke-width="8" fill="transparent"/><circle cx="48" cy="48" r="40" stroke="#F59E0B" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="30" stroke-linecap="round"/></svg><span class="absolute text-xl font-bold text-navy-900">88%</span></div><h4 class="text-sm font-bold text-navy-900 mb-1">Knowledge Retention</h4><p class="text-[11px] text-navy-400 font-medium">Seberapa lama materi bertahan</p></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
<div class="md:col-span-3 bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC]"><h3 class="text-lg font-bold text-navy-900 mb-6">Core Strengths</h3><div class="space-y-5"><div class="flex items-start gap-4"><div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div><div><h4 class="text-[15px] font-bold text-navy-900 mb-1">Strategic Planning</h4><p class="text-navy-500 font-medium text-[13px] leading-relaxed">You excel at creating structured study plans and setting clear academic goals.</p></div></div></div></div>
<div class="md:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC] text-center flex flex-col items-center justify-center"><div class="w-20 h-20 rounded-full bg-[#E8EDF2] flex items-center justify-center mb-5"><svg class="w-10 h-10 text-navy-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div><h3 class="text-lg font-bold text-navy-900 mb-1">Your Cognitive Style</h3><p class="text-brand-500 font-mono font-bold text-[11px] uppercase tracking-widest">Architectural &amp; Analytical</p></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
<div class="bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC]"><h3 class="text-lg font-bold text-rose-600 mb-6 flex items-center gap-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Key Weaknesses</h3><div class="p-5 bg-rose-50 rounded-2xl border border-rose-100"><h4 class="text-[15px] font-bold text-rose-900 mb-1.5">Reflection Habits</h4><p class="text-[13px] font-medium text-rose-700/80 leading-relaxed">You rarely evaluate your study methods or adjust strategies based on outcomes.</p></div></div>
<div class="bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC]"><h3 class="text-lg font-bold text-sky-600 mb-6 flex items-center gap-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z"/></svg>Recommendations</h3><div class="p-5 bg-sky-50 rounded-2xl border border-sky-100"><h4 class="text-[15px] font-bold text-sky-900 mb-1.5">Weekly Reflection Notes</h4><p class="text-[13px] font-medium text-sky-700/80 leading-relaxed">Use Lumora's Smart Notes to write a brief reflection after each study session.</p></div></div>
</div>
<div class="flex flex-col items-center pt-6 gap-8"><p class="text-navy-400 font-medium italic text-sm">"Small habits are the architecture of great minds." — Lumora AI</p><div class="w-full max-w-[300px]"><a href="#page-dashboard" class="block w-full btn-primary text-white font-bold py-4 rounded-xl text-center shadow-glow transition-all active:scale-[0.98]">Go to Dashboard</a></div></div>
</div>
<div class="fixed bottom-8 right-8 flex items-center gap-3 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg border border-[#D9E2EC] z-50"><div class="relative w-2 h-2"><div class="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-75"></div><div class="relative w-2 h-2 bg-brand-500 rounded-full"></div></div><span class="text-[10px] font-mono font-bold text-navy-500 uppercase tracking-[0.15em]">AI Assistant is active</span></div>
</div>
</section>
''')

print(f"Written pages 2-7. File size: {os.path.getsize(OUT):,} bytes")
