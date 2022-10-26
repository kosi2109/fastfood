<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'grand_total' => ['required', 'integer'],
            'deli_fee' => ['required', 'integer'],
            'address' => ['required'],
            'items.*.menu_id' => ['required', Rule::exists('menus', 'id')],
            'items.*.size_id' => ['required', Rule::exists('sizes', 'id')],
            'items.*.quantity' => ['required', 'integer'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'items.*.menu_id.required' => 'Menu id is required for item .',
            'items.*.size_id.required' => 'Size id is required for item .',
            'items.*.quantity.required' => 'Quantity is required for item .',
        ];
    }
}
