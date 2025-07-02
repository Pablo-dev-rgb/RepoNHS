<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notice;

class FrontController extends Controller
{
    public function notices(){
        $data = Notice::orderByDesc("created_at")->get();
        return response()->json($data, 200);
    }

    //Buscador de Noticia
    public function search(Request $request){
        $textBusqueda = $request->text;
        $data = Notice::where("title", "like", "%" . $textBusqueda . "%")->get();
        return response()->json($data, 200);
    }
}
