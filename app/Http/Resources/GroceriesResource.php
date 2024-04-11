<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroceriesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'unit' => $this->unit,
            'category' => $this->category,
            'supplier' => $this->supplier,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
