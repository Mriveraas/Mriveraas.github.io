
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa de Calor - Caja Los Andes</title>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9-bmvA0sT-x-FVC3dTqxua81F6uUxAl4&libraries=visualization,places"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Logotipo_Caja_Los_Andes.svg/2560px-Logotipo_Caja_Los_Andes.svg.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
        }
        .navbar {
            background-color: #014a84;
            opacity: 0.9;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .navbar-brand {
            color: white !important;
        }
        #title {
            color: #FFD100;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }
        #map {
            height: 80vh;
            width: 100%;
            margin-top: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .container {
            background-color: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        select, input[type="text"] {
            border-radius: 20px !important;
            transition: all 0.3s;
        }
        select:focus, input[type="text"]:focus {
            box-shadow: 0 0 10px rgba(1,74,132,0.5) !important;
            border: 1px solid #014a84 !important;
        }
        .info-window {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <a class="navbar-brand" href="#"><span id="title">MAPA DE CALOR</span> - CAJA LOS ANDES</a>
    </nav>
    <div class="container">
        <h2>Filtros</h2>
        <div class="row">
            <div class="col-md-3">
                <label for="comunas"><i class="fas fa-city"></i>Selecciona una comuna:</label>
                <select class="form-control" id="comunas" onchange="changeComuna()">
                    <option value="santiago">Santiago</option>
                    <option value="providencia">Providencia</option>
                    <option value="valparaiso">Valparaíso</option>
                    <option value="concepcion">Concepción</option>
                    <option value="temuco">Temuco</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="provincias"><i class="fas fa-map-marked-alt"></i>Selecciona una provincia:</label>
                <select class="form-control" id="provincias">
                    <option>Provincia de Santiago</option>
                    <option>Provincia de Cordillera</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="beneficios"><i class="fas fa-gift"></i>Busca un beneficio:</label>
                <select class="form-control" id="beneficios">
                    <option>Caja Escolar</option>
                    <option>Primera Caja</option>
                    <option>Bodas de Plata</option>
                    <option>PSP Farmacias</option>
                    <option>Beneficio Dental60</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="search"><i class="fas fa-search"></i>Búsqueda rápida:</label>
                <input type="text" class="form-control" id="search" placeholder="Escribe aquí...">
            </div>
        </div>
        <div id="map"></div>
    </div>
    <script>
        var map;
        var heatmap;

        // Datos ficticios de los beneficiarios en varias comunas de Chile
        var data = {
            santiago: [
                { location: new google.maps.LatLng(-33.45, -70.65), weight: 10 },
                { location: new google.maps.LatLng(-33.45, -70.65), weight: 30 }
            ],
            providencia: [
                { location: new google.maps.LatLng(-33.43, -70.62), weight: 40 },
                { location: new google.maps.LatLng(-33.43, -70.62), weight: 20 }
            ],
            valparaiso: [
                { location: new google.maps.LatLng(-33.04, -71.63), weight: 50 }
            ],
            concepcion: [
                { location: new google.maps.LatLng(-36.82, -73.05), weight: 15 }
            ],
            temuco: [
                { location: new google.maps.LatLng(-38.73, -72.59), weight: 5 }
            ]
        };

        var infoWindow = new google.maps.InfoWindow();

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 5,
                center: {lat: -35.6751, lng: -71.5430},  // Centrado en Chile
                mapTypeId: 'roadmap'
            });

            var combinedData = [];
            for (var comuna in data) {
                combinedData = combinedData.concat(data[comuna]);
            }

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: combinedData,
                gradient: [
                    'rgba(255,0,0,0)',
                    'rgba(255,0,0,1)',
                    'rgba(255,255,0,1)',
                    'rgba(0,255,0,1)'
                ],
                maxIntensity: 50,
                radius: 30
            });
            heatmap.setMap(map);

            google.maps.event.addListener(map, 'mousemove', function(event) {
                var location = event.latLng;
                var totalBenefits = 0;
                for (var comuna in data) {
                    for (var i = 0; i < data[comuna].length; i++) {
                        if (data[comuna][i].location.equals(location)) {
                            totalBenefits += data[comuna][i].weight;
                        }
                    }
                }

                if (totalBenefits > 0) {
                    infoWindow.setContent('<div class="info-window">Beneficios: ' + totalBenefits + '</div>');
                    infoWindow.setPosition(location);
                    infoWindow.open(map);
                } else {
                    infoWindow.close();
                }
            });
        }

        function changeComuna() {
            var comuna = document.getElementById("comunas").value;
            var centerCoordinates = {
                santiago: { lat: -33.45, lng: -70.65 },
                providencia: { lat: -33.43, lng: -70.62 },
                valparaiso: { lat: -33.04, lng: -71.63 },
                concepcion: { lat: -36.82, lng: -73.05 },
                temuco: { lat: -38.73, lng: -72.59 }
            };

            if (comuna in centerCoordinates) {
                map.setCenter(centerCoordinates[comuna]);
            }
        }

        google.maps.event.addDomListener(window, 'load', function() {
            initMap();
        });
    </script>
</body>
</html>









