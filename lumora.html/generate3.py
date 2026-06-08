#!/usr/bin/env python3
"""Append pages 12-18 and closing tags to the Lumora HTML file."""
import os

existing = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\lumora-all-pages.html"

def append(content):
    with open(existing, 'a', encoding='utf-8') as f:
        f.write(content)

# PART 12: SETTINGS
part12 = '''
<!-- PAGE 12: SETTINGS -->
<section id="page-settings" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#102A43,#0C1222);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">12 Settings</div>
<div class="h-screen bg-[#FDFDFF] font-sans text-slate-900 flex overflow-hidden">
  <aside class="w-72 bg-[#F8FAFC] border-r border-[#D9E2EC] flex flex-col shrink-0">
    <div class="p-6 pb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-[#D9E2EC] inline-flex"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div></div>
        <div><span class="text-lg font-bold text-brand-500 tracking-tight block">Lumora</span><span class="text-[10px] font-mono text-brand-600 uppercase tracking-widest bg-brand-100 px-2 py-0.5 rounded">Intelligent Sanctuary</span></div>
      </div>
    </div>
    <nav class="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">
      <a href="#page-dashboard" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg><span>Dashboard</span></a>
      <a href="#page-planner" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg><span>Planner</span></a>
      <a href="#page-targets" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span>Weekly Targets</span></a>
      <a href="#page-notes" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg><span>Notes</span></a>
      <a href="#page-progress" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg><span>Progress</span></a>
      <a href="#page-settings" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold bg-brand-500 text-white shadow-lg shadow-brand-900/20"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg><span>Settings</span></a>
    </nav>
    <div class="px-4 pb-6 mt-auto space-y-4">
      <button class="flex items-center gap-3 text-sm font-semibold text-navy-500 hover:text-rose-600 hover:bg-rose-50 transition-all py-2.5 px-3 rounded-xl w-full"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg><span>Logout</span></button>
      <div class="border-t border-[#D9E2EC] pt-4">
        <div class="p-2 rounded-xl flex items-center gap-3 border border-transparent">
          <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-lg relative shrink-0"><div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div></div>
          <div class="min-w-0"><p class="text-[13px] font-black text-navy-900 truncate leading-tight">User</p><p class="text-[10px] font-bold text-navy-400 truncate mt-0.5">Free Plan</p></div>
        </div>
      </div>
    </div>
  </aside>
  <main class="flex-1 flex flex-col relative">
    <header class="h-20 px-10 flex items-center justify-between bg-white z-30 shrink-0 border-b border-[#D9E2EC]">
      <div class="flex-1 flex items-center gap-6"><button class="p-2 -ml-2 rounded-xl text-navy-400 hover:bg-[#F8FAFC] hover:text-navy-900 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg></button></div>
      <div class="flex items-center gap-6"><div class="flex items-center gap-3 cursor-pointer group"><span class="text-xs font-black text-navy-900 group-hover:text-brand-500 transition-colors">User</span><div class="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-sm relative shrink-0"><div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div></div></div></div>
    </header>
    <div class="flex-1 overflow-y-auto bg-[#FDFDFF] p-8 scrollbar-hide">
      <div class="max-w-6xl mx-auto pb-12">
        <div class="mb-10"><h1 class="text-3xl font-black text-navy-900 mb-2 tracking-tight">Settings</h1><p class="text-navy-500 font-medium text-sm">Manage your intelligent workspace and learning preferences.</p></div>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Left: Profile Card -->
          <div class="lg:col-span-4 space-y-6">
            <div class="bg-white rounded-[24px] shadow-sm border border-[#D9E2EC] overflow-hidden relative">
              <div class="p-8 relative z-10 flex flex-col items-center text-center">
                <div class="w-24 h-24 rounded-full overflow-hidden shadow-lg shadow-brand-500/20 p-1 bg-gradient-to-tr from-brand-500 to-emerald-400 mb-4">
                  <div class="w-full h-full rounded-full border-4 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
                </div>
                <h3 class="text-xl font-black text-navy-900">User</h3>
                <p class="text-sm font-medium text-navy-500 mt-1 mb-6">Graduate Student • Cognitive Science</p>
                <div class="w-full pt-6 border-t border-[#D9E2EC] grid grid-cols-2 gap-4">
                  <div class="text-center"><p class="text-2xl font-black text-navy-900">124</p><p class="text-[10px] font-black text-navy-400 uppercase tracking-widest mt-1">Sessions</p></div>
                  <div class="text-center"><p class="text-2xl font-black text-navy-900">92%</p><p class="text-[10px] font-black text-navy-400 uppercase tracking-widest mt-1">Focus Rate</p></div>
                </div>
                <button class="mt-8 w-12 h-12 rounded-full bg-navy-900 text-white flex items-center justify-center hover:bg-brand-500 transition-colors shadow-glow"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
              </div>
              <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl z-0"></div>
            </div>
          </div>
          <!-- Right: Settings -->
          <div class="lg:col-span-8 space-y-6">
            <!-- Theme -->
            <div class="bg-white rounded-[24px] p-8 border border-[#D9E2EC] shadow-sm relative overflow-hidden">
              <div class="flex items-start gap-4 mb-8">
                <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg></div>
                <div><h3 class="text-lg font-black text-navy-900">Theme Preferences</h3><p class="text-sm font-medium text-navy-500 mt-1">Visual appearance of your Intelligent Sanctuary.</p></div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button class="p-1 rounded-[20px] border-2 border-brand-500 shadow-glow">
                  <div class="bg-[#FAFAF9] rounded-[14px] p-4 flex flex-col items-center gap-3 border border-[#D9E2EC]"><div class="w-full h-16 rounded-lg border border-[#D9E2EC] shadow-sm bg-white"></div><span class="text-sm font-bold text-navy-900">Premium Light</span></div>
                </button>
                <button class="p-1 rounded-[20px] border-2 border-transparent hover:border-brand-200">
                  <div class="bg-[#0C1222] rounded-[14px] p-4 flex flex-col items-center gap-3 border border-[#1E293B]"><div class="w-full h-16 bg-[#111827] rounded-lg border border-[#1E293B] shadow-sm"></div><span class="text-sm font-bold text-white">Premium Dark</span></div>
                </button>
              </div>
            </div>
            <!-- Google Integration -->
            <div class="bg-white rounded-[24px] p-8 border border-[#D9E2EC] shadow-sm relative overflow-hidden mt-6">
              <div class="flex items-start gap-4 mb-8">
                <div class="w-12 h-12 rounded-xl bg-white border border-[#D9E2EC] flex items-center justify-center flex-shrink-0 shadow-sm"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg></div>
                <div><h3 class="text-lg font-black text-navy-900">Google Integrations</h3><p class="text-sm font-medium text-navy-500 mt-1">Connect Lumora with your Google ecosystem.</p></div>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between p-5 bg-[#FAFAF9] rounded-[16px] border border-[#D9E2EC]">
                  <div><h4 class="text-sm font-bold text-navy-900">Google Calendar</h4><p class="text-xs font-medium text-navy-500 mt-1">Sync your Lumora study sessions with Google Calendar.</p></div>
                  <div class="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-200">Connected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</section>
'''
append(part12)
print(f"Part 12 (Settings): {len(part12)} chars")

