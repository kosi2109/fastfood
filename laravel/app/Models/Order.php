<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $with = ['items','user'];

    protected $guarded = [];

    public function scopeByStatus($query,string $status){
        $query->when($status,function ($query,$status){
            $query->where("status",$status);
        });
    }

    public function user ()
    {
        return $this->belongsTo(User::class);
    }

    public function items ()
    {
        return $this->hasMany(OrderItem::class);
    }
}
