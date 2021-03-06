import {
  Observable,
  of,
  from,
  fromEvent,
  concat,
  Subscriber,
  interval,
  throwError,
  Subject,
  asyncScheduler,
  asapScheduler,
  queueScheduler,
  merge,
} from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  mergeMap,
  filter,
  tap,
  catchError,
  take,
  takeUntil,
  flatMap,
  subscribeOn,
  multicast,
  refCount,
  publish,
  share,
  observeOn,
} from "rxjs/operators";
import { allBooks, allReaders } from "./data";

//#region 1&2 Introduction & Basics (Creating an Observable)
/*
// defines what will happen when the observable is executed
let allBooksObservable$ = Observable.create((subscriber) => {
//let allBooksObservable$ = new Observable((subscriber) => {
  if (document.title !== "RxBookTracker") {
    subscriber.error("Incorrect page title.");
  }

  for (let book of allBooks) {
    subscriber.next(book);
  }

  setTimeout(() => {
    subscriber.complete();
  }, 2000);

  return () => console.log("Executing teardown code.");
});

// subscribes to an observable
allBooksObservable$.subscribe((book) => console.log(book.title));
*/
//#endregion

//#region 3.a. Creating Observables (using of(), from(), concat())
/*
// Create and combine observables from existing data, using of(), from(), concat()

// passes a bunch of individual values
let source1$ = of("hello", 10, true, allReaders[0].name);

// source1$.subscribe((value) => console.log(value));

// single object that encapsulates a group of values
// can pass in an array, a promise, or another observable
let source2$ = from(allBooks);

// source2$.subscribe((book) => console.log(book.title));

concat(source1$, source2$).subscribe((value) => console.log(value));
*/
//#endregion
//#region 3.b. Creating Observables to Handle Events
/*
let button = document.getElementById("readersButton");

fromEvent(button, "click").subscribe((event) => {
  console.log(event);

  let readersDiv = document.getElementById("readers");

  for (const reader of allReaders) {
    readersDiv.innerHTML += reader.name + "<br>";
  }
});
*/
//#endregion
//#region 3.c. Making AJAX Requests with RxJS
/*
let button = document.getElementById("readersButton");

fromEvent(button, "click").subscribe((event) => {
  ajax("/api/readers").subscribe((ajaxResponse) => {
    let readers = ajaxResponse.response;
    let readersDiv = document.getElementById("readers");

    for (const reader of readers) {
      readersDiv.innerHTML += reader.name + "<br>";
    }
  });
});
*/
//#endregion

//#region 4.a. Subscribing to Observables with Observers
/*
let books$ = from(allBooks);

// object literal syntax
// let booksObserver = {
//   next: (book) => console.log(`Title: ${book.title}`),
//   error: (err) => console.log(`Error: ${err}`),
//   complete: () => console.log(`All done!`),
// };
// books$.subscribe(booksObserver);

// most common syntax
books$.subscribe(
  (book) => console.log(`Title: ${book.title}`),
  (err) => console.log(`Error: ${err}`),
  () => console.log(`All done!`)
);
*/
//#endregion
//#region 4.b. Multiple observers are observing the same observable
// let currentTime$ = new Observable((subscriber) => {
//   const timeString = new Date().toLocaleTimeString();
//   subscriber.next(timeString);
//   subscriber.complete();
// });

// // each observer triggered a new execution of the observable
// currentTime$.subscribe((currentTime) =>
//   console.log(`Observer 1: ${currentTime}`)
// );

// setTimeout(() => {
//   currentTime$.subscribe((currentTime) =>
//     console.log(`Observer 2: ${currentTime}`)
//   );
// }, 1000);

// setTimeout(() => {
//   currentTime$.subscribe((currentTime) =>
//     console.log(`Observer 3: ${currentTime}`)
//   );
// }, 2000);
//#endregion
//#region 4.c. Cancelling Observable Execution with a Subscription
// let timesDiv = document.getElementById("times");
// let button = document.getElementById("timerButton");

// // i. syntax using interval
// // let timer$ = interval(1000);

// // ii. syntax creating our own observable
// let timer$ = new Observable((subscriber) => {
//   let i = 0;
//   let intervalID = setInterval(() => {
//     subscriber.next(i++);
//   }, 1000);

//   // this form has an exit point for customization
//   return () => {
//     console.log(`Executing teardown code`);
//     clearInterval(intervalID);
//   };
// });

// let timerSubscription = timer$.subscribe(
//   (value) =>
//     (timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`),
//   null,
//   () => console.log(`All done!`)
// );

// // i. creating a new subscription
// let timerConsoleSubscription = timer$.subscribe((value) =>
//   console.log(`${new Date().toLocaleTimeString()} (${value})`)
// );
// // ii. adding timerConsoleSubscription to be unsubscribed together with the first one
// timerSubscription.add(timerConsoleSubscription);

// fromEvent(button, "click").subscribe((event) =>
//   timerSubscription.unsubscribe()
// );
//#endregion

