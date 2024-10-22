<template>
    <div id="container">
      <div id="viewDiv"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  // import Map from '@arcgis/core/Map';
  // import MapView from '@arcgis/core/views/MapView';
  
  onMounted(async () => {
    const [Map, MapView] = await Promise.all([
      import('@arcgis/core/Map'),
      import('@arcgis/core/views/MapView')
    ]);
  
    const map = new Map.default({
      basemap: 'streets-navigation-vector'
    });
  
    const view = new MapView.default({
      container: 'viewDiv',
      map,
      center: [120, 30],
      zoom: 5
    });
  
    // view.ui.remove('attribution');
    view.when(() => {
      console.log('view ready');
    });
  });
  </script>
  
  <style lang="scss">
  #container, #viewDiv {
    width: 100%;
    height: 500px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #container {
    position: relative;
  }
  </style>
  