<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notice;

class FrontController extends Controller
{
    public function notices(){
        $notices = Notice::orderByDesc("created_at")->paginate(
            $perPage = 2, $colum = ['*'], $pageName = "notices"
        );
        return response()->json($notices, 200);
    }

    //Buscador de Noticia
    public function search(Request $request){
        $textBusqueda = $request->text;
        $data = Notice::where("title", "like", "%" . $textBusqueda . "%")->orderByDesc("created_at")->get();
        // $perPage = 3, // Puedes ajustar esto al número de resultados por página deseado
        // $colum = ['*'],
        // $pageName = "search_results"
        // );
        return response()->json($data, 200);
    }
}
