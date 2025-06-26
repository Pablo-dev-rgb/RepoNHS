<?php

namespace App\Http\Controllers\Api\Chief;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notice;

class NoticeController extends Controller
{
    //Mostrar lista de noticias
    public function index(){
        $data = Notice::get(["id", "title", "description", "hospital_id", "created_at"]);
        return response()->json($data, 200);
    }
    //Crear una nueva noticia
    public function store(Request $request){

        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'hospital_id' => 'required|integer|exists:hospitals,id',
        ]);

        $data = new Notice($validatedData);
        $data->save();
        return response()->json($data, 200);
    }
    //Actualizar noticia
    public function update(Request $request, $id){
        //validacion
        $validarData = $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        //guardar actualizacion
        $data = Notice::findOrFail($id);
        $data->fill($validarData);
        $data->save();

        return response()->json($data, 200);
    }

    //Buscar noticia por id
    public function show($id){
        $data = Notice::find($id);
        return response()->json($data, 200);
    }
    
    //Eliminar noticia
    public function destroy($id){
        $data = Notice::findOrFail($id);
        $data->delete();
        return response()->json("Noticia eliminada", 200);
    }
}
