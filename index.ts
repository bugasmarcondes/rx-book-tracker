import { Observable } from "rxjs";
import { allBooks } from "./data";

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
