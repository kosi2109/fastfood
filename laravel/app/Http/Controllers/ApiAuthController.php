<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        $login_request = new LoginRequest();
        
        $validate = Validator::make($request->all(),$login_request->rules(),$login_request->messages());
        
        if ($validate->fails()) return response($validate->errors(),400);

        if(!auth()->attempt($request->only('email','password'))){
            return response([
                "message" => "You are Not Authenticated"
            ],404);
        }

        $user = $request->user(); 

        $token = $user->createToken(env('JWT_SECRET'))->plainTextToken;
        $cookie = cookie('jwt',$token,60 * 24 * 30);
        return response($user,201)->withCookie($cookie);
    }

    public function register(Request $request)
    {
        if($request->password != $request->password2) return response(["message"=>"Password not match"],400);

        $register_request = new RegisterRequest();
        
        $validate = Validator::make($request->all(),$register_request->rules(),$register_request->messages());
        
        if ($validate->fails()) return response($validate->errors(),400);
        
        return response(User::create($request->all()),201);
    }

    public function user(Request $request)
    {

        return response($request->cookie(),201);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response("Logout complete",200);
    }

}
