<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\WelcomeMail;
use App\Models\User;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

class ApiAuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $user = User::where('email', request('email'))->first();

        if (!$user->email_verified_at) {
            return response([
                "message" => "Your Email is not verified yet."
            ], 401);
        }

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response([
                "message" => "Wrong User crenditial."
            ], 401);
        }

        $user = $request->user();

        $token = $user->createToken(env('JWT_SECRET'))->plainTextToken;

        return response([
            "user" => $user,
            "token" =>  $token
        ], 201);
    }

    public function register(Request $request)
    {
        if ($request->password != $request->password2) return response(["message" => "Password not match"], 400);

        $register_request = new RegisterRequest();

        $validate = Validator::make($request->all(), $register_request->rules(), $register_request->messages());

        if ($validate->fails()) return response($validate->errors(), 400);

        $user = User::create($request->all());

        Mail::to($user)->send(new WelcomeMail(['name' => $user->name]));

        return response($user, 201);
    }

    public function user(Request $request)
    {
        return response($request->header(), 201);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response("Logout complete", 200);
    }

    public function redirectToAuth()
    {
        return response()->json([
            'url' => Socialite::driver('google')
                ->stateless()
                ->redirect()
                ->getTargetUrl(),
        ]);
    }

    public function handleAuthCallback()
    {
        try {
            /** @var SocialiteUser $socialiteUser */
            $socialiteUser = Socialite::driver('google')->stateless()->user();
        } catch (ClientException $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        /** @var User $user */
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
