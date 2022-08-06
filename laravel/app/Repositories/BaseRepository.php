<?php

namespace App\Repositories;

abstract class BaseRepository 
{
    abstract public function create ($attribute);
    abstract public function update ($model,$attribute);
    abstract public function delete ($model);
}