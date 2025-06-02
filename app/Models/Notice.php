<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory;

    public function hospital(){
        return $this->belongsTo(Hospital::class);
    }

    public function users(){
        return $this->belongsTo(User::class);
    }
}
