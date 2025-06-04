<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    //Mostrar lista de servicios
    public function index(){
        $data = Service::get(["id", "name", "hospital_id"]);
        return response()->json($data, 200);
    }
    //Crear Service
    public function store(Request $request){
        //aqui deberiamos agregar una validacion
        $data = new Service($request->all());
        $data->save();
        return response()->json($data, 200);
    }

    //Actualizar service
    public function update(Request $request, $id){
        //validacion...
        $data = Service::find($id);
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);
    }

    //Buscar un servicio especifico
    public function show($id){
        $data = Service::find($id);
        return response()->json($data, 200);
    }


}
