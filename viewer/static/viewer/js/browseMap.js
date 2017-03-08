/* Set up map for browsing demo */
require(
		[ "esri/map", "esri/geometry/Point",
				"esri/layers/ArcGISDynamicMapServiceLayer",
				"esri/dijit/Legend", "esri/geometry/Extent",
				"esri/SpatialReference", "dojo/domReady!" ],
		function(Map, Point, ArcGISDynamicMapServiceLayer, Legend, Extent,
				SpatialReference) {
			browseMap = new Map("browse-map", {
				basemap : "topo",
				center : [ -80.4297605, 37.2302538 ],
				zoom : 14
			});

			browseMap.setExtent(new Extent(-8966298.461538462, 4464700,
					-8940501.538461538, 4477800, new SpatialReference({
						wkid : 3857
					})), true);
			/*
			 * navigator.geolocation .getCurrentPosition(zoomToLocation);
			 */
			var geolocationPoint;
			function zoomToLocation(location) {
				geolocationPoint = new Point(location.coords.longitude,
						location.coords.latitude);
				browseMap.centerAndZoom(geolocationPoint);
			}
			$("[data-target='#map']").on(
					'click touchstart',
					function() {
						browseMap.on('resize', function() {
							var resizeTimer;
							clearTimeout(resizeTimer);
							resizeTimer = setTimeout(function() {
								if (geolocationPoint) {
									console.log("g");
									browseMap.centerAndZoom(geolocationPoint,
											16);
								} else {
									console.log("e");
									browseMap.setExtent(new Extent(
											-8966298.461538462, 4464700,
											-8940501.538461538, 4477800,
											new SpatialReference({
												wkid : 3857
											})), true);
								}
							}, 500);
						});
					});

			var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer(
					"https://www.webgis.net/arcgis/rest/services/VA/Blacksburg_WebGIS1/MapServer");
			dynamicMapServiceLayer.setVisibleLayers([ 0, 2, 6, 9, 16, 27, 29 ]);

			browseMap.addLayer(dynamicMapServiceLayer);

			var legend = new Legend({
				map : browseMap,
			}, "legend");
			legend.startup();
		});