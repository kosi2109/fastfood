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

        $user = User::where('email',$request->email)->first();
        if(!$user || !Hash::check($request->password,$user->password)){   
            return response([
                "message" => "You are Not Authenticated"
            ],404);

        }
        $token = $user->createToken('secret')->plainTextToken;
        
        return response([
            "user" => $user,
            "token" => $token
        ],201);
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
        return response($request->user(),201);
    }

}
