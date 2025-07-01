<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notice;

class FrontController extends Controller
{
    public function notices(Request $request){
        $data = Notice::get(["id", "title", "description", "hospital_id", "created_at"]);
        return response()->json($data, 200);
    }
}
