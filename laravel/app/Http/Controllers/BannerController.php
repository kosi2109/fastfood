<?php

namespace App\Http\Controllers;

use App\Http\Requests\BannerRequest;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function index ()
    {
        return Banner::all();
    }

    public function store (BannerRequest $request)
    {
        return Banner::create($request->input());
    }

    public function update (Request $request,$id) 
    {
        $banner = Banner::where('id',$id)->get()->first();

        if(!$banner){
            return response("Banner with id ' " .$id. " ' Not Found",404);
        }

        if(!$banner->update($request->input())) return response("Update fail",400);

        return $banner;
    }

    public function destroy ($id) 
    {
        $banner = Banner::where('id',$id)->get()->first();

        if(!$banner){
            return response("Banner with id ' " .$id. " ' Not Found",404);
        }

        if (!$banner->delete()) return response("Delete Fail", 400);

        return response("Delete Success", 200);

    }

}
