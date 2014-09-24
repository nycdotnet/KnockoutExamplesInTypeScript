///<reference path="../typings/tsd.d.ts" />

class ComputedObservableViewModel {
    public name = ko.observable("some value");
    public tag = "some other text";
    
    //note that you must define a computed *after* all of its dependencies are defined
    // because by default they are evaluated immediately upon creation.
    public formatted = ko.computed(() => this.name() + " (" + this.tag + ")");
}

ko.applyBindings(new ComputedObservableViewModel());