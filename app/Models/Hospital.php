<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    use HasFactory;//nos queadmos haciendo las relaciones en necesaro investigar si es necesario poner los valores por default

    public function notice(){
        return $this->hasMany(Notice::class);
    }
    public function service(){
        return $this->hasMany(Service::class);
    }
    public function users(){
        return $this->hasMany(User::class);
    }
}
