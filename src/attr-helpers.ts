import { html, render, TemplateResult } from 'lit-html';

export default class AttrHelpers extends HTMLElement {
  /** The constructor always attaches a shadowRoot so no need for it to be null. */
  public shadowRoot: ShadowRoot;

  public four: string[] = [];
  public five: object = {};

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /** The element instance has been inserted into the DOM. */
  connectedCallback() {
    this.upgradeProperties();
    this.render();
  }

  /** The element instance has been removed from the DOM. */
  disconnectedCallback() {
  }

  /** Watch for changes to these attributes. */
  static get observedAttributes(): string[] {
    return ['one', 'two', 'three'];
  }

  /** Rerender when the observed attributes change. */
  attributeChangedCallback(_name: string, _oldValue: any, _newValue: any) {
    this.render();
  }

  /** Rerender the element. */
  render() {
    render(this.template, this.shadowRoot);
  }

  /** Support lazy properties https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties */
  private upgradeProperties() {
    (<any>this).constructor['observedAttributes'].forEach((prop: string) => {
      if (this.hasOwnProperty(prop)) {
        let value = (<any>this)[prop];
        delete (<any>this)[prop];
        (<any>this)[prop] = value;
      }
    });
  }

  get one(): string | null {
    return this.getAttribute('one');
  }

  set one(value: string | null) {
    if (value) {
      this.setAttribute('one', value);
    } else {
      this.removeAttribute('one');
    }
  }

  get two(): number | null {
    if (this.hasAttribute('two')) {
      return Number(this.getAttribute('two'));
    } else {
      return null;
    }
  }

  set two(value: number | null) {
    if (value) {
      this.setAttribute('two', String(value));
    } else {
      this.removeAttribute('two');
    }
  }

  get three(): boolean {
    return this.hasAttribute('three');
  }

  set three(value: boolean) {
    if (value) {
      this.setAttribute('three', '');
    } else {
      this.removeAttribute('three');
    }
  }

  /** Styling for the element. */
  private get styles(): TemplateResult {
    return html`
      <style>
        :host {
          display: block;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0 ,0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
        }

        :host([hidden]) {
          display: none;
        }

        .content {
          background-color: var(--attr-helpers-background-color, #FAFAFA);
          color: #212121;
          padding: 16px;
        }
      </style>
    `;
  }

  /** HTML Template for the element. */
  private get template(): TemplateResult {
    return html`
      ${this.styles}
      <div class="content">
        Welcome to &lt;attr-helpers&gt;

        <ul>
          <li>one: ${this.one === null ? 'N/A' : this.one}</li>
          <li>two: ${this.two === null ? 'N/A' : this.two}</li>
          <li>three: ${this.three === null ? 'N/A' : this.three}</li>
        </ul>

        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('attr-helpers', AttrHelpers);
