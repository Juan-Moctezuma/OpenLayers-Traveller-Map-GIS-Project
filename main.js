window.onload = initMap;

function initMap() {
    // Map Object - instance
    const map = new ol.Map({
        view: new ol.View({
            center: [-13045784.811916843, 3859897.128855196],
            zoom: 2,
            maxZoom: 13,
            minZoom: 1
        }),
        target: 'map'
    })
    
    // Basemaps Layers
    const OpenStreetMapStandard = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'OSMStandard'
    })

    const OpenStreetMapHumanitarian = new ol.layer.Tile({
        source: new ol.source.OSM({
            url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'OSMHumanitarian'
    })

    const stamenTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
            attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' + 
            'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.' + 
            'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>,' + 
            'under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false,
        title: 'StamenTerrain'
    })

    const stamenWatercolor = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url:'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
            attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' + 
            'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>.' + 
            'Data by <a href="http://openstreetmap.org">OpenStreetMap</a>,' + 
            'under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        }),
        visible: false,
        title: 'WatercolorTerrain'
    })

    // Layer Group
    const baseLayerGroup = new ol.layer.Group({
        layers: [
            OpenStreetMapStandard, 
            OpenStreetMapHumanitarian, 
            stamenTerrain,
            stamenWatercolor
        ]
    })
    map.addLayer(baseLayerGroup);

    const baseLayerElements = document.querySelectorAll('.mapOpt');
    for (let baseLayerElement of baseLayerElements) {
        baseLayerElement.addEventListener('change', function() {
            //console.log(this.value);
            let baseLayerElementValue = this.value;
            // getLayers() is a method provided by OpenLayers
            baseLayerGroup.getLayers().forEach(function(element){
                //console.log(element.get('title'));
                let baseLayerTitle = element.get('title');
                element.setVisible(baseLayerTitle === baseLayerElementValue);
            })
        })
        //console.log(baseLayerElement);
    }

    function markerAdder(longitude, latitude) {
        var marker = new ol.Feature({
            geometry: new ol.geom.Point(
            ol.proj.fromLonLat([longitude, latitude])
            )
        });

        if (longitude === -117.011 && latitude === 32.499) {
            marker.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    crossOrigin: 'anonymous',
                    src: 'Assets/Images/Red-16.png',
                    scale: 0.7
                })
            }));
        } else if (longitude === -117.081 && latitude === 32.685) {
            marker.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    crossOrigin: 'anonymous',
                    src: 'Assets/Images/Orange-16.png',
                    scale: 0.7
                })
            }));
        } else if ((longitude === -93.21281433105469 && latitude === 44.8806877852748) || 
                    (longitude === -111.98089599609375 && latitude === 40.78574062435701) ||
                    (longitude === 37.41256713867187 && latitude === 55.96995573846373) || 
                    (longitude === -84.43370819091797 && latitude === 33.640633386601) ||
                    (longitude === -73.7845230102539 && latitude === 40.64417760251725) ||
                    (longitude === -0.45867919921875006 && latitude === 51.469407923261336) ||
                    (longitude === -102.58209228515625 && latitude === 22.778713896595676) ||
                    (longitude === 17.104 && latitude === 48.151) ) { 
            marker.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    crossOrigin: 'anonymous',
                    src: 'Assets/Images/Green-16.png',
                    scale: 0.5
                })
            }));

        } else {
            marker.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    crossOrigin: 'anonymous',
                    src: 'Assets/Images/Blue-16.png',
                    scale: 0.5
                })
            }));
        }

        var vectorSource = new ol.source.Vector({
            features: [marker]
        });
        var markerVectorLayer = new ol.layer.Vector({
            source: vectorSource,
        });
        return map.addLayer(markerVectorLayer);
    }

    fetch('./Assets/Vector-Data/Cities.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        let x = [];
        let y = [];
        
        for(let i = 0, l = data.features.length; i < l; i++) {
            //console.log(data.features[i].geometry.coordinates[0]);
            //console.log(data.features[i].geometry.coordinates[1]);
            x[i] = data.features[i].geometry.coordinates[1];
            y[i] = data.features[i].geometry.coordinates[0]; 
            markerAdder(y[i], x[i]);
        }
    })
    /*
    map.on('click', function(e) {
        console.log(e.coordinate);
    })*/
};

$(function() {
    function count($this){
        var current = parseInt($this.html(), 10);
        $this.html(++current);
        if(current !== $this.data('count')){
            setTimeout(function(){count($this)}, 50);
        }
    }        
  $(".countable").each(function() {
      $(this).data('count', parseInt($(this).html(), 10));
      $(this).html('0');
      count($(this));
  });
});