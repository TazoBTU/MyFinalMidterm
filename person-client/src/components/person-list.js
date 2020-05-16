import { LitElement, html, css } from 'lit-element';

class PersonApp extends LitElement {
  constructor() {
    super();
    this.list = [];
    this.filter = {
      visibility: 'all',
    }
  }
  static get properties() {
    return {
      list: Array,
    };
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

      .filter {
        align-self: center;
      }

      .filter > label {
        cursor: pointer;
      }

      ul {
        width: 300px;
      }

      li {
        display: flex;
        border: 1px solid black;
        padding: 10px;
      }

      li:hover {
        background: #ffe6e6;
      }

      p {
        cursor: pointer;
      }

      button {
        margin: 10px;
        margin-left: auto;
      }

      .active {
        color: green;
      }

      .complete {
        color: blue;
      }
    `;
  }

  _handleDelete(id) {
    this.dispatchEvent(new CustomEvent('on-delete', { detail: { id: id } }));
  }

  _handleItemClick(id) {
    this.dispatchEvent(new CustomEvent('on-select', { detail: { id: id } }));
  }

  _handleFilterChange(event) {
    const visibilityValue = event.target.value;
    if (this.filter.visibility === visibilityValue)
      return;
    this.filter.visibility = visibilityValue;
    this.dispatchEvent(new CustomEvent('on-filter-change', { detail: { filter: this.filter } }));
  }

  render() {
    return html`
      <h3>Person list</h3>
      <div class="filter">
        <input type="radio" id="all" name="visibility" value="all" @click=${this._handleFilterChange} checked />
        <label for="all">All</label> | 
        <input type="radio" id="active" name="visibility" value="active" @click=${this._handleFilterChange}/>
        <label for="active">Active</label> | 
        <input type="radio" id="completed" name="visibility" value="completed" @click=${this._handleFilterChange}/>
        <label for="completed">Completed</label>
      </div>
      <ul>
        ${this.list.map(
          (item, index) => html`
            <li @click=${() => this._handleItemClick(item._id)}>
              <p >
                ${index + 1}: ${item.firstName} ${item.lastName}
                              
              </p>
              <p>
                Age : ${item.age}
              </p>
              <p>
                Height : ${item.height}
              </p>
              <button @click=${() => this._handleDelete(item._id)}>
                Delete
              </button>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define('person-list', PersonApp);
