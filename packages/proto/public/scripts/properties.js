const createPropertyListItem = (property) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'view-details';
    button.textContent = 'View Details';
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      loadPropertyDetails(property);
    });
  
    li.textContent = property.location;
    li.appendChild(button);
    return li;
  };
  
  const loadPropertyDetails = (property) => {
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = '';
  
    const details = document.createElement('div');
    details.className = 'details';
  
    if (property.type === 'Single Family') {
      details.innerHTML = `
        <h2>${property.type} Home Details</h2>
        <p><strong>Location:</strong> ${property.location}</p>
        <p><strong>Price:</strong> ${property.price}</p>
        <p><strong>Beds:</strong> ${property.beds}</p>
        <p><strong>Baths:</strong> ${property.baths}</p>
        <p><strong>Living Area:</strong> ${property.livingArea}</p>
        <p><strong>Lot Area:</strong> ${property.lotArea}</p>
        <br/>
        <h3>Agent Info</h3>
        <p><strong>Name:</strong> ${property.agent.name}</p>
        <p><strong>Phone:</strong> ${property.agent.phone}</p>
      `;
    } else if (property.type === 'Multi-Family') {
      details.innerHTML = `
        <h2>${property.type} Home Details</h2>
        ${property.units.map(unit => `
          <div class="unit">
            <h3>Unit Features</h3>
            <p><strong>Location:</strong> ${unit.location}</p>
            <p><strong>Price:</strong> ${unit.price}</p>
            <p><strong>Beds:</strong> ${unit.beds}</p>
            <p><strong>Baths:</strong> ${unit.baths}</p>
            <p><strong>Unit Area:</strong> ${unit.unitArea} sq ft</p>
          </div>
        `).join('')}
        <br/>
        <h3>Total Features</h3>
        <p><strong>Total Living Area:</strong> ${property.totalLivingArea}</p>
        <p><strong>Total Beds:</strong> ${property.totalBeds}</p>
        <p><strong>Total Baths:</strong> ${property.totalBaths}</p>
        <br/>
        <h3>Agent Info</h3>
        <p><strong>Name:</strong> ${property.agent.name}</p>
        <p><strong>Phone:</strong> ${property.agent.phone}</p>
      `;
    }
  
    modalDetails.appendChild(details);
    showModal();
  };
  
  const showModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  };
  
  const hideModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  };
  
  // Toggle the visibility of the address list
  const toggleList = (listId) => {
    const list = document.getElementById(listId);
    const arrow = document.querySelector(`h2[onclick="toggleList('${listId}')"] .arrow`);
    if (list.style.display === 'none' || list.style.display === '') {
      list.style.display = 'block';
      arrow.innerHTML = '&#9660;'; // Down arrow
    } else {
      list.style.display = 'none';
      arrow.innerHTML = '&#9654;'; // Right arrow
    }
  };
  
  // Close/open modal by on click/ on close 
  window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      hideModal();
    }
  };
  
  document.getElementById('modal-close').onclick = function() {
    hideModal();
  };
  
  // Fetch properties data to populate property lists
  fetch('/mockup/data.json')
    .then(response => response.json())
    .then(properties => {
      const singleFamilyList = document.getElementById('single-family-list');
      const multiFamilyList = document.getElementById('multi-family-list');
  
      properties.forEach(property => {
        if (property.type === 'Single Family') {
          singleFamilyList.appendChild(createPropertyListItem(property));
        } else if (property.type === 'Multi-Family') {
          multiFamilyList.appendChild(createPropertyListItem(property));
        }
      });
    })
    .catch(error => {
      console.error('Error fetching properties data:', error);
    });
  