// src/components/app-header.ts
import { LitElement, css, html } from "lit";

export class AppHeaderElement extends LitElement {
  render() {
    return html`
      <header>
        <div class="header-left">
          <div class="logo">🏡</div>
          <div class="app-name">Real Estate Listings</div>
        </div>
        <div class="user-info">
          <span class="profile-icon">👤</span> <span id="username-display">John Doe</span>
          <dark-mode-toggle></dark-mode-toggle>
          <a href="#" @click=${this.logout}>Logout</a>
        </div>
      </header>
    `;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
  }
}
customElements.define('app-header', AppHeaderElement);
