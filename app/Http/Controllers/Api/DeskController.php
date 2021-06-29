<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactDesk;
use Illuminate\Http\Request;

class DeskController extends Controller
{
    public function index()
    {
        return ContactDesk::all();
    }
}
