<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Support\Facades\Cache;

class CategoryRepository extends BaseRepository
{
    CONST CACHE_KEY = "Category.";
    /**
     * @param $attribute
     * 
     * @return Menu
     */
    public function create($attributes)
    {
        $category = Category::create($attributes->all());

        if (!$category) return new GeneralJsonException('Create Fail',400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $category;
    }


    /**
     * @param Category $menu
     * @param $attribute
     * 
     * @return Category
     */
    public function update($category,$attributes)
    {

        if(!$category->update($attributes->input())) return new GeneralJsonException("Update fail",400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $category->fresh();
    }


    /**
     * @param Menu $menu
     * 
     * @return mixed
     */
    public function delete($category)
    {
        $deleted = $category->delete(); 
        
        if(!$deleted) return new GeneralJsonException("Delete Fail",400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $deleted;
    }
}
