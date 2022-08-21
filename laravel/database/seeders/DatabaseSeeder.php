<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Menu;
use App\Models\Size;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $small = Size::factory()->create();
        $mid = Size::factory()->create(["name" => "M"]);
        $lg = Size::factory()->create(["name" => "L"]);

        $hot = Category::factory()->create([
            "name" => "Hot Items",
            "slug" => "hot-items",
            "feature" => true
        ]);

        $dis = Category::factory()->create([
            "name" => "Discount Items",
            "slug" => "discount-items",
            "feature" => true
        ]);

        $new = Category::factory()->create([
            "name" => "New Items",
            "slug" => "new-items",
            "feature" => true
        ]);

        $bubble = Category::factory()->create([
            "name" => "Bubble Tea",
            "slug" => "bubble-tea",
        ]);

        $burger = Category::factory()->create([
            "name" => "Burger",
            "slug" => "burger",
        ]);

        $item1 = Menu::factory()->create([
            "name" => "Blue Mountain Thai Boba",
            "slug" => "blue-mountain-thai-boba",
            "description" => "Blue Mountain combines with Thai Milk Tea, Sweet Vanilla and blueberry syrup to give the amazing taste.",
            "cover_img" => "https://chabathaibubble.com/uploads/item_images/item_61e5c2bb9c780cgb98.png" 
        ]);

        $item2 = Menu::factory()->create([
            "name" => "Lava Mountain Thai Boba",
            "slug" => "lava-mountain-thai-boba",
            "description" => "Lava Mountain combines with Thai Milk Tea, Sweet Vanilla and Brown sugar syrup to give the sweet taste",
            "cover_img" => "https://chabathaibubble.com/uploads/item_images/item_61e5c2ec7c4b5voh99.png" 
        ]);

        $item3 = Menu::factory()->create([
            "name" => "White Mountain Thai Boba",
            "slug" => "white-mountain-thai-boba",
            "description" => "White Mountain combines with Thai Milk Tea, Sweet Vanilla and Hibiscus drizzle to give the seasonal taste",
            "cover_img" => "https://chabathaibubble.com/uploads/item_images/item_61e5c337a16664ef100.png" 
        ]);

        $item4 = Menu::factory()->create([
            "name" => "Brown Sugar Milk",
            "slug" => "brown-sugar-milk",
            "description" => "Traditional East Asian drink with a distinctive caramel taste from boiled brown sugar syrup, accompanied by Tapioca bubbles known also as boba, without powder or synthetic jelly is used.",
            "cover_img" => "https://chabathaibubble.com/uploads/item_images/item_61c9bdd8d8166ay836.png" 
        ]);

        $item5 = Menu::factory()->create([
            "name" => "Taro Milk Brown Sugar",
            "slug" => "taro-milk-brown-sugar",
            "description" => "Taro root is known for its rich health benefits and its explosive taste. It becomes a popular beverage across the world with its impressive purple color. It is accompanied by Tapioca bubbles known also as boba. No powder or synthetic jelly is used.",
            "cover_img" => "https://chabathaibubble.com/uploads/item_images/item_61c9be0c59b751x637.png" 
        ]);

        $item6 = Menu::factory()->create([
            "name" => "Thai Tea Brown Sugar",
            "slug" => "thai-tea-brown-sugar",
            "description" => "We brew Black Tea flavored Thai herbs that give the distinctive orange color. The drink is accompanied by authentic Tapioca bubbles known also as boba. No powder or synthetic jelly is used.",
            "cover_img" => "https://chabathaibubble.com/uploads/item_images/item_61c9be1675c35im438.png" 
        ]);

        $item7 = Menu::factory()->create([
            "name" => "whopper",
            "slug" => "whopper",
            "description" => "Look who's here - THE burger to rule them all. A real meaty flame-grilled WHOPPER® beef patty, topped with tangy pickles, ketchup, fresh tomatoes, crisp lettuce and fresh onions, finished with creamy mayo , and served on a toasted 5' sesame seed bun. Feeling hungry for a real meaty burger yet?",
            "cover_img" => "https://www.burgerking.com.sg/upload/image/Product/2/Whopper%20300x270.png" 
        ]);

        $item8 = Menu::factory()->create([
            "name" => "ULTIMATE ANGUS CLASSIC BBQ",
            "slug" => "ultimate-angus-classic-bbq",
            "description" => "Premium has never tasted this good. Flame-grilled, extra thick and juicy Angus Beef patty served in between Corn Dusted Sourdough buns with American cheese, crispy Turkey bacon, sliced Onions, fresh Tomato, Batavia Lettuce and smoky BBQ sauce.",
            "cover_img" => "https://www.burgerking.com.sg/upload/image/Product/73/Website_Ultimate%20Selection_v1_Ultimate%20Angus%20Classic%20BBQ.jpg" 
        ]);

        $item9 = Menu::factory()->create([
            "name" => "WESTERN WHOPPER JR",
            "slug" => "western-whopper-jr",
            "description" => "A full-flavored western, in a regular size offering! A mouth-watering, flame-grilled beef patty topped with crunchy turkey bacon, American cheese, fresh tomatoes, crisp lettuce, tangy pickles and fresh onions, served on a toasted sesame seed bun and flavored with creamy mayo,tangy BBQ sauce. Take your tastebuds out on a wild ride!",
            "cover_img" => "https://www.burgerking.com.sg/upload/image/Product/5/burger-western-whopper-jr-thumb.jpg" 
        ]);

        $item10 = Menu::factory()->create([
            "name" => "DOUBLE CHEESEBURGER",
            "slug" => "double-cheeseburger",
            "description" => "Make room for our Double Cheeseburger, two signature flame-grilled beef patties topped with a simple layer of melted American cheese, crinkle cut pickles, yellow mustard, and ketchup on a toasted sesame seed bun.",
            "cover_img" => "https://www.burgerking.com.sg/upload/image/Product/9/burger-double-cheese-thumb.jpg" 
        ]);

        DB::table('category_menu')->insert([
            [
                "menu_id" => $item1->id,
                "category_id" => $hot->id
            ],
            [
                "menu_id" => $item1->id,
                "category_id" => $bubble->id
            ],
            [
                "menu_id" => $item2->id,
                "category_id" => $hot->id
            ],
            [
                "menu_id" => $item2->id,
                "category_id" => $bubble->id
            ],
            [
                "menu_id" => $item3->id,
                "category_id" => $bubble->id
            ],
            [
                "menu_id" => $item4->id,
                "category_id" => $bubble->id
            ],
            [
                "menu_id" => $item3->id,
                "category_id" => $dis->id
            ],
            [
                "menu_id" => $item4->id,
                "category_id" => $dis->id
            ],
            [
                "menu_id" => $item5->id,
                "category_id" => $bubble->id
            ],
            [
                "menu_id" => $item6->id,
                "category_id" => $bubble->id
            ],
            [
                "menu_id" => $item5->id,
                "category_id" => $new->id
            ],
            [
                "menu_id" => $item6->id,
                "category_id" => $new->id
            ],

            [
                "menu_id" => $item7->id,
                "category_id" => $new->id
            ],
            [
                "menu_id" => $item7->id,
                "category_id" => $burger->id
            ],
            [
                "menu_id" => $item8->id,
                "category_id" => $new->id
            ],
            [
                "menu_id" => $item8->id,
                "category_id" => $burger->id
            ],
            [
                "menu_id" => $item9->id,
                "category_id" => $new->id
            ],
            [
                "menu_id" => $item9->id,
                "category_id" => $burger->id
            ],
            [
                "menu_id" => $item10->id,
                "category_id" => $new->id
            ],
            [
                "menu_id" => $item10->id,
                "category_id" => $burger->id
            ],
            [
                "menu_id" => $item10->id,
                "category_id" => $hot->id
            ],
            
        ]);

        DB::table('menu_size')->insert([
            [
                "menu_id" => 1,
                "size_id" => 1,
                "price" => 2000
            ],
            [
                "menu_id" => 1,
                "size_id" => 2,
                "price" => 2500
            ],
            [
                "menu_id" => 2,
                "size_id" => 1,
                "price" => 2000
            ],
            [
                "menu_id" => 2,
                "size_id" => 2,
                "price" => 2500
            ],
            [
                "menu_id" => 3,
                "size_id" => 1,
                "price" => 2000
            ],
            [
                "menu_id" => 3,
                "size_id" => 2,
                "price" => 2500
            ],
            [
                "menu_id" => 4,
                "size_id" => 1,
                "price" => 2000
            ],
            [
                "menu_id" => 4,
                "size_id" => 2,
                "price" => 2500
            ],
            [
                "menu_id" => 5,
                "size_id" => 1,
                "price" => 2000
            ],
            [
                "menu_id" => 5,
                "size_id" => 2,
                "price" => 2500
            ],
            [
                "menu_id" => 6,
                "size_id" => 1,
                "price" => 2500
            ],
            [
                "menu_id" => 6,
                "size_id" => 2,
                "price" => 3000
            ],

            [
                "menu_id" => $item7->id,
                "size_id" => 1,
                "price" => 5000
            ],
            [
                "menu_id" => $item7->id,
                "size_id" => 2,
                "price" => 9000
            ],
            [
                "menu_id" => $item8->id,
                "size_id" => 1,
                "price" => 5000
            ],
            [
                "menu_id" => $item8->id,
                "size_id" => 2,
                "price" => 9000
            ],
            [
                "menu_id" => $item9->id,
                "size_id" => 1,
                "price" => 5000
            ],
            [
                "menu_id" => $item9->id,
                "size_id" => 2,
                "price" => 9000
            ],
            [
                "menu_id" => $item10->id,
                "size_id" => 1,
                "price" => 5000
            ],
            [
                "menu_id" => $item10->id,
                "size_id" => 2,
                "price" => 9000
            ],
        ]);

    }
}
