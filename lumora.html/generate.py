#!/usr/bin/env python3
"""Generate the complete Lumora all-pages HTML file."""
import os

output_dir = r"C:\Kuliah\Semester_4\WEB-PROGRAMMING\Lumora\lumora.html"
output_file = os.path.join(output_dir, "lumora-all-pages.html")

# We'll build the file in parts
parts = []

# Part 1 already exists, so we read it and continue
existing = os.path.join(output_dir, "lumora-all-pages.html")

# Just append remaining parts to the existing file
def append_to_file(content):
    with open(existing, 'a', encoding='utf-8') as f:
        f.write(content)

print("Appending remaining pages...")

# ============================================================================
# PART 2: LOGIN PAGE
# ============================================================================
part2 = '''
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- PAGE 02: LOGIN -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<section id="page-login" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">02 Login</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden">
  <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>
  <div class="absolute bottom-0 left-[5%] w-[350px] h-[350px] bg-navy-300/8 rounded-full blur-[100px]"></div>
  <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
    <div class="text-center mb-10">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div>
        <span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span>
      </div>
      <p class="text-navy-500 font-medium">Return to your Intelligent Sanctuary</p>
    </div>
    <div class="w-full bg-white rounded-3xl p-10 md:p-12 shadow-xl border border-[#D9E2EC]">
      <form class="space-y-6">
        <div class="space-y-2">
          <label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email/Username</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
            </span>
            <input type="email" placeholder="student@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all duration-300 outline-none">
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Password</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </span>
            <input type="password" placeholder="••••••••" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all duration-300 outline-none">
          </div>
        </div>
        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="w-4 h-4 rounded border-[#D9E2EC] text-brand-500 focus:ring-brand-500">
            <span class="text-sm text-navy-600">Remember me</span>
          </label>
          <a href="#page-forgot-password" class="text-sm text-brand-500 hover:text-brand-600 font-medium">Forgot password?</a>
        </div>
        <button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300 transform active:scale-[0.98]">Login</button>
      </form>
      <p class="text-center mt-8 text-sm font-medium text-navy-500">
        New to the sanctuary? <a href="#page-register" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Join now</a>
      </p>
    </div>
    <div class="mt-10 flex gap-8 text-xs font-medium text-navy-400">
      <a href="#" class="hover:text-brand-500 transition-colors">Privacy Policy</a>
      <a href="#" class="hover:text-brand-500 transition-colors">Terms of Service</a>
      <a href="#" class="hover:text-brand-500 transition-colors">Contact Support</a>
    </div>
  </div>
</div>
</section>
'''
append_to_file(part2)
print(f"Part 2 (Login): {len(part2)} chars")

# ============================================================================
# PART 3: REGISTER PAGE
# ============================================================================
part3 = '''
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- PAGE 03: REGISTER -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<section id="page-register" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">03 Register</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden py-12">
  <div class="absolute top-10 left-[-5%] w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>
  <div class="absolute bottom-0 right-[-5%] w-[350px] h-[350px] bg-navy-300/8 rounded-full blur-[100px]"></div>
  <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div>
        <span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span>
      </div>
      <p class="text-navy-500 font-medium">Create your account to start your journey.</p>
    </div>
    <div class="w-full bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#D9E2EC]">
      <form class="space-y-5">
        <div class="space-y-2">
          <label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Full Name</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span>
            <input type="text" placeholder="Enter your name" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all duration-300 outline-none">
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email Address</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
            <input type="email" placeholder="example@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-4 text-navy-700 font-medium transition-all duration-300 outline-none">
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Password</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></span>
            <input type="password" placeholder="Create a password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all duration-300 outline-none">
          </div>
        </div>
        <div class="space-y-2">
          <label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Confirm Password</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></span>
            <input type="password" placeholder="Repeat your password" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 pl-12 pr-12 text-navy-700 font-medium transition-all duration-300 outline-none">
          </div>
        </div>
        <p class="text-center text-xs text-navy-400 leading-relaxed px-4 pt-2">
          By registering, you agree to our <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Terms of Service</a> and <a href="#" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Privacy Policy</a>.
        </p>
        <button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300 transform active:scale-[0.98] mt-2">Register</button>
      </form>
      <p class="text-center mt-8 text-sm font-medium text-navy-500">
        Already have an account? <a href="#page-login" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">Login</a>
      </p>
    </div>
  </div>
</div>
</section>
'''
append_to_file(part3)
print(f"Part 3 (Register): {len(part3)} chars")

# ============================================================================
# PART 4: FORGOT PASSWORD
# ============================================================================
part4 = '''
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- PAGE 04: FORGOT PASSWORD -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<section id="page-forgot-password" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#334E68,#102A43);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">04 Forgot Password</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] flex flex-col items-center justify-center px-4 relative overflow-hidden">
  <div class="absolute top-10 right-0 w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px]"></div>
  <div class="relative z-10 w-full max-w-[500px] flex flex-col items-center">
    <div class="text-center mb-10">
      <div class="flex items-center justify-center gap-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-black text-xl">L</div>
        <span class="text-3xl font-bold tracking-tight text-brand-500">Lumora</span>
      </div>
      <p class="text-navy-500 font-medium">Reset your password</p>
    </div>
    <div class="w-full bg-white rounded-3xl p-10 shadow-xl border border-[#D9E2EC]">
      <p class="text-sm text-navy-500 mb-6">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.</p>
      <form class="space-y-6">
        <div class="space-y-2">
          <label class="block text-[11px] font-mono text-navy-400 uppercase tracking-widest ml-1">Email</label>
          <input type="email" placeholder="student@lumora.edu" class="w-full bg-[#FAFAF9] border border-[#E8EDF2] focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl py-3 px-4 text-navy-700 font-medium transition-all duration-300 outline-none">
        </div>
        <button type="submit" class="w-full btn-primary text-white font-bold py-3.5 rounded-xl shadow-glow transition-all duration-300">Email Password Reset Link</button>
      </form>
      <p class="text-center mt-6 text-sm font-medium text-navy-500">
        <a href="#page-login" class="text-brand-500 font-bold hover:text-brand-600 transition-colors">← Back to Login</a>
      </p>
    </div>
  </div>
</div>
</section>
'''
append_to_file(part4)
print(f"Part 4 (Forgot Password): {len(part4)} chars")

