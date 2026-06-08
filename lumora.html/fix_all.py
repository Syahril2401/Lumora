#!/usr/bin/env python3
"""Fix Lumora HTML: add missing modals, fix planner, notes, settings, dashboard."""
import os, re

output_path = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html\lumora-all-pages.html"

with open(output_path, 'r', encoding='utf-8') as f:
    content = f.read()

close_marker = '</div><!-- end #app -->'
close_pos = content.rfind(close_marker)

# ============================================================================
# 1. ADD ALL MISSING MODALS
# ============================================================================
modals_html = '''
<!-- MODALS -->
<div id="modal-delete-note" class="fixed inset-0 z-[100] flex items-center justify-center p-4" style="display:none;">
  <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-sm" onclick="document.getElementById('modal-delete-note').style.display='none'"></div>
  <div class="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden animate-slide-up relative z-10">
    <div class="p-6">
      <div class="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-4 mx-auto"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></div>
      <h3 class="text-xl font-black text-center text-navy-900 mb-2">Delete Note?</h3>
      <p class="text-navy-500 text-sm text-center mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
      <div class="flex gap-3">
        <button onclick="document.getElementById('modal-delete-note').style.display='none'" class="flex-1 py-2.5 px-4 rounded-xl font-bold text-navy-700 bg-[#E8EDF2] hover:bg-[#D9E2EC] transition-colors">Cancel</button>
        <button class="flex-1 py-2.5 px-4 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-200 transition-colors">Delete</button>
      </div>
    </div>
  </div>
</div>
<div id="modal-new-event" class="fixed inset-0 z-[100] flex items-center justify-center p-4" style="display:none;">
  <div class="absolute inset-0 bg-[#0B1120]/60 backdrop-blur-sm" onclick="document.getElementById('modal-new-event').style.display='none'"></div>
  <div class="bg-white rounded-[24px] p-8 w-full max-w-lg shadow-2xl border border-[#D9E2EC] animate-slide-up relative z-10">
    <div class="flex items-center justify-between mb-6"><h2 class="text-xl font-black text-navy-900 tracking-tight">New Event</h2><button onclick="document.getElementById('modal-new-event').style.display='none'" class="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAFAF9] text-navy-400 hover:bg-[#E8EDF2] transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></div>
    <form class="space-y-5">
      <div><label class="block text-[10px] font-black text-navy-400 uppercase tracking-widest mb-2">Title *</label><input class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-2.5 px-4 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-sm" placeholder="e.g. Market Equilibrium Analysis"></div>
      <div><label class="block text-[10px] font-black text-navy-400 uppercase tracking-widest mb-2">Description</label><textarea rows="2" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-2.5 px-4 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all shadow-sm resize-none" placeholder="Summary of supply and demand curves..."></textarea></div>
      <div class="grid grid-cols-3 gap-4">
        <div><label class="block text-[10px] font-black text-navy-400 uppercase tracking-widest mb-2">Date *</label><div class="relative"><input type="text" value="06/06/2026" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-2.5 px-3 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 shadow-sm outline-none transition-all"><svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div></div>
        <div><label class="block text-[10px] font-black text-navy-400 uppercase tracking-widest mb-2">Start *</label><div class="relative"><input type="text" value="07:00 PM" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-2.5 px-3 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 shadow-sm outline-none transition-all"><svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div></div>
        <div><label class="block text-[10px] font-black text-navy-400 uppercase tracking-widest mb-2">End *</label><div class="relative"><input type="text" value="08:00 PM" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-2.5 px-3 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 shadow-sm outline-none transition-all"><svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div></div>
      </div>
      <button type="submit" class="w-full btn-primary text-white py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 mt-4">Create Event</button>
    </form>
  </div>
</div>
<div id="modal-add-target" class="fixed inset-0 z-[100] flex items-center justify-center p-4" style="display:none;">
  <div class="absolute inset-0 bg-[#0B1120]/60 backdrop-blur-sm" onclick="document.getElementById('modal-add-target').style.display='none'"></div>
  <div class="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up border border-[#D9E2EC] relative z-10">
    <h2 class="text-xl font-black text-navy-900 mb-6">Add Weekly Target</h2>
    <form class="space-y-5">
      <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Title *</label><input class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all" placeholder="e.g. Complete Chapter 5"></div>
      <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Description</label><textarea rows="2" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none resize-none transition-all"></textarea></div>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Focus Dimension</label><select class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 outline-none appearance-none"><option>General</option><option>Planning</option><option>Time Management</option><option>Cognitive Strategy</option><option>Reflection</option></select></div>
        <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Priority</label><select class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 outline-none appearance-none"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select></div>
      </div>
      <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Due Date</label><input type="text" placeholder="mm/dd/yyyy" class="w-full bg-[#FAFAF9] border border-[#D9E2EC] rounded-2xl py-3 px-5 text-sm font-bold text-navy-900 focus:bg-white focus:border-brand-500 outline-none transition-all"></div>
      <div><label class="block text-[11px] font-black text-navy-400 uppercase tracking-widest mb-2">Initial Subtasks</label><div class="flex items-center gap-2 mb-2"><input class="flex-1 bg-[#FAFAF9] border border-[#D9E2EC] rounded-xl py-2 px-4 text-sm font-bold text-navy-900 focus:border-brand-500 outline-none" placeholder="Subtask 1"><button type="button" class="text-navy-400 hover:text-rose-500 font-bold">&times;</button></div><button type="button" class="text-sm text-brand-500 font-bold hover:underline">+ Add subtask</button></div>
      <div class="flex gap-3 pt-4"><button type="button" onclick="document.getElementById('modal-add-target').style.display='none'" class="flex-1 bg-[#E8EDF2] text-navy-600 py-3 rounded-2xl font-bold hover:bg-[#D9E2EC] transition-colors">Cancel</button><button type="submit" class="flex-1 btn-primary text-white py-3 rounded-2xl font-bold transition-all">Create</button></div>
    </form>
  </div>
</div>
<div id="modal-disconnect-calendar" class="fixed inset-0 z-[100] flex items-center justify-center p-4" style="display:none;">
  <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" onclick="document.getElementById('modal-disconnect-calendar').style.display='none'"></div>
  <div class="bg-white border border-[#D9E2EC] rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl animate-scale-up text-center">
    <div class="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-100"><svg class="w-10 h-10 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"/></svg></div>
    <h3 class="text-2xl font-black text-navy-900 mb-3">Disconnect Calendar?</h3>
    <p class="text-navy-500 text-sm font-medium mb-8 leading-relaxed">Your future study sessions will no longer automatically sync to your Google Calendar.</p>
    <div class="flex items-center gap-4"><button onclick="document.getElementById('modal-disconnect-calendar').style.display='none'" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-navy-500 hover:text-navy-900 hover:bg-[#E8EDF2] transition-all border border-transparent">Cancel</button><button class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20">Yes, Disconnect</button></div>
  </div>
</div>
<div id="modal-logout" class="fixed inset-0 z-[100] flex items-center justify-center p-4" style="display:none;">
  <div class="absolute inset-0 bg-[#0B1120]/60 backdrop-blur-sm" onclick="document.getElementById('modal-logout').style.display='none'"></div>
  <div class="bg-white border border-[#D9E2EC] rounded-[32px] p-8 w-full max-w-md relative z-10 shadow-2xl animate-scale-up text-center">
    <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-100"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg></div>
    <h3 class="text-2xl font-black text-navy-900 mb-3">Log Out</h3>
    <p class="text-navy-500 text-sm font-medium mb-8 leading-relaxed">Are you sure you want to log out? You'll need to sign in again to access your workspace.</p>
    <div class="flex items-center gap-4"><button onclick="document.getElementById('modal-logout').style.display='none'" class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-navy-500 hover:text-navy-900 hover:bg-[#E8EDF2] transition-all border border-transparent">Cancel</button><button class="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all shadow-md shadow-rose-500/20">Yes, Log Out</button></div>
  </div>
</div>
<div id="modal-search" class="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 sm:px-0" style="display:none;">
  <div class="absolute inset-0 bg-[#0B1120]/50 backdrop-blur-sm" onclick="document.getElementById('modal-search').style.display='none'"></div>
  <div class="bg-white rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden border border-[#D9E2EC] animate-slide-down">
    <div class="flex items-center gap-4 px-6 py-5 border-b border-[#D9E2EC]">
      <svg class="w-5 h-5 text-navy-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      <input type="text" placeholder="Search notes, sessions, or targets..." autofocus class="flex-1 bg-transparent border-none text-navy-900 text-lg font-medium outline-none placeholder-navy-300 focus:ring-0">
      <button onclick="document.getElementById('modal-search').style.display='none'" class="px-2 py-1 rounded-md bg-[#F3F4F6] border border-[#D9E2EC] text-[10px] font-bold text-navy-400 tracking-widest shrink-0 hover:bg-[#E8EDF2] transition-colors cursor-pointer">ESC</button>
    </div>
    <div class="p-6">
      <p class="text-[10px] font-bold text-navy-400 tracking-widest uppercase mb-4">Quick Actions</p>
      <div class="grid grid-cols-3 gap-4">
        <button class="flex flex-col items-center justify-center p-5 rounded-xl bg-[#F8FAFC] hover:bg-[#E8EDF2] border border-transparent hover:border-[#D9E2EC] transition-all hover:-translate-y-0.5 group"><div class="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 mb-3 group-hover:scale-110 transition-transform shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div><span class="text-xs font-black text-navy-900">New Note</span></button>
        <button class="flex flex-col items-center justify-center p-5 rounded-xl bg-[#F8FAFC] hover:bg-[#E8EDF2] border border-transparent hover:border-[#D9E2EC] transition-all hover:-translate-y-0.5 group"><div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 mb-3 group-hover:scale-110 transition-transform shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div><span class="text-xs font-black text-navy-900">New Plan</span></button>
        <button class="flex flex-col items-center justify-center p-5 rounded-xl bg-[#F8FAFC] hover:bg-[#E8EDF2] border border-transparent hover:border-[#D9E2EC] transition-all hover:-translate-y-0.5 group"><div class="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-3 group-hover:scale-110 transition-transform shadow-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z"/></svg></div><span class="text-xs font-black text-navy-900">Ask AI</span></button>
      </div>
    </div>
  </div>
</div>
<div id="toast-event-created" class="fixed bottom-6 right-6 z-[150] bg-navy-900 text-white border border-navy-800 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-slide-up" style="display:none;"><div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm font-bold">Event created!</span></div>
<div id="toast-target-created" class="fixed bottom-6 right-6 z-[150] bg-navy-900 text-white border border-navy-800 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-slide-up" style="display:none;"><div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm font-bold">Target created!</span></div>
<div id="toast-note-deleted" class="fixed bottom-6 right-6 z-[150] bg-navy-900 text-white border border-navy-800 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-slide-up" style="display:none;"><div class="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div><span class="text-sm font-bold">Note deleted!</span></div>
'''

