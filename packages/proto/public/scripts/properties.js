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
        // Trim everything after and including the "-" character for multi-family properties
        const trimmedLocation = data.property.address.split('-')[0].trim();

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

// Fetch properties data and populate property lists
fetch('/api/profiles')
  .then(response => response.json())
  .then(properties => {
    const tableBody = document.querySelector('#property-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    properties.forEach(property => {
      const row = document.createElement('tr');
      if (property.property.type === 'Single Family') {
        row.innerHTML = `
          <td>${property.property.type}</td>
          <td>${property.property.features.location}</td>
          <td>${property.property.features.price}</td>
          <td>${property.property.features.numberOfBeds}</td>
          <td>${property.property.features.numberOfBaths}</td>
          <td>${property.property.features.area.totalLivingArea}</td>
          <td>${property.property.features.area.totalLotArea}</td>
          <td>${property.listedBy.name}</td>
          <td>${property.listedBy.phoneNumber}</td>
        `;
      } else if (property.property.type === 'Multi-Family') {
        row.innerHTML = `
          <td>${property.property.type}</td>
          <td>${property.property.features.address}</td>
          <td>${property.property.features.totalPrice}</td>
          <td>${property.property.features.totalNumberOfBeds}</td>
          <td>${property.property.features.totalNumberOfBaths}</td>
          <td>${property.property.features.totalLivingArea}</td>
          <td>${property.property.features.totalLotArea}</td>
          <td>${property.listedBy.name}</td>
          <td>${property.listedBy.phoneNumber}</td>
        `;
      }
      tableBody.appendChild(row);
    });

    // Add sorting functionality
    const table = document.getElementById("property-table");
    if (table) {
      const tBody = table.tBodies[0];
      const rows = Array.from(tBody.rows);
      const headerCells = table.tHead.rows[0].cells;

      for (const th of headerCells) {
        const cellIndex = th.cellIndex;
        th.addEventListener("click", () => {
          const dir = th.classList.contains('sort-asc') ? 'desc' : 'asc';
          rows.sort((tr1, tr2) => {
            const tr1Text = tr1.cells[cellIndex].textContent;
            const tr2Text = tr2.cells[cellIndex].textContent;
            return dir === 'asc' ? tr1Text.localeCompare(tr2Text) : tr2Text.localeCompare(tr1Text);
          });
          tBody.append(...rows);

          // Update sort arrow classes
          for (const th of headerCells) {
            th.classList.remove('sort-asc', 'sort-desc');
          }
          th.classList.add(dir === 'asc' ? 'sort-asc' : 'sort-desc');
        });
      }
    }

    // Add filtering functionality
    document.getElementById('searchField').addEventListener('keyup', function() {
      const filter = this.value.trim().toLowerCase();
      const rows = document.querySelectorAll('#property-table tbody tr');
      rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let match = false;
        for (let i = 0; i < cells.length; i++) {
          const cellText = cells[i].innerText.trim().toLowerCase();
          if (cellText.includes(filter)) {
            match = true;
            break;
          }
        }
        row.style.display = match ? '' : 'none';
      });
    });
  })
  .catch(error => {
    console.error('Error fetching properties data:', error);
  });
