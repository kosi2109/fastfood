<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'cover_img' => $this->cover_img,
            'categories' => CategoryResource::collection($this->categories),
            'sizes' => SizeWithPriceResource::collection($this->sizes),
            'discount' => new DiscountResource($this->discount)
        ];
    }
}
