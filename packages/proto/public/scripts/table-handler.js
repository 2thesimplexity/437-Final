// Function to fetch and display properties in the table
function fetchAndDisplayProperties() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  fetch('/api/profiles', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
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
            <td><button onclick="showEditForm('${property.id}')">Edit</button></td>
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
            <td>
              <button onclick="showEditForm('${property.id}')">Edit</button>
              <button onclick="showUnitsModal('${property.id}')">View Units</button>
            </td>
          `;
        }
        tableBody.appendChild(row);
      });

      // Add sorting and filtering functionality
      addTableSorting();
      addTableFiltering();
    })
    .catch(error => {
      console.error('Error fetching properties data:', error);
    });
}

// Function to add sorting functionality to the table
function addTableSorting() {
  const table = document.getElementById("property-table");
  if (table) {
    const headerCells = table.tHead.rows[0].cells;

    for (const th of headerCells) {
      th.addEventListener("click", () => {
        const columnIndex = th.cellIndex;
        const dir = th.classList.contains('sort-asc') ? 'desc' : 'asc';
        sortTable(columnIndex, dir);
        th.classList.toggle('sort-asc', dir === 'asc');
        th.classList.toggle('sort-desc', dir === 'desc');
      });
    }
  }
}

// Function to sort the table
function sortTable(columnIndex, direction) {
  const table = document.getElementById("property-table");
  if (table) {
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.rows);
    const compare = (a, b) => {
      const aText = a.cells[columnIndex].textContent.trim();
      const bText = b.cells[columnIndex].textContent.trim();
      const isNumericColumn = !isNaN(aText) && !isNaN(bText);

      if (isNumericColumn) {
        return direction === 'asc' ? aText - bText : bText - aText;
      } else {
        return direction === 'asc' ? aText.localeCompare(bText) : bText.localeCompare(aText);
      }
    };
    rows.sort(compare);
    tBody.append(...rows);
  }
}

// Function to add filtering functionality to the table
function addTableFiltering() {
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
}

// Initialize the table by fetching and displaying properties
fetchAndDisplayProperties();
