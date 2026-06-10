<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $goToken = \Illuminate\Support\Facades\Session::get('go_token');
        $user = null;

        if ($goToken) {
            try {
                $payload = explode('.', $goToken)[1];
                $decoded = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
                if (isset($decoded['user_id'])) {
                    $userRecord = \Illuminate\Support\Facades\DB::table('srl_platform.users')
                        ->where('user_id', $decoded['user_id'])
                        ->first();
                    if ($userRecord) {
                        $user = [
                            'id' => $userRecord->user_id,
                            'name' => $userRecord->name,
                            'email' => $userRecord->email,
                            'avatar' => $userRecord->avatar,
                            'role' => $userRecord->role,
                        ];
                    }
                }
            } catch (\Exception $e) {
                // ignore
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'go_token' => $goToken,
        ];
    }
}
