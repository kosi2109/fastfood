<?php

namespace App\Repositories;

use App\Models\Banner;
use App\Models\Menu;

class BannerRepository extends BaseRepository
{
    /**
     * @param $attribute
     * 
     * @return Banner
     */
    public function create($attributes)
    {
        $banner = Banner::create($attributes->input());

        if (!$banner) return response('Error');

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
            
        if(!$banner->update($attributes->input())) return response("Update fail",400);
    
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

        if (!$deleted) return response("Delete Fail", 400);

        return $deleted;
    }
}
