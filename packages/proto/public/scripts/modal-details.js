function showPropertyDetailsModal(propertyId) {
    const modal = document.getElementById('property-details-modal');
    const propertyViewer = document.createElement('property-viewer');
    propertyViewer.setAttribute('src', `/api/profiles/${propertyId}`);
  
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = ''; // Clear existing content
    modalContent.appendChild(propertyViewer);
  
    modal.style.display = 'block';
  
    const closeModalButton = document.getElementById('property-details-modal-close');
    closeModalButton.onclick = () => {
      modal.style.display = 'none';
    };
  
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
  