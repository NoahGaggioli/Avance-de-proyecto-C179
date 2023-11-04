//let latitude = 19.518168, longitude = -98.970866;
let latitude, longitude, destination;

$(document).ready(function (){
    alert("¡Por Favor, permite que el dispositivo conozca tu ubicación!")
    initGeolocation();
}) 

$(function (){
    $("#navigate-button").click(function(){
        window.location.href = `ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
    })
})

function initGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success);
    }else{
        alert("Lo sentimos, tu navegador no es compatible con los servicios de geolocalización");
    }
}

function success(position){
    //console.log(position)
    longitude = position.coords.longitude;
    latitude = position.coords.latitude


// Inicializando Mapbox 
mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';



var map = new mapboxgl.Map({
    container : 'map',
    style : 'mapbox://styles/mapbox/streets-v11',
    center:[longitude, latitude],
    zoom: 5
})

map.addControl(
    new mapboxgl.GeolocateControl({
        poositionOptions:{
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
)

map.addControl(
    new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }),
    'top-left'
)

map.on('click', function(e){
    //console.log(e);
    destination = e.lngLat
})
}