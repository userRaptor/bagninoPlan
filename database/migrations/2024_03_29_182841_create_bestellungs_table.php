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
        Schema::create('bestellungs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('lebensmittel');
            $table->date('datum');
            $table->time('uhrzeit');
            $table->string('ort');
            $table->string('verwendungszweck');
            $table->string('bemerkung');
            $table->boolean('includeSummary');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bestellungs');
    }
};
