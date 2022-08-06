<?php

namespace App\Http\Controllers;

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
        return BannerResource::collection(Banner::all());
    }

    /**
     * @param BannerRequest $request
     * 
     * @return BannerResource
     */
    public function store (BannerRequest $request)
    {
        return new BannerResource($this->respository->create($request));
    }

    /**
     * @param Request $request
     * @param Banner $banner
     * 
     * @return BannerResource
     */
    public function update (Request $request, Banner $banner) 
    {
        return new BannerResource($this->respository->update($banner,$request));
    }

    /**
     * @param Banner $banner
     */
    public function destroy (Banner $banner) 
    {
        $this->respository->delete($banner);

        return response("Delete Success", 200);
    }

}
