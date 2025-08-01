<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hospital;
use App\Models\Service;
use App\Models\User;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\error;

class AuthController extends Controller
{
   //Obtener los roles
    public function getRoles(){
        $data = Role::get(["id", "name"]);
        return response()->json($data, 200);
    }

    //Obtener hospitales
    public function getHospital(){
        $data = Hospital::get(["id", "name"]);
        return response()->json($data, 200);
    }

    //Obtener los servicios
    public function getService(){
        $data = Service::get(["id", "name"]);
        return response()->json($data, 200);
    }

    public function register(Request $request){

        $response = ["success"=>false];
         //validacion
         $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email",
            "password" => "required",
            "hospital_id" => "required|integer|exists:hospitals,id",
            "service_id" => "required|integer|exists:services,id",
            "role" => ["required", "string", Rule::exists('roles', 'name')],
         ]);

         if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
         }
        
        //encriptacion de password
        $input = $request->all();
        $input ["password"] = bcrypt($input["password"]);

        $roleName = $input["role"]; //Guadamos el nombre del rol
        unset($input["role"]); //Eliminamos "role" del array de input

        //creacion de user
        $user = User::create($input);

        //Asignar rol dinamicamente
        $user->assignRole($roleName);

        $response["success"] = true;
        //$response["token"] = $user->createToken("PJ")->plainTextToken;

        return response()->json($response, 200);
    }

    public function login(Request $request){

        $response = ["success"=>false];
         //validacion
         $validator = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
         ]);

         if($validator->fails()){
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
         }
         //autenticacion y logueo de user
         if(auth()->attempt(["email" => $request->email, "password" => $request->password])){
            $user = auth()->user();
            $user->hasRole('admin');

            $response["token"] = $user->createToken("pj")->plainTextToken;
            $response["user"] = $user;
            $response["success"] = true;

            return response()->json($response, 200);
         }else{
            return response()->json([
            'success' => false,
            'message' => 'Contraseña y/o email incorrecto.',
            ], 401);
         }
    }

    public function logout(){

      $response = ["success"=>false];
      auth()->user()->tokens()->delete();
      $response = [
         "success"=>true, 
         "message" => "Sesion cerrada."
      ];
      return response()->json($response, 200);
    }
}
