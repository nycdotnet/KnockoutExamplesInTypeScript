///<reference path="../typings/tsd.d.ts" />

var simpleObservableViewModel = {
    name : ko.observable("some value")
}

ko.applyBindings(simpleObservableViewModel);