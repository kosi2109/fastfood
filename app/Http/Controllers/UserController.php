<?php

namespace App\Http\Controllers;

use App\Exceptions\GeneralJsonException;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show(Request $request)
    {
        return response(auth()->user(), 201);
    }

    public function update(UserUpdateRequest $request)
    {
        try {
            $user = User::find(auth()->id());
            $user->update($request->input());

            return response($user->fresh(), 201); 
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 400);
        }
    }
}
