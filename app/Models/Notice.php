<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'slug',
        'urlfoto',
        'hospital_id',
    ];

    public function hospital(){
        return $this->belongsTo(Hospital::class);
    }
}
