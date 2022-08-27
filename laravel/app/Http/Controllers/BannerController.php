<?php

namespace App\Http\Controllers;

use App\Exceptions\GeneralJsonException;
use App\Http\Requests\BannerRequest;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use App\Repositories\BannerRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BannerController extends Controller
{

    public function __construct(
        private BannerRepository $respository
    )
    {
        //
    }

    /**
     * @return ResourceCollection
     */
    public function index ()
    {
        try {
            return BannerResource::collection($this->respository->getAll());
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * @param BannerRequest $request
     * 
     * @return BannerResource
     */
    public function store (BannerRequest $request)
    {
        try {
            return new BannerResource($this->respository->create($request));
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * @param Request $request
     * @param Banner $banner
     * 
     * @return BannerResource
     */
    public function update (Request $request, Banner $banner) 
    {
        try {
            return new BannerResource($this->respository->update($banner,$request));
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * @param Banner $banner
     */
    public function destroy (Banner $banner) 
    {
        try {
            $this->respository->delete($banner);
    
            return response("Delete Success", 200);
        } catch (\Throwable $th) {
            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

}