# PART 13: RECOMMENDATION DETAIL
part13 = '''
<!-- PAGE 13: RECOMMENDATION DETAIL -->
<section id="page-recommendation-detail" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#102A43,#0C1222);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">13 Recommendation Detail</div>
<div class="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 flex flex-col items-center justify-center p-6">
  <div class="max-w-2xl text-center">
    <div class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">💡</div>
    <h1 class="text-4xl font-black text-navy-900 mb-4">Recommendation Detail</h1>
    <p class="text-navy-500 text-lg mb-10 leading-relaxed">Deep dive into specific action plans tailored to your study profile. This detailed view is coming in the next sprint.</p>
    <div class="bg-white border border-[#D9E2EC] shadow-xl p-8 rounded-[32px] mb-8"><h3 class="text-xl font-bold text-navy-400">Recommendation ID: rec_001</h3></div>
    <a href="#page-dashboard" class="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all active:scale-[0.98]">← Back to Dashboard</a>
  </div>
</div>
</section>
'''
append(part13)
print(f"Part 13: {len(part13)} chars")

# PART 14: PROGRESS COMPARE
part14 = '''
<!-- PAGE 14: PROGRESS COMPARE -->
<section id="page-progress-compare" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#102A43,#0C1222);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">14 Progress Compare</div>
<div class="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 flex flex-col items-center justify-center p-6">
  <div class="max-w-2xl text-center">
    <div class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">📈</div>
    <h1 class="text-4xl font-black text-navy-900 mb-4">Progress Compare</h1>
    <p class="text-navy-500 text-lg mb-10 leading-relaxed">This module tracks your historical performance across different learning dimensions. Feature in development for Sprint 3.</p>
    <div class="bg-white border border-[#D9E2EC] shadow-xl p-8 rounded-[32px] mb-8"><h3 class="text-xl font-bold text-navy-400">Coming Soon: Historical Tracking Charts</h3></div>
    <a href="#page-dashboard" class="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all active:scale-[0.98]">← Back to Dashboard</a>
  </div>
</div>
</section>
'''
append(part14)
print(f"Part 14: {len(part14)} chars")

