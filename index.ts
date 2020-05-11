import { Observable, of, from, fromEvent, concat } from "rxjs";
import { allBooks, allReaders } from "./data";

/*
// 1st example

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

// passes a bunch of individual values
let source1$ = of("hello", 10, true, allReaders[0].name);

// source1$.subscribe((value) => console.log(value));

// single object that encapsulates a group of values
// can pass in an array, a promise, or another observable
let source2$ = from(allBooks);

// source2$.subscribe((book) => console.log(book.title));

concat(source1$, source2$).subscribe((value) => console.log(value));
