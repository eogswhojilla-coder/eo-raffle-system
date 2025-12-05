<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ParticipantRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'raffle_id' => 'required|exists:raffles,id',
            'attendee_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:15',
            'email' => 'required|email|max:255',
        ];
    }
}