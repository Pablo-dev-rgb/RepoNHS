<?php

namespace App\Http\Controllers\Api\Chief;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //Crear Tarea
     public function store(Request $request){
        //aqui deberiamos agregar una validacion
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required|string',
            'completed' => 'required|boolean',
            'service_id' => 'required|integer|exists:services,id'
        ]);
        
        $data = new Task($validatedData);
        $data->save();
        return response()->json($data, 201);
    }

    //Mostrar  lista tareas
    public function index(){
        $data = Task::get(["id", "name", "description", "completed","service_id"]);
        return response()->json($data, 200);
    }

    //Editar Tarea
    public function update(Request $request, $id){
        //validacion
        $validarData = $request->validate([
            'name' => 'nullable',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
            'service_id' => 'nullable|integer|exists:services,id'
        ]);

        //guardar actualizacion
        $data = Task::findOrFail($id);
        $data->fill($validarData);
        $data->save();

        return response()->json($data, 200);
    }

    //Buscar noticia por id
    public function show($id){
        $data = Task::find($id);
        return response()->json($data, 200);
    }

    //Buscador de tareas
    public function search(Request $request){
        $textBusqueda = $request->text;
        $data = Task::where("name", "like", "%" . $textBusqueda . "%")->get();
        return response()->json($data, 200);
    }

    //Eliminar tarae
    public function destroy($id){
        $data = Task::findOrFail($id);
        $data->delete();
        return response()->json("Tarea eliminada", 200);
    }
}
