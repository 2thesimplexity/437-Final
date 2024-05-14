import { prepareTemplate } from "./template.js";

class PropertyViewerElement extends HTMLElement {
  static template = prepareTemplate(`
    <template>
      <style>
        :host {
          display: block;
          margin-bottom: 1em;
        }
        .content {
          border: 1px solid var(--color-accent);
          padding: 1em;
          background: var(--color-background-page);
          color: var(--color-text-default);
        }
        .property-details {
          margin-top: 1em;
        }
      </style>
      <div class="content">
        <slot name="header">Loading...</slot>
        <div class="property-details">
          <slot name="location"></slot>
          <slot name="price"></slot>
          <slot name="beds"></slot>
          <slot name="baths"></slot>
          <slot name="livingArea"></slot>
          <slot name="lotArea"></slot>
          <slot name="agentName"></slot>
          <slot name="agentPhone"></slot>
        </div>
      </div>
    </template>
  `);

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(PropertyViewerElement.template.content.cloneNode(true));
  }

  async connectedCallback() {
    const src = this.getAttribute("src");
    if (src) {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.renderContent(data);
      } catch (err) {
        this.renderError(err);
      }
    }
  }

  renderContent(data) {
    const content = this.shadowRoot.querySelector(".content");
    if (content) {
      if (data.property.type === 'Single Family') {
        content.innerHTML = `
          <slot name="header">
            <h2>${data.property.type} Home Details</h2>
          </slot>
          <slot name="location">
            <p><strong>Location:</strong> ${data.property.features.location}</p>
          </slot>
          <slot name="price">
            <p><strong>Price:</strong> ${data.property.features.price}</p>
          </slot>
          <slot name="beds">
            <p><strong>Beds:</strong> ${data.property.features.numberOfBeds}</p>
          </slot>
          <slot name="baths">
            <p><strong>Baths:</strong> ${data.property.features.numberOfBaths}</p>
          </slot>
          <slot name="livingArea">
            <p><strong>Living Area:</strong> ${data.property.features.area.totalLivingArea}</p>
          </slot>
          <slot name="lotArea">
            <p><strong>Lot Area:</strong> ${data.property.features.area.totalLotArea}</p>
          </slot>
          <slot name="agentName">
            <p><strong>Agent Name:</strong> ${data.listedBy.name}</p>
          </slot>
          <slot name="agentPhone">
            <p><strong>Phone:</strong> ${data.listedBy.phoneNumber}</p>
          </slot>
        `;
      } else if (data.property.type === 'Multi-Family') {
        content.innerHTML = `
          <slot name="header">
            <h2>${data.property.type} Home Details</h2>
          </slot>
          <slot name="location">
            <p><strong>Location:</strong> ${data.property.features.address}</p>
          </slot>
          <slot name="price">
            <p><strong>Total Price:</strong> ${data.property.features.totalPrice}</p>
          </slot>
          <slot name="beds">
            <p><strong>Total Beds:</strong> ${data.property.features.totalNumberOfBeds}</p>
          </slot>
          <slot name="baths">
            <p><strong>Total Baths:</strong> ${data.property.features.totalNumberOfBaths}</p>
          </slot>
          <slot name="livingArea">
            <p><strong>Total Living Area:</strong> ${data.property.features.totalLivingArea}</p>
          </slot>
          <slot name="lotArea">
            <p><strong>Total Lot Area:</strong> ${data.property.features.totalLotArea}</p>
          </slot>
          <slot name="agentName">
            <p><strong>Agent Name:</strong> ${data.listedBy.name}</p>
          </slot>
          <slot name="agentPhone">
            <p><strong>Phone:</strong> ${data.listedBy.phoneNumber}</p>
          </slot>
        `;
      }
    } else {
      console.error('Content element not found in shadow DOM.');
    }
  }

  renderError(err) {
    const content = this.shadowRoot.querySelector(".content");
    if (content) {
      console.error('Error loading content:', err);
      content.innerHTML = `
        <p>Error loading content: ${err.message}</p>
      `;
    } else {
      console.error('Content element not found in shadow DOM.');
    }
  }
}

customElements.define("property-viewer", PropertyViewerElement);
