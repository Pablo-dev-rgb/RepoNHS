<?php

namespace App\Http\Controllers\Api\Chief;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Notice;

class NoticeController extends Controller
{
    //Mostrar lista de noticias
    public function index(){
        $notices = Notice::orderByDesc("created_at")->paginate(
            $perPage = 2, $colum = ['*'], $pageName = "notice"
        );
        return response()->json($notices, 200);
    }

    //Crear una nueva noticia
    public function store(Request $request){

        $data = new Notice($request->all());
        //upload image base64
        if($request->urlfoto){
            $img = $request->urlfoto;
            //process cargado de img
            $folderPath = "img/notice/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->title) . "." .$image_type;
            file_put_contents(public_path($file), $image_base64);

            //save img in DB
            $data->urlfoto = Str::slug($request->title) . "." .$image_type;
        }
        $data->slug = Str::slug($request->title);
        $data->save();
        return response()->json($data, 200);
    }

    //Actualizar noticia
    public function update(Request $request, $id){

        $data = Notice::find($id);
        //$data->fill($request->all());
        $data->title = $request->title;
        $data->description = $request->description;
        $data->slug = Str::slug($request->title);
        //upload file
        if($request->file){
            $img = $request->file;
            //process cargado de img
            $folderPath = "img/notice/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);

            $file = $folderPath . Str::slug($request->title) . "." .$image_type;
            file_put_contents(public_path($file), $image_base64);
            //save img in DB
            $data->urlfoto = Str::slug($request->title) . "." .$image_type;
        }

        //$data->slug = Str::slug($request->nombre);
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