# ============================================================================
# PART 5: ONBOARDING SANCTUARY
# ============================================================================
part5 = '''
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- PAGE 05: ONBOARDING SANCTUARY -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<section id="page-onboarding-sanctuary" class="page-section">
<div class="page-label" style="background:linear-gradient(135deg,#059669,#0D9488);color:white;font-size:11px;font-weight:800;letter-spacing:0.2em;text-transform:uppercase;padding:8px 16px;text-align:center;">05 Onboarding Sanctuary</div>
<div class="min-h-screen font-sans antialiased bg-[#FAFAF9] text-[#102A43] flex items-center justify-center px-4 py-16 relative overflow-hidden">
  <div class="absolute top-10 right-[-5%] w-[500px] h-[500px] bg-brand-300/10 rounded-full blur-[140px] pointer-events-none"></div>
  <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-navy-300/8 rounded-full blur-[120px] pointer-events-none"></div>
  <div class="relative z-10 w-full max-w-[1000px] bg-white rounded-[40px] shadow-2xl border border-[#D9E2EC] flex flex-col md:flex-row overflow-hidden">
    <div class="w-full md:w-[45%] bg-[#F3F4F6] p-12 flex flex-col justify-between relative overflow-hidden border-r border-[#D9E2EC]">
      <div class="relative z-10 flex items-center gap-3 mb-12">
        <div class="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center text-white font-black text-sm">L</div>
        <span class="text-2xl font-bold tracking-tight text-brand-500">Lumora</span>
      </div>
      <div class="relative z-10 flex flex-col items-center">
        <div class="w-full max-w-[320px] aspect-square rounded-[40px] overflow-hidden shadow-xl border border-white/20 mb-10 rotate-[-2deg]">
          <div class="w-full h-full bg-gradient-to-br from-brand-400 via-purple-400 to-brand-300"></div>
        </div>
        <div class="relative px-6">
          <svg class="absolute top-[-10px] left-2 w-6 h-6 text-brand-500/30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
          <p class="text-navy-500 font-medium italic text-center text-[15px] leading-relaxed max-w-[280px]">"The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."</p>
        </div>
      </div>
    </div>
    <div class="w-full md:w-[55%] p-12 md:p-16 flex flex-col justify-center">
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 bg-brand-50 text-brand-500 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-brand-100">Step 01 / 03</div>
        <h1 class="text-[36px] md:text-[44px] font-bold text-navy-900 leading-[1.15] mb-6">Welcome to your <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400">Sanctuary of Focus.</span></h1>
        <p class="text-navy-500 text-lg leading-relaxed font-medium">Lumora is designed to help you transform your academic journey through AI-driven strategies and intentional habit building.</p>
      </div>
      <div class="space-y-8 mb-12">
        <div class="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#FAFAF9] border border-transparent hover:border-[#E8EDF2] transition-all group">
          <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-1.012l-.547-.547z"/></svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-navy-900 mb-1">Intelligent Assistance</h3>
            <p class="text-[14px] text-navy-500 font-medium leading-relaxed">Personalized AI models that adapt to your unique study patterns.</p>
          </div>
        </div>
        <div class="flex items-start gap-5 p-4 rounded-2xl hover:bg-[#FAFAF9] border border-transparent hover:border-[#E8EDF2] transition-all group">
          <div class="w-14 h-14 bg-brand-50 text-brand-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-navy-900 mb-1">Focused Sessions</h3>
            <p class="text-[14px] text-navy-500 font-medium leading-relaxed">Minimize distractions with curated productivity environments.</p>
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <a href="#page-onboarding-questionnaire" class="btn-primary text-white font-bold px-10 py-4 rounded-xl flex items-center gap-3 shadow-glow transition-all active:scale-[0.98]">
          Let's Begin
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
      </div>
    </div>
  </div>
  <div class="absolute bottom-8 inset-x-0 text-center">
    <p class="text-[10px] font-mono font-bold text-navy-400 uppercase tracking-[0.2em] mb-4">Secured by Lumora Intelligence</p>
    <div class="flex justify-center gap-8 text-[12px] font-bold text-navy-500">
      <a href="#" class="hover:text-brand-500 transition-colors">Privacy Policy</a>
      <a href="#" class="hover:text-brand-500 transition-colors">Terms of Use</a>
      <a href="#" class="hover:text-brand-500 transition-colors">Contact Support</a>
    </div>
  </div>
</div>
</section>
'''
append_to_file(part5)
print(f"Part 5 (Onboarding Sanctuary): {len(part5)} chars")

print("Parts 2-5 appended successfully!")
