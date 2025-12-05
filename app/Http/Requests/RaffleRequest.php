<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RaffleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'raffle_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ];
    }
}