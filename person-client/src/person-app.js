import { LitElement, html, css } from "lit-element";
import api from "./api";
import "./components/person-list";
import "./components/person-create";
import "./components/person-update";
import "./components/person-errors";

class PersonApp extends LitElement {
  constructor() {
    super();
    this.persons = [];
    this.selectedItem = {};
    this.errors = [];
    this.filter = {};
  }

  static get properties() {
    return {
      persons: Array,
      selectedItem: Object,
      errors: Array,
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
      }

      .forms {
        display: flex;
        flex-direction: row;
      }
    `;
  }

  firstUpdated() {
    //
  }

  updated(changedProperties) {

  }

  /**
   * Invoked when a component is added to the document’s DOM.
   */
  async connectedCallback() {
    super.connectedCallback();
    this.persons = await this._getPersonList();
  }

  /**
   * Invoked when a component is removed from the document’s DOM.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  async _getPersonList(filter = {}) {  
    const response = await api.getAll(filter);
    const persons = response.data;
    return persons;
  }

  async _handleItemCreateEvent(event) {
    // debugger;
    const data = event.detail.data;
    const createdItem = await api
      .create(data)
      .catch((err) => this._handleErrors(err));
    if (!createdItem) return;
    console.log("createdItem", createdItem.data);
    this.persons = await this._getPersonList(this.filter);
    this._clearErrors();
  }

  _handleItemSelectEvent(event) {
    const id = event.detail.id;
    this.selectedItem = this.persons.find((item) => item._id === id);
  }

  async _handleItemUpdateEvent(event) {
    const id = event.detail.id;
    const data = event.detail.data;
    const updatedItem = await api
      .update(id, data)
      .catch((err) => this._handleErrors(err));
    if (!updatedItem) return;
    console.log("updatedItem", updatedItem.data);
    this.persons = await this._getPersonList(this.filter);
    this.selectedItem = {};
    this._clearErrors();
  }

  async _handleItemDeleteEvent(event) {
    const id = event.detail.id;
    await api.remove(id);
    this.persons = await this._getPersonList(this.filter);
    this._clearErrors();
  }

  async _handleFilterChangeEvent(event) {
    const filter = event.detail.filter;
    this.filter = filter;
    this.persons = await this._getPersonList(filter);
  }

  _handleErrors(err) {
    console.log("errors", err.response.data);
    this.errors = err.response.data.errors;
    // debugger;
  }

  _clearErrors() {
    this.errors = [];
  }

  render() {
    return html`
      <person-list
        .list=${this.persons}
        @on-select=${this._handleItemSelectEvent}
        @on-filter-change=${this._handleFilterChangeEvent}
        @on-delete=${this._handleItemDeleteEvent}
      ></person-list>
      <div>
        <div class="forms">
          <person-update
            .item=${this.selectedItem}
            @on-update=${this._handleItemUpdateEvent}
          ></person-update>
          <person-create @on-create=${this._handleItemCreateEvent}></person-create>
        </div>
        <person-errors .errors=${this.errors}></person-errors>
      </div>
    `;
  }
}

customElements.define("person-app", PersonApp);
