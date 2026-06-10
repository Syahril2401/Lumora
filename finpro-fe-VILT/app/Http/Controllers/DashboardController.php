<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard');
    }

    public function planner(): Response
    {
        return Inertia::render('Dashboard/Planner');
    }

    public function notes(): Response
    {
        return Inertia::render('Dashboard/Notes');
    }

    public function weeklyTargets(): Response
    {
        return Inertia::render('Dashboard/WeeklyTargets');
    }

    public function progress(): Response
    {
        return Inertia::render('Dashboard/Progress');
    }

    public function settings(): Response
    {
        return Inertia::render('Dashboard/Settings');
    }

    public function recommendationDetail($id): Response
    {
        return Inertia::render('RecommendationDetail', ['id' => $id]);
    }

    public function updateProfile(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|max:5120' // max 5MB
        ]);

        $user = Auth::user();
        $user->name = $request->name;
        $user->role = $request->role;

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = '/storage/' . $path;
        }

        $user->save();

        return redirect()->back()->with('message', 'Profile updated successfully.');
    }
}

