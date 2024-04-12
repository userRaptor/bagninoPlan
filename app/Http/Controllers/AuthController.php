<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\UserX;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{

    public function signup(SignupRequest $request){
        $data = $request->validated();

        $user = UserX::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        //$token = $user->createToken(('main'))->plainTextToken;
        //return response(compact('user', 'token'));
        
        return response($user);
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response(['message' => 'Invalid credentials'], 422);
        }

        /** @var \App\Models\UserX $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }


    public function logout(Request $request){
        $user = $request->user();
        //$user ->currentAccessToken()->delete();

        return response(['', 204]);

    }


}
