// 创建一个简单的案例 ,加在页面上
<template>
    <div id="container">
        <div id="viewDiv"></div>
    </div>
    
</template>

<script setup>
import { onMounted } from 'vue'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import '@arcgis/core/assets/esri/themes/light/main.css'

onMounted(() => {
    const map = new Map({
        basemap: 'streets-navigation-vector'
    })
    const view = new MapView({
        container: 'viewDiv',
        map,
        center: [120, 30],
        zoom: 5
    })
    // view.ui.remove('attribution')
    view.when(() => {
        console.log('view ready')
    })
})
    
    
</script>

<style lang="scss" >

#container,#viewDiv {
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