Brice Wilson - RxJS Getting Started

document.querySelector('#button1')
button.addEventListener('click', handleSomething)

RxJS
    - is a popular library that allows you to write code in a more reactive style
    - is a library for building asynchronous applications with observables sequences
    - observable sequence == stream of data
    - provides a nice layer of abstraction over all of those techniques, provides a single api to retrieve and process all data in your app
    - think of data as a stream

Observables
    - are a clean layer of abstraction that let us use a single API to process all of the various types of data streams (sync retrieving, execute async with a promise, finite streams like an array of objects, infinite stream like dom events). We use that API to observe the values produced by an Observable.
    - a representation of any set of values over any amount of time

Building blocks
    - observers, register to receive the values produced by an observable by subscribing to the observable
    - subscription, produced by the action above
    - operator, shape the data produced by an observable
    - subjects, enable advanced functionalities that allow observables to send their values to multiple observers
    - schedulers, give you fine-grained control over how observables are executed

RxJS5 to RxJS6 has many differences, so look for migration help if needed
    - Google for "RxJS v5.x to v6 Update Guide"
    - rxjs-compat (helper)
    - rxjs-tslint (helper)

Subscribers are just objects that implement the Observer interface, which means they have methods named next(), error(), complete()

An observable is not executed until an object subscribes to it.

from() and of() are both very handy and give you a lot of options when you need to create a new observable from data you already have

# Tutorial

## 1&2 introduction

- yarn install
- yarn add rxjs
- yarn start
- ./index.ts
    - produce a stream of data with all of the book, with allBooks array

## 3 creating observables

- Create and combine observables from existing data, using of(), from(), concat()
- Creating Observables to Handle Events
- Making AJAX Requests with RxJS