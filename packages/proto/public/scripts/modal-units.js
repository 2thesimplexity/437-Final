// Function to show the units modal for a multi-family property
function showUnitsModal(propertyId) {
  fetch(`/api/profiles/${propertyId}`)
    .then(response => response.json())
    .then(data => {
      const modal = document.getElementById('units-modal');
      const closeModalButton = document.getElementById('units-modal-close');
      const unitsContainer = document.getElementById('units-container');

      if (data.property.type === 'Multi-Family' && data.property.features.units) {
        unitsContainer.innerHTML = data.property.features.units.map(unit => `
          <div class="unit">
            <h3>${unit.location}</h3>
            <p><strong>Price:</strong> ${unit.price}</p>
            <p><strong>Beds:</strong> ${unit.numberOfBeds}</p>
            <p><strong>Baths:</strong> ${unit.numberOfBaths}</p>
            <p><strong>Unit Area:</strong> ${unit.unitArea}</p>
            <p><strong>Unit Lot Area:</strong> ${unit.unitLotArea}</p>
          </div>
        `).join('');
      } else {
        unitsContainer.innerHTML = '<p>No units found.</p>';
      }

      modal.style.display = 'block';

      closeModalButton.onclick = () => {
        modal.style.display = 'none';
      };

      window.onclick = (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };
    })
    .catch(error => {
      console.error('Error fetching property units data:', error);
    });
}
