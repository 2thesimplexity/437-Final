import { LitElement, html, css, property, state } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('property-table')
class PropertyTable extends LitElement {
  @property({ type: Array }) properties = [];
  @state() sortOrder = 'asc'; // Reactive state for sorting

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

handleSortChange(event) {
  this.sortOrder = event.target.value;
}

sortProperties() {
  const sortedProperties = [...this.properties];
  sortedProperties.sort((a, b) => {
    const aText = a.property.features.location;
    const bText = b.property.features.location;
    if (this.sortOrder === 'asc') {
      return aText.localeCompare(bText);
    } else {
      return bText.localeCompare(aText);
    }
  });
  return sortedProperties;
}

render() {
  const sortedProperties = this.sortProperties();
  return html`
    <input type="text" id="searchField" placeholder="Search properties..." class="search-input" @input=${this.filterProperties}>
    <select @change=${this.handleSortChange}>
      <option value="asc" ?selected=${this.sortOrder === 'asc'}>Sort A-Z</option>
      <option value="desc" ?selected=${this.sortOrder === 'desc'}>Sort Z-A</option>
    </select>
    <table id="property-table" class="shadcn-table">
      <thead>
        <tr>
          <th @click=${() => this.handleSort('type')}>Type</th>
          <th @click=${() => this.handleSort('location')}>Location</th>
          <th @click=${() => this.handleSort('price')}>Price</th>
          <th @click=${() => this.handleSort('beds')}>Beds</th>
          <th @click=${() => this.handleSort('baths')}>Baths</th>
          <th @click=${() => this.handleSort('livingArea')}>Living Area</th>
          <th @click=${() => this.handleSort('lotArea')}>Lot Area</th>
          <th @click=${() => this.handleSort('agentName')}>Agent</th>
          <th @click=${() => this.handleSort('agentPhone')}>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${sortedProperties.map(property => html`
          <tr>
            <td>${property.property.type}</td>
            <td>${property.property.features.location}</td>
            <td>${property.property.features.price}</td>
            <td>${property.property.features.numberOfBeds}</td>
            <td>${property.property.features.numberOfBaths}</td>
            <td>${property.property.features.area.totalLivingArea}</td>
            <td>${property.property.features.area.totalLotArea}</td>
            <td>${property.listedBy.name}</td>
            <td>${property.listedBy.phoneNumber}</td>
            <td>
              <button @click=${() => this.showEditForm(property.id)}>Edit</button>
              ${property.property.type === 'Multi-Family' ? html`
                <button @click=${() => this.showUnitsModal(property.id)}>View Units</button>
              ` : ''}
            </td>
          </tr>
        `)}
      </tbody>
    </table>
  `;
}


filterProperties(event) {
  const filter = event.target.value.trim().toLowerCase();
  const rows = this.shadowRoot.querySelectorAll('#property-table tbody tr');
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
}
}
