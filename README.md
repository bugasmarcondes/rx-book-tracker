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

## 1&2 Introduction & Basics

- yarn install
- yarn add rxjs
- yarn start
- ./index.ts
    - produce a stream of data with all of the book, with allBooks array

## 3 Creating Observables

- Create and combine observables from existing data, using of(), from(), concat()
- Creating Observables to Handle Events
- Making AJAX Requests with RxJS

## 4 Subscribing to Observables with Observers

- Observers implements the observer interface, with the following methods (next, error, complete)
    - We can create as an object literal with those methods and we can pass it to an observable via subscribe method
    - We don't have to pass all the function names (next, error, complete) because they are optional, so I can ommit some of the them
- In the example, the Observable will produce books in the allBooks array that was imported at the top of the file
- Multiple observers are observing the same observable
- Cancelling Observable Execution with a Subscription

## 5 Using Operators

- It enables you to do lots of things with the data produced by observables. That may include manipulating and shaping the data to meet your specific needs, combining data from multiple observables, aggregating data, etc. (e.g. camera and its accessories)
- We can use the existing ones and also create our own operators
- Operator is a function that returns a new function, the new function takes an observable as a parameter and returns a new observable
- Categories
    - Transformation (produces values very different from those produced by the source)
    - Filtering (filter)
    - Combination (combine 1 or more observables)
    - Utility (how, when values are produced)
    - Conditional (based on condition)
    - Aggregate (max, min)
    - Multicasting (unique to subjects)
- Example using operators

## 6 Creating Your Own Operators

- This is the general structure
```
function myOperator(config1, config2) {
    return function(source$) {
        return newObservale$;
    }
}
```

## 7 Using Subjects and Multicasted Observables

- Are observables, have a subscribe that can be passed an observer. Are observables and also observers
- Have state and maintain a list of observers that subscribe to them
- Multicast (push values to more than one observer at a time) instead of unicast (produces value for one observable at a time)
- Cold observables (common ones)
    - Value producer created inside the observable
    - One observer per execution
    - Unicast
    - Examples include interval(), ajax()
- Hot observables
    - Value producer exists outside the observable
    - Shared producer allows for multiple observers
    - Multicast
    - Examples include Observables that wrap DOM events, Websockets
- Multicasting operators
    - multicast()
        - takes a subject as parameter and must call conect() to begin execution
    - refCount()
        - executes when observers > 0
    - publish()
        - wrapper about multicast(), not required to pass it a subject
    - share()
        - executes when observers > 0, re-subscribes as necessary
- Specialized subjects
    - publishLast()
    - publishBehavior()
    - publishReplay()