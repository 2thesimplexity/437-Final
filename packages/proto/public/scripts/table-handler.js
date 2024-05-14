// table-handler.js

// Function to fetch and display properties in the table
function fetchAndDisplayProperties() {
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
  