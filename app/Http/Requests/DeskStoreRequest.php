<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeskStoreRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        //TODO: todo make separated update request :DONE
        //TODO: todo make normal rules :DONE
        return [
            'name' => 'required|min:5',
            'email' => 'required|email',
            'address' => 'required|min:5'
        ];
    }
}
