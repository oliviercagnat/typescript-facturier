// 1: We create a FormInput class
// 2: We instantite the class to create an Object with new FormInput()
// 3: The constructor() will fetch all the elements needed in the HTML
// 4: It stores them in properties with the types defined
// 5: the constructor will invoke submitFormListener()
// 6: it will trigger submitFormListener() which itself invokes         
// this.form.addEventListener('submit', this.handleFormSubmit.bind(this))
// 7: handleFormSubmit(event: Event) prevents default and check input datas with inputDatas() and it returns a Taple
// 8: We get an Array, store them in variables


class FormInput {

    form: HTMLFormElement;
    type: HTMLSelectElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    address: HTMLInputElement;
    country: HTMLInputElement;
    town: HTMLInputElement;
    zip: HTMLInputElement;
    product: HTMLInputElement;
    price: HTMLInputElement;
    quantity: HTMLInputElement;
    tva: HTMLInputElement;

    constructor() {
        // Get datas from the form
        this.form = document.getElementById('form') as HTMLFormElement;
        this.type = document.getElementById('type') as HTMLSelectElement;
        this.firstName = document.getElementById('firstName') as HTMLInputElement;
        this.lastName = document.getElementById('lastName') as HTMLInputElement;
        this.address = document.getElementById('address') as HTMLInputElement;
        this.country = document.getElementById('country') as HTMLInputElement;
        this.town = document.getElementById('town') as HTMLInputElement;
        this.zip = document.getElementById('zip') as HTMLInputElement;
        this.product = document.getElementById('product') as HTMLInputElement;
        this.price = document.getElementById('price') as HTMLInputElement;
        this.quantity = document.getElementById('quantity') as HTMLInputElement;
        this.tva = document.getElementById('tva') as HTMLInputElement;

        // When constructor starts, it invokes the listener
        this.submitFormListener();

    }

    // Listeners
    private submitFormListener(): void {
        // bind(this) creates a new function that, when called, has its "this"
        // keyword set to the provided value, with a given sequence of arguments preceding any
        // provided when the new function is called
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this))
    }

    private handleFormSubmit(event: Event) {
        event.preventDefault();

        // Check if every input datas are correct
        const inputs = this.inputDatas();

        if ( Array.isArray(inputs) ) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            console.log([type, firstName, lastName, address, country, town, zip, product, price, quantity, tva]);
        }


    }

    // Check if every input datas are correct
    private inputDatas(): [string, string, string, string, string, string, number, string, number, number, number] | void {
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

        if ( zip > 0 && price > 0 && quantity > 0 && tva > 0 ) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        } else {
            alert("The digit values must be superior to 0.")
            return;
        }

    }
}

new FormInput();
