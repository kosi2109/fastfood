<?php

namespace App\Http\Controllers;

use App\Exceptions\GeneralJsonException;
use App\Http\Requests\OrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Repositories\OrderRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrderController extends Controller
{
    public function __construct(
        private OrderRepository $repository
    )
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return ResourceCollection
     */
    public function index()
    {
        try {
            if (request()->user()->role == 3) {
                return OrderResource::collection($this->repository->getOrdersByAdmin());
            }
            return OrderResource::collection($this->repository->getOrdersByUser());
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrderRequest $request)
    {
        try {
            return new OrderResource($this->repository->create($request));
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * 
     * @return OrderResource
     */
    public function show($id)
    {
        try {
            return new OrderResource($this->repository->detail($id));
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        try {
            return new OrderResource($this->repository->update($order, $request));
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        try {
            $this->repository->delete($order);

            return response(["message" => "Order was successfully deleted."]);
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }
}
