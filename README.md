<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapa de Calor - Caja Los Andes</title>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9-bmvA0sT-x-FVC3dTqxua81F6uUxAl4&libraries=visualization"></script>
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
                <label for="comunas"><i class="fas fa-city"></i> Selecciona una comuna:</label>
                <select class="form-control" id="comunas">
                    <option>Santiago</option>
                    <option>Providencia</option>
                    <option>Las Condes</option>
                    <!-- Agrega más comunas si lo deseas -->
                </select>
            </div>
            <div class="col-md-3">
                <label for="provincias"><i class="fas fa-map-marked-alt"></i> Selecciona una provincia:</label>
                <select class="form-control" id="provincias">
                    <option>Provincia de Santiago</option>
                    <option>Provincia de Cordillera</option>
                    <!-- Agrega más provincias si lo deseas -->
                </select>
            </div>
            <div class="col-md-3">
                <label for="beneficios"><i class="fas fa-gift"></i> Busca un beneficio:</label>
                <select class="form-control" id="beneficios">
                    <option>Caja Escolar</option>
                    <option>Primera Caja</option>
                    <!-- Agrega más beneficios si lo deseas -->
                </select>
            </div>
            <div class="col-md-3">
                <label for="search"><i class="fas fa-search"></i> Búsqueda rápida:</label>
                <input type="text" class="form-control" id="search" placeholder="Escribe aquí...">
            </div>
        </div>

        <div id="map"></div>
    </div>

    <script>
        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: {
                    lat: -33.45,
                    lng: -70.65
                }, // Coordenadas de Santiago, Chile
                mapTypeId: 'roadmap'
            });

            var heatmapData = [
                {
                    location: new google.maps.LatLng(-33.45, -70.65),
                    weight: 0.5
                },
                // ...otros puntos...
            ];

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData
            });
            heatmap.setMap(map);
        }

        google.maps.event.addDomListener(window, 'load', initMap);
    </script>
</body>

</html>

