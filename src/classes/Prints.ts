import { HasPrint } from "../interfaces/HasPrint.js";

export class Prints implements HasPrint {

    constructor(private el: HTMLDivElement) {

    }

    print() {
        document.body.innerHTML = this.el.innerHTML;
        window.print();
        document.location.reload();
    }
}