/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/application.js":
/*!*********************************************!*\
  !*** ./app/javascript/packs/application.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: [BABEL]: --- PLACEHOLDER PACKAGE ---\nThis @babel/plugin-proposal-private-property-in-object version is not meant to\nbe imported. Something is importing\n@babel/plugin-proposal-private-property-in-object without declaring it in its\ndependencies (or devDependencies) in the package.json file.\nAdd \"@babel/plugin-proposal-private-property-in-object\" to your devDependencies\nto work around this error. This will make this message go away.\n (While processing: /Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/plugin-proposal-private-property-in-object/lib/index.js)\n    at Object.<anonymous> (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/plugin-proposal-private-property-in-object/lib/index.js:28:7)\n    at Module._compile (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/v8-compile-cache/v8-compile-cache.js:192:30)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)\n    at Module.load (node:internal/modules/cjs/loader:1208:32)\n    at Module._load (node:internal/modules/cjs/loader:1024:12)\n    at Module.require (node:internal/modules/cjs/loader:1233:19)\n    at require (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/v8-compile-cache/v8-compile-cache.js:159:20)\n    at loadPartialConfigAsync (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/index.js:34:85)\n    at Object.<anonymous> (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:126:26)");

/***/ })

/******/ });
//# sourceMappingURL=application-2925526a42db438dbfe6.js.map