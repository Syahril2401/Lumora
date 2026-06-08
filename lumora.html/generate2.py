#!/usr/bin/env python3
"""Append remaining Lumora pages (6-18) to the HTML file."""
import os

output_dir = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html"
existing = os.path.join(output_dir, "lumora-all-pages.html")

def append(content):
    with open(existing, 'a', encoding='utf-8') as f:
        f.write(content)

# ============================================================================
# PART 6: ONBOARDING QUESTIONNAIRE
# ============================================================================
part6 = '''
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- PAGE 06: ONBOARDING QUESTIONNAIRE -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<section id="page-onboarding-questionnaire" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#059669,#0D9488);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">06 Onboarding Questionnaire</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] pb-20 relative overflow-hidden">
  <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px] pointer-events-none"></div>
  <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 rounded-full blur-[100px] pointer-events-none"></div>

  <!-- Navbar -->
  <nav class="fixed top-0 inset-x-0 z-50 glass bg-white/85 border-b border-[#D9E2EC] h-16 flex items-center justify-between px-8">
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div>
      <span class="text-xl font-bold tracking-tight text-brand-500">Lumora</span>
    </div>
    <button class="text-sm font-bold text-navy-500 hover:text-navy-900 transition-colors">Save &amp; Exit</button>
  </nav>

  <div class="max-w-[1200px] mx-auto pt-32 px-6 flex flex-col lg:flex-row gap-12 relative z-10">
    <div class="flex-1">
      <!-- Progress Stepper -->
      <div class="mb-16">
        <p class="text-[11px] font-mono text-navy-400 uppercase tracking-widest mb-2">Progress</p>
        <h2 class="text-lg font-bold text-brand-500 mb-8">Step 01: Planning Habits</h2>
        <div class="relative">
          <div class="absolute top-1/2 left-0 w-full h-[2px] bg-[#E8EDF2] -translate-y-1/2"></div>
          <div class="absolute top-1/2 left-0 h-[2px] bg-brand-500 -translate-y-1/2 shadow-[0_0_10px_rgba(249,115,22,0.5)]" style="width:0%"></div>
          <div class="relative flex justify-between">
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full border-2 bg-brand-500 border-brand-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] z-10"></div>
              <span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-brand-500 font-bold">Planning</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full border-2 bg-white border-[#D9E2EC] z-10"></div>
              <span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-navy-400">Time Mgmt</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full border-2 bg-white border-[#D9E2EC] z-10"></div>
              <span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-navy-400">Cognitive</span>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full border-2 bg-white border-[#D9E2EC] z-10"></div>
              <span class="absolute mt-6 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap text-navy-400">Reflection</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Question -->
      <div class="text-center mb-12">
        <h1 class="text-[26px] md:text-[30px] font-bold text-navy-900 leading-tight mb-2 px-4">I make a study schedule before starting to study</h1>
        <p class="text-lg text-brand-500 font-medium mb-4 px-4">Saya membuat jadwal belajar sebelum mulai belajar</p>
        <p class="text-sm text-navy-500 font-medium max-w-xl mx-auto mt-6">Understanding your rhythm helps us tailor the sanctuary to your natural productivity flow.</p>
      </div>

      <!-- Options -->
      <div class="space-y-4 max-w-xl mx-auto">
        <button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-[#E8EDF2] hover:border-brand-300 transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F3F4F6] text-navy-400 group-hover:text-brand-400 group-hover:scale-110 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
          </div>
          <div class="text-left flex-1">
            <h3 class="text-lg font-bold text-navy-900">Never</h3>
            <p class="text-[13px] font-medium text-navy-500">Sangat Tidak Setuju / Tidak Pernah</p>
          </div>
        </button>
        <button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-[#E8EDF2] hover:border-brand-300 transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F3F4F6] text-navy-400 group-hover:text-brand-400 group-hover:scale-110 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
          <div class="text-left flex-1">
            <h3 class="text-lg font-bold text-navy-900">Rarely</h3>
            <p class="text-[13px] font-medium text-navy-500">Tidak Setuju / Jarang</p>
          </div>
        </button>
        <button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-brand-500 shadow-[0_4px_20px_rgba(249,115,22,0.15)] transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500 text-white shadow-glow group-hover:scale-110 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div class="text-left flex-1">
            <h3 class="text-lg font-bold text-brand-500">Sometimes</h3>
            <p class="text-[13px] font-medium text-brand-400">Netral / Kadang-kadang</p>
          </div>
          <div class="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>
        </button>
        <button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-[#E8EDF2] hover:border-brand-300 transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F3F4F6] text-navy-400 group-hover:text-brand-400 group-hover:scale-110 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
          </div>
          <div class="text-left flex-1">
            <h3 class="text-lg font-bold text-navy-900">Often</h3>
            <p class="text-[13px] font-medium text-navy-500">Setuju / Sering</p>
          </div>
        </button>
        <button class="w-full flex items-center gap-6 p-5 rounded-2xl bg-white border-2 border-[#E8EDF2] hover:border-brand-300 transition-all duration-300 group">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F3F4F6] text-navy-400 group-hover:text-brand-400 group-hover:scale-110 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"/></svg>
          </div>
          <div class="text-left flex-1">
            <h3 class="text-lg font-bold text-navy-900">Always</h3>
            <p class="text-[13px] font-medium text-navy-500">Sangat Setuju / Selalu</p>
          </div>
        </button>
      </div>

      <!-- Navigation -->
      <div class="mt-16 flex items-center justify-between max-w-xl mx-auto">
        <div></div>
        <button class="btn-primary text-white font-bold px-12 py-4 rounded-xl shadow-glow transition-all active:scale-[0.98]">Continue</button>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="w-full lg:w-[320px] space-y-6 relative">
      <div class="bg-white rounded-3xl p-8 border border-[#D9E2EC] shadow-lg relative overflow-hidden group">
        <div class="w-12 h-12 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center mb-6">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        </div>
        <h3 class="text-xl font-bold text-navy-900 mb-3">Strategic Planning</h3>
        <p class="text-navy-500 text-[14px] leading-relaxed font-medium">Good planning is half the battle won. We learn how you prepare so we can help you build bulletproof study sessions.</p>
        <div class="absolute top-[-20px] right-[-20px] w-24 h-24 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-colors pointer-events-none"></div>
      </div>
      <div class="rounded-3xl overflow-hidden shadow-lg border border-[#D9E2EC] rotate-1 hover:rotate-0 transition-transform duration-500">
        <div class="w-full h-[280px] bg-gradient-to-br from-brand-200 via-brand-100 to-navy-100"></div>
      </div>
    </div>
  </div>
</div>
</section>
'''
append(part6)
print(f"Part 6 (Questionnaire): {len(part6)} chars")

