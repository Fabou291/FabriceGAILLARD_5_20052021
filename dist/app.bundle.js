/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/basket.js":
/*!**************************!*\
  !*** ./src/js/basket.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Basket)\n/* harmony export */ });\nclass Basket {\r\n\r\n    listProduct = [];\r\n\r\n    constructor(listProduct){\r\n        this.listProduct = listProduct;\r\n    }\r\n\r\n    getTotal(){\r\n        return this.listProduct.reduce(accumulator, Product => accumulator += Product.getTotal(), 0);\r\n    }\r\n\r\n    getFormatedTotal(){\r\n        return new Intl.NumberFormat( \r\n            'fr-FR', { style: 'currency', currency: 'EUR' }\r\n        ).format(\r\n            (this.getTotal() / 100).toFixed()\r\n        );\r\n    }\r\n\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmlub2NvLy4vc3JjL2pzL2Jhc2tldC5qcz8wYzIyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBZTs7QUFFZjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiLi9zcmMvanMvYmFza2V0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFza2V0IHtcclxuXHJcbiAgICBsaXN0UHJvZHVjdCA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxpc3RQcm9kdWN0KXtcclxuICAgICAgICB0aGlzLmxpc3RQcm9kdWN0ID0gbGlzdFByb2R1Y3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VG90YWwoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5saXN0UHJvZHVjdC5yZWR1Y2UoYWNjdW11bGF0b3IsIFByb2R1Y3QgPT4gYWNjdW11bGF0b3IgKz0gUHJvZHVjdC5nZXRUb3RhbCgpLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGb3JtYXRlZFRvdGFsKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdCggXHJcbiAgICAgICAgICAgICdmci1GUicsIHsgc3R5bGU6ICdjdXJyZW5jeScsIGN1cnJlbmN5OiAnRVVSJyB9XHJcbiAgICAgICAgKS5mb3JtYXQoXHJcbiAgICAgICAgICAgICh0aGlzLmdldFRvdGFsKCkgLyAxMDApLnRvRml4ZWQoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/basket.js\n");

/***/ }),

/***/ "./src/js/config.json":
/*!****************************!*\
  !*** ./src/js/config.json ***!
  \****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"serverPath":"http://localhost:3000/api/cameras/","storageName":{"basket":"listBasket","product":"listProduct"}}');

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.json */ \"./src/js/config.json\");\n/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product.js */ \"./src/js/product.js\");\n/* harmony import */ var _productBasket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productBasket.js */ \"./src/js/productBasket.js\");\n/* harmony import */ var _basket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basket.js */ \"./src/js/basket.js\");\n\r\n\r\n\r\n\r\n\r\nconsole.log(\r\n\r\n\r\n\r\n);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmlub2NvLy4vc3JjL2pzL21haW4uanM/OTI5MSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFrQztBQUNDO0FBQ1k7QUFDZDs7QUFFakM7Ozs7QUFJQSIsImZpbGUiOiIuL3NyYy9qcy9tYWluLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZy5qc29uJ1xyXG5pbXBvcnQgUHJvZHVjdCBmcm9tICcuL3Byb2R1Y3QuanMnO1xyXG5pbXBvcnQgUHJvZHVjdEJhc2tldCBmcm9tICcuL3Byb2R1Y3RCYXNrZXQuanMnO1xyXG5pbXBvcnQgQmFza2V0IGZyb20gJy4vYmFza2V0LmpzJztcclxuXHJcbmNvbnNvbGUubG9nKFxyXG5cclxuXHJcblxyXG4pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/main.js\n");

/***/ }),

