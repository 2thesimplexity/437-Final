import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('landing-view')
class LandingView extends LitElement {
  static styles = css`
    /* Add your styles here */
  `;

  render() {
    return html`
      <h1>Welcome to Real Estate Listings</h1>
      <!-- Add more content for your landing page here -->
    `;
  }
}
