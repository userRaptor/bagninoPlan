<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    public function groceries()
    {
        return $this->belongsToMany(Groceries::class);
    }
    
    public function user()
    {
        return $this->belongsTo(UserX::class);
    }

    use HasFactory;

    // Attributes:
    protected $fillable = [
        'lebensmittel',
        'datum',
        'uhrzeit',
        'ort',
        'verwendungszweck',
        'bemerkung',
        'includeSummary'
    ];
}
