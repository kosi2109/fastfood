<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    function index()
    {
        return response(Size::all(),200);
    }

    function store()
    {
        $size = request('size');

        if(!$size) return response(["message"=>"Size Fiels is required"],400);
        
        $new_size = new Size();
        
        $new_size->name = $size;
        
        if(!$new_size->save()) return response(["message"=>"Something wrong"],400);
        
        return response($new_size,200);
    }

    function update(Size $size)
    {
        if(!$size) return response(["message"=>"Size Fiels is required"],400);
        
        $size->name = request('size');
        
        if(!$size->save()) return response(["message"=>"Something wrong"],400);
        
        return response($size->fresh(),200);
    }

    function destroy(Size $size)
    {
        if(!$size) return response(["message"=>"Size Fiels is required"],400);
        
        if(!$size->delete()) return response(["message"=>"Something wrong"],400);
        
        return response(["message"=>"Delete Success"],200);
    }

}
