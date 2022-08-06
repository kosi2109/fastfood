<?php

namespace App\Http\Controllers;

use App\Http\Requests\SizeRequest;
use App\Http\Resources\SizeResource;
use App\Models\Size;
use App\Repositories\SizeRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SizeController extends Controller
{
    public function __construct(
        private SizeRepository $repository
    )
    {
        //
    }
    /**
     * @return ResourceCollection
     */
    function index()
    {
        return SizeResource::collection(Size::all());
    }

    /**
     * @param SizeRequest $request
     * 
     * @return SizeResource
     */
    function store(SizeRequest $request)
    {
        return new SizeResource($this->repository->create($request));
    }


    /**
     * @param Size $size
     * @param Request $request
     * 
     * @return SizeResource
     */
    function update(Size $size,Request $request)
    {
        return new SizeResource($this->repository->update($size,$request));
    }

    /**
     * @param Size $size
     * 
     * @return mixed
     */
    function destroy(Size $size)
    {
        $this->repository->delete($size);
        
        return response(["message"=>"Delete Success"],200);
    }

}
