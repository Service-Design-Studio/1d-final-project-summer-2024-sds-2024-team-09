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

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nError: Duplicate plugin/preset detected.\nIf you'd like to use two separate instances of a plugin,\nthey need separate names, e.g.\n\n  plugins: [\n    ['some-plugin', {}],\n    ['some-plugin', {}, 'some unique name'],\n  ]\n\nDuplicates detected are:\n[\n  {\n    \"alias\": \"/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/preset-env/lib/index.js\",\n    \"dirname\": \"/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09\",\n    \"ownPass\": false,\n    \"file\": {\n      \"request\": \"@babel/preset-env\",\n      \"resolved\": \"/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/preset-env/lib/index.js\"\n    }\n  },\n  {\n    \"alias\": \"/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/preset-env/lib/index.js\",\n    \"options\": {\n      \"forceAllTransforms\": true,\n      \"useBuiltIns\": \"entry\",\n      \"corejs\": 3,\n      \"modules\": false,\n      \"exclude\": [\n        \"transform-typeof-symbol\"\n      ]\n    },\n    \"dirname\": \"/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09\",\n    \"ownPass\": false,\n    \"file\": {\n      \"request\": \"@babel/preset-env\",\n      \"resolved\": \"/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/preset-env/lib/index.js\"\n    }\n  }\n]\n    at assertNoDuplicates (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/config-descriptors.js:183:13)\n    at createDescriptors (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/config-descriptors.js:107:3)\n    at createDescriptors.next (<anonymous>)\n    at createPresetDescriptors (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/config-descriptors.js:96:17)\n    at createPresetDescriptors.next (<anonymous>)\n    at /Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/gensync-utils/functional.js:39:27\n    at Generator.next (<anonymous>)\n    at mergeChainOpts (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/config-chain.js:350:34)\n    at mergeChainOpts.next (<anonymous>)\n    at chainWalker (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/config-chain.js:316:14)\n    at chainWalker.next (<anonymous>)\n    at loadFileChain (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/config-chain.js:191:24)\n    at loadFileChain.next (<anonymous>)\n    at buildRootChain (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/config-chain.js:77:27)\n    at buildRootChain.next (<anonymous>)\n    at loadPrivatePartialConfig (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/partial.js:72:62)\n    at loadPrivatePartialConfig.next (<anonymous>)\n    at loadPartialConfig (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/partial.js:115:25)\n    at loadPartialConfig.next (<anonymous>)\n    at step (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/gensync/index.js:261:32)\n    at evaluateAsync (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/gensync/index.js:291:5)\n    at /Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/gensync/index.js:93:9\n    at new Promise (<anonymous>)\n    at async (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/gensync/index.js:92:14)\n    at stopHiding - secret - don't use this - v1 (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/errors/rewrite-stack-trace.js:47:12)\n    at loadPartialConfigAsync (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/@babel/core/lib/config/index.js:34:85)\n    at Object.<anonymous> (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:126:26)\n    at Generator.next (<anonymous>)\n    at asyncGeneratorStep (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:3:103)\n    at _next (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:4:194)\n    at /Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:4:364\n    at new Promise (<anonymous>)\n    at Object.<anonymous> (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:4:97)\n    at Object._loader (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:210:18)\n    at Object.loader (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:48:18)\n    at Object.<anonymous> (/Users/jingkaitan/Library/CloudStorage/OneDrive-SingaporeUniversityofTechnologyandDesign/GitHub-Cloud/1d-final-project-summer-2024-sds-2024-team-09/node_modules/babel-loader/lib/index.js:44:12)");

/***/ })

/******/ });
//# sourceMappingURL=application-554ddd9bc53025588cce.js.map