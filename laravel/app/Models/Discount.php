<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $fillable = [
        "menu_id",
        "discount",
        "discount_from",
        "discount_to"
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
