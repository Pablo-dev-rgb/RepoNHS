<?php

namespace App\Http\Controllers\Api\ServiceManager;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //Mostramos la lista de los usuarios filtrado por rol
    public function getUserByService(Request $request){
        $serviceId = $request->input('service_id');

        $users = User::whereHas('services', function ($query) use ($serviceId) {
            if ($serviceId) {
                $query->where('services.id', $serviceId);
            }
        })
        ->with('services')
        ->get();
        return response()->json(200);
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
}
