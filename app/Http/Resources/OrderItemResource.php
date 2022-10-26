<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'menu_name' => $this->menu->name,
            'quantity' => $this->quantity,
            'size' => $this->size->name,
            'price' => $this->menu->sizes()->where('size_id',$this->size->id)->get(['price'])->first()->price,
        ];
    }
}