content = content[:close_pos] + modals_html + content[close_pos:]
print(f"Added modals: {len(modals_html)} chars")

# ============================================================================
# 2. FIX PLANNER - Replace with proper Daily/Weekly/Monthly views
# ============================================================================
planner_start = content.find('<section id="page-planner"')
next_after_planner = content.find('<section id="page-', planner_start + 1)
if next_after_planner > 0:
    planner_end = content.rfind('</section>', 0, next_after_planner)
else:
    planner_end = content.rfind('</section>', planner_start)
planner_end += len('</section>')

old_planner_len = planner_end - planner_start
print(f"Old planner: {old_planner_len} chars")

# Read the new planner from the generate2.py output (it was already appended)
# Actually the planner was already replaced earlier. Let me check if it has the views
planner_content = content[planner_start:planner_end]
has_daily = 'planner-view-daily' in planner_content
has_weekly = 'planner-view-weekly' in planner_content
has_monthly = 'planner-view-monthly' in planner_content
print(f"Planner has daily: {has_daily}, weekly: {has_weekly}, monthly: {has_monthly}")

# The planner was already replaced with the new version earlier in this session
# So it should have all three views now

# ============================================================================
# 3. FIX NOTES - Add export button and delete modal trigger
# ============================================================================
notes_start = content.find('<section id="page-notes"')
next_after_notes = content.find('<section id="page-', notes_start + 1)
if next_after_notes > 0:
    notes_end = content.rfind('</section>', 0, next_after_notes)