# ============================================================================
# PART 7: ONBOARDING RESULT
# ============================================================================
part7 = '''
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- PAGE 07: ONBOARDING RESULT -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<section id="page-onboarding-result" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#059669,#0D9488);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">07 Onboarding Result</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] pb-32 pt-16 px-6 relative overflow-hidden">
  <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px] pointer-events-none"></div>
  <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 rounded-full blur-[100px] pointer-events-none"></div>

  <div class="max-w-[960px] mx-auto relative z-10">
    <!-- Hero -->
    <div class="text-center mb-14">
      <div class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest mb-8 border border-emerald-100 shadow-sm">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Assessment Complete
      </div>
      <h1 class="text-[34px] md:text-[42px] font-bold text-navy-900 leading-tight mb-5">Your Study Profile: <span class="text-brand-500">The Focused Achiever</span></h1>
      <p class="text-navy-500 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed">We've analyzed your responses and created a personalized roadmap for your academic success.</p>
    </div>

    <!-- Analytics Highlights -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-3xl p-6 shadow-lg border border-[#D9E2EC] flex flex-col items-center text-center">
        <div class="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90"><circle cx="48" cy="48" r="40" stroke="#E8EDF2" stroke-width="8" fill="transparent"/><circle cx="48" cy="48" r="40" stroke="#F97316" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="20" stroke-linecap="round"/></svg>
          <span class="absolute text-xl font-bold text-navy-900">92%</span>
        </div>
        <h4 class="text-sm font-bold text-navy-900 mb-1">Deep Work Capacity</h4>
        <p class="text-[11px] text-navy-400 font-medium">Kemampuan fokus mendalam</p>
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-lg border border-[#D9E2EC] flex flex-col items-center text-center">
        <div class="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90"><circle cx="48" cy="48" r="40" stroke="#E8EDF2" stroke-width="8" fill="transparent"/><circle cx="48" cy="48" r="40" stroke="#10B981" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="90" stroke-linecap="round"/></svg>
          <span class="absolute text-xl font-bold text-navy-900">64%</span>
        </div>
        <h4 class="text-sm font-bold text-navy-900 mb-1">Learning Consistency</h4>
        <p class="text-[11px] text-navy-400 font-medium">Kestabilan jadwal belajar</p>
      </div>
      <div class="bg-white rounded-3xl p-6 shadow-lg border border-[#D9E2EC] flex flex-col items-center text-center">
        <div class="relative w-24 h-24 mb-4 flex items-center justify-center">
          <svg class="w-full h-full transform -rotate-90"><circle cx="48" cy="48" r="40" stroke="#E8EDF2" stroke-width="8" fill="transparent"/><circle cx="48" cy="48" r="40" stroke="#F59E0B" stroke-width="8" fill="transparent" stroke-dasharray="251.2" stroke-dashoffset="30" stroke-linecap="round"/></svg>
          <span class="absolute text-xl font-bold text-navy-900">88%</span>
        </div>
        <h4 class="text-sm font-bold text-navy-900 mb-1">Knowledge Retention</h4>
        <p class="text-[11px] text-navy-400 font-medium">Seberapa lama materi bertahan</p>
      </div>
    </div>

    <!-- Core Strengths + Cognitive Style -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
      <div class="md:col-span-3 bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC]">
        <h3 class="text-lg font-bold text-navy-900 mb-6">Core Strengths</h3>
        <div class="space-y-5">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg></div>
            <div><h4 class="text-[15px] font-bold text-navy-900 mb-1">Strategic Planning</h4><p class="text-navy-500 font-medium text-[13px] leading-relaxed">You excel at creating structured study plans and setting clear academic goals.</p></div>
          </div>
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
            <div><h4 class="text-[15px] font-bold text-navy-900 mb-1">Time Awareness</h4><p class="text-navy-500 font-medium text-[13px] leading-relaxed">Strong understanding of time management principles and consistent scheduling.</p></div>
          </div>
        </div>
      </div>
      <div class="md:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC] text-center flex flex-col items-center justify-center">
        <div class="w-20 h-20 rounded-full bg-[#E8EDF2] flex items-center justify-center mb-5"><svg class="w-10 h-10 text-navy-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>
        <h3 class="text-lg font-bold text-navy-900 mb-1">Your Cognitive Style</h3>
        <p class="text-brand-500 font-mono font-bold text-[11px] uppercase tracking-widest">Architectural &amp; Analytical</p>
      </div>
    </div>

    <!-- Weaknesses & Growth -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC]">
        <h3 class="text-lg font-bold text-rose-600 mb-6 flex items-center gap-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Key Weaknesses</h3>
        <div class="p-5 bg-rose-50 rounded-2xl border border-rose-100">
          <h4 class="text-[15px] font-bold text-rose-900 mb-1.5">Reflection Habits</h4>
          <p class="text-[13px] font-medium text-rose-700/80 leading-relaxed">You rarely evaluate your study methods or adjust strategies based on outcomes.</p>
        </div>
      </div>
      <div class="bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC]">
        <h3 class="text-lg font-bold text-amber-600 mb-6 flex items-center gap-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>Areas for Growth</h3>
        <div class="p-5 bg-amber-50 rounded-2xl border border-amber-100">
          <h4 class="text-[15px] font-bold text-amber-900 mb-1.5">Self-Monitoring</h4>
          <p class="text-[13px] font-medium text-amber-700/80 leading-relaxed">Practice checking your understanding after each study session to strengthen metacognition.</p>
        </div>
      </div>
    </div>

    <!-- Recommendations + AI Strategy -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-white rounded-3xl p-8 shadow-lg border border-[#D9E2EC]">
        <h3 class="text-lg font-bold text-sky-600 mb-6 flex items-center gap-2"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z"/></svg>Recommendations</h3>
        <div class="p-5 bg-sky-50 rounded-2xl border border-sky-100">
          <h4 class="text-[15px] font-bold text-sky-900 mb-1.5">Weekly Reflection Notes</h4>
          <p class="text-[13px] font-medium text-sky-700/80 leading-relaxed">Use Lumora's Smart Notes to write a brief reflection after each study session.</p>
        </div>
      </div>
      <div class="bg-navy-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between">
        <div>
          <div class="inline-flex items-center gap-2 bg-brand-500/20 px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-brand-500/30 text-brand-300">AI Recommendation</div>
          <h3 class="text-2xl font-bold mb-4 leading-tight">The "Interval" Strategy</h3>
          <p class="text-navy-100 font-medium text-sm leading-relaxed mb-8">Based on your profile, we recommend a focused strategy to maximize your potential.</p>
        </div>
        <button class="flex items-center gap-2 font-bold text-sm text-brand-400 hover:text-brand-300 transition-colors">Explore Strategy <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
        <div class="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-brand-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>

    <!-- CTA -->
    <div class="flex flex-col items-center pt-6 gap-8">
      <p class="text-navy-400 font-medium italic text-sm">"Small habits are the architecture of great minds." — Lumora AI</p>
      <div class="w-full max-w-[300px]">
        <a href="#page-dashboard" class="block w-full btn-primary text-white font-bold py-4 rounded-xl text-center shadow-glow transition-all active:scale-[0.98]">Go to Dashboard</a>
      </div>
    </div>
  </div>

  <!-- Live indicator -->
  <div class="fixed bottom-8 right-8 flex items-center gap-3 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg border border-[#D9E2EC] z-50">
    <div class="relative w-2 h-2"><div class="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-75"></div><div class="relative w-2 h-2 bg-brand-500 rounded-full"></div></div>
    <span class="text-[10px] font-mono font-bold text-navy-500 uppercase tracking-[0.15em]">AI Assistant is active</span>
  </div>
</div>
</section>
'''
append(part7)
print(f"Part 7 (Result): {len(part7)} chars")

