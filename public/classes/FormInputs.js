// 1: We create a FormInput class
// 2: We instantite the class to create an Object with new FormInput()
// 3: The constructor() will fetch all the elements needed in the HTML
// 4: It stores them in properties with the types defined
// 5: the constructor will invoke submitFormListener()
// 6: it will trigger submitFormListener() which itself invokes         
// this.form.addEventListener('submit', this.handleFormSubmit.bind(this))
// 7: handleFormSubmit(event: Event) prevents default and check input datas with inputDatas() and it returns a Taple
// 8: We get an Array, store data in variables
import { Datas } from "../classes/Datas.js";
export class FormInputs {
    constructor() {
        // Get datas from the form
        this.form = document.getElementById('form');
        this.type = document.getElementById('type');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.address = document.getElementById('address');
        this.country = document.getElementById('country');
        this.town = document.getElementById('town');
        this.zip = document.getElementById('zip');
        this.product = document.getElementById('product');
        this.price = document.getElementById('price');
        this.quantity = document.getElementById('quantity');
        this.tva = document.getElementById('tva');
        // When constructor starts, it invokes the listener
        this.submitFormListener();
    }
    // Listeners
    submitFormListener() {
        // bind(this) creates a new function that, when called, has its "this"
        // keyword set to the provided value, with a given sequence of arguments preceding any
        // provided when the new function is called
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    handleFormSubmit(event) {
        event.preventDefault();
        // Check if every input datas are correct
        const inputs = this.inputDatas();
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            // Avoid to have other objects.
            let docData;
            let date = new Date();
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            console.log(docData.htmlFormat());
        }
    }
    // Check if every input datas are correct
    inputDatas() {
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            alert("The digit values must be superior to 0.");
            return;
        }
    }
}
