import { html, render, TemplateResult } from 'lit-html';

export default class AttrHelpers extends HTMLElement {
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
    render(this.template, this.shadowRoot as ShadowRoot);
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
    return this.getString('one');
  }
  set one(value: string | null) {
    this.setString('one', value);
  }

  get two(): number | null {
    return this.getNumber('two');
  }
  set two(value: number | null) {
    this.setNumber('two', value);
  }

  get three(): boolean {
    return this.getBoolean('three');
  }
  set three(value: boolean) {
    this.setBoolean('three', value);
  }

  get four(): string[] {
    return this.getProperty('four');
  }
  set four(value: string[]) {
    this.setProperty('four', value);
  }

  get five(): object {
    return this.getProperty('four');
  }
  set five(value: object) {
    this.setProperty('four', value);
  }

  private getProperty(key: string): any {
    return (<any>this)[key];
  }
  private setProperty(key: string, value: any) {
    if (value) {
      (<any>this)[key] = value;
    } else {
      delete (<any>this)[key];
    }
    this.render();
  }

  private getString(key: string): string | null {
    return this.getAttribute(key);
  }
  private setString(key: string, value: string | null) {
    if (value) {
      this.setAttribute(key, value);
    } else {
      this.removeAttribute(key);
    }
    this.render();
  }

  private getNumber(key: string): number | null {
    const value = this.getAttribute(key);
    if (value) {
      return Number(value);
    } else {
      return null;
    }
  }
  private setNumber(key: string, value: number | null) {
    if (value) {
      this.setAttribute(key, String(value));
    } else {
      this.removeAttribute(key);
    }
    this.render();
  }

  private getBoolean(key: string): boolean {
    return this.hasAttribute(key);
  }
  private setBoolean(key: string, value: boolean) {
    if (value) {
      this.setAttribute(key, '');
    } else {
      this.removeAttribute(key);
    }
    this.render();
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