# ============================================================================
# PART 8: DASHBOARD
# ============================================================================
part8 = '''
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- PAGE 08: DASHBOARD -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<section id="page-dashboard" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#102A43,#0C1222);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">08 Dashboard</div>
<div class="h-screen bg-[#FDFDFF] font-sans text-slate-900 flex overflow-hidden">
  <!-- Sidebar -->
  <aside class="w-72 bg-[#F8FAFC] border-r border-[#D9E2EC] flex flex-col shrink-0">
    <div class="p-6 pb-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="bg-white/80 backdrop-blur-md p-1.5 rounded-xl shadow-sm border border-[#D9E2EC] inline-flex"><div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div></div>
        <div><span class="text-lg font-bold text-brand-500 tracking-tight block">Lumora</span><span class="text-[10px] font-mono text-brand-600 uppercase tracking-widest bg-brand-100 px-2 py-0.5 rounded">Intelligent Sanctuary</span></div>
      </div>
    </div>
    <nav class="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto scrollbar-hide">
      <a href="#page-dashboard" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold bg-brand-500 text-white shadow-lg shadow-brand-900/20">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
        <span>Dashboard</span>
      </a>
      <a href="#page-planner" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <span>Planner</span>
      </a>
      <a href="#page-targets" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>Weekly Targets</span>
      </a>
      <a href="#page-notes" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        <span>Notes</span>
      </a>
      <a href="#page-progress" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
        <span>Progress</span>
      </a>
      <a href="#page-settings" class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-navy-500 hover:bg-navy-50 hover:text-navy-900 transition-all">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <span>Settings</span>
      </a>
    </nav>
    <div class="px-4 pb-6 mt-auto space-y-4">
      <button class="flex items-center gap-3 text-sm font-semibold text-navy-500 hover:text-rose-600 hover:bg-rose-50 transition-all py-2.5 px-3 rounded-xl w-full">
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        <span>Logout</span>
      </button>
      <div class="border-t border-[#D9E2EC] pt-4">
        <a href="#page-settings" class="p-2 rounded-xl flex items-center gap-3 group cursor-pointer hover:bg-navy-50 border border-transparent hover:border-[#D9E2EC] transition-all">
          <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-lg relative shrink-0">
            <div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
          </div>
          <div class="min-w-0"><p class="text-[13px] font-black text-navy-900 truncate leading-tight group-hover:text-brand-500 transition-colors">User</p><p class="text-[10px] font-bold text-navy-400 truncate mt-0.5">Free Plan</p></div>
        </a>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 flex flex-col relative">
    <!-- Top Bar -->
    <header class="h-20 px-10 flex items-center justify-between bg-white z-30 shrink-0 border-b border-[#D9E2EC]">
      <div class="flex-1 flex items-center gap-6">
        <button class="hidden p-2 -ml-2 rounded-xl text-navy-400 hover:bg-[#F8FAFC] hover:text-navy-900 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/></svg></button>
        <button class="hidden sm:flex items-center gap-3 bg-[#F8FAFC] hover:bg-[#E8EDF2] transition-colors border border-transparent text-navy-400 px-4 py-2.5 rounded-full w-[280px] lg:w-[400px] text-sm font-medium group">
          <svg class="w-4 h-4 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span class="flex-1 text-left">Search sessions, notes, or targets...</span>
        </button>
      </div>
      <div class="flex items-center gap-6">
        <a href="#page-settings" class="flex items-center gap-3 cursor-pointer group">
          <span class="text-xs font-black text-navy-900 group-hover:text-brand-500 transition-colors">User</span>
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-navy-600 p-[1.5px] shadow-sm relative shrink-0 transition-transform group-hover:scale-105">
            <div class="w-full h-full rounded-full border-2 border-white bg-white flex items-center justify-center text-brand-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></div>
          </div>
        </a>
      </div>
    </header>

    <!-- Page Content -->
    <div class="flex-1 overflow-y-auto bg-[#FDFDFF] p-8 scrollbar-hide">
      <!-- Welcome Section -->
      <div class="mb-8 flex flex-col justify-center">
        <h1 class="text-[32px] font-black text-navy-900 mb-2 tracking-tight">Good afternoon, User. Ready for a deep focus session?</h1>
        <p class="text-navy-500 font-medium text-sm flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
          Your cognitive readiness is at <strong class="text-navy-700">94%</strong> today. Optimal for intensive study.
        </p>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-12 gap-6 mb-8">
        <!-- Left Column -->
        <div class="col-span-12 xl:col-span-7 flex flex-col gap-6">
          <!-- Daily Overview -->
          <div class="bg-navy-900 rounded-[24px] p-6 text-white shadow-xl shadow-brand-500/10 relative overflow-hidden">
            <div class="flex items-center justify-between mb-6 relative z-10">
              <div><h3 class="text-lg font-black tracking-wide text-white">Daily Overview</h3><p class="text-navy-200 text-xs font-bold mt-1">Saturday, Jun 6</p></div>
              <a href="#page-planner" class="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-xs font-bold transition-all flex items-center gap-2 backdrop-blur-md text-white">Full Schedule <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></a>
            </div>
            <div class="space-y-4 relative z-10">
              <div class="flex items-start gap-4">
                <div class="flex flex-col items-center pt-1 w-12 shrink-0"><span class="text-xs font-bold text-white">19:00</span></div>
                <div class="flex-1 border-l-4 rounded-xl p-4 transition-all backdrop-blur-sm bg-white/10 border-brand-400 hover:bg-white/20">
                  <div class="flex justify-between items-start mb-2">
                    <div><h4 class="text-sm font-black text-white">Tonight's Study Session</h4><p class="text-xs font-medium text-navy-200">120m</p></div>
                    <span class="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm bg-brand-500 text-white">PLANNED</span>
                  </div>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="flex flex-col items-center pt-1 w-12 shrink-0"><span class="text-xs font-bold text-navy-300">21:00</span></div>
                <div class="flex-1 border-l-4 rounded-xl p-4 transition-all backdrop-blur-sm bg-white/5 border-brand-400/50 hover:bg-white/10">
                  <div class="flex justify-between items-start mb-2">
                    <div><h4 class="text-sm font-black text-navy-200 line-through opacity-70">Weekly Review</h4><p class="text-xs font-medium text-navy-300/70">45m</p></div>
                    <span class="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm bg-brand-500/50 text-brand-100">DONE</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <!-- Recent Notes Grid -->
          <div>
            <div class="flex items-center justify-between mb-4 px-1">
              <h3 class="text-base font-black text-navy-900">Recent Notes</h3>
              <a href="#page-notes" class="text-xs font-black text-brand-500 hover:text-brand-400 uppercase tracking-widest transition-colors">View All</a>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <a href="#page-notes" class="bg-white border border-[#D9E2EC] p-5 rounded-[20px] shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer group">
                <div class="w-10 h-10 bg-brand-50 text-brand-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
                <h4 class="text-sm font-black text-navy-900 mb-1">Weekly Study Targets</h4>
                <p class="text-xs text-navy-500 font-medium line-clamp-2">Review class notes for 15-20 min daily. Complete all homework 24h before due...</p>
              </a>
              <a href="#page-notes" class="bg-white border border-[#D9E2EC] p-5 rounded-[20px] shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer group">
                <div class="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
                <h4 class="text-sm font-black text-navy-900 mb-1">Waterfall Methodology</h4>
                <p class="text-xs text-navy-500 font-medium line-clamp-2">A classic sequential design process used in software development lifecycle...</p>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="col-span-12 xl:col-span-5 flex flex-col gap-6">
          <!-- This Week's Targets -->
          <div class="bg-white p-6 rounded-[24px] border border-[#D9E2EC] shadow-sm">
            <h3 class="text-lg font-black text-navy-900 mb-6">This Week's Targets</h3>
            <div class="text-navy-500 font-medium text-sm py-4">No active targets for this week.</div>
          </div>

          <!-- Quick Actions -->
          <div>
            <p class="text-[10px] font-black text-navy-400 uppercase tracking-widest mb-3 px-2">Quick Actions</p>
            <div class="space-y-3">
              <a href="#page-notes" class="w-full bg-white border border-[#D9E2EC] hover:border-brand-200 rounded-[16px] p-4 flex items-center justify-between group transition-all shadow-sm">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></div>
                  <span class="text-sm font-bold text-navy-700 group-hover:text-brand-500">New Note</span>
                </div>
                <svg class="w-4 h-4 text-navy-300 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>
              <a href="#page-planner" class="w-full bg-white border border-[#D9E2EC] hover:border-brand-200 rounded-[16px] p-4 flex items-center justify-between group transition-all shadow-sm">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
                  <span class="text-sm font-bold text-navy-700 group-hover:text-brand-500">Plan Session</span>
                </div>
                <svg class="w-4 h-4 text-navy-300 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <!-- Quote Card -->
          <div class="bg-gradient-to-br from-brand-600 to-brand-800 p-6 rounded-[24px] mt-2 relative overflow-hidden shadow-lg shadow-brand-900/20">
            <svg class="absolute top-3 left-4 w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p class="text-sm font-bold text-white italic leading-relaxed relative z-10 pt-4">"Wisdom is not a product of schooling but of the lifelong attempt to acquire it."</p>
            <p class="text-[10px] font-black text-brand-200 uppercase tracking-widest mt-4 relative z-10">— Albert Einstein</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Floating AI Buddy Button -->
  <div class="fixed bottom-8 right-8 z-[100]">
    <button class="w-16 h-16 bg-brand-600 hover:bg-brand-500 text-white rounded-[24px] flex items-center justify-center shadow-2xl shadow-brand-900/30 hover:scale-105 active:scale-95 transition-all">
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    </button>
  </div>

  <!-- Toast Notification -->
  <div class="fixed bottom-8 right-28 z-[150] bg-white border border-[#D9E2EC] shadow-xl p-4 rounded-xl flex items-center gap-4 animate-slide-up">
    <div class="w-10 h-10 bg-brand-50 text-brand-500 flex items-center justify-center rounded-xl text-xl">🔔</div>
    <div><p class="text-[10px] font-black text-brand-500 uppercase tracking-widest">Incoming Ping</p><p class="text-sm font-bold text-navy-900">Great work today!</p></div>
  </div>
</div>
</section>
'''
append(part8)
print(f"Part 8 (Dashboard): {len(part8)} chars")

print("Parts 6-8 appended!")
