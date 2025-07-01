<?php

//public
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FrontController;
//RolAdmin
use App\Http\Controllers\Api\Admin\ServiceController;
use App\Http\Controllers\Api\Admin\UserController;
//RolChief
use App\Http\Controllers\Api\Chief\NoticeController;
use App\Http\Controllers\Api\Chief\TaskController;
//RolServiceManager
use App\Http\Controllers\Api\ServiceManager\TaskController as ServiceManagerTaskController;
use App\Http\Controllers\Api\ServiceManager\UserController as ServiceManagerUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function(){
    //PUBLIC
    Route::post("/auth/login", [AuthController::class,"login"])->name("login");
    Route::get("/public/notices", [FrontController::class, "notices"]);

    //PRIVADO
    Route::group(["middleware" => "auth:sanctum"], function(){

        //:auth
        Route::post("/auth/logout", [AuthController::class, "logout"]);

        //:rolAdmin(admin/users y admin/service)
        Route::post("/admin/register", [AuthController::class, "register"]);
        Route::get("/admin/roles", [AuthController::class, "getRoles"]);
        Route::get("/admin/hospitals", [AuthController::class, "getHospital"]);
        Route::get("/admin/services", [AuthController::class, "getService"]);
        Route::apiResource("/admin/user", UserController::class);
        Route::apiResource("/admin/service", ServiceController::class);

        //:rolChief(chief/notice y chief/task)
        Route::apiResource("/chief/notice", NoticeController::class);
        Route::apiResource("/chief/task", TaskController::class);
        Route::post("/chief/search",[TaskController::class,"search"]);
        Route::get("/chief/services",[TaskController::class,"getService"]);

        //:rolServiceManager(SM/task)
        Route::get("/servicemanager/my-task", [ServiceManagerUserController::class, "getUserServiceTasks"]);
        Route::put('/servicemanager/task/{task}/toggle-completion', [ServiceManagerUserController::class, 'toggleTaskCompletion']);

    });
});

Route::middleware("auth:sanctum")->get("/user", function (Request $request){
    return $request->user();
});