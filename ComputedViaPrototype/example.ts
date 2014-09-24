///<reference path="../typings/tsd.d.ts" />

class ComputedViaPrototypeViewModel {

    /* These lines are erased when the TypeScript is compiled.
       It simply informs TypeScript that getFormatted will exist and what type it is.
       Declaring the publicly exposed members that use Knockout without instantiating
       them is required when you want to use a TypeScript constructor function since 
       in TypeScript, ambient declarations are run prior to the code in the constructor. */
    public name: KnockoutObservable<string>;
    public formatted: KnockoutComputed<string>;
    public getFormatted: () => string; 

    /* Note that since "tag" was not a knockout member, I could specify the public keyword
       which designates "tag" as a retained field rather than just a function parameter. */
    constructor(name: string, public tag: string) {
        this.name = ko.observable(name);

        /* Note that you must set up a Knockout computed *after* all of its dependencies are 
           defined because by default they are evaluated immediately upon creation. */
        this.formatted = ko.computed(this.getFormatted, this);
    }
}

/* We add getFormatted to the class's prototype via the ko.utils.extend() method outside the
   body of the class.  This is not good for encapsulation, but it helps with memory/performance
   if you have many instances of the class because then there is only one copy of the function that
   is shared across all instances versus each instance having its own copy.  If your class exists
   inside a module or dedicated file, then encapsulation shouldn't be broken too horribly. */
ko.utils.extend(ComputedViaPrototypeViewModel.prototype, {
    getFormatted: function () {
        return this.name() + "(" + this.tag + ")";
    }
});

var computedViaPrototypeVM = new ComputedViaPrototypeViewModel("some name","some tag");

ko.applyBindings(computedViaPrototypeVM);