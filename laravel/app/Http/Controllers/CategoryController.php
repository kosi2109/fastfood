<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::orderBy('name')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cate_req = new CategoryRequest();
        $validate = Validator::make($request->all(),$cate_req->rules(),$cate_req->messages());
        if($validate->fails()){
            return response($validate->errors(),400);
        }
        return response(Category::create($request->all()),201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        $category = Category::where("slug",$slug)->get()->first();
        if(!$category){
            return response("Category with slug ' " .$slug. " ' Not Found",404);
        }
        if(!$category->update($request->all())) return response("Update fail",400);

        return $category;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy($slug)
    {
        $category = Category::where('slug',$slug)->get()->first();

        if(!$category) return response("Category with slug ' " .$slug. " ' Not Found",404);

        if(!$category->delete()) return response("Delete Fail",400);

        return response("Delete Success",200);
    }

    /**
     * Get Feature Category from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOnlyFeature()
    {
        return Category::with('menus')->where('feature',true)->get();
    }
}
