<?php

namespace App\Http\Controllers\Api\ServiceManager;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //Mostramos la lista de tareas filtrado por servicio
    public function getUserServiceTasks(){
        $user = Auth::user();

        $serviceId = $user->service_id;

        $service = Service::with('task')->find($serviceId);

        $tasks = $service->task;

        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'No hay tareas asignadas a su servicio.'], 200);
        }

        return response()->json($tasks, 200);
    }

    public function toggleTaskCompletion(Request $request, Task $task)
    {
        $user = Auth::user();

        // Si no hay usuario autenticado
        if (!$user) {
            return response()->json(['message' => 'No autorizado para modificar esta tarea.'], 403);
        }

        $request->validate([
            'completed' => 'required|boolean', //(true/false)
        ]);

        // 3. Actualizar el estado 'completed' de la tarea
        $task->completed = $request->input('completed');
        $task->save();

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
