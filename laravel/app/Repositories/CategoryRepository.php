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
     * @param bool $feature
     * 
     * @return $categories
     */
    public function getByFeature(bool $feature = true)
    {
        if ($feature) {
            if (Cache::has(self::CACHE_KEY."Feature")) {
                $categories = Cache::get(self::CACHE_KEY."Feature");
            } else {
                $categories = Cache::rememberForever(self::CACHE_KEY."Feature", function() {
                    return Category::with('menus')->where('feature',true)->get();
                });
            }
        } else {
            if (Cache::has(self::CACHE_KEY."All")) {
                $categories = Cache::get(self::CACHE_KEY."All");
            } else {
                $categories = Cache::rememberForever(self::CACHE_KEY."All", function() {
                    return Category::where('feature',false)->orderBy('name')->get();
                });
            }
        }

        return $categories;
    }

    /**
     * @param $attribute
     * 
     * @return Category
     */
    public function create($attributes)
    {
        $category = Category::create($attributes->all());

        if (!$category) return new GeneralJsonException('Create Fail',400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        if (Cache::has(self::CACHE_KEY."Feature")) {
            Cache::forget(self::CACHE_KEY."Feature");
        }

        $category = Cache::rememberForever(self::CACHE_KEY."Slug".$category->slug, function() use($category) {
            return $category;
        });

        return $category;
    }


    /**
     * @param Category $category
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

        if (Cache::has(self::CACHE_KEY."Feature")) {
            Cache::forget(self::CACHE_KEY."Feature");
        }

        $category = $category->fresh();

        $category = Cache::rememberForever(self::CACHE_KEY."Slug".$category->slug, function() use($category) {
            return $category;
        });

        return $category;
    }


    /**
     * @param Menu $category
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

        if (Cache::has(self::CACHE_KEY."Feature")) {
            Cache::forget(self::CACHE_KEY."Feature");
        }

        if (Cache::has(self::CACHE_KEY."Slug".$category->slug)) {
            Cache::forget(self::CACHE_KEY."Slug".$category->slug);
        }

        return $deleted;
    }
}
