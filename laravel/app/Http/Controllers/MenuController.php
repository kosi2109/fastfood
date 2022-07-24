<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $menu = Menu::byCategory(request(['category']))->get();
            return response($menu, 200);
        } catch (\Throwable $th) {
            return response("Something wrong", 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $menureq = new MenuRequest();
        $validator = Validator::make($request->all(), $menureq->rules(), $menureq->messages());

        if ($validator->fails()) return response($validator->errors(), 422);

        try {
            $menu = Menu::create($request->except(['categories', 'prices']));
            if ($menu) {
                $menu->categories()->sync($request->categories);
                $menu->sizes()->sync($request->prices);
            }

            return response($menu->fresh(), 201);
        } catch (\Throwable $th) {
            return response("Error in catch", 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $menu = Menu::where('slug', $slug)->first();

        if (!$menu) return response("Menu with slug ' " . $slug . " ' Not Found", 404);

        return response($menu);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        $menu = Menu::where('slug', $slug)->get()->first();

        if (!$menu) return response("Menu with slug ' " . $slug . " ' Not Found", 404);

        if (!$menu->update($request->except(['categories','prices']))) return response("Update Fail", 400);

        $menu->categories()->sync($request->categories);
        
        $menu->sizes()->sync($request->prices);

        return response($menu->fresh(), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $slug)
    {
        $menu = Menu::where('slug', $slug)->get()->first();

        if (!$menu) return response("Menu with slug ' " . $slug . " ' Not Found", 404);

        if (!$menu->delete()) return response("Delete Fail", 400);

        return response("Delete Success", 200);
    }
}
