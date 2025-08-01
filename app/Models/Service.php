<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hospital_id',
    ];

    public function task(){
        return $this->hasMany(Task::class);
    }

    public function hospital(){
        return $this->belongsTo(Hospital::class);
    }
}
