(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./dist/map-library/fesm2015/map-library.js":
/*!**************************************************!*\
  !*** ./dist/map-library/fesm2015/map-library.js ***!
  \**************************************************/
/*! exports provided: CONST, MapLibraryComponent, MapLibraryModule, MapLibraryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONST", function() { return CONST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapLibraryComponent", function() { return MapLibraryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapLibraryModule", function() { return MapLibraryModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapLibraryService", function() { return MapLibraryService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");
/* harmony import */ var leaflet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var leaflet_control_geocoder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! leaflet-control-geocoder */ "./node_modules/leaflet-control-geocoder/src/index.js");




class MapLibraryService {
    constructor() {
    }
}
MapLibraryService.ɵfac = function MapLibraryService_Factory(t) { return new (t || MapLibraryService)(); };
MapLibraryService.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ token: MapLibraryService, factory: MapLibraryService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(MapLibraryService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

var CONST;
(function (CONST) {
    CONST[CONST["ZOOM_MAX"] = 18] = "ZOOM_MAX";
    CONST[CONST["ZOOM_MIN"] = 2] = "ZOOM_MIN";
    CONST[CONST["LAT_MAX"] = 85] = "LAT_MAX";
})(CONST || (CONST = {}));
class MapLibraryComponent {
    constructor(elem) {
        this.elem = elem;
        // input values
        this.mapLat = 45;
        this.mapLng = 5;
        this.mapZoom = 5;
        this.onchange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onselect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.searchInputFocused = false;
        this.moveMode = true;
        this.handleIcon = "move";
        this.handleMenuIcon = "zoom";
        this.displayMenu = "";
        this.choiseMenu = 1;
        this.navigate = false;
        this.navigateId = 0;
        // display markers
        this.mapMarkers = [];
    }
    ngAfterViewInit() {
        // init map
        this.initMap();
        this.initInput();
        this.setMoveShift();
        // init display input request
        this.setSearch(this.search);
        this.setMarker(this.marker);
        // send init event
        setTimeout(() => {
            this.sendModifications("");
        }, 2000);
    }
    initMap() {
        // init map
        this.map = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["map"])("map", {
            attributionControl: false,
            zoomControl: false,
            center: [this.mapLat, this.mapLng],
            zoom: this.mapZoom,
        });
        // display map
        Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["tileLayer"])("https://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);
        // disable keyboard
        this.map.keyboard.disable();
        // add search box
        this.geocoder = leaflet__WEBPACK_IMPORTED_MODULE_1__["Control"].geocoder({
            position: "topleft",
            collapsed: false,
            placeholder: "Recherche...",
            defaultMarkGeocode: true,
        }).addTo(this.map);
    }
    setSearch(search) {
        if (this.search) {
            // load searching
            this.geocoder.setQuery(search)._geocode();
            // search the first element
            setTimeout(() => {
                if (this.geocoder._results && this.geocoder._results.length) {
                    this.geocoder._geocodeResultSelected(this.geocoder._results[0]);
                    this.geocoder._clearResults();
                }
            }, 2000);
        }
    }
    setMarker(marker$1) {
        this.cleanMarkers();
        let i = 0;
        marker$1.forEach(element => {
            if ("lat" in element && "lng" in element) {
                element.id = i;
                if (!element.text && element.img) {
                    this.mapMarkers[i] = this.generateImageMarker(element);
                }
                else if (!element.text) {
                    this.mapMarkers[i] = Object(leaflet__WEBPACK_IMPORTED_MODULE_1__["marker"])([element.lat, element.lng]);
                }
                else {
                    this.mapMarkers[i] = this.generateIconMarker(element);
                }
                this.mapMarkers[i].addTo(this.map);
                if (this.navigate && this.mapLat == element.lat && this.mapLng == element.lng) {
                    this.navigateId = i;
                    this.elem.nativeElement.querySelector("#marker_" + this.navigateId).style.background = "orange";
                }
                i++;
            }
        });
    }
    // remove all markers to display news
    cleanMarkers() {
        for (let i = 0; i < this.mapMarkers.length; i++) {
            this.map.removeLayer(this.mapMarkers[i]);
        }
    }
    // generate Marker
    generateIconMarker(element) {
        // set html form
        let html = `
      <div class="marker" id="marker_${element.id}">
        <div>${element.text}</div>
        ` + (element.content ? `<span>${element.content}</span>` : ``) +
            (element.img ? `<img src="${element.img}"/>` : ``) + `
      </div>`;
        // return leaflet marker
        return new leaflet__WEBPACK_IMPORTED_MODULE_1__["Marker"]([element.lat, element.lng], {
            icon: new leaflet__WEBPACK_IMPORTED_MODULE_1__["DivIcon"]({
                className: '',
                iconSize: [100, 70],
                iconAnchor: [60, element.img ? 40 : 10],
                html,
            })
        });
    }
    // generate image Marker
    generateImageMarker(element) {
        // set html form
        let html = `<img id="marker_${element.id}" style="width:80px;" src="${element.img}"/>`;
        // return leaflet marker
        return new leaflet__WEBPACK_IMPORTED_MODULE_1__["Marker"]([element.lat, element.lng], {
            icon: new leaflet__WEBPACK_IMPORTED_MODULE_1__["DivIcon"]({
                className: '',
                iconSize: [80, 70],
                iconAnchor: [45, element.img ? 40 : 10],
                html,
            })
        });
    }
    /*************** components attributes events *************/
    ngOnChanges(changes) {
        if (this.map) {
            switch (Object.keys(changes)[0]) {
                case "mapZoom":
                case "mapLat":
                case "mapLng":
                    this.map.setView([this.mapLat, this.mapLng], this.mapZoom);
                    this.setMoveShift();
                    break;
                case "marker":
                    this.setMarker(this.marker);
                    break;
                case "search":
                    this.setSearch(this.search);
                    break;
            }
        }
    }
    /*************** keyboard event detect and functions *************/
    keyEvent(event) {
        if (this.focused) {
            if (this.displayMenu != "") {
                this.handlingMenu(event.key);
            }
            else if (this.navigate) {
                this.handlingNavigation(event.key);
            }
            else {
                this.handlingMap(event.key);
                // send change to parent application
                this.sendModifications(event.key);
            }
        }
    }
    handlingNavigation(key) {
        switch (key) {
            case "ArrowUp":
                this.navigateMarker(1, 0);
                break;
            case "ArrowDown":
                this.navigateMarker(-1, 0);
                break;
            case "ArrowRight":
                this.navigateMarker(0, 1);
                break;
            case "ArrowLeft":
                this.navigateMarker(0, -1);
                break;
            case "Enter":
                // send change to parent application
                if (this.marker[this.navigateId])
                    this.sendSelectEvent(this.marker[this.navigateId]);
                break;
            case "Escape":
                this.openMenu();
                break;
        }
    }
    handlingMenu(key) {
        switch (key) {
            case "ArrowRight":
                this.choiseMenu++;
                if (this.choiseMenu > 4) {
                    this.choiseMenu = 0;
                }
                break;
            case "ArrowLeft":
                this.choiseMenu--;
                if (this.choiseMenu < 0) {
                    this.choiseMenu = 4;
                }
                break;
            case "Enter":
                // reset navigation mode
                this.navigate = false;
                if (this.choiseMenu == 0) {
                    this.setFocus();
                }
                else {
                    this.setFocusOut();
                }
                if (this.choiseMenu == 1) {
                    this.handleIcon = "move";
                    this.moveMode = true;
                }
                else if (this.choiseMenu == 2) {
                    this.handleIcon = "zoom";
                    this.moveMode = false;
                }
                else if (this.choiseMenu == 3) {
                    this.setNavigationMode();
                }
                else if (this.choiseMenu == 4) {
                    alert("exit");
                }
                this.closeMenu();
                break;
            case "Escape":
                this.closeMenu();
                break;
        }
    }
    handlingMap(key) {
        switch (key) {
            case "ArrowUp":
                if (this.moveMode) {
                    if (this.map.getCenter().lat < CONST.LAT_MAX) {
                        this.moveMap(1, 0);
                    }
                }
                else {
                    if (this.mapZoom < CONST.ZOOM_MAX) {
                        this.zoomMap(1);
                        this.moveShift /= 2;
                    }
                }
                break;
            case "ArrowDown":
                if (this.moveMode) {
                    if (this.map.getCenter().lat > -CONST.LAT_MAX) {
                        this.moveMap(-1, 0);
                    }
                }
                else {
                    if (this.mapZoom > CONST.ZOOM_MIN) {
                        this.zoomMap(-1);
                        this.moveShift *= 2;
                    }
                }
                break;
            case "ArrowRight":
                if (this.moveMode) {
                    this.moveMap(0, 1);
                }
                else {
                }
                break;
            case "ArrowLeft":
                if (this.moveMode) {
                    this.moveMap(0, -1);
                }
                else {
                }
                break;
            case "Enter":
                this.changeMode();
                break;
            case "Escape":
                this.openMenu();
                break;
        }
    }
    // display move or zoom icon when press
    changeMode() {
        this.moveMode = !this.moveMode;
        if (this.moveMode) {
            this.handleIcon = "move";
            this.choiseMenu = 1;
        }
        else {
            this.handleIcon = "zoom";
            this.choiseMenu = 2;
        }
    }
    sendModifications(key) {
        // calcul map outline by container size and pixel progection
        let mapSize = this.map.getSize();
        let centerPixel = this.map.project([this.mapLat, this.mapLng], this.mapZoom);
        let topLeft = this.map.unproject([centerPixel.x - mapSize.x / 2, centerPixel.y - mapSize.y / 2], this.mapZoom);
        let bottomRight = this.map.unproject([centerPixel.x + mapSize.x / 2, centerPixel.y + mapSize.y / 2], this.mapZoom);
        // send coordinates results
        this.onchange.emit({
            key: key,
            zoom: this.mapZoom,
            lat: this.mapLat,
            lng: this.mapLng,
            view: {
                top: topLeft.lat,
                left: topLeft.lng,
                bottom: bottomRight.lat,
                right: bottomRight.lng
            }
        });
    }
    sendSelectEvent(selected) {
        this.onselect.emit(selected);
    }
    /*************** escape app functions *************/
    openMenu() {
        this.displayMenu = "show-menu";
    }
    closeMenu() {
        this.displayMenu = "";
    }
    // show escape message
    selectMenu(key) {
        if (key == "Escape") {
            this.closeMenu();
        }
        else {
            //this.validEscape = false;
        }
    }
    /*************** navigate between markers *************/
    setNavigationMode() {
        this.navigate = true;
        this.handleIcon = "navigation";
        this.navigateMarker(0, 0);
        // define menu to move
        this.moveMode = false;
        this.handleMenuIcon = "move";
    }
    navigateMarker(lat, lng) {
        if (!this.marker.length) {
            return;
        }
        if (this.marker.length == 1) {
            this.navigateId = 0;
            this.elem.nativeElement.querySelector("#marker_" + this.navigateId).style.background = "orange";
            return;
        }
        if (this.navigateId > this.marker.length) {
            this.navigateId = 0;
        }
        if (lat != 0 || lng != 0) {
            // reset previous
            this.elem.nativeElement.querySelector("#marker_" + this.marker[this.navigateId].id).style.background = "white";
        }
        // display new
        if (lng > 0) {
            this.findFirstRightElement();
        }
        else if (lng < 0) {
            this.findFirstLeftElement();
        }
        else if (lat > 0) {
            this.findFirstTopElement();
        }
        else if (lat < 0) {
            this.findFirstBottomElement();
        }
        else {
            this.navigateId = 0;
        }
        let el = this.marker[this.navigateId];
        this.mapLat = el.lat;
        this.mapLng = el.lng;
        this.moveMap(0, 0);
        this.sendModifications("");
    }
    calcAngle(adjacent, opposite) {
        return Math.atan(Math.abs(opposite) / Math.abs(adjacent)) * (180 / Math.PI);
    }
    calcHyp(adjacent, opposite) {
        return Math.sqrt(Math.pow(adjacent, 2) + Math.pow(opposite, 2));
        ;
    }
    findFirstLeftElement() {
        let selected = this.marker[this.navigateId];
        let newSelect = null;
        this.marker.forEach(element => {
            if (element != selected && element.lng < selected.lng && (newSelect == null || (element.lng > newSelect.lng || newSelect.lng > selected.lng))) {
                let angle = this.calcAngle(element.lng - selected.lng, element.lat - selected.lat);
                //console.log(element.text+" "+angle)
                if (angle < 45) {
                    newSelect = element;
                }
            }
        });
        if (newSelect == null || newSelect.lng >= selected.lng) {
            this.navigateId = selected.id;
        }
        else {
            this.navigateId = newSelect.id;
        }
    }
    findFirstRightElement() {
        let selected = this.marker[this.navigateId];
        let newSelect = null;
        this.marker.forEach(element => {
            if (element != selected && element.lng > selected.lng && (newSelect == null || (element.lng < newSelect.lng || newSelect.lng < selected.lng))) {
                let angle = this.calcAngle(element.lng - selected.lng, element.lat - selected.lat);
                if (angle < 45) {
                    newSelect = element;
                }
            }
        });
        if (newSelect == null || newSelect.lng <= selected.lng) {
            this.navigateId = selected.id;
        }
        else {
            this.navigateId = newSelect.id;
        }
    }
    findFirstBottomElement() {
        let selected = this.marker[this.navigateId];
        let newSelect = this.marker[this.navigateId == 0 ? 1 : 0];
        this.marker.forEach(element => {
            if (element != selected && element.lat < selected.lat && (element.lat > newSelect.lat || newSelect.lat > selected.lat)) {
                newSelect = element;
            }
        });
        if (newSelect.lat >= selected.lat) {
            this.navigateId = selected.id;
        }
        else {
            this.navigateId = newSelect.id;
        }
    }
    findFirstTopElement() {
        let selected = this.marker[this.navigateId];
        let newSelect = this.marker[this.navigateId == 0 ? 1 : 0];
        this.marker.forEach(element => {
            if (element != selected && element.lat > selected.lat && (element.lat < newSelect.lat || newSelect.lat < selected.lat)) {
                newSelect = element;
            }
        });
        if (newSelect.lat <= selected.lat) {
            this.navigateId = selected.id;
        }
        else {
            this.navigateId = newSelect.id;
        }
    }
    /*************** set position, move and zoom functions *************/
    // set new coordinates and handle zoom 
    setPosition() {
        let coord = this.map.getCenter();
        this.mapLat = coord.lat;
        this.mapLng = coord.lng;
        this.mapZoom = this.map.getZoom();
        // calcul new move size
        this.setMoveShift();
    }
    // calcul new coordinates
    moveMap(lat, lng) {
        this.mapLat += lat * this.moveShift;
        this.mapLng += lng * this.moveShift;
        this.map.setView([this.mapLat, this.mapLng], this.mapZoom);
    }
    // update zoom
    zoomMap(zoom) {
        this.mapZoom += zoom;
        this.map.setZoom(this.mapZoom);
    }
    // alter move padding
    setMoveShift() {
        this.moveShift = 80;
        for (let i = 1; i < this.mapZoom; i++) {
            this.moveShift /= 2;
        }
    }
    /*************** search input functions *************/
    // set input focus or blur
    initInput() {
        // select search input box
        this.searchInput = this.elem.nativeElement.querySelector(".leaflet-control-geocoder-form input");
        this.searchBar = this.elem.nativeElement.querySelector(".leaflet-bar");
        this.setFocusOut();
    }
    setFocus() {
        this.searchBar.style.display = "block";
        this.searchInput.focus();
        this.searchInputFocused = true;
    }
    setFocusOut() {
        this.searchInput.blur();
        this.searchBar.style.display = "none";
        this.searchInputFocused = false;
        this.setPosition();
    }
}
MapLibraryComponent.ɵfac = function MapLibraryComponent_Factory(t) { return new (t || MapLibraryComponent)(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
MapLibraryComponent.ɵcmp = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"])({ type: MapLibraryComponent, selectors: [["map-library"]], hostBindings: function MapLibraryComponent_HostBindings(rf, ctx) { if (rf & 1) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"])("keyup", function MapLibraryComponent_keyup_HostBindingHandler($event) { return ctx.keyEvent($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, inputs: { mapLat: "mapLat", mapLng: "mapLng", mapZoom: "mapZoom", search: "search", marker: "marker", focused: "focused" }, outputs: { onchange: "onchange", onselect: "onselect" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 10, vars: 21, consts: [[1, "map-container"], ["id", "map"], [1, "menu-container"], [1, "menu-box"]], template: function MapLibraryComponent_Template(rf, ctx) { if (rf & 1) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(0, "div", 0);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(1, "i");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(2, "div", 1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(3, "div", 2);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"])(4, "div", 3);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(5, "i");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(6, "i");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(7, "i");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(8, "i");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"])(9, "i");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"])();
    } if (rf & 2) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"])("icon ", ctx.handleIcon, "");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(2);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"])(ctx.displayMenu);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(2);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"])("icon search ", ctx.choiseMenu == 0 ? "selected" : "", "");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"])("icon move ", ctx.choiseMenu == 1 ? "selected" : "", "");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"])("icon zoom ", ctx.choiseMenu == 2 ? "selected" : "", "");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"])("icon navigation ", ctx.choiseMenu == 3 ? "selected" : "", "");
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"])(1);
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"])("icon logout ", ctx.choiseMenu == 4 ? "selected" : "", "");
    } }, styles: [".map-container[_ngcontent-%COMP%]{position:absolute;z-index:1;top:0;left:0;right:0;bottom:0}#map[_ngcontent-%COMP%]{width:100%;height:100%}.map-container[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{position:absolute;z-index:1000;top:10px;right:10px;width:50px;height:50px}.menu-container[_ngcontent-%COMP%]{position:absolute;z-index:1001;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.3);display:none}.menu-box[_ngcontent-%COMP%]{position:absolute;top:calc(50% - 100px);left:calc(50% - 375px);width:750px;height:150px;background-color:#fff;border:1px solid orange!important;text-align:center;margin-top:50px}.menu-box[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{display:inline-block;width:150px;height:150px;border:0;border-radius:3px;background-size:100px 100px;background-repeat:no-repeat;background-position:center}.menu-box[_ngcontent-%COMP%]   .selected[_ngcontent-%COMP%]{background-color:orange}.show-menu[_ngcontent-%COMP%]{display:block}"] });
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(MapLibraryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "map-library",
                inputs: ['mapLat', 'mapLng', 'mapZoom', 'search', 'marker', 'focused'],
                templateUrl: "./map-library.component.html",
                styleUrls: ["./map-library.component.css",],
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { onchange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], onselect: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], keyEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ["window:keyup", ["$event"]]
        }] }); })();

