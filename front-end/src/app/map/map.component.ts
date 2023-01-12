import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Deck, MapView, _GlobeView,COORDINATE_SYSTEM} from '@deck.gl/core';
import {ScatterplotLayer, LineLayer, GeoJsonLayer, BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers'
import {FillStyleExtension} from '@deck.gl/extensions'
import{HexagonLayer} from '@deck.gl/aggregation-layers'
import { AppService } from '../app.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  htmlData:any;
  deckgl:any;
  hexagonLayer:any;
  showIframe:boolean = false;
  patterns = ['dots', 'hatch-1x', 'hatch-2x', 'hatch-cross'];
  // htmlContent= this.sanitizer.bypassSecurityTrustHtml("<!DOCTYPE html>\n<html>\n  <head>\n    <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />\n    <title>pydeck</title>\n        <script src=\"https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.0/mapbox-gl.js\"></script>\n        <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css\" />\n    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css\" />\n    <script src='https://cdn.jsdelivr.net/npm/@deck.gl/jupyter-widget@~8.4.*/dist/index.js'></script>\n    <style>\n    body {\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n}\n\n#deck-map-container {\n  width: 100%;\n  height: 100%;\n  background-color: black;\n}\n\n#map {\n  pointer-events: none;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  z-index: 1;\n}\n\n#deckgl-overlay {\n  z-index: 2;\n  background: none;\n}\n\n#deck-map-wrapper {\n  width: 100%;\n  height: 100%;\n}\n\n#deck-container {\n  width: 100vw;\n  height: 100vh;\n}\n    </style>\n  </head>\n  <body>\n    <div id=\"deck-container\">\n    </div>\n  </body>\n  <script>\n    const jsonInput = {\"initialViewState\": {\"bearing\": 0, \"latitude\": 33.414291502635706, \"longitude\": -111.92518396810091, \"pitch\": 45, \"zoom\": 11}, \"layers\": [{\"@@type\": \"TripsLayer\", \"currentTime\": 500, \"data\": [{\"coordinates\": [[-111.92518396810091, 33.414291502635706], [-111.9251839362123, 33.414264523000654], [-111.92518390436581, 33.414237578989216], [-111.9251838724772, 33.41421059935417], [-111.92518384063071, 33.414183655342725], [-111.9251838087421, 33.41415667570768], [-111.92518394751099, 33.41427408234834], [-111.92518391562238, 33.4142471027133], [-111.92518388377589, 33.41422015870185], [-111.92518385188728, 33.41419317906681], [-111.92518382004077, 33.41416623505537]], \"timestamps\": [0, 15, 30, 45, 60, 75, 810, 825, 840, 855, 870]}], \"getColor\": [253, 128, 93], \"getPath\": \"@@=coordinates\", \"getTimestamps\": \"@@=timestamps\", \"id\": \"53e75b17-ebd5-41ee-8787-8e23c15ec0d9\", \"opacity\": 0.8, \"rounded\": true, \"trailLength\": 600, \"widthMinPixels\": 5}, {\"@@type\": \"TripsLayer\", \"currentTime\": 500, \"data\": [{\"coordinates\": [[-111.92518390436581, 33.414237578989216], [-111.92518384063071, 33.414183655342725]], \"timestamps\": [0, 30]}], \"getColor\": [253, 128, 93], \"getPath\": \"@@=coordinates\", \"getTimestamps\": \"@@=timestamps\", \"id\": \"ef24201e-0d6e-47e9-b922-0f875ee71047\", \"opacity\": 0.8, \"rounded\": true, \"trailLength\": 600, \"widthMinPixels\": 5}, {\"@@type\": \"TripsLayer\", \"currentTime\": 500, \"data\": [{\"coordinates\": [[-111.92282161935306, 33.41427909937204], [-111.92285157742808, 33.414252073168285], [-111.92282153563072, 33.41422517574458], [-111.92282149374189, 33.41419819611907], [-111.92285145187222, 33.414171205538906]], \"timestamps\": [0, 15, 30, 45, 60]}], \"getColor\": [253, 128, 93], \"getPath\": \"@@=coordinates\", \"getTimestamps\": \"@@=timestamps\", \"id\": \"504b75c8-11a6-44e8-acde-f8c2507dff2f\", \"opacity\": 0.8, \"rounded\": true, \"trailLength\": 600, \"widthMinPixels\": 5}, {\"@@type\": \"TripsLayer\", \"currentTime\": 500, \"data\": [{\"coordinates\": [[-111.92518396810091, 33.414291502635706], [-111.9251839362123, 33.414264523000654], [-111.92518390436581, 33.414237578989216], [-111.9251838724772, 33.41421059935417], [-111.92518384063071, 33.414183655342725], [-111.9251838087421, 33.41415667570768], [-111.92518394751099, 33.41427408234834], [-111.92518391562238, 33.4142471027133], [-111.92518388377589, 33.41422015870185], [-111.92518385188728, 33.41419317906681], [-111.92518382004077, 33.41416623505537], [-111.9251839362123, 33.414264523000654], [-111.92518390436581, 33.414237578989216], [-111.9251838724772, 33.41421059935417], [-111.92518384063071, 33.414183655342725], [-111.9251838087421, 33.41415667570768], [-111.92518394751099, 33.41427408234834], [-111.92518391562238, 33.4142471027133], [-111.92518385188728, 33.41419317906681], [-111.92518382004077, 33.41416623505537]], \"timestamps\": [0, 15, 30, 45, 60, 75, 810, 825, 840, 855, 870, 4380, 4395, 4410, 4425, 4440, 5175, 5190, 5220, 5235]}], \"getColor\": [253, 128, 93], \"getPath\": \"@@=coordinates\", \"getTimestamps\": \"@@=timestamps\", \"id\": \"23274f25-fd2f-45e5-b78d-dee22b71e2fe\", \"opacity\": 0.8, \"rounded\": true, \"trailLength\": 600, \"widthMinPixels\": 5}], \"mapProvider\": \"carto\", \"mapStyle\": \"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json\", \"views\": [{\"@@type\": \"MapView\", \"controller\": true}]};\n    const tooltip = true;\n    const customLibraries = null;\n\n    const deckInstance = createDeck({\n                  container: document.getElementById('deck-container'),\n      jsonInput,\n      tooltip,\n      customLibraries\n    });\n\n  </script>\n</html>")
  COLOR_RANGE = [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];
  FEMALE_COLOR = [255, 0, 128];
  MALE_COLOR = [0, 128, 255];
  constructor(private appService:AppService,private sanitizer: DomSanitizer){
    this.appService.getPlot({'sample':"any"}).subscribe((data)=>{
      this.htmlData = this.sanitizer.bypassSecurityTrustHtml(data['html'])
      console.log(this.htmlData)
      this.showIframe=true
              //  doc.open();
              //  doc.write(data['html']);
              //  doc.close();
    })
  }
}
