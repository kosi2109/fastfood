<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id');

            $table->integer('grand_total');

            $table->integer('deli_fee');

            $table->string('address');

            $table->enum('status',[1, 2, 3])->default(1);

            $table->enum('role',[1, 2, 3])->default(1);

            $table->timestamp('shipped_at')->nullable();

            $table->foreignId('shipped_by')->nullable();

            $table->text('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
