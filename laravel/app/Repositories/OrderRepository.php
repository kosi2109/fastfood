<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Cache;

class OrderRepository extends BaseRepository
{
    CONST CACHE_KEY = "Order.";

    /**
     * Get Oders by User
     */
    public function getOrdersByUser()
    {
        $cache_key = self::CACHE_KEY."User.".request()->user()->id."Status.".request('status');
        
        if (Cache::has($cache_key)) {
        
            $orders = Cache::get($cache_key);
        } else {

            $orders = Cache::rememberForever($cache_key, function() {
                return request()->user()->orders()->byStatus(request('status'))->get();
            });
        }

        return $orders;
    }

    /**
     * Get Oders by Admin
     */
    public function getOrdersByAdmin()
    {
        $cache_key = self::CACHE_KEY."Status.".request('status');
        if (Cache::has($cache_key)) {
            $orders = Cache::get($cache_key);
        } else {
            $orders = Cache::rememberForever($cache_key, function() {
                return Order::byStatus(request('status'))->get();
            });
        }

        return $orders;
    }

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

        $order = $order->fresh();

        $order = Cache::rememberForever(self::CACHE_KEY.$order->id, function() use($order) {
            return $order;
        });

        if (Cache::has(self::CACHE_KEY."User.".$attributes->user_id."Status.".$order->status)) {
            Cache::forget(self::CACHE_KEY."User.".$attributes->user_id."Status.".$order->status);
        }

        if (Cache::has(self::CACHE_KEY."Status.".$order->status)) {
            Cache::forget(self::CACHE_KEY."Status.".$order->status);
        }

        return $order;
    }

    /**
     * @param int $id
     * 
     * @return Order
     */
    public function detail($id)
    {
        if(Cache::has(self::CACHE_KEY.$id)) {
            $order = Cache::get(self::CACHE_KEY.$id);
        } else {
            $order = Cache::rememberForever(self::CACHE_KEY.$id, function() use($id) {
                return Order::find($id);
            });
        }

        return $order;
    }

    /**
     * @param Order $order
     * @param $attribute
     * 
     * @return Order
     */
    public function update($order, $attributes)
    {
        if (Cache::has(self::CACHE_KEY."User.".$order->user->id."Status.".$order->status)) {
            Cache::forget(self::CACHE_KEY."User.".$order->user->id."Status.".$order->status);
        }

        if (Cache::has(self::CACHE_KEY."User.".$order->user->id."Status.".$attributes->status)) {
            Cache::forget(self::CACHE_KEY."User.".$order->user->id."Status.".$attributes->status);
        }

        if (Cache::has(self::CACHE_KEY."Status.".$order->status)) {
            Cache::forget(self::CACHE_KEY."Status.".$order->status);
        }

        if (Cache::has(self::CACHE_KEY."Status.".$attributes->status)) {
            Cache::forget(self::CACHE_KEY."Status.".$attributes->status);
        }
        
        $order->status = $attributes->status;

        if (!$order->save) return new GeneralJsonException('Order Update Fails.', 500);

        $order = $order->fresh();

        $order = Cache::rememberForever(self::CACHE_KEY.$order->id, function() use($order) {
            return $order;
        });

        return $order;
    }


    /**
     * @param Order $order
     * 
     * @return mixed
     */
    public function delete($order)
    {
        if (!$order->delete()) return throw new GeneralJsonException("Order Delete Fail.");

        if (Cache::has(self::CACHE_KEY.$order->id)) {
            Cache::forget(self::CACHE_KEY.$order->id);
        }

        if (Cache::has(self::CACHE_KEY."User.".$order->user->id."Status.".$order->status)) {
            Cache::forget(self::CACHE_KEY."User.".$order->user->id."Status.".$order->status);
        }

        if (Cache::has(self::CACHE_KEY."Status.".$order->status)) {
            Cache::forget(self::CACHE_KEY."Status.".$order->status);
        }

        return true;
    }
}
