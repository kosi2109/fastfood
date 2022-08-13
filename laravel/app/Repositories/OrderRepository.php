<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Order;
use App\Models\OrderItem;

class OrderRepository extends BaseRepository
{
    /**
     * @param $attribute
     * 
     * @return Order
     */
    public function create($attributes)
    {
        $order = request()->user()->orders()->create($attributes->except(['items']));

        if (!$order) return new GeneralJsonException('Order Fails.', 400);

        foreach ($attributes->items as $item) {
            $item['order_id'] = $order->id;
            OrderItem::create($item);
        }

        return $order->fresh();
    }


    /**
     * @param Banner $banner
     * @param $attribute
     * 
     * @return Order
     */
    public function update($banner, $attributes)
    {
        
    }


    /**
     * @param Banner $banner
     * 
     * @return mixed
     */
    public function delete($banner)
    {

    }
}
