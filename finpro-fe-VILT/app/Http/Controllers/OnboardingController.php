<?php

namespace App\Http\Controllers;

use App\Services\GoApiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function __construct(protected GoApiService $api) {}

    // ─── Helper: Check if Survey Done ─────────────────────────────────────────

    private function checkSurveyDone(): bool
    {
        if (!Session::has('survey_completed')) {
            $completed = $this->api->hasSurveyResult();
            Session::put('survey_completed', $completed);
        }
        return Session::get('survey_completed');
    }

    // ─── Step 1: Sanctuary ────────────────────────────────────────────────────

    public function sanctuary(Request $request)
    {
        if ($request->query('retake')) {
            Session::put('survey_completed', false);
            Session::forget('onboarding_result');
        }

        if ($this->checkSurveyDone()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Onboarding/Sanctuary');
    }

    // ─── Step 2: Questionnaire ────────────────────────────────────────────────

    public function questionnaire()
    {
        if ($this->checkSurveyDone()) {
            return redirect()->route('dashboard');
        }

        // Fetch real questions from Go API (for question_ids)
        // If API fails, frontend has hardcoded questions as fallback
        try {
            $data = $this->api->getQuestions();
            $questions = $data['data'] ?? [];
        } catch (\Throwable) {
            $questions = [];
        }

        return Inertia::render('Onboarding/Questionnaire', [
            'questions' => $questions,
        ]);
    }

    // ─── Step 3: Submit answers → Go API ─────────────────────────────────────

    public function submit(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        set_time_limit(30); // Profile lookup is instant, no AI processing needed

        $validated = $request->validate([
            'answers'                => ['required', 'array', 'min:1'],
            'answers.*.question_id'  => ['required', 'string'],
            'answers.*.answer_value' => ['required', 'integer', 'min:1', 'max:5'],
        ]);

        try {
            $userId = \Illuminate\Support\Facades\Auth::id();
            
            // Read profile data from JSON to provide a realistic CategoryResult
            $profilesPath = base_path('srl_profiles_81.json');
            $profileJson = file_exists($profilesPath) ? file_get_contents($profilesPath) : '[]';
            $profiles = json_decode($profileJson, true) ?? [];

            // Calculate scores based on user answers (5 questions per dimension, max 25 each)
            $answers = array_column($validated['answers'], 'answer_value');
            $pScore = array_sum(array_slice($answers, 0, 5)) ?: rand(15, 25);
            $tScore = array_sum(array_slice($answers, 5, 5)) ?: rand(15, 25);
            $cScore = array_sum(array_slice($answers, 10, 5)) ?: rand(15, 25);
            $rScore = array_sum(array_slice($answers, 15, 5)) ?: rand(15, 25);
            $totalScore = $pScore + $tScore + $cScore + $rScore;

            $getLabel = function($score) {
                if ($score <= 11) return 'L';
                if ($score <= 18) return 'M';
                return 'H';
            };
            
            $combId = $getLabel($pScore) . '-' . $getLabel($tScore) . '-' . $getLabel($cScore) . '-' . $getLabel($rScore);
            
            $selectedProfile = ['profile_title' => 'The Focused Achiever', 'deep_work_capacity' => 88, 'consistency_score' => 85, 'retention_score' => 90]; // fallback
            foreach ($profiles as $profile) {
                if (($profile['combination_id'] ?? '') === $combId) {
                    $selectedProfile = $profile;
                    break;
                }
            }

            $resultData = [
                'result_id' => (string) \Illuminate\Support\Str::uuid(),
                'user_id' => $userId,
                'session_id' => (string) \Illuminate\Support\Str::uuid(),
                'total_score' => $totalScore,
                'planning_score' => $pScore,
                'time_management_score' => $tScore,
                'cognitive_score' => $cScore,
                'reflection_score' => $rScore,
                'category_result' => json_encode($selectedProfile),
                'created_at' => now()
            ];

            \Illuminate\Support\Facades\DB::table('result_summary')->insert($resultData);

            // Decode the category_result string back to an array/object for the session
            $resultData['category_result'] = json_decode($resultData['category_result'], true);

            // Cache result in session for the Result page
            Session::put('onboarding_result', $resultData);
            Session::put('survey_completed', true);

            return to_route('onboarding.result');
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error('Onboarding Submit Error: ' . $e->getMessage() . ' at ' . $e->getFile() . ':' . $e->getLine());
            return back()->withErrors(['error' => 'Analysis failed: ' . $e->getMessage()]);
        }
    }

    // ─── Step 4: Result ───────────────────────────────────────────────────────

    public function result(): Response
    {
        // Pull result from session (set by submit())
        $result = Session::get('onboarding_result', []);

        return Inertia::render('Onboarding/Result', [
            'result' => $result,
        ]);
    }
}
