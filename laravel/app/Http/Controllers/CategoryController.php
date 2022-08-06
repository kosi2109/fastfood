<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\FeatureCategoryResource;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoryController extends Controller
{
    public function __construct(
        private CategoryRepository $repostory
    )
    {
        //
    }

    /**
     * Display a listing of the category.
     *
     * @return ResourceCollection
     */
    public function index()
    {
        return CategoryResource::collection(Category::orderBy('name')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * 
     * @return CategoryResource
     */
    public function store(CategoryRequest $request)
    {
        return new CategoryResource($this->repostory->create($request)); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * 
     * @return CategoryResource
     */
    public function update(Request $request, Category $category)
    {
        return new CategoryResource($this->repostory->update($category,$request));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $this->repostory->delete($category);

        return response("Delete Success",200);
    }

    /**
     * Get Feature Category from storage.
     *
     * @return FeatureCategoryResource
     */
    public function getOnlyFeature()
    {
        return FeatureCategoryResource::collection(Category::with('menus')->where('feature',true)->get());
    }
}
