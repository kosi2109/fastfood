<?php

namespace App\Http\Controllers;

use App\Exceptions\GeneralJsonException;
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
        try {
            return SizeResource::collection($this->repository->getAll());
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * @param SizeRequest $request
     * 
     * @return SizeResource
     */
    function store(SizeRequest $request)
    {
        try {
            return new SizeResource($this->repository->create($request));
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }


    /**
     * @param Size $size
     * @param Request $request
     * 
     * @return SizeResource
     */
    function update(Size $size,Request $request)
    {
        try {
            return new SizeResource($this->repository->update($size,$request));
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * @param Size $size
     * 
     * @return mixed
     */
    function destroy(Size $size)
    {
        try {
            $this->repository->delete($size);
            
            return response(["message"=>"Delete Success"], 200);
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

}
