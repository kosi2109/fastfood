<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Category;
use App\Models\Menu;

class CategoryRepository extends BaseRepository
{
    /**
     * @param $attribute
     * 
     * @return Menu
     */
    public function create($attributes)
    {
        $category = Category::create($attributes->all());

        if (!$category) return new GeneralJsonException('Create Fail',400);

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

        return $deleted;
    }
}
