<template>
    <el-upload
      action=""
      :before-upload="handleFileUpload"
      :show-file-list="false"
    >
      <el-button type="primary">上传 Excel 文件</el-button>
    </el-upload>
  </template>
  
  <script setup>
  import { ElUpload, ElButton } from 'element-plus'
  import * as XLSX from 'xlsx'
  import { ref, onMounted } from 'vue'
  import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
  import Map from '@arcgis/core/Map'
  import MapView from '@arcgis/core/views/MapView'
  import WebTileLayer from '@arcgis/core/layers/WebTileLayer'
  
  let map, layer_天地图_矢量地图, layer_天地图_矢量标注, view
  
  const handleFileUpload = (file) => {
    console.log('!!开始读取file', file)
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      const pipeSheet = XLSX.utils.sheet_to_json(workbook.Sheets['供排水管点表'])
      const lineSheet = XLSX.utils.sheet_to_json(workbook.Sheets['供排水管线表'])
      console.log('!!!!', pipeSheet, lineSheet)
      renderToMap(pipeSheet, lineSheet)
    }
    reader.readAsArrayBuffer(file)
    console.log('!!!!', file)
    return false
  }
  
//   const renderToMap = (pipeData, lineData) => {
//     const pipePoints = {}
//     pipeData.forEach(item => {
//       pipePoints[item.ORIGINALNO] = {
//         x: item.X,
//         y: item.Y,
//         attributes: item
//       }
//     })
//     console.log('!pipePoints', pipePoints)
//     const pipeLayer = new FeatureLayer({
//       source: Object.values(pipePoints).map(point => ({
//         geometry: {
//           type: 'point',
//           x: point.x,
//           y: point.y
//         },
//         attributes: point.attributes
//       })),
//       objectIdField: 'ORIGINALNO',
//       popupTemplate: {
//         title: '{name}',
//         content: generatePopupContent
//       }
//     })
  
//     const lineLayer = new FeatureLayer({
//       source: lineData.map(item => {
//         const startPoint = pipePoints[item.STARTORIGNO]
//         const endPoint = pipePoints[item.ENDORIGNO]
//         return {
//           geometry: {
//             type: 'polyline',
//             paths: [[[startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]]
//           },
//           attributes: item
//         }
//       }),
//       objectIdField: 'ORIGINALNO',
//       popupTemplate: {
//         title: '{name}',
//         content: generatePopupContent
//       }
//     })
//     console.log('!lineLayer', lineLayer)
//     map.addMany([pipeLayer, lineLayer])
//   }


const renderToMap = () => {
  // 模拟的管线点数据
  const pipeData = [
    { ORIGINALNO: 1, X: 120.1, Y: 30.1, name: 'Point 1' },
    { ORIGINALNO: 2, X: 120.2, Y: 30.2, name: 'Point 2' },
    { ORIGINALNO: 3, X: 120.3, Y: 30.3, name: 'Point 3' }
  ];

  // 模拟的管线数据
  const lineData = [
    { ORIGINALNO: 1, STARTORIGNO: 1, ENDORIGNO: 2, name: 'Line 1' },
    { ORIGINALNO: 2, STARTORIGNO: 2, ENDORIGNO: 3, name: 'Line 2' }
  ];

  const pipePoints = {};
  pipeData.forEach(item => {
    pipePoints[item.ORIGINALNO] = {
      x: item.X,
      y: item.Y,
      attributes: item
    };
  });

  const pipeLayer = new FeatureLayer({
    source: Object.values(pipePoints).map(point => ({
      geometry: {
        type: 'point',
        x: point.x,
        y: point.y
      },
      attributes: point.attributes
    })),
    objectIdField: 'ORIGINALNO',
    popupTemplate: {
      title: '{name}',
      content: generatePopupContent
    }
  });

  const lineLayer = new FeatureLayer({
    source: lineData.map(item => {
      const startPoint = pipePoints[item.STARTORIGNO];
      const endPoint = pipePoints[item.ENDORIGNO];
      return {
        geometry: {
          type: 'polyline',
          paths: [[[startPoint.x, startPoint.y], [endPoint.x, endPoint.y]]]
        },
        attributes: item
      };
    }),
    objectIdField: 'ORIGINALNO',
    popupTemplate: {
      title: '{name}',
      content: generatePopupContent
    }
  });

  map.addMany([pipeLayer, lineLayer]);

  // 设置视图中心和缩放级别
  view.goTo({
    center: [120.2, 30.2], // 设置中心为模拟数据的中间点
    zoom: 5 // 根据需要调整缩放级别
  });
};

  
  const generatePopupContent = (feature) => {
    const attributes = feature.graphic.attributes
    let content = '<table>'
    for (const key in attributes) {
      content += `<tr><th>${key}</th><td>${attributes[key]}</td></tr>`
    }
    content += '</table>'
    return content
  }
  
  let region = new FeatureLayer({
    url: 'http://60.190.130.110:6080/arcgis/rest/services/Lm_JSDrain_DXT/MapServer/1',
    renderer: {
      type: 'simple',
      symbol: {
        type: 'simple-line',
        color: [200, 50, 50, 0.8],
        outline: {
          color: [0, 0, 0],
          width: 4
        }
      }
    }
  })
  
  onMounted(() => {
  if (typeof window !== 'undefined') {
    let layer_天地图_矢量标注, map, view;

    layer_天地图_矢量标注 = new WebTileLayer({
      title: '天地图_矢量标注',
      urlTemplate: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=f70cb89203d0f9e65dc27b2155b6f769'
    });

    map = new Map({
      basemap: {
        baseLayers: [layer_天地图_矢量地图, layer_天地图_矢量标注]
      },
      layers: [region]
    });

    view = new MapView({
      container: 'viewDiv',
      map: map,
      center: [120.8, 30.8],
      zoom: 10
    });
  }
});
</script>
  