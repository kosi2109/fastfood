<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
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
            "id" => $this->id,
            'user' => $this->user,
            "grand_total" => $this->grand_total,
            "deli_fee" => $this->deli_fee,
            "address" => $this->address,
            'status' => $this->status,
            'date' => $this->created_at,
            "items" => OrderItemResource::collection($this->items) ,
        ];
    }
}
