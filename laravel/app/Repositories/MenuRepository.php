<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Menu;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/**
 * Repository : Menu
 */
class MenuRepository extends BaseRepository
{
    CONST CACHE_KEY = "Menu.";

    /**
     * get all menus or filtered (categories , name) menus
     */
    public function filterOrAll()
    {
        if (request('category')) {
            // cache by category
            if(Cache::has(self::CACHE_KEY."category.".request('category'))) {

                $menus = Cache::get(self::CACHE_KEY."category.".request('category'));
            } else {

                $menus = Cache::rememberForever(self::CACHE_KEY."category.".request('category'), function(){
                    return Menu::byFilter(request(['category']))->get();
                });
            }

        } else if (request('name')) {
            // cache by search name
            if(Cache::has(self::CACHE_KEY."name.".request('name'))) {

                $menus = Cache::get(self::CACHE_KEY."name.".request('name'));
            } else {

                $menus = Cache::rememberForever(self::CACHE_KEY."name.".request('name'), function(){
                    return Menu::byFilter(request(['name']))->get();
                });
            }

        } else {
            // cache all menus 
            if(Cache::has(self::CACHE_KEY."all")) {

                $menus = Cache::get(self::CACHE_KEY."all");
            } else {

                $menus = Cache::rememberForever(self::CACHE_KEY."all", function(){
                    return Menu::all();
                });
            }
        }

        return $menus;
    }

    /**
     * get discount menus
     */
    public function getDiscountMenus()
    {
        if(Cache::has(self::CACHE_KEY."discount")) {
            $menus = Cache::get(self::CACHE_KEY."discount");
        } else {
            $menus = Cache::rememberForever(self::CACHE_KEY."discount", function(){
                return Menu::all()->filter(function ($item, $key) {
                    return $item->discount != null;
                });
            });
        }

        return $menus;
    }

    /**
     * get random menus
     * @param int $id
     */
    public function getRandomMenus($id)
    {

        if(Cache::has(self::CACHE_KEY."random.".$id)) {
            $menus = Cache::get(self::CACHE_KEY."random.".$id);
        } else {
            $menus = Cache::rememberForever(self::CACHE_KEY."random".$id, function() use($id) {
                return Menu::where('id', '!=' , $id)->inRandomOrder()->take(5)->get();
            });
        }

        return $menus;
    }

    /**
     * Create : Menu
     * @param $attribute
     * 
     * @return Menu
     */
    public function create($attributes)
    {
        $menu = Menu::create($attributes->except(['categories', 'prices']));

        if (!$menu) return new GeneralJsonException('Create Fail.',400);
        
        $menu->categories()->sync($attributes->categories);

        $menu->sizes()->sync($attributes->prices);

        $menu->fresh();
        
        // clear menus cache list
        $this->cacheListClear($menu->categories,$menu->name);
        
        // cache new menu
        $menu = Cache::rememberForever(self::CACHE_KEY.$menu->slug, function() use($menu) {
            return $menu; 
        });

        return $menu;
    }


    /**
     * Update : Menu
     * @param Menu $menu
     * @param $attribute
     * 
     * @return Menu
     */
    public function update($menu, $attributes)
    {
        return DB::transaction(function() use ($menu, $attributes) {
            if (!$menu->update($attributes->except(['categories', 'prices', 'sizes','discount']))) return new GeneralJsonException("Update Fail.", 400);
    
            $menu->categories()->sync($attributes->categories);
            
            $menu->sizes()->detach();
    
            $menu->sizes()->attach($attributes->prices);
    
            $menu = $menu->fresh();
            
            // clear menus cache list
            $this->cacheListClear($menu->categories,$menu->name);
    
            // cache update menu (overwrite on key)
            $menu = Cache::rememberForever(self::CACHE_KEY.$menu->slug, function() use($menu) {
                return $menu; 
            });
        
            return $menu;
        });
    }


    /**
     * Delete : Menu
     * @param Menu $menu
     * 
     * @return mixed
     */
    public function delete($menu)
    {
        $deleted = $menu->delete(); 

        if (!$deleted) return new GeneralJsonException('Delete Fail.',400);

        // clear menus cache list
        $this->cacheListClear($menu->categories,$menu->name);
        
        // clear single menu cache by slug
        if (Cache::has(self::CACHE_KEY.$menu->slug)) {
            Cache::forget(self::CACHE_KEY.$menu->slug);
        }

        return $deleted;
    }

    /**
     * Detail : Menu
     * @param string $slug
     * 
     * @return mixed
     */
    public function detail($slug)
    {
        if (Cache::has(self::CACHE_KEY.$slug)) {
            
            // get menu from cache
            $menu = Cache::get(self::CACHE_KEY.$slug);
        } else {
            
            // get menu from database
            $menu = Cache::rememberForever(self::CACHE_KEY.$slug, function() use($slug) {
                return Menu::where('slug', $slug)->first(); 
            });
        }

        return $menu;
    }

    /**
     * Clear Cache : All menus , Menus by category . Menus by name
     * @param array $categories
     * @param string $menuName
     * 
     * @return void
     */
    public function cacheListClear($categories, $menuName)
    {
        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        foreach ($categories as $category) {
            if (Cache::has(self::CACHE_KEY."category.".$category->slug)) {
                Cache::forget(self::CACHE_KEY."category.".$category->slug);
            }
        }

        if (Cache::has(self::CACHE_KEY."name.".$menuName)) {
            Cache::forget(self::CACHE_KEY."name.".$menuName);
        }
    }
}
