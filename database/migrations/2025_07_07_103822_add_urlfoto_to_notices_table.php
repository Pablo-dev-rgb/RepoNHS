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
        Schema::table('notices', function (Blueprint $table) {
            $table->string('urlfoto', 200)->nullable()->after('description');
            // Especificamos el tipo de dato varchar (string), permitimos valores nulos
            // y lo colocamos después de la columna 'description' (opcional, pero útil para mantener un orden lógico).
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notices', function (Blueprint $table) {
            $table->dropColumn('urlfoto');
            // Este método elimina la columna 'urlfoto' si se revierte la migración.
        });
    }
};
