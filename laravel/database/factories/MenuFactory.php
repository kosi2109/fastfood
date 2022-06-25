<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "user_id" => User::factory(),
            "category_id" => Category::factory(),
            "name" => $this->faker->name(),
            "slug" => $this->faker->unique()->slug(),
            "description" => $this->faker->text(),
            "cover_img" => "https://images.deliveryhero.io/image/fd-mm/LH/y9hm-hero.jpg?width=512&height=384&quality=45" 
        ];
    }
}
