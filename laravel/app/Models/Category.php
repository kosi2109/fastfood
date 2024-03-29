<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    
    protected $fillable = [
        "menu_id",
        "category_id",
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function menus ()
    {
        return $this->belongsToMany(Menu::class);
    }
}