//#region 5.a. Using Operators
//ajax("/api/books")
// ajax("/api/errors/500")
//   .pipe(
//     mergeMap((ajaxResponse) => ajaxResponse.response),
//     filter((book) => book.publicationYear < 1950),
//     tap((oldBook) => console.log(`Title ${oldBook.title}`)),
//     //catchError((err) => of({ title: "Corduroy", author: "Don Freeman" }))
//     //catchError((err, caught) => caught)
//     //catchError((err) => throw `Something bad happened - ${err.message}`),
//     catchError((err) => return throwError(err.message))
//   )
//   .subscribe((finalValue) => console.log(finalValue));
//#endregion
//#region 5.b. Using Operators
// let timesDiv = document.getElementById("times");
// let button = document.getElementById("timerButton");

// let timer$ = new Observable((subscriber) => {
//   let i = 0;
//   let intervalID = setInterval(() => {
//     subscriber.next(i++);
//   }, 1000);

//   return () => {
//     console.log(`Executing teardown code`);
//     clearInterval(intervalID);
//   };
// });

// let cancelTimer$ = fromEvent(button, "click");

// timer$
//   //.pipe(take(3))
//   .pipe(takeUntil(cancelTimer$))
//   .subscribe(
//     (value) =>
//       (timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`),
//     null,
//     () => console.log(`All done!`)
//   );
//#endregion

//#region 6.a. Creating Your Own Operators
// function grabAndLogClassics(year, log) {
//   return (source$) => {
//     return new Observable((subsriber) => {
//       // used for unsubscribe! part of the teardown process!
//       return source$.subscribe(
//         (book) => {
//           if (book.publicationYear < year) {
//             subsriber.next(book);
//             if (log) {
//               console.log(`Classic: ${book.title}`);
//             }
//           }
//         },
//         (err) => subsriber.error(err),
//         () => subsriber.complete()
//       );
//     });
//   };
// }

// function grabClassics(year) {
//   return filter((book) => book.publicationYear < year);
// }

// function grabAndLogClassicsWithPipe(year, log) {
//   return (source$) =>
//     source$.pipe(
//       filter((book) => book.publicationYear < year),
//       tap(
//         (classicBook) =>
//           log ? console.log(`Title ${classicBook.title}`) : null
//       )
//     );
// }

// ajax("/api/books")
//   .pipe(
//     flatMap((ajaxResponse) => ajaxResponse.response),
//     //filter((book) => book.publicationYear < 1950),
//     //tap((oldBook) => console.log(`Title ${oldBook.title}`))
//     //grabAndLogClassics(1930, false)
//     //grabClassics(1950)
//     grabAndLogClassicsWithPipe(1930, true)
//   )
//   .subscribe(
//     (finalValue) => console.log(`VALUE: ${finalValue.title}`),
//     (error) => console.log(`ERROR: ${error}`)
//   );
//#endregion

//#region 7.a. Using Subjects and Multicasted Observables
// let subject$ = new Subject();

// subject$.subscribe((value) => console.log(`Observer 1: ${value}`));
// subject$.subscribe((value) => console.log(`Observer 2: ${value}`));

// subject$.next("Hello!");

// let source$ = new Observable((subscriber) => {
//   subscriber.next("Greetings!");
// });

// source$.subscribe(subject$);
//#endregion
//#region 7.b. Using Subjects and Multicasted Observables
// let source$ = interval(1000).pipe(take(4));

// // multicast
// let subject$ = new Subject();
// source$.subscribe(subject$);

// // comment above and change subject$s below to source and this will become a unicast
// subject$.subscribe((value) => console.log(`Observer 1: ${value}`));

// setTimeout(() => {
//   subject$.subscribe((value) => console.log(`Observer 2: ${value}`));
// }, 1000);

// setTimeout(() => {
//   subject$.subscribe((value) => console.log(`Observer 3: ${value}`));
// }, 2000);
//#endregion
//#region 7.c. Multicasting operators
// let source$ = interval(1000).pipe(
//   take(4),
//   //multicast(new Subject()),
//   //publish(),
//   //refCount(),
//   // publishLast(),
//   // publishBehavior(),
//   // publishReplay(),
//   share()
// );

// // multicast
// // just removed the subject and instead we are now using multicast operator

// // comment above and change subject$s below to source and this will become a unicast
// source$.subscribe((value) => console.log(`Observer 1: ${value}`));

// setTimeout(() => {
//   source$.subscribe((value) => console.log(`Observer 2: ${value}`));
// }, 1000);

// setTimeout(() => {
//   source$.subscribe((value) => console.log(`Observer 3: ${value}`));
// }, 2000);

// setTimeout(() => {
//   source$.subscribe((value) => console.log(`Observer 4: ${value}`), null, () =>
//     console.log("Observer 4 complete.")
//   );
// }, 4500);

// //source$.connect();
//#endregion

//#region 8. Controlling Execution with Schedulers
// console.log("Start script");

// let queue$ = of("QueueScheduler (synchronous)", queueScheduler);
// let asap$ = of("AsapScheduler (async micro task)", asapScheduler);
// let async$ = of("AsyncScheduler (async task)", asyncScheduler);

// merge(queue$, asap$, async$).subscribe((value) => console.log(value));

// console.log("End script");
//#endregion
//#region 8. Operator observeOn
// console.log("Start script");

// from([1, 2, 3, 4], queueScheduler)
//   .pipe(
//     tap((value) => console.log(`Value: ${value}`)),
//     observeOn(asyncScheduler),
//     tap((value) => console.log(`Doubled value: ${value * 2}`))
//   )
//   .subscribe();

// console.log("End script");
//#endregion
