///<reference path="../typings/tsd.d.ts" />

interface IProduct {
    name: string;
    description: string;
    id: string;
}

class RevertibleProductViewModel {

    public name = ko.observable<string>();
    public description = ko.observable<string>();
    public id = ko.observable<string>();
    private originalData = ko.observable<IProduct>();

    public revertible: KnockoutObservable<boolean>;
    private initialize: (data: IProduct) => void;

    constructor(data: IProduct) {
        this.initialize(data);
        this.originalData(data);
        this.revertible = ko.computed<boolean>(() => {
            var o = this.originalData();

            if (!o) {
                return false;
            }

            return !(o.description == this.description() &&
                o.name == this.name() &&
                o.id == this.id());
        });
    }

    public summary = ko.computed<string>(() => {
        return "This " + this.name() + " is for " + this.description() +
            " and has ID " + this.id() + ".";
    });

    public revert = () => {
        this.initialize(this.originalData());
    };

}

ko.utils.extend(RevertibleProductViewModel.prototype, {
    initialize: function (data: IProduct) {
        this.originalData(data);
        this.name(data.name);
        this.description(data.description);
        this.id(data.id);
    }
});


var revertibleViewModel = new RevertibleProductViewModel(
    {
        name: "mountain bike",
        description: "For riding on trails.",
        id: "ABC123"
    });

ko.applyBindings(revertibleViewModel);