else:
    notes_end = content.rfind('</section>', notes_start)
notes_end += len('</section>')

old_notes = content[notes_start:notes_end]

# Add export button
if 'Export Notes' not in old_notes:
    export_btn = '<button class="bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-glow"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>Export Notes</button>'
    # Find a good place to insert - after the search bar
    search_end = old_notes.find('</div>', old_notes.find('Search notes...'))
    if search_end > 0:
        old_notes = old_notes[:search_end+6] + export_btn + old_notes[search_end+6:]
        print("Added export button")

# Add delete modal trigger
if 'modal-delete-note' not in old_notes:
    # Find note cards and add delete buttons
    old_notes = old_notes.replace(
        '<h3 class="text-sm font-black text-navy-900 leading-snug">Weekly Study Targets</h3>',
        '<div class="flex items-center justify-between"><h3 class="text-sm font-black text-navy-900 leading-snug">Weekly Study Targets</h3><button onclick="document.getElementById(\'modal-delete-note\').style.display=\'flex\'" class="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button></div>'
    )
    print("Added delete button to note card")

content = content[:notes_start] + old_notes + content[notes_end:]
print(f"Updated notes section")

# ============================================================================
# 4. FIX SETTINGS - Add disconnect modal trigger
# ============================================================================
settings_start = content.find('<section id="page-settings"')
next_after_settings = content.find('<section id="page-', settings_start + 1)
if next_after_settings > 0:
    settings_end = content.rfind('</section>', 0, next_after_settings)
