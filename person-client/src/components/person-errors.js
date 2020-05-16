import { LitElement, html, css } from "lit-element";

class PersonErrors extends LitElement {
  constructor() {
    super();
    this.errors = [];
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        margin: 10px;
      }

      ul {
        align-self: center;
        color: red;
      }

      p {
        align-self: center;
        color: green;
      }
    `;
  }

  static get properties() {
    return {
      errors: Array,
    };
  }

  updated(changedProps) {
    console.log("person-errors -> updated hook", changedProps);
  }

  render() {
    return html`
      <ul>
        ${this.errors.map((err) => html` <li>${err.param}: ${err.msg}</li> `)}
      </ul>
      ${!this.errors.length ? html`<p>OK</p>` : ''}
    `;
  }
}

customElements.define("person-errors", PersonErrors);
