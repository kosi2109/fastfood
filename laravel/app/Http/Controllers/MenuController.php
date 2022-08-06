<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Repositories\MenuRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MenuController extends Controller
{
    public function __construct(
        private MenuRepository $repository
    )
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return ResourceCollection
     */
    public function index()
    {
        try {
            $menu = Menu::byCategory(request(['category','name']))->get();
            return MenuResource::collection($menu);
        } catch (\Throwable $th) {
            return response("Something wrong", 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * 
     * @return MenuResource
     */
    public function store(MenuRequest $request)
    {
        try {
            $menu = $this->repository->create($request);

            return new MenuResource($menu->fresh());
        } catch (\Throwable $th) {
            return response($th, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * 
     * @return MenuResource
     */
    public function show(Menu $menu)
    {
        return new MenuResource($menu);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Menu  $menu
     * 
     * @return MenuResource
     */
    public function update(Request $request, Menu $menu)
    {
        try {

            return new MenuResource($this->repository->update($menu,$request));

        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Menu  $menu
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
        $this->repository->delete($menu);

        return response("Delete Success", 200);
    }
}
