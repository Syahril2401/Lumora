<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\DB;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

/**
 * Ensures user has completed the onboarding survey before accessing the dashboard.
 * If they haven't, redirect them to the sanctuary page.
 */
class SurveyCompleted
{
    public function handle(Request $request, Closure $next): Response
    {
        // Cache the survey completion status in the session to avoid
        // a database query on every page load.
        if (!Session::has('survey_completed')) {
            $userId = Auth::id();
            $completed = false;
            
            if ($userId) {
                // Check directly in database if result exists
                $completed = DB::table('result_summary')->where('user_id', $userId)->exists();
            }
            
            Session::put('survey_completed', $completed);
        }

        if (!Session::get('survey_completed')) {
            return redirect()->route('onboarding.sanctuary')
                ->with('info', 'Selesaikan assessment terlebih dahulu untuk mengakses dashboard.');
        }

        return $next($request);
    }
}
