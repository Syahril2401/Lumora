<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    // ─── Show Login Form ───────────────────────────────────────────────────────

    public function loginForm(): Response
    {
        return Inertia::render('Auth/Login');
    }

    // ─── Process Login ─────────────────────────────────────────────────────────

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            $request->session()->regenerate();
            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors([
            'email' => 'Login gagal. Periksa email dan password kamu.',
        ])->withInput($request->only('email'));
    }

    // ─── Show Register Form ────────────────────────────────────────────────────

    public function registerForm(): Response
    {
        return Inertia::render('Auth/Register');
    }

    // ─── Process Register ──────────────────────────────────────────────────────

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:100'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password_hash' => Hash::make($validated['password']),
            'level' => 'Beginner', // Default level
            'is_active' => true,
        ]);

        Auth::login($user);

        return redirect()->route('onboarding.sanctuary');
    }

    // ─── Logout ────────────────────────────────────────────────────────────────

    public function logout(Request $request): \Illuminate\Http\RedirectResponse
    {
        Auth::logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('landing');
    }
}
