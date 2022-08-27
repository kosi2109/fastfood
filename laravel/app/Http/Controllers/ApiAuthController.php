<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiAuthController extends Controller
{
    public function login(LoginRequest $request)
    {

        if(!auth()->attempt($request->only('email','password'))){
            return response([
                "message" => "Wrong User crenditial."
            ],401);
        }

        $user = $request->user(); 

        $token = $user->createToken(env('JWT_SECRET'))->plainTextToken;
    
        return response([
            "user"=>$user,
            "token" =>  $token
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
        return response($request->header(),201);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response("Logout complete",200);
    }

}
