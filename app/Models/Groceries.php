<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groceries extends Model
{
    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }

    protected $fillable = [
        'name',
        'unit',
        'category',
        'supplier',
    ];
}
