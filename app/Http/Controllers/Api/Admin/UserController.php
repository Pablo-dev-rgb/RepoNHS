<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //Mostramos la lista de los usuarios filtrado por rol
    public function index(){

        $data = User::with('service')->orderByDesc('created_at')->get();
        return response()->json($data, 200);
    }

    //Buscar un usuario especifico
    public function show($id){
        $data = User::find($id);
        if (!$data) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $data->load('service:id,name');
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
