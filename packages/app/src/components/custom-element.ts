/*
custom-element.json using json-object is replaced with property-viewer.js

function prepareTemplate(templateString) {
  const template = document.createElement('template');
  template.innerHTML = templateString;
  return template;
}

class JsonObjectElement extends HTMLElement {
  static template = prepareTemplate(`
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
    </style>
    <div class="content">
      Loading...
    </div>
  `);

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(JsonObjectElement.template.content.cloneNode(true));
    console.log('Shadow DOM attached:', shadowRoot);
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
        console.log('Data fetched:', data);
        this.renderContent(data);
      } catch (err) {
        this.renderError(err);
      }
    }
  }

  renderContent(data) {
    const shadowRoot = this.shadowRoot;
    const content = shadowRoot.querySelector(".content");
    if (content) {
      if (data.property.type === 'Single Family') {
        content.innerHTML = `
          <h2>${data.property.type} Home Details</h2>
          <p><strong>Location:</strong> ${data.property.features.location}</p>
          <p><strong>Price:</strong> ${data.property.features.price}</p>
          <p><strong>Beds:</strong> ${data.property.features.numberOfBeds}</p>
          <p><strong>Baths:</strong> ${data.property.features.numberOfBaths}</p>
          <p><strong>Living Area:</strong> ${data.property.features.area.totalLivingArea}</p>
          <p><strong>Lot Area:</strong> ${data.property.features.area.totalLotArea}</p>
          <h3>Agent Info</h3>
          <p><strong>Name:</strong> ${data.listedBy.name}</p>
          <p><strong>Phone:</strong> ${data.listedBy.phoneNumber}</p>
        `;
      } else if (data.property.type === 'Multi-Family') {
        const trimmedLocation = data.property.features.address.split('-')[0].trim();

        content.innerHTML = `
          <h2>${data.property.type} Home Details</h2>
          <p><strong>Location:</strong> ${trimmedLocation}</p>
          <p><strong>Total Beds:</strong> ${data.property.features.totalNumberOfBeds}</p>
          <p><strong>Total Baths:</strong> ${data.property.features.totalNumberOfBaths}</p>
          <p><strong>Total Living Area:</strong> ${data.property.features.totalLivingArea}</p>
          <h3>Agent Info</h3>
          <p><strong>Name:</strong> ${data.listedBy.name}</p>
          <p><strong>Phone:</strong> ${data.listedBy.phoneNumber}</p>
        `;
      }
    } else {
      console.error('Content element not found in shadow DOM.');
    }
  }

  renderError(err) {
    const shadowRoot = this.shadowRoot;
    const content = shadowRoot.querySelector(".content");
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

customElements.define("json-object", JsonObjectElement);
*/