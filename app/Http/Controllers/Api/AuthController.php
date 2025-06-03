<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){

        $response = ["success"=>false];
         //validacion
         $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "password" => "required",
            "hospital_id" => "required|integer|exists:hospital,id",
            "service_id" => "required|integer|exists:service,id",
         ]);

         if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
         }
        
        //encriptacion de password
        $input = $request->all();
        $input ["password"] = bcrypt($input["password"]);

        //creacion de user
        $user = User::create($input);
        $user->assignRole("Admin");

        $response["success"] = true;
        //$response["token"] = $user->createToken("PJ")->plainTextToken;

        return response()->json($response, 200);
    }
}
