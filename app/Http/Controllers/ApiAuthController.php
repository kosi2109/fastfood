<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\WelcomeMail;
use App\Models\User;
use App\Repositories\UserRepository;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

class ApiAuthController extends Controller
{
    public function __construct(
        private UserRepository $respository
    )
    {
        //
    }

    /**
     * Login
     * @param LoginRequest $request
     * 
     * @return response
     */
    public function login(LoginRequest $request)
    {
        $user = $this->respository->findByEmail(request('email'));

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response([
                "message" => "Wrong User crenditial."
            ], 401);
        }

        $token = $user->createToken(env('JWT_SECRET'))->plainTextToken;

        $response_data = [
            "user" => $user,
            "token" =>  $token
        ];

        if (!$user->email_verified_at) {
            $response_data['not_verified'] = "Email not verified yet." ;
        }

        return response($response_data, 201);
    }

    /**
     * Register
     * @param Request $request
     * 
     * @return response
     */
    public function register(Request $request)
    {
        $register_request = new RegisterRequest();
        
        if ($request->password != $request->password_confirmation) return response(["password_confirmation" => "Password not match"], 400);
        
        $validate = Validator::make($request->all(), $register_request->rules(), $register_request->messages());

        if ($validate->fails()) return response($validate->errors(), 400);

        $user = $this->respository->create($request);

        Mail::to($user)->send(new WelcomeMail(['name' => $user->name]));

        return response($user, 201);
    }

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
