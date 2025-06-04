<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //Mostramos la lista de los usuarios filtrado por rol
    public function index(){

        $data = User::get(["id", "name", "hospital_id", "service_id"]);
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
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);
    }
}
