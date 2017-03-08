/* Set up map for reporting demo */
require([ "esri/map", "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol",
		"esri/symbols/SimpleLineSymbol", "esri/graphic", "esri/Color",
		"esri/geometry/Extent", "esri/SpatialReference", "dojo/domReady!" ],
		function(Map, Point, SimpleMarkerSymbol, SimpleLineSymbol, Graphic,
				Color, Extent, SpatialReference) {

			function setUpReportMap(mapDivId, reportTarget) {
				var reportMap = new Map(mapDivId, {
					basemap : "hybrid",
					center : [ -80.4297605, 37.2302538 ],
					zoom : 14
				});

				reportMap.setExtent(new Extent(-8966298.461538462, 4464700,
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
					reportMap.centerAndZoom(geolocationPoint);
				}
				$("[data-target^='#report_" + reportTarget + "']").on(
						"click touchstart",
						function() {
							reportMap.on('resize', function() {
								var resizeTimer;
								clearTimeout(resizeTimer);
								resizeTimer = setTimeout(function() {
									if (geolocationPoint) {
										reportMap.centerAndZoom(
												geolocationPoint, 16);
									} else {
										reportMap.setExtent(new Extent(
												-8966298.461538462, 4464700,
												-8940501.538461538, 4477800,
												new SpatialReference({
													wkid : 3857
												})), true);
									}
								}, 500);
							});
						});
			}
			setUpReportMap("report-restroom-map", "restroom");
			setUpReportMap("report-ald-map", "ald");
			setUpReportMap("report-curbcut-map", "curbcut");
			setUpReportMap("report-bench-map", "bench");

		});