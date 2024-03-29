<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Size;
use Illuminate\Support\Facades\Cache;

class SizeRepository extends BaseRepository
{
    CONST CACHE_KEY = "Size.";

    /**
     * @return Size
     */
    public function getAll()
    {
        if (Cache::has(self::CACHE_KEY."All")) {
            $sizes = Cache::get(self::CACHE_KEY."All");
        } else {
            $sizes = Cache::rememberForever(self::CACHE_KEY."All", function() {
                return Size::all();
            });
        }

        return $sizes;
    }

    /**
     * @param $attribute
     * 
     * @return Size
     */
    public function create($attributes)
    {
        $create = Size::create($attributes->input());

        if(!$create) return new GeneralJsonException("Create Fail.",400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $create;
    }


    /**
     * @param Size $size
     * @param $attribute
     * 
     * @return Size
     */
    public function update($size,$attributes)
    {
        
        if(!$size->update($attributes->input())) return new GeneralJsonException("Update fail.",400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $size->fresh();
    }


    /**
     * @param Size $size
     * 
     * @return mixed
     */
    public function delete($size)
    {
        $deleted = $size->delete(); 
        
        if(!$deleted) return new GeneralJsonException("Delete Fail.",400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $deleted;
    }
}