else:
    settings_end = content.rfind('</section>', settings_start)
settings_end += len('</section>')

old_settings = content[settings_start:settings_end]
if 'modal-disconnect-calendar' not in old_settings:
    old_settings = old_settings.replace(
        '<div class="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-200">Connected</div>',
        '<button onclick="document.getElementById(\'modal-disconnect-calendar\').style.display=\'flex\'" class="px-4 py-2 bg-rose-50 text-rose-500 rounded-lg text-xs font-bold border border-rose-200 cursor-pointer hover:bg-rose-100 transition-colors">Disconnect</button>'
    )
    print("Added disconnect button")
content = content[:settings_start] + old_settings + content[settings_end:]

# ============================================================================
# 5. FIX DASHBOARD - Add search bar, update username
# ============================================================================
dashboard_start = content.find('<section id="page-dashboard"')
next_after_dashboard = content.find('<section id="page-', dashboard_start + 1)
if next_after_dashboard > 0:
    dashboard_end = content.rfind('</section>', 0, next_after_dashboard)
else:
    dashboard_end = content.rfind('</section>', dashboard_start)
dashboard_end += len('</section>')

old_dashboard = content[dashboard_start:dashboard_end]

# Add search bar
if 'Search sessions, notes, or targets' not in old_dashboard:
    search_bar = '<button onclick="document.getElementById(\'modal-search\').style.display=\'flex\'" class="hidden sm:flex items-center gap-3 bg-[#F8FAFC] hover:bg-[#E8EDF2] transition-colors border border-transparent text-navy-400 px-4 py-2.5 rounded-full w-[280px] lg:w-[400px] text-sm font-medium group"><svg class="w-4 h-4 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><span class="flex-1 text-left">Search sessions, notes, or targets...</span></button>'
    # Insert after hamburger button
    hamburger_end = old_dashboard.find('</svg>', old_dashboard.find('M4 6h16'))
    if hamburger_end > 0:
        btn_end = old_dashboard.find('</button>', hamburger_end)
        if btn_end > 0:
            old_dashboard = old_dashboard[:btn_end+9] + search_bar + old_dashboard[btn_end+9:]
            print("Added search bar to dashboard")

# Update username
old_dashboard = old_dashboard.replace('>User<', '>pamungkas<')
old_dashboard = old_dashboard.replace('>User</h3>', '>pamungkas</h3>')

content = content[:dashboard_start] + old_dashboard + content[dashboard_end:]

# ============================================================================
# WRITE FILE
# ============================================================================
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

size = os.path.getsize(output_path)
print(f"\n=== DONE ===")
print(f"File size: {size:,} bytes ({size/1024:.1f} KB)")

# Verify
with open(output_path, 'r', encoding='utf-8') as f:
    c = f.read()

ids = re.findall(r'<section id="(page-[^"]+)"', c)
print(f"Page sections: {len(ids)}")

checks = {
    "Delete Note modal": "modal-delete-note" in c,
    "New Event modal": "modal-new-event" in c,
    "Add Target modal": "modal-add-target" in c,
    "Disconnect Calendar modal": "modal-disconnect-calendar" in c,
    "Logout modal": "modal-logout" in c,
    "Search modal": "modal-search" in c,
    "Export Notes button": "Export Notes" in c,
    "Search bar": "Search sessions" in c,
    "Username pamungkas": "pamungkas" in c,
    "Planner Daily view": "planner-view-daily" in c,
    "Planner Weekly view": "planner-view-weekly" in c,
    "Planner Monthly view": "planner-view-monthly" in c,
    "No events planned": "No events planned" in c,
    "Event created toast": "toast-event-created" in c,
}
for name, ok in checks.items():
    print(f"  {'OK' if ok else 'MISSING'}: {name}")
