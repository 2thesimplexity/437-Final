function showEditForm(propertyId) {
    fetch(`/api/profiles/${propertyId}`)
      .then(response => response.json())
      .then(data => {
        const formContainer = document.getElementById('edit-form-container');
        formContainer.innerHTML = `
          <form id="edit-form">
            <h2>Edit ${data.property.type} Home</h2>
            <label for="location">Location:</label>
            <input type="text" id="location" name="location" value="${data.property.type === 'Single Family' ? data.property.features.location : data.property.features.address || ''}"> </br>
            <label for="price">Price:</label>
            <input type="text" id="price" name="price" value="${data.property.type === 'Single Family' ? data.property.features.price : data.property.features.totalPrice || ''}"> </br>
            <label for="beds">Beds:</label>
            <input type="number" id="beds" name="beds" value="${data.property.features.numberOfBeds || data.property.features.totalNumberOfBeds || ''}"> </br>
            <label for="baths">Baths:</label>
            <input type="number" id="baths" name="baths" value="${data.property.features.numberOfBaths || data.property.features.totalNumberOfBaths || ''}"> </br>
            <label for="livingArea">Living Area:</label>
            <input type="text" id="livingArea" name="livingArea" value="${data.property.features.area?.totalLivingArea || data.property.features.totalLivingArea || ''}"> </br>
            <label for="lotArea">Lot Area:</label>
            <input type="text" id="lotArea" name="lotArea" value="${data.property.features.area?.totalLotArea || data.property.features.totalLotArea || ''}"> </br>
            <label for="agentName">Agent Name:</label>
            <input type="text" id="agentName" name="agentName" value="${data.listedBy.name}"> </br>
            <label for="agentPhone">Agent Phone:</label>
            <input type="text" id="agentPhone" name="agentPhone" value="${data.listedBy.phoneNumber}"> </br>
            <button type="submit">Save</button>
          </form>
        `;
  
        const modal = document.getElementById('edit-modal');
        const closeModalButton = document.getElementById('edit-modal-close');
        modal.style.display = 'block';
  
        closeModalButton.onclick = () => {
          modal.style.display = 'none';
        };
  
        window.onclick = (event) => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        };
  
        const form = document.getElementById('edit-form');
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          const formData = new FormData(form);
          const updatedData = {
            property: {
              type: data.property.type,
              features: {
                location: formData.get('location'),
                price: formData.get('price'),
                numberOfBeds: parseInt(formData.get('beds')),
                numberOfBaths: parseInt(formData.get('baths')),
                area: {
                  totalLivingArea: formData.get('livingArea'),
                  totalLotArea: formData.get('lotArea')
                }
              }
            },
            listedBy: {
              name: formData.get('agentName'),
              phoneNumber: formData.get('agentPhone')
            }
          };
  
          if (data.property.type === 'Multi-Family') {
            updatedData.property.features = {
              address: formData.get('location'),
              totalPrice: formData.get('price'),
              totalNumberOfBeds: parseInt(formData.get('beds')),
              totalNumberOfBaths: parseInt(formData.get('baths')),
              totalLivingArea: formData.get('livingArea'),
              totalLotArea: formData.get('lotArea'),
              units: data.property.features.units // Preserve the units array
            };
          }
  
          fetch(`/api/profiles/${propertyId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          })
          .then(response => response.json())
          .then(updatedProperty => {
            console.log('Updated property:', updatedProperty);
            alert('Property updated successfully!');
            modal.style.display = 'none';
            location.reload(); // Refresh the page to see the updated data
          })
          .catch(error => {
            console.error('Error updating property:', error);
            alert('Error updating property.');
          });
        });
      })
      .catch(error => {
        console.error('Error fetching property data for edit:', error);
      });
  }
  