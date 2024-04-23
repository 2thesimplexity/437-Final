const createPropertyListItem = (property) => {
  const li = document.createElement('li');
  const button = document.createElement('button');
  button.className = 'view-details';
  button.textContent = 'View Details';
  button.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent triggering any parent click events
    loadPropertyDetails(property);
  });

  li.textContent = property.location;
  li.appendChild(button);
  return li;
};

// Load property details into the modal
const loadPropertyDetails = (property) => {
  const modalDetails = document.getElementById('modal-details');
  modalDetails.innerHTML = ''; // Clear previous details

  const url = property.type === 'Single Family' 
    ? '/fragments/single_family_details.html' 
    : '/fragments/multi_family_details.html';

  fetch(url)
    .then(response => response.text())
    .then(fragment => {
      modalDetails.innerHTML = fragment;

      // Insert dynamic data into the fragment
      if (property.type === 'Single Family') {
        modalDetails.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Location:</strong> ${property.location}`;
        modalDetails.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Price:</strong> ${property.price}`;
        modalDetails.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Beds:</strong> ${property.beds}`;
        modalDetails.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Baths:</strong> ${property.baths}`;
        modalDetails.querySelector('p:nth-of-type(5)').innerHTML = `<strong>Living Area:</strong> ${property.livingArea}`;
        modalDetails.querySelector('p:nth-of-type(6)').innerHTML = `<strong>Lot Area:</strong> ${property.lotArea}`;
        modalDetails.querySelector('p:nth-of-type(7)').innerHTML = `<strong>Name:</strong> ${property.agent.name}`;
        modalDetails.querySelector('p:nth-of-type(8)').innerHTML = `<strong>Phone:</strong> ${property.agent.phone}`;
      } else {
        const unitsHtml = property.units.map(unit => `
          <div class="unit">
            <h3>Unit Features</h3>
            <p><strong>Location:</strong> ${unit.location}</p>
            <p><strong>Price:</strong> ${unit.price}</p>
            <p><strong>Beds:</strong> ${unit.beds}</p>
            <p><strong>Baths:</strong> ${unit.baths}</p>
            <p><strong>Unit Area:</strong> ${unit.unitArea} sq ft</p>
          </div>
        `).join('');
        modalDetails.querySelector('#units-container').innerHTML = unitsHtml;
        modalDetails.querySelector('#total-living-area').textContent = property.totalLivingArea;
        modalDetails.querySelector('#total-beds').textContent = property.totalBeds;
        modalDetails.querySelector('#total-baths').textContent = property.totalBaths;
        modalDetails.querySelector('#agent-name').textContent = property.agent.name;
        modalDetails.querySelector('#agent-phone').textContent = property.agent.phone;
      }

      showModal();
    })
    .catch(error => {
      console.error('Error loading property details:', error);
    });
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

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    hideModal();
  }
};

document.getElementById('modal-close').onclick = function() {
  hideModal();
};

// Fetch properties data and populate property lists
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
