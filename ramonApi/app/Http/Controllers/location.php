<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class location extends Controller
{

    public function calcularDistancia($coord1, $coord2)
    {
        
        $lat1 = deg2rad($coord1['lat']);
        $lon1 = deg2rad($coord1['long']);
        $lat2 = deg2rad($coord2->lat);
        $lon2 = deg2rad($coord2->long);

        $deltaLat = $lat2 - $lat1;
        $deltaLon = $lon2 - $lon1;

        $a = sin($deltaLat / 2) ** 2 + cos($lat1) * cos($lat2) * sin($deltaLon / 2) ** 2;
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        $radioTierra = 6371; // Radio de la Tierra en kilómetros (aproximado)
        $distancia = $radioTierra * $c;

        return $distancia;
    }

    public function encontrarCoordenadasCercanas($coordDada, $conjuntoCoordenadas)
    {
        $distanciaMinima = INF;
        $coordenadasCercanas = null;

        foreach ($conjuntoCoordenadas as $coordenada) {
            $distancia = self::calcularDistancia($coordDada, $coordenada);

            if ($distancia < $distanciaMinima) {
                $distanciaMinima = $distancia;
                $coordenadasCercanas = $coordenada;
            }
        }

        return $coordenadasCercanas;
    }

    public function getNearLocations($lat, $long)
    {
        $coordDada = array('lat' => $lat, 'long' => $long); // Coordenadas dadas

        $conjuntoCoordenadas = json_decode(Storage::disk('public')->get("data.json"));

        $coordenadasCercanas = self::encontrarCoordenadasCercanas($coordDada, $conjuntoCoordenadas);


        return response()->json(array(
            'id'      =>   $coordenadasCercanas->id,
            'lat'   =>  $coordenadasCercanas->lat,
            'long'   =>  $coordenadasCercanas->long,

        ), 200); 

       // return "Las coordenadas más cercanas son: latitud " . $coordenadasCercanas->lat . ", longitud " . $coordenadasCercanas->long. ", id ". $coordenadasCercanas->id;

    }

  
}