class MapLibraryModule {
}
MapLibraryModule.ɵmod = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"])({ type: MapLibraryModule });
MapLibraryModule.ɵinj = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"])({ factory: function MapLibraryModule_Factory(t) { return new (t || MapLibraryModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"])(MapLibraryModule, { declarations: [MapLibraryComponent], exports: [MapLibraryComponent] }); })();
/*@__PURE__*/ (function () { Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"])(MapLibraryModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [MapLibraryComponent],
                imports: [],
                exports: [MapLibraryComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of map-library
 */

/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=map-library.js.map


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _assets_commune_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/commune.json */ "./src/assets/commune.json");
var _assets_commune_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../assets/commune.json */ "./src/assets/commune.json", 1);
/* harmony import */ var map_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! map-library */ "./dist/map-library/fesm2015/map-library.js");




class AppComponent {
    constructor(elem) {
        this.elem = elem;
        this.title = 'map-application';
        // component values
        this.mapLat = 45;
        this.mapLng = 5;
        this.mapZoom = 6;
        this.search = '';
        this.marker = [];
        this.focused = true;
        this.imageTab = [];
    }
    ngAfterViewInit() {
        this.infobox = this.elem.nativeElement.querySelector("#infobox");
        setTimeout(() => {
            // get gps metadata and display infos of paris
            for (let i = 1; i < 7; i++) {
                this.getExif("../assets/" + i + ".jpg");
            }
        }, 200);
        /*setTimeout(()=>{
          this.displayInfos({text: "Paris", content: "<span style='color:blue'>12°c</span> - <span style='color:green'>28°c</span>", img: "../assets/partly_cloudy.png", lat: 48.86, lng: 2.34445});
        },2200)*/
    }
    /******************************* map component's events *******************/
    onMapSelect(selected) {
        console.log(selected);
        this.displayInfos(selected);
    }
    onMapChange(event) {
        //console.log(event);
        this.displayCities(event);
    }
    /******************************* display images and infos *******************/
    displayInfos(element) {
        this.focused = false;
        this.infobox.style.display = 'block';
        let images = "";
        this.imageTab.forEach(el => {
            if (element.lat > el.lat - 0.5 && element.lat < el.lat + 0.5 && element.lng > el.lng - 0.5 && element.lng < el.lng + 0.5) {
                images += `
        <div class="imgContainer">
          <div>
            <img src="${el.img}">
          </div>
        </div>
        `;
            }
        });
        this.infobox.innerHTML = ` 
    <div class="col wheather">
      <h2>${element.text}</h2>
        <div class="wheatherInfo">
          <img src="${element.img}"/>
          <div class="content">${element.content}</div>
        </div>
    </div>
    <div class="col thumb">${images}</div>
    `;
    }
    hideInfos() {
        this.infobox.style.display = 'none';
        setTimeout(() => { this.focused = true; }, 10);
    }
    /******************************* keyboard event *******************/
    keyEvent(event) {
        if (!this.focused) {
            this.handlingNavigation(event.key);
        }
    }
    handlingNavigation(key) {
        console.log(key);
        switch (key) {
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            case "ArrowRight":
                break;
            case "ArrowLeft":
                break;
            case "Enter":
                break;
            case "Escape":
                this.hideInfos();
                break;
        }
    }
    /******************************* display cities weather *******************/
    displayCities(event) {
        let tab = [];
        _assets_commune_json__WEBPACK_IMPORTED_MODULE_1__["cities"].forEach(element => {
            if (element.zoom <= event.zoom && element.latitude < event.view.top && element.latitude > event.view.bottom && element.longitude < event.view.right && element.longitude > event.view.left) {
                tab.push({ text: element.city, content: "<span style='color:blue'>12°c</span> - <span style='color:green'>28°c</span>", img: "../assets/partly_cloudy.png", lat: element.latitude, lng: element.longitude });
            }
        });
        this.marker = tab;
    }
    /******************************* get image gps data *******************/
    getExif(imgUrl) {
        var self = this;
        this.getImageFromImageUrl(imgUrl, (image) => {
            EXIF.getData(image, function () {
                let imgLat = EXIF.getTag(this, 'GPSLatitude');
                let imgLng = EXIF.getTag(this, 'GPSLongitude');
                // convert from deg/min/sec to decimal for Google
                var strLatRef = EXIF.getTag(this, "GPSLatitudeRef") || "N";
                var strLongRef = EXIF.getTag(this, "GPSLongitudeRef") || "W";
                var fLat = (imgLat[0] + imgLat[1] / 60 + imgLat[2] / 3600) * (strLatRef == "N" ? 1 : -1);
                var fLng = (imgLng[0] + imgLng[1] / 60 + imgLng[2] / 3600) * (strLongRef == "W" ? -1 : 1);
                // add image to markers
                //self.addMarker({ img: imgUrl, lat: fLat, lng: fLng });
                self.imageTab.push({ img: imgUrl, lat: fLat, lng: fLng });
                console.log(self.imageTab);
            });
        });
    }
    // display image directly
    addMarker(element) {
        let tab = [];
        this.marker.forEach(el => { tab.push(el); });
        tab.push(element);
        this.marker = tab;
    }
    getImageFromImageUrl(url, callback) {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function () {
            callback(img);
        };
        img.src = url;
    }
    toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.responseType = 'blob';
        xhr.onload = function () {
            var fr = new FileReader();
            fr.onload = function () {
                callback(this.result);
            };
            fr.readAsDataURL(xhr.response); // async call
        };
        xhr.send();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function AppComponent_keyup_HostBindingHandler($event) { return ctx.keyEvent($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, decls: 2, vars: 6, consts: [[3, "mapLat", "mapLng", "mapZoom", "search", "marker", "focused", "onchange", "onselect"], ["id", "infobox"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "map-library", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("onchange", function AppComponent_Template_map_library_onchange_0_listener($event) { return ctx.onMapChange($event); })("onselect", function AppComponent_Template_map_library_onselect_0_listener($event) { return ctx.onMapSelect($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mapLat", ctx.mapLat)("mapLng", ctx.mapLng)("mapZoom", ctx.mapZoom)("search", ctx.search)("marker", ctx.marker)("focused", ctx.focused);
    } }, directives: [map_library__WEBPACK_IMPORTED_MODULE_2__["MapLibraryComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css'],
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { keyEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ["window:keyup", ["$event"]]
        }] }); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var map_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! map-library */ "./dist/map-library/fesm2015/map-library.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _weather_weather_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./weather/weather.component */ "./src/app/weather/weather.component.ts");






class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            map_library__WEBPACK_IMPORTED_MODULE_2__["MapLibraryModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _weather_weather_component__WEBPACK_IMPORTED_MODULE_4__["WeatherComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        map_library__WEBPACK_IMPORTED_MODULE_2__["MapLibraryModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _weather_weather_component__WEBPACK_IMPORTED_MODULE_4__["WeatherComponent"],
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    map_library__WEBPACK_IMPORTED_MODULE_2__["MapLibraryModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/weather/weather.component.ts":
/*!**********************************************!*\
  !*** ./src/app/weather/weather.component.ts ***!
  \**********************************************/
/*! exports provided: WeatherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherComponent", function() { return WeatherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class WeatherComponent {
    constructor() {
        this.weather = [];
    }
    ngOnInit() {
        this.getWeatherData();
    }
    getWeatherData() {
        fetch('http://api.openweathermap.org/data/2.5/group?id=6452235,6454924,2995469&units=metric&appid=39f7af91a4b080cd1fdef1f8e81062e7')
            .then(response => response.json)
            .then(data => { this.setWeatherData(data); });
    }
    setWeatherData(data) {
        this.WeatherData = data;
        for (let item of (this.WeatherData.list)) {
            this.weather.push(item.main.temp);
        }
    }
}
WeatherComponent.ɵfac = function WeatherComponent_Factory(t) { return new (t || WeatherComponent)(); };
WeatherComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WeatherComponent, selectors: [["app-weather"]], decls: 3, vars: 0, template: function WeatherComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "weather works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\ngi");
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3dlYXRoZXIvd2VhdGhlci5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WeatherComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-weather',
                templateUrl: './weather.component.html',
                styleUrls: ['./weather.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/assets/commune.json":
/*!*********************************!*\
  !*** ./src/assets/commune.json ***!
  \*********************************/
/*! exports provided: cities, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"cities\":[{\"city\":\"Ajaccio\",\"latitude\":41.916667,\"longitude\":8.733333,\"zoom\":6},{\"city\":\"Nice\",\"latitude\":43.7,\"longitude\":7.25,\"zoom\":7},{\"city\":\"Marseille\",\"latitude\":43.296482,\"longitude\":5.369779999999992,\"zoom\":6},{\"city\":\"La Rochelle\",\"latitude\":46.166667,\"longitude\":-1.15,\"zoom\":6},{\"city\":\"Saint-Brieuc\",\"latitude\":48.516667,\"longitude\":-2.783333,\"zoom\":8},{\"city\":\"Besançon\",\"latitude\":47.25,\"longitude\":6.033333,\"zoom\":7},{\"city\":\"Chartres\",\"latitude\":48.45,\"longitude\":1.5,\"zoom\":8},{\"city\":\"Brest\",\"latitude\":48.4,\"longitude\":-4.483333,\"zoom\":6},{\"city\":\"Nîmes\",\"latitude\":43.833333,\"longitude\":4.35,\"zoom\":8},{\"city\":\"Toulouse\",\"latitude\":43.6,\"longitude\":1.433333,\"zoom\":6},{\"city\":\"Montpellier\",\"latitude\":43.6,\"longitude\":3.883333,\"zoom\":7},{\"city\":\"Rennes\",\"latitude\":48.083333,\"longitude\":-1.683333,\"zoom\":6},{\"city\":\"Blois\",\"latitude\":47.583333,\"longitude\":1.333333,\"zoom\":7},{\"city\":\"Saint-Denis-sur-Loire\",\"latitude\":47.616667,\"longitude\":1.383333,\"zoom\":12},{\"city\":\"Saint-Sulpice\",\"latitude\":47.6,\"longitude\":1.266667,\"zoom\":12},{\"city\":\"Villebarou\",\"latitude\":47.616667,\"longitude\":1.316667,\"zoom\":12},{\"city\":\"Villerbon\",\"latitude\":47.666667,\"longitude\":1.366667,\"zoom\":12},{\"city\":\"Baudre\",\"latitude\":49.083333,\"longitude\":-1.066667,\"zoom\":12},{\"city\":\"Le Mesnil-Rouxelin\",\"latitude\":49.15,\"longitude\":-1.083333,\"zoom\":12},{\"city\":\"Rampan\",\"latitude\":49.133333,\"longitude\":-1.15,\"zoom\":12},{\"city\":\"Saint-Georges-Montcocq\",\"latitude\":49.133333,\"longitude\":-1.083333,\"zoom\":14},{\"city\":\"Saint-Lô\",\"latitude\":49.116667,\"longitude\":-1.083333,\"zoom\":7},{\"city\":\"Bar-le-Duc\",\"latitude\":48.783333,\"longitude\":5.166667,\"zoom\":8},{\"city\":\"Géry\",\"latitude\":48.783333,\"longitude\":5.3,\"zoom\":12},{\"city\":\"Chardogne\",\"latitude\":48.833333,\"longitude\":5.116667,\"zoom\":12},{\"city\":\"Montplonne\",\"latitude\":48.7,\"longitude\":5.166667,\"zoom\":12},{\"city\":\"Trémont-sur-Saulx\",\"latitude\":48.75,\"longitude\":5.05,\"zoom\":12},{\"city\":\"Vavincourt\",\"latitude\":48.816667,\"longitude\":5.216667,\"zoom\":12},{\"city\":\"Challuy\",\"latitude\":46.95,\"longitude\":3.15,\"zoom\":12},{\"city\":\"Nevers\",\"latitude\":46.983333,\"longitude\":3.166667,\"zoom\":8},{\"city\":\"Saint-Eloi\",\"latitude\":46.966667,\"longitude\":3.216667,\"zoom\":12},{\"city\":\"Sermoise-sur-Loire\",\"latitude\":46.9517,\"longitude\":3.185,\"zoom\":14},{\"city\":\"Lille\",\"latitude\":50.633333,\"longitude\":3.066667,\"zoom\":6},{\"city\":\"Clermont-Ferrand\",\"latitude\":45.783333,\"longitude\":3.083333,\"zoom\":7},{\"city\":\"Pau\",\"latitude\":43.3,\"longitude\":-0.366667,\"zoom\":7},{\"city\":\"Perpignan\",\"latitude\":42.683333,\"longitude\":2.883333,\"zoom\":7},{\"city\":\"Strasbourg\",\"latitude\":48.583333,\"longitude\":7.75,\"zoom\":6},{\"city\":\"Colmar\",\"latitude\":48.083333,\"longitude\":7.366667,\"zoom\":8},{\"city\":\"Annecy\",\"latitude\":45.9,\"longitude\":6.116667,\"zoom\":7},{\"city\":\"Paris\",\"latitude\":48.86,\"longitude\":2.34445,\"zoom\":1},{\"city\":\"Rouen\",\"latitude\":49.433333,\"longitude\":1.083333,\"zoom\":7},{\"city\":\"Nantes\",\"latitude\":47.2321830557,\"longitude\":-1.54780684906,\"zoom\":7},{\"city\":\"Bordeaux\",\"latitude\":44.8350088,\"longitude\":-0.587269,\"zoom\":7},{\"city\":\"Poitiers\",\"latitude\":46.58231935943061,\"longitude\":0.36695181494662,\"zoom\":8},{\"city\":\"Limoges\",\"latitude\":45.8162774,\"longitude\":1.2623048,\"zoom\":7},{\"city\":\"Angers\",\"latitude\":47.501835,\"longitude\":-0.517146,\"zoom\":8},{\"city\":\"Vannes\",\"latitude\":47.65548697940501,\"longitude\":-2.748627597254,\"zoom\":8},{\"city\":\"Le Mans\",\"latitude\":48.0157803,\"longitude\":0.1609266,\"zoom\":8},{\"city\":\"Caen\",\"latitude\":49.18178805882354,\"longitude\":-0.37257017647059,\"zoom\":8},{\"city\":\"Amiens\",\"latitude\":49.89905,\"longitude\":2.2752772,\"zoom\":8},{\"city\":\"Dunkerque\",\"latitude\":51.0460018,\"longitude\":2.3579275,\"zoom\":8},{\"city\":\"Reims\",\"latitude\":49.24939492146597,\"longitude\":4.03978565445026,\"zoom\":7},{\"city\":\"Troyes\",\"latitude\":48.29791025477709,\"longitude\":4.08048050955414,\"zoom\":7},{\"city\":\"Metz\",\"latitude\":49.1193074,\"longitude\":6.1757236,\"zoom\":7},{\"city\":\"Lyon\",\"latitude\":45.7712918,\"longitude\":4.8280831,\"zoom\":6},{\"city\":\"Châteauroux\",\"latitude\":46.8062392746114,\"longitude\":1.69132010362694,\"zoom\":6},{\"city\":\"Nancy\",\"latitude\":48.6896459,\"longitude\":6.1737197,\"zoom\":8}]}");

/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: true
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/rmbj8032/map-application/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map