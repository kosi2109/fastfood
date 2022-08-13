<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class OrderItem extends Model
{
    use HasFactory;

    protected $guarded = [] ;

    protected $with = ['menu','size'] ;

    public function menu ()
    {
        return $this->belongsTo(Menu::class);
    }

    public function size ()
    {
        return $this->belongsTo(Size::class);
    }

    // public function price ()
    // {
    //     return DB::table('menu_size')->where('menu_id',$this->menu_id)->where('size_id',$this->size_id)->value('price');
    // }
}
