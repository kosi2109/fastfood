<?php

namespace App\Repositories;

use App\Exceptions\GeneralJsonException;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class UserRepository extends BaseRepository
{
    /**
     * Detail : Find User By Email
     * @param string $email
     * 
     * @return User
     */
    public function findByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    /**
     * Create : User
     * @param $attribute
     * 
     * @return User
     */
    public function create($attributes)
    {
        $data = $attributes->input();

        if (isset($data['profile_img'])) {
            @list($type, $file_data) = explode(';', $data['profile_img']);
            @list(, $file_data) = explode(',', $file_data); 
            $imageName = time().'.'.explode('/',$type)[1];   
            Storage::disk('local')->put('public/profile/'.$imageName, base64_decode($file_data));
            $data['profile_img'] = env('APP_URL').'/storage/profile/'.$imageName;
        }
        
        $user = User::create($data);

        if (!$user) return new GeneralJsonException('Create Fail.',400);

        return $user;
    }


    /**
     * Update : User
     * @param User $user
     * @param $attribute
     * 
     * @return User
     */
    public function update($user, $attributes)
    {
        if(!$user->update($attributes->input())) return new GeneralJsonException("Update fail",400);

        return $user->fresh();
    }


    /**
     * Delete : User
     * @param User $user
     * 
     * @return mixed
     */
    public function delete($user)
    {
        $deleted = $user->delete(); 

        if (!$deleted) return new GeneralJsonException("Delete Fail.", 400);

        return $deleted;
    }
}
