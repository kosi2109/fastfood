<?php

namespace App\Repositories;

use App\Models\Menu;

class MenuRepository extends BaseRepository
{
    /**
     * @param $attribute
     * 
     * @return Menu
     */
    public function create($attributes)
    {

        $menu = Menu::create($attributes->except(['categories', 'prices']));

        if ($menu) {
            $menu->categories()->sync($attributes->categories);
            $menu->sizes()->sync($attributes->prices);
        }

        return $menu;
    }


    /**
     * @param Menu $menu
     * @param $attribute
     * 
     * @return Menu
     */
    public function update($menu, $attributes)
    {
        if (!$menu->update($attributes->except(['categories', 'prices']))) return response("Update Fail", 400);

        $menu->categories()->sync($attributes->categories);
        
        $menu->sizes()->detach();

        $menu->sizes()->attach($attributes->prices);
    
        return $menu->fresh();
    }


    /**
     * @param Menu $menu
     * 
     * @return mixed
     */
    public function delete($menu)
    {
        $deleted = $menu->delete(); 

        if (!$deleted) return response()->json("Can't delete");

        return $deleted;
    }
}
