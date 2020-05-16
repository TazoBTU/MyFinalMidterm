import { LitElement, html, css } from "lit-element";

class PersonUpdateForm extends LitElement {
  constructor() {
    super();
    this.item = {};
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin: 10px;
      }

      h3 {
        align-self: center;
      }

      .form {
        display: flex;
        flex-direction: column;
        margin: 20px;
        border: 1px solid black;
        padding: 10px;
      }

      input {
        margin: 10px;
      }
    `;
  }

  static get properties() {
    return {
      item: Object,
      firstName: String,
      lastName: String,
      age: Number,
      height: Number,
    };
  }

  updated(changedProps) {
    console.log('person-update -> updated hook', changedProps);
  }

  _handleSubmitEvent() {
    if (!this.item._id) { 
      alert('შეარჩიეთ Todo');
      return;
    }
    this.dispatchEvent(
      new CustomEvent("on-update", {
        detail: { id: this.item._id, data: this.item },
      })
    );
  }

  render() {
    return html`
    <h3>Update person</h3>
    <div class="form">
      First name:
      <input
        type="text"
        .value=${this.item.firstName || ""}
        @change=${(e) => (this.item.firstName = e.target.value)}
      />
      Last name:
      <input
        type="text"
        .value=${this.item.lastName || ""}
        @change=${(e) => (this.item.lastName = e.target.value)}
      />
      Age:
      <input
        type="text"
        .value=${this.item.age || ""}
        @change=${(e) => (this.item.age = e.target.value)}
      />
      Height:
      <input
        type="text"
        .value=${this.item.height || ""}
        @change=${(e) => (this.item.height = e.target.value)}
      />
      <button id="submit" @click=${this._handleSubmitEvent}>Update</button>
    </div>
    `;
  }
}

customElements.define("person-update", PersonUpdateForm);
