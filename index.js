require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/layers/GeoJSONLayer"], (Map, SceneView, FeatureLayer, GeoJSONLayer) => {
    /*****************************************************************
     * Create two TileLayer instances. One pointing to a
     * cached map service depicting U.S. male population and the other
     * pointing to a layer of roads and highways.
     *****************************************************************/


    const stateLayer = new FeatureLayer({
        url: "https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/0",
        // This property can be used to uniquely identify the layer
        id: "states",
    });
    const countyLayer = new FeatureLayer({
        url: "https://www.cohealthmaps.dphe.state.co.us/arcgis/rest/services/OPEN_DATA/cdphe_geographic_analysis_boundaries/MapServer/5/",
        id: "counties",
    })
    const townshipLayer = new FeatureLayer({
        url: "https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/1",
        // This property can be used to uniquely identify the layer
        id: "townships",
    });
    const sectionLayer = new FeatureLayer({
        url: "https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/2",
        // This property can be used to uniquely identify the layer
        id: "sections",
    });
    const intersectedLayer = new FeatureLayer({
        url: "https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/3",
        // This property can be used to uniquely identify the layer
        id: "intersections",
    });
    


    /*****************************************************************
     * Layers may be added to the map in the map's constructor
     *****************************************************************/
    const map = new Map({
      basemap: "topo-vector",
      layers: [stateLayer, townshipLayer, sectionLayer, intersectedLayer, countyLayer]
    });

    /*****************************************************************
     * Or they may be added to the map using map.add()
     *****************************************************************/
    map.add(stateLayer, townshipLayer, sectionLayer, intersectedLayer, countyLayer);

    const view = new SceneView({
      container: "viewDiv",
      map: map,
      zoom: 10,
      center: [-104.99, 39.74]
    });

    /*****************************************************************
     * Layers are promises that resolve when loaded, or when all their
     * properties may be accessed. Once the population layer has loaded,
     * the view will animate to it's initial extent.
     *****************************************************************/
    view.when(() => {
      housingLayer.when(() => {
        view.goTo(housingLayer.fullExtent)
        .catch((error) => {
          console.error(error);
        });
      });
    });

    const streetsLayerToggle = document.getElementById("layerToggle");

    /*****************************************************************
     * The visible property on the layer can be used to toggle the
     * layer's visibility in the view. When the visibility is turned off
     * the layer is still part of the map, which means you can access
     * its properties and perform analysis even though it isn't visible.
     *******************************************************************/
    streetsLayerToggle.addEventListener("change", () => {
      transportationLayer.visible = streetsLayerToggle.checked;
    });
  });