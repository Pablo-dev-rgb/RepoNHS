<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notice', function (Blueprint $table) {
            $table->id();
            $table->string("title", 50);
            $table->string("description", 150);
            $table->foreignId("hospital_id")->references("id")->on("hospital")->onUpdate("cascade")->onDelete("cascade");
             $table->foreignId("create_by_user_id")->references("id")->on("users")->onUpdate("cascade")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notice');
    }
};
