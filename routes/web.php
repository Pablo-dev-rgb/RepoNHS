<?php

use Illuminate\Support\Facades\Route;
// use Spatie\Permission\Models\Role;

// $role = Role::create(["name" => "Admin"]);
// $role = Role::create(["name" => "Chief"]);
// $role = Role::create(["name" => "ServiceManager"]);
// $role = Role::create(["name" => "Employee"]);


Route::get('{any}', function () {
    return view('welcome');
})->where("any",".*");