# PART 15: RESET PASSWORD
part15 = '''
<!-- PAGE 15: RESET PASSWORD -->
<section id="page-reset-password" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">15 Reset Password</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden">
  <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>
  <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
    <div class="text-center mb-10">
      <div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div>
      <p class="text-navy-500 font-medium">Set your new password</p>
    </div>
    <div class="w-full bg-white rounded-3xl p-10 shadow-xl border border-[#D9E2EC]">
      <form class="space-y-6">
        <div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email</label><input type="email" value="student@lumora.edu" readonly class="w-full bg-[#FAFAF9] border border-[#E8EDF2] rounded-xl py-3 px-4 text-navy-700 font-medium outline-none"></div>
        <div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">New Password</label><input type="password" placeholder="Enter new password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 px-4 text-navy-700 font-medium transition-all duration-300 outline-none"></div>
        <div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Confirm Password</label><input type="password" placeholder="Confirm new password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 px-4 text-navy-700 font-medium transition-all duration-300 outline-none"></div>
        <button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300">Reset Password</button>
      </form>
    </div>
  </div>
</div>
</section>
'''
append(part15)
print(f"Part 15: {len(part15)} chars")

# PART 16: CONFIRM PASSWORD
part16 = '''
<!-- PAGE 16: CONFIRM PASSWORD -->
<section id="page-confirm-password" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">16 Confirm Password</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden">
  <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
    <div class="text-center mb-10">
      <div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div>
      <p class="text-navy-500 font-medium">Confirm your password to continue</p>
    </div>
    <div class="w-full bg-white rounded-3xl p-10 shadow-xl border border-[#D9E2EC]">
      <p class="text-sm text-navy-500 mb-6">This is a secure area of the application. Please confirm your password before continuing.</p>
      <form class="space-y-6">
        <div class="space-y-2"><label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Password</label><input type="password" placeholder="Enter your password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 px-4 text-navy-700 font-medium transition-all duration-300 outline-none"></div>
        <button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300">Confirm</button>
      </form>
    </div>
  </div>
</div>
</section>
'''
append(part16)
print(f"Part 16: {len(part16)} chars")

# PART 17: VERIFY EMAIL
part17 = '''
<!-- PAGE 17: VERIFY EMAIL -->
<section id="page-verify-email" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">17 Verify Email</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden">
  <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
    <div class="text-center mb-10">
      <div class="flex items-center justify-center gap-3 mb-4"><div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div><span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span></div>
      <p class="text-navy-500 font-medium">Verify your email address</p>
    </div>
    <div class="w-full bg-white rounded-3xl p-10 shadow-xl border border-[#D9E2EC]">
      <p class="text-sm text-navy-500 mb-6">Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.</p>
      <div class="flex items-center justify-between gap-4">
        <button class="flex-1 btn-primary text-white font-bold py-3 rounded-xl shadow-glow transition-all">Resend Verification Email</button>
        <a href="#page-dashboard" class="px-6 py-3 rounded-xl font-bold text-navy-500 hover:text-navy-900 border border-[#D9E2EC] hover:border-navy-300 transition-all">Log Out</a>
      </div>
    </div>
  </div>
</div>
</section>
'''
append(part17)
print(f"Part 17: {len(part17)} chars")

