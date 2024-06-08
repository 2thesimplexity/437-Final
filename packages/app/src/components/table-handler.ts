import { LitElement, html, css, } from 'lit';
import { property, customElement } from 'lit/decorators.js';


@customElement('property-table')
class PropertyTable extends LitElement {
  @property({ type: Array }) properties = [];

  static styles = css`
    .search-input {
      margin-bottom: 1em;
      padding: 0.5em;
    }
    .shadcn-table {
      width: 100%;
      border-collapse: collapse;
    }
    .shadcn-table th, .shadcn-table td {
      border: 1px solid #ddd;
      padding: 8px;
    }
    .shadcn-table th {
      cursor: pointer;
    }
    .sort-asc::after {
      content: ' ▲';
    }
    .sort-desc::after {
      content: ' ▼';
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchAndDisplayProperties();
  }

  async fetchAndDisplayProperties() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login.html';
      return;
    }

    try {
      const response = await fetch('/api/profiles', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.properties = await response.json();
    } catch (error) {
      console.error('Error fetching properties data:', error);
    }
  }

  addTableSorting() {
    const headerCells = this.shadowRoot.querySelectorAll('th');
    headerCells.forEach((th, index) => {
      th.addEventListener('click', () => {
        const direction = th.classList.contains('sort-asc') ? 'desc' : 'asc';
        this.sortTable(index, direction);
        headerCells.forEach(cell => cell.classList.remove('sort-asc', 'sort-desc'));
        th.classList.add(direction === 'asc' ? 'sort-asc' : 'sort-desc');
      });
    });
  }

  sortTable(columnIndex, direction) {
    const rows = Array.from(this.shadowRoot.querySelectorAll('tbody tr'));
    rows.sort((a, b) => {
      const aText = a.cells[columnIndex].textContent.trim();
      const bText = b.cells[columnIndex].textContent.trim();
      const isNumericColumn = !isNaN(aText) && !isNaN(bText);

      if (isNumericColumn) {
        return direction === 'asc' ? aText - bText : bText - aText;
      } else {
        return direction === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
      }
    });
    const tbody = this.shadowRoot.querySelector('tbody');
    tbody.append(...rows);
  }

  addTableFiltering() {
    const searchField = this.shadowRoot.querySelector('#searchField');
    searchField.addEventListener('keyup', () => {
      const filter = searchField.value.trim().toLowerCase();
      const rows = this.shadowRoot.querySelectorAll('tbody tr');
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
  }

  updated() {
    this.addTableSorting();
    this.addTableFiltering();
  }

  render() {
    return html`
      <input type="text" id="searchField" placeholder="Search properties..." class="search-input">
      <table class="shadcn-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Location</th>
            <th>Price</th>
            <th>Beds</th>
            <th>Baths</th>
            <th>Living Area</th>
            <th>Lot Area</th>
            <th>Agent</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.properties.map(property => html`
            <tr>
              <td>${property.property.type}</td>
              <td>${property.property.type === 'Single Family' ? property.property.features.location : property.property.features.address}</td>
              <td>${property.property.type === 'Single Family' ? property.property.features.price : property.property.features.totalPrice}</td>
              <td>${property.property.type === 'Single Family' ? property.property.features.numberOfBeds : property.property.features.totalNumberOfBeds}</td>
              <td>${property.property.type === 'Single Family' ? property.property.features.numberOfBaths : property.property.features.totalNumberOfBaths}</td>
              <td>${property.property.type === 'Single Family' ? property.property.features.area.totalLivingArea : property.property.features.totalLivingArea}</td>
              <td>${property.property.type === 'Single Family' ? property.property.features.area.totalLotArea : property.property.features.totalLotArea}</td>
              <td>${property.listedBy.name}</td>
              <td>${property.listedBy.phoneNumber}</td>
              <td>
                <button @click="${() => this.showEditForm(property.id)}">Edit</button>
                ${property.property.type === 'Multi-Family' ? html`<button @click="${() => this.showUnitsModal(property.id)}">View Units</button>` : ''}
              </td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }

  showEditForm(id) {
    // Implement the showEditForm logic
  }

  showUnitsModal(id) {
    // Implement the showUnitsModal logic
  }
}
