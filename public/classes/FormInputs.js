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
import { Displays } from "./Displays.js";
import { Prints } from "./Prints.js";
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
        this.docContainer = document.getElementById('document-container');
        this.hiddenDiv = document.getElementById('hiddenDiv');
        this.storedEl = document.getElementById('stored-data');
        this.btnPrint = document.getElementById('print');
        this.btnReload = document.getElementById('reload');
        this.btnStoredInvoices = document.getElementById('stored-invoices');
        this.btnStoredEstimates = document.getElementById('stored-estimates');
        // When constructor starts, it invokes the listener
        this.submitFormListener();
        this.printListener(this.btnPrint, this.docContainer);
        this.reloadListener(this.btnReload);
        this.getStoredDocsListener();
    }
    // Listeners
    submitFormListener() {
        // bind(this) creates a new function that, when called, has its "this"
        // keyword set to the provided value, with a given sequence of arguments preceding any
        // provided when the new function is called
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    printListener(btn, docContainer) {
        btn.addEventListener('click', (event) => {
            let availableDoc;
            availableDoc = new Prints(docContainer);
            availableDoc.print();
        });
    }
    reloadListener(btn) {
        btn.addEventListener('click', () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    getStoredDocsListener() {
        this.btnStoredInvoices.addEventListener('click', this.getItems.bind(this, 'invoice'));
        this.btnStoredEstimates.addEventListener('click', this.getItems.bind(this, 'estimate'));
    }
    getItems(docType) {
        if (this.storedEl.hasChildNodes()) {
            this.storedEl.innerHTML = "";
        }
        if (localStorage.getItem(docType)) {
            let array;
            array = localStorage.getItem(docType);
            if (array !== null && array.length > 2) {
                let arrayData;
                arrayData = JSON.parse(array);
                arrayData.map((doc) => {
                    let card = document.createElement('div');
                    let cardBody = document.createElement('div');
                    let cardClasses = ['card', 'mt-5'];
                    let cardBodyClasses = 'card-body';
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(...cardBodyClasses);
                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedEl.append(card);
                });
            }
            else {
                this.storedEl.innerHTML = `<div class="p-5">Aucune data disponible </div>`;
            }
        }
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
            let template;
            template = new Displays(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docData, type);
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
        const zip = this.zip.value;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (price > 0 && quantity > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            alert("The digit values must be superior to 0.");
            return;
        }
    }
}