/***/ "./src/js/product.js":
/*!***************************!*\
  !*** ./src/js/product.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Product)\n/* harmony export */ });\nclass Product {\r\n\r\n    _id = '';\r\n    name = '';\r\n    price = '';\r\n    description = '';\r\n    imageUrl = '';\r\n\r\n    constructor(product){\r\n        Object.assign(this, product);\r\n    }\r\n\r\n    /**\r\n     * Retourne le prix au formaté \"fr-FR\"\r\n     * @returns string parsePrice \r\n     */\r\n    getFormatedPrice(){\r\n        return new Intl.NumberFormat( \r\n            'fr-FR', { style: 'currency', currency: 'EUR' }\r\n        ).format(\r\n            (this.price / 100).toFixed()\r\n        );\r\n    }\r\n\r\n\r\n\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmlub2NvLy4vc3JjL2pzL3Byb2R1Y3QuanM/ZTA4NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUEiLCJmaWxlIjoiLi9zcmMvanMvcHJvZHVjdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3Qge1xyXG5cclxuICAgIF9pZCA9ICcnO1xyXG4gICAgbmFtZSA9ICcnO1xyXG4gICAgcHJpY2UgPSAnJztcclxuICAgIGRlc2NyaXB0aW9uID0gJyc7XHJcbiAgICBpbWFnZVVybCA9ICcnO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb2R1Y3Qpe1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgcHJvZHVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXRvdXJuZSBsZSBwcml4IGF1IGZvcm1hdMOpIFwiZnItRlJcIlxyXG4gICAgICogQHJldHVybnMgc3RyaW5nIHBhcnNlUHJpY2UgXHJcbiAgICAgKi9cclxuICAgIGdldEZvcm1hdGVkUHJpY2UoKXtcclxuICAgICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCBcclxuICAgICAgICAgICAgJ2ZyLUZSJywgeyBzdHlsZTogJ2N1cnJlbmN5JywgY3VycmVuY3k6ICdFVVInIH1cclxuICAgICAgICApLmZvcm1hdChcclxuICAgICAgICAgICAgKHRoaXMucHJpY2UgLyAxMDApLnRvRml4ZWQoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/product.js\n");

/***/ }),

/***/ "./src/js/productBasket.js":
/*!*********************************!*\
  !*** ./src/js/productBasket.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProductBasket)\n/* harmony export */ });\n/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product.js */ \"./src/js/product.js\");\n\r\nclass ProductBasket extends _product_js__WEBPACK_IMPORTED_MODULE_0__.default{\r\n\r\n    quantity = '';\r\n    version = '';\r\n    selected = true;\r\n\r\n    constructor(ProductBasket){\r\n        super({\r\n            _id           : ProductBasket._id,\r\n            name          : ProductBasket.name,\r\n            description   : ProductBasket.description,\r\n            price         : ProductBasket.price,\r\n            imageUrl      : ProductBasket.imageUrl,\r\n        });\r\n        this.quantity   = ProductBasket.quantity;\r\n        this.version    = ProductBasket.version;\r\n        this.selected   = ProductBasket.selected;\r\n    }\r\n    \r\n    getTotal(){\r\n        return this.price * this.quantity;\r\n    }\r\n\r\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmlub2NvLy4vc3JjL2pzL3Byb2R1Y3RCYXNrZXQuanM/Yjc1NyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFtQztBQUNwQiw0QkFBNEIsZ0RBQU87O0FBRWxEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiLi9zcmMvanMvcHJvZHVjdEJhc2tldC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9kdWN0IGZyb20gJy4vcHJvZHVjdC5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RCYXNrZXQgZXh0ZW5kcyBQcm9kdWN0e1xyXG5cclxuICAgIHF1YW50aXR5ID0gJyc7XHJcbiAgICB2ZXJzaW9uID0gJyc7XHJcbiAgICBzZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgY29uc3RydWN0b3IoUHJvZHVjdEJhc2tldCl7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBfaWQgICAgICAgICAgIDogUHJvZHVjdEJhc2tldC5faWQsXHJcbiAgICAgICAgICAgIG5hbWUgICAgICAgICAgOiBQcm9kdWN0QmFza2V0Lm5hbWUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uICAgOiBQcm9kdWN0QmFza2V0LmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBwcmljZSAgICAgICAgIDogUHJvZHVjdEJhc2tldC5wcmljZSxcclxuICAgICAgICAgICAgaW1hZ2VVcmwgICAgICA6IFByb2R1Y3RCYXNrZXQuaW1hZ2VVcmwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5xdWFudGl0eSAgID0gUHJvZHVjdEJhc2tldC5xdWFudGl0eTtcclxuICAgICAgICB0aGlzLnZlcnNpb24gICAgPSBQcm9kdWN0QmFza2V0LnZlcnNpb247XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZCAgID0gUHJvZHVjdEJhc2tldC5zZWxlY3RlZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0VG90YWwoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcmljZSAqIHRoaXMucXVhbnRpdHk7XHJcbiAgICB9XHJcblxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/productBasket.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;