<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Banner;
use Illuminate\Support\Facades\Cache;

class BannerRepository extends BaseRepository
{
    CONST CACHE_KEY = "Banner.";
    
    /**
     * @param $attribute
     * 
     * @return Banner
     */
    public function create($attributes)
    {
        $banner = Banner::create($attributes->input());

        if (!$banner) return new GeneralJsonException('Create Fail.',400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $banner;
    }


    /**
     * @param Banner $banner
     * @param $attribute
     * 
     * @return Banner
     */
    public function update($banner, $attributes)
    {
        if(!$banner->update($attributes->input())) return new GeneralJsonException("Update fail",400);
        
        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $banner->fresh();
    }


    /**
     * @param Banner $banner
     * 
     * @return mixed
     */
    public function delete($banner)
    {
        $deleted = $banner->delete(); 

        if (!$deleted) return new GeneralJsonException("Delete Fail.", 400);

        if (Cache::has(self::CACHE_KEY."All")) {
            Cache::forget(self::CACHE_KEY."All");
        }

        return $deleted;
    }
}
