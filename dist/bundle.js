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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n//#region 1&2 Introduction & Basics (Creating an Observable)\n/*\n// defines what will happen when the observable is executed\nlet allBooksObservable$ = Observable.create((subscriber) => {\n//let allBooksObservable$ = new Observable((subscriber) => {\n  if (document.title !== \"RxBookTracker\") {\n    subscriber.error(\"Incorrect page title.\");\n  }\n\n  for (let book of allBooks) {\n    subscriber.next(book);\n  }\n\n  setTimeout(() => {\n    subscriber.complete();\n  }, 2000);\n\n  return () => console.log(\"Executing teardown code.\");\n});\n\n// subscribes to an observable\nallBooksObservable$.subscribe((book) => console.log(book.title));\n*/\n//#endregion\n//#region 3.a. Creating Observables (using of(), from(), concat())\n/*\n// Create and combine observables from existing data, using of(), from(), concat()\n\n// passes a bunch of individual values\nlet source1$ = of(\"hello\", 10, true, allReaders[0].name);\n\n// source1$.subscribe((value) => console.log(value));\n\n// single object that encapsulates a group of values\n// can pass in an array, a promise, or another observable\nlet source2$ = from(allBooks);\n\n// source2$.subscribe((book) => console.log(book.title));\n\nconcat(source1$, source2$).subscribe((value) => console.log(value));\n*/\n//#endregion\n//#region 3.b. Creating Observables to Handle Events\n/*\nlet button = document.getElementById(\"readersButton\");\n\nfromEvent(button, \"click\").subscribe((event) => {\n  console.log(event);\n\n  let readersDiv = document.getElementById(\"readers\");\n\n  for (const reader of allReaders) {\n    readersDiv.innerHTML += reader.name + \"<br>\";\n  }\n});\n*/\n//#endregion\n//#region 3.c. Making AJAX Requests with RxJS\n/*\nlet button = document.getElementById(\"readersButton\");\n\nfromEvent(button, \"click\").subscribe((event) => {\n  ajax(\"/api/readers\").subscribe((ajaxResponse) => {\n    let readers = ajaxResponse.response;\n    let readersDiv = document.getElementById(\"readers\");\n\n    for (const reader of readers) {\n      readersDiv.innerHTML += reader.name + \"<br>\";\n    }\n  });\n});\n*/\n//#endregion\n//#region 4.a. Subscribing to Observables with Observers\n/*\nlet books$ = from(allBooks);\n\n// object literal syntax\n// let booksObserver = {\n//   next: (book) => console.log(`Title: ${book.title}`),\n//   error: (err) => console.log(`Error: ${err}`),\n//   complete: () => console.log(`All done!`),\n// };\n// books$.subscribe(booksObserver);\n\n// most common syntax\nbooks$.subscribe(\n  (book) => console.log(`Title: ${book.title}`),\n  (err) => console.log(`Error: ${err}`),\n  () => console.log(`All done!`)\n);\n*/\n//#endregion\n//#region 4.b. Multiple observers are observing the same observable\n// let currentTime$ = new Observable((subscriber) => {\n//   const timeString = new Date().toLocaleTimeString();\n//   subscriber.next(timeString);\n//   subscriber.complete();\n// });\n// // each observer triggered a new execution of the observable\n// currentTime$.subscribe((currentTime) =>\n//   console.log(`Observer 1: ${currentTime}`)\n// );\n// setTimeout(() => {\n//   currentTime$.subscribe((currentTime) =>\n//     console.log(`Observer 2: ${currentTime}`)\n//   );\n// }, 1000);\n// setTimeout(() => {\n//   currentTime$.subscribe((currentTime) =>\n//     console.log(`Observer 3: ${currentTime}`)\n//   );\n// }, 2000);\n//#endregion\n//#region 4.c. Cancelling Observable Execution with a Subscription\n// let timesDiv = document.getElementById(\"times\");\n// let button = document.getElementById(\"timerButton\");\n// // i. syntax using interval\n// // let timer$ = interval(1000);\n// // ii. syntax creating our own observable\n// let timer$ = new Observable((subscriber) => {\n//   let i = 0;\n//   let intervalID = setInterval(() => {\n//     subscriber.next(i++);\n//   }, 1000);\n//   // this form has an exit point for customization\n//   return () => {\n//     console.log(`Executing teardown code`);\n//     clearInterval(intervalID);\n//   };\n// });\n// let timerSubscription = timer$.subscribe(\n//   (value) =>\n//     (timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`),\n//   null,\n//   () => console.log(`All done!`)\n// );\n// // i. creating a new subscription\n// let timerConsoleSubscription = timer$.subscribe((value) =>\n//   console.log(`${new Date().toLocaleTimeString()} (${value})`)\n// );\n// // ii. adding timerConsoleSubscription to be unsubscribed together with the first one\n// timerSubscription.add(timerConsoleSubscription);\n// fromEvent(button, \"click\").subscribe((event) =>\n//   timerSubscription.unsubscribe()\n// );\n//#endregion\n//#region 5.a. Using Operators\n//ajax(\"/api/books\")\n// ajax(\"/api/errors/500\")\n//   .pipe(\n//     mergeMap((ajaxResponse) => ajaxResponse.response),\n//     filter((book) => book.publicationYear < 1950),\n//     tap((oldBook) => console.log(`Title ${oldBook.title}`)),\n//     //catchError((err) => of({ title: \"Corduroy\", author: \"Don Freeman\" }))\n//     //catchError((err, caught) => caught)\n//     //catchError((err) => throw `Something bad happened - ${err.message}`),\n//     catchError((err) => return throwError(err.message))\n//   )\n//   .subscribe((finalValue) => console.log(finalValue));\n//#endregion\n//#region 5.b. Using Operators\n// let timesDiv = document.getElementById(\"times\");\n// let button = document.getElementById(\"timerButton\");\n// let timer$ = new Observable((subscriber) => {\n//   let i = 0;\n//   let intervalID = setInterval(() => {\n//     subscriber.next(i++);\n//   }, 1000);\n//   return () => {\n//     console.log(`Executing teardown code`);\n//     clearInterval(intervalID);\n//   };\n// });\n// let cancelTimer$ = fromEvent(button, \"click\");\n// timer$\n//   //.pipe(take(3))\n//   .pipe(takeUntil(cancelTimer$))\n//   .subscribe(\n//     (value) =>\n//       (timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`),\n//     null,\n//     () => console.log(`All done!`)\n//   );\n//#endregion\n//#region 6.a. Creating Your Own Operators\n// function grabAndLogClassics(year, log) {\n//   return (source$) => {\n//     return new Observable((subsriber) => {\n//       // used for unsubscribe! part of the teardown process!\n//       return source$.subscribe(\n//         (book) => {\n//           if (book.publicationYear < year) {\n//             subsriber.next(book);\n//             if (log) {\n//               console.log(`Classic: ${book.title}`);\n//             }\n//           }\n//         },\n//         (err) => subsriber.error(err),\n//         () => subsriber.complete()\n//       );\n//     });\n//   };\n// }\n// function grabClassics(year) {\n//   return filter((book) => book.publicationYear < year);\n// }\n// function grabAndLogClassicsWithPipe(year, log) {\n//   return (source$) =>\n//     source$.pipe(\n//       filter((book) => book.publicationYear < year),\n//       tap(\n//         (classicBook) =>\n//           log ? console.log(`Title ${classicBook.title}`) : null\n//       )\n//     );\n// }\n// ajax(\"/api/books\")\n//   .pipe(\n//     flatMap((ajaxResponse) => ajaxResponse.response),\n//     //filter((book) => book.publicationYear < 1950),\n//     //tap((oldBook) => console.log(`Title ${oldBook.title}`))\n//     //grabAndLogClassics(1930, false)\n//     //grabClassics(1950)\n//     grabAndLogClassicsWithPipe(1930, true)\n//   )\n//   .subscribe(\n//     (finalValue) => console.log(`VALUE: ${finalValue.title}`),\n//     (error) => console.log(`ERROR: ${error}`)\n//   );\n//#endregion\n//#region 7.a. Using Subjects and Multicasted Observables\n// let subject$ = new Subject();\n// subject$.subscribe((value) => console.log(`Observer 1: ${value}`));\n// subject$.subscribe((value) => console.log(`Observer 2: ${value}`));\n// subject$.next(\"Hello!\");\n// let source$ = new Observable((subscriber) => {\n//   subscriber.next(\"Greetings!\");\n// });\n// source$.subscribe(subject$);\n//#endregion\n//#region 7.b. Using Subjects and Multicasted Observables\n// let source$ = interval(1000).pipe(take(4));\n// // multicast\n// let subject$ = new Subject();\n// source$.subscribe(subject$);\n// // comment above and change subject$s below to source and this will become a unicast\n// subject$.subscribe((value) => console.log(`Observer 1: ${value}`));\n// setTimeout(() => {\n//   subject$.subscribe((value) => console.log(`Observer 2: ${value}`));\n// }, 1000);\n// setTimeout(() => {\n//   subject$.subscribe((value) => console.log(`Observer 3: ${value}`));\n// }, 2000);\n//#endregion\n//#region 7.c. Multicasting operators\n// let source$ = interval(1000).pipe(\n//   take(4),\n//   //multicast(new Subject()),\n//   //publish(),\n//   //refCount(),\n//   // publishLast(),\n//   // publishBehavior(),\n//   // publishReplay(),\n//   share()\n// );\n// // multicast\n// // just removed the subject and instead we are now using multicast operator\n// // comment above and change subject$s below to source and this will become a unicast\n// source$.subscribe((value) => console.log(`Observer 1: ${value}`));\n// setTimeout(() => {\n//   source$.subscribe((value) => console.log(`Observer 2: ${value}`));\n// }, 1000);\n// setTimeout(() => {\n//   source$.subscribe((value) => console.log(`Observer 3: ${value}`));\n// }, 2000);\n// setTimeout(() => {\n//   source$.subscribe((value) => console.log(`Observer 4: ${value}`), null, () =>\n//     console.log(\"Observer 4 complete.\")\n//   );\n// }, 4500);\n// //source$.connect();\n//#endregion\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

/******/ });