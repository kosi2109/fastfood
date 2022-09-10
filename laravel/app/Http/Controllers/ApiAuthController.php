<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class ApiAuthController extends Controller
{

    /**
     * Logout
     * @param Request $request
     * 
     * @return response
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response("Logout complete", 200);
    }

    /**
     * Google Login
     */
    public function redirectToAuth()
    {
        return response()->json([
            'url' => Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(),
        ]);
    }

    /**
     * Google login success callback to home
     */
    public function handleAuthCallback()
    {
        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();
        } catch (ClientException $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $user = User::firstOrCreate(
            [
                'email' => $socialiteUser->getEmail(),
            ],
            [
                'email_verified_at' => now(),
                'name' => $socialiteUser->getName(),
                'google_id' => $socialiteUser->getId(),
                'profile_img' => $socialiteUser->getAvatar(),
            ]
        );

        $token = $user->createToken(env('JWT_SECRET'))->plainTextToken;

        return response([
            "user" => $user,
            "token" =>  $token
        ], 201);
    }
}
