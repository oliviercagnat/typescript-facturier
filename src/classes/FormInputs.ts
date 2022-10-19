// 1: We create a FormInput class
// 2: We instantite the class to create an Object with new FormInput()
// 3: The constructor() will fetch all the elements needed in the HTML
// 4: It stores them in properties with the types defined
// 5: the constructor will invoke submitFormListener()
// 6: it will trigger submitFormListener() which itself invokes         
// this.form.addEventListener('submit', this.handleFormSubmit.bind(this))
// 7: handleFormSubmit(event: Event) prevents default and check input datas with inputDatas() and it returns a Taple
// 8: We get an Array, store data in variables

import { HasHTMLFormat } from "../interfaces/HasHTMLFormat.js";
import { HasRender } from "../interfaces/HasRender.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { Datas } from "../classes/Datas.js";
import { Displays } from "./Displays.js";
import { Prints } from "./Prints.js";

export class FormInputs {

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
    docContainer: HTMLDivElement;
    hiddenDiv: HTMLDivElement;
    btnPrint: HTMLButtonElement;
    btnReload: HTMLButtonElement;
    btnStoredInvoices: HTMLButtonElement;
    btnStoredEstimates: HTMLButtonElement;
    storedEl: HTMLDivElement;
    

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

        this.docContainer = document.getElementById('document-container') as HTMLDivElement;
        this.hiddenDiv = document.getElementById('hiddenDiv') as HTMLDivElement;
        this.storedEl = document.getElementById('stored-data') as HTMLDivElement;

        this.btnPrint = document.getElementById('print') as HTMLButtonElement;
        this.btnReload = document.getElementById('reload') as HTMLButtonElement;
        this.btnStoredInvoices = document.getElementById('stored-invoices') as HTMLButtonElement;
        this.btnStoredEstimates = document.getElementById('stored-estimates') as HTMLButtonElement;

        // When constructor starts, it invokes the listener
        this.submitFormListener();
        this.printListener(this.btnPrint , this.docContainer);
        this.reloadListener(this.btnReload);
        this.getStoredDocsListener();
    }

    // Listeners
    private submitFormListener(): void {
        // bind(this) creates a new function that, when called, has its "this"
        // keyword set to the provided value, with a given sequence of arguments preceding any
        // provided when the new function is called
        this.form.addEventListener('submit', this.handleFormSubmit.bind(this))
    }

    private printListener(btn: HTMLButtonElement, docContainer: HTMLDivElement) {
        btn.addEventListener('click', (event: Event) => {
            let availableDoc: HasPrint;
            availableDoc = new Prints(docContainer);
            availableDoc.print();
        })
    }

    private reloadListener(btn: HTMLButtonElement) {
        btn.addEventListener('click', () => {
            document.location.reload();
            window.scrollTo(0, 0);
        })
    }

    private getStoredDocsListener() {
         this.btnStoredInvoices.addEventListener('click', this.getItems.bind(this, 'invoice'));
         this.btnStoredEstimates.addEventListener('click', this.getItems.bind(this, 'estimate'));
    }

    private getItems(docType: string){
        if (this.storedEl.hasChildNodes()) {
            this.storedEl.innerHTML = "";
        }

        if (localStorage.getItem(docType)) {
            let array: string | null;
            array = localStorage.getItem(docType)
       

            if (array !== null && array.length > 2) {
                let arrayData: string[];
                arrayData = JSON.parse(array);

                arrayData.map((doc: string): void => {
                    let card: HTMLDivElement = document.createElement('div');
                    let cardBody: HTMLDivElement = document.createElement('div');
                    let cardClasses: Array<string> = ['card', 'mt-5'];
                    let cardBodyClasses: string = 'card-body';
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(...cardBodyClasses);

                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedEl.append(card);
                })
            } else {
                this.storedEl.innerHTML = `<div class="p-5">Aucune data disponible </div>`
            }
        }
    }

    private handleFormSubmit(event: Event) {
        event.preventDefault();

        // Check if every input datas are correct
        const inputs = this.inputDatas();

        if ( Array.isArray(inputs) ) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;

            // Avoid to have other objects.
            let docData: HasHTMLFormat;
            let date: Date = new Date();

            docData = new Datas(
                type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date
            );
            let template: HasRender;
            template = new Displays(this.docContainer, this.hiddenDiv, this.btnPrint);
            template.render(docData, type);

        }


    }

    // Check if every input datas are correct
    private inputDatas(): [string, string, string, string, string, string, string, string, number, number, number] | void {
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

        if ( price > 0 && quantity > 0 && tva > 0 ) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        } else {
            alert("The digit values must be superior to 0.")
            return;
        }

    }
}