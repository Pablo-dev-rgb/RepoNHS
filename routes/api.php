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
use App\Http\Controllers\Api\ServiceManager\ServiceController as ServiceManagerServiceController;
use App\Http\Controllers\Api\ServiceManager\TaskController as ServiceManagerTaskController;
use App\Http\Controllers\Api\ServiceManager\UserController as ServiceManagerUserController;
//RolEmployee
use App\Http\Controllers\Api\Employee\ServiceController as EmployeeServiceController;
use App\Http\Controllers\Api\Employee\TaskController as EmployeeTaskController;

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

        //:rolServiceManager(SM/task y SM/users SM/service)
        Route::apiResource("/servicemanager/user", ServiceManagerUserController::class);
        Route::apiResource("/servicemanager/task", ServiceManagerTaskController::class);
        Route::apiResource("/servicemanager/service", ServiceManagerServiceController::class);

    });
});

Route::middleware("auth:sanctum")->get("/user", function (Request $request){
    return $request->user();
});