import { LitElement, html, css } from "lit-element";

class PersonCreateForm extends LitElement {
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
    };
  }

  updated(changedProps) {
    console.log("person-create -> updated hook", changedProps);
  }

  async _handleSubmitEvent(e) {
    const newItem = {
      firstName: this.item.firstName,
      lastName: this.item.lastName,
      age: this.item.age,
      height: this.item.height,
    };
    this.dispatchEvent(
      new CustomEvent("on-create", {
        detail: { data: newItem },
      })
    );
  }

  render() {
    return html`
    <h3>Create Person</h3>
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
      <button @click=${this._handleSubmitEvent}>Create</button>
    </div>
    `;
  }
}

customElements.define("person-create", PersonCreateForm);
