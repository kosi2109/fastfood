<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\Size;

class SizeRepository extends BaseRepository
{
    /**
     * @param $attribute
     * 
     * @return Size
     */
    public function create($attributes)
    {
        $create = Size::create($attributes->input());

        if(!$create) return new GeneralJsonException("Create Fail.",400);

        return $create;
    }


    /**
     * @param Size $size
     * @param $attribute
     * 
     * @return Menu
     */
    public function update($size,$attributes)
    {
        
        if(!$size->update($attributes->input())) return new GeneralJsonException("Update fail.",400);

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

        return $deleted;
    }
}
