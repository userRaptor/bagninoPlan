<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bestellung extends Model
{
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
