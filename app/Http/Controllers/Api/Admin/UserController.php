<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //Mostramos la lista de los usuarios filtrado por rol
    public function index(){

        $data = User::get(["id", "name", "phone", "hospital_id", "service_id"]);
        return response()->json($data, 200);
    }

    //Buscar un usuario especifico
    public function show($id){
        $data = User::find($id);
        return response()->json($data, 200);
    }

    //Actualizar usuario
    public function update(Request $request, $id){
        $data = User::find($id);
        $data->name = $request->input('name');
        $data->email = $request->input('email');
        $data->phone = $request->input('phone');
        $data->save();
        return response()->json($data, 200);
    }
}
