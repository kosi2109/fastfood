<?php

namespace App\Http\Controllers;

use App\Exceptions\GeneralJsonException;
use App\Http\Requests\MenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use App\Repositories\MenuRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

/**
 * Controller : Menu
 */
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

            return MenuResource::collection($this->repository->filterOrAll());

        } catch (\Throwable $th) {

            return new GeneralJsonException($th->getMessage(), 500);
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

            return new MenuResource($this->repository->create($request));

        } catch (\Throwable $th) {

            return new GeneralJsonException($th->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Menu  $menu
     * 
     * @return MenuResource
     */
    public function show($slug)
    {
        return new MenuResource($this->repository->detail($slug));
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

            return new GeneralJsonException($th->getMessage(), 500);
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
        try {

            $this->repository->delete($menu);
    
            return response("Delete Success", 200);

        } catch (\Throwable $th) {

            return new GeneralJsonException($th->getMessage(), 500);
        }
    }
}