# PART 18: PROFILE EDIT
part18 = '''
<!-- PAGE 18: PROFILE EDIT -->
<section id="page-profile-edit" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#102A43,#0C1222);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">18 Profile Edit</div>
<div class="h-screen bg-[#FDFDFF] font-sans text-slate-900 flex overflow-hidden">
  <aside class="w-72 bg-[#F8FAFC] border-r border-[#D9E2EC] flex flex-col shrink-0">
    <div class="p-6 pb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-[#D9E2EC] inline-flex"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div></div>
        <div><span class="text-lg font-bold text-brand-500 tracking-tight block">Lumora</span><span class="text-[10px] font-mono text-brand-600 uppercase tracking-widest bg-brand-100 px-2 py-0.5 rounded">Intelligent Sanctuary</span></div>
      </div>
    </div>
    <nav class="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">
      <a href="#page-dashboard" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg><span>Dashboard</span></a>
      <a href="#page-settings" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg><span>Settings</span></a>
    </nav>
    <div class="px-4 pb-6 mt-auto space-y-4">
      <button class="flex items-center gap-3 text-sm font-semibold text-navy-500 hover:text-rose-600 hover:bg-rose-50 transition-all py-2.5 px-3 rounded-xl w-full"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg><span>Logout</span></button>
      <div class="border-t border-[#D9E2EC] pt-4">
        <div class="p-2 rounded-xl flex items-center gap-3 border border-transparent">
          <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-lg relative shrink-0"><div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div></div>
          <div class="min-w-0"><p class="text-[13px] font-black text-navy-900 truncate leading-tight">User</p><p class="text-[10px] font-bold text-navy-400 truncate mt-0.5">Free Plan</p></div>
        </div>
      </div>
    </div>
  </aside>
  <main class="flex-1 flex flex-col relative">
    <header class="h-20 px-10 flex items-center justify-between bg-white z-30 shrink-0 border-b border-[#D9E2EC]">
      <div class="flex-1 flex items-center gap-6"><button class="p-2 -ml-2 rounded-xl text-navy-400 hover:bg-[#F8FAFC] hover:text-navy-900 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg></button></div>
      <div class="flex items-center gap-6"><div class="flex items-center gap-3 cursor-pointer group"><span class="text-xs font-black text-navy-900 group-hover:text-brand-500 transition-colors">User</span><div class="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-sm relative shrink-0"><div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div></div></div></div>
    </header>
    <div class="flex-1 overflow-y-auto bg-[#FDFDFF] p-8 scrollbar-hide">
      <div class="max-w-4xl mx-auto space-y-8">
        <div><h1 class="text-2xl font-black text-navy-900 mb-1">Profile Settings</h1><p class="text-navy-500 text-sm">Update your profile information and account settings.</p></div>
        <!-- Update Profile Information -->
        <div class="bg-white p-8 rounded-[24px] border border-[#D9E2EC] shadow-sm">
          <h2 class="text-lg font-black text-navy-900 mb-6">Profile Information</h2>
          <form class="space-y-5">
            <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Name</label><input type="text" value="User" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-3 px-4 text-sm font-bold text-navy-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"></div>
            <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Email</label><input type="email" value="user@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-3 px-4 text-sm font-bold text-navy-900 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all"></div>
            <button type="submit" class="btn-primary text-white font-bold px-6 py-3 rounded-xl shadow-glow transition-all">Save</button>
          </form>
        </div>
        <!-- Update Password -->
        <div class="bg-white p-8 rounded-[24px] border border-[#D9E2EC] shadow-sm">
          <h2 class="text-lg font-black text-navy-900 mb-6">Update Password</h2>
          <form class="space-y-5">
            <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Current Password</label><input type="password" placeholder="Enter current password" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-3 px-4 text-sm font-bold text-navy-900 focus:border-brand-500 outline-none"></div>
            <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">New Password</label><input type="password" placeholder="Enter new password" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-3 px-4 text-sm font-bold text-navy-900 focus:border-brand-500 outline-none"></div>
            <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Confirm Password</label><input type="password" placeholder="Confirm new password" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-3 px-4 text-sm font-bold text-navy-900 focus:border-brand-500 outline-none"></div>
            <button type="submit" class="btn-primary text-white font-bold px-6 py-3 rounded-xl shadow-glow transition-all">Update Password</button>
          </form>
        </div>
        <!-- Delete Account -->
        <div class="bg-white p-8 rounded-[24px] border border-rose-200 shadow-sm">
          <h2 class="text-lg font-black text-rose-600 mb-6">Delete Account</h2>
          <p class="text-sm text-navy-500 mb-6">Once your account is deleted, all of its resources and data will be permanently deleted.</p>
          <button class="bg-rose-500 hover:bg-rose-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all">Delete Account</button>
        </div>
      </div>
    </div>
  </main>
</div>
</section>
'''
append(part18)
print(f"Part 18 (Profile Edit): {len(part18)} chars")

# CLOSING TAGS
closing = '''
</div><!-- end #app -->
</body>
</html>
'''
append(closing)
print(f"Closing tags appended")

# Check file size
size = os.path.getsize(existing)
print(f"\nTotal file size: {size:,} bytes ({size/1024:.1f} KB)")
