// Function to add an artifact
function addArtifact(event) {
    event.preventDefault();  // Prevent the form from refreshing the page
    
    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('id',document.getElementById('id').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('acquisition_date', document.getElementById('acquisition_date').value);
    formData.append('location', document.getElementById('location').value);
    formData.append('status', document.getElementById('status').value);
    formData.append('image', document.getElementById('image').files[0]);

    // Send the data to the backend API
    fetch('http://localhost:3000/add-artifact', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('artifact-form').reset();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to display artifacts
function displayArtifacts() {
    const artifactContainer = document.querySelector('.artifact-container');
    if (artifactContainer) {
        fetch('http://localhost:3000/artifacts')
        .then(response => response.json())
        .then(artifacts => {
            artifactContainer.innerHTML = '';  // Clear the container

            artifacts.forEach(artifact => {
                const artifactCard = document.createElement('div');
                artifactCard.classList.add('artifact');
                artifactCard.innerHTML = `
                    <img src="data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(artifact.image.data)))}" alt="${artifact.name}">
                    <h3>${artifact.name}</h3>
                    <p><strong>artifact id:</strong> ${artifact.artifactid}
                    <p><strong>Description:</strong> ${artifact.description}</p>
                    <p><strong>Category:</strong> ${artifact.category}</p>
                    <p><strong>Acquisition Date:</strong> ${artifact.acquisition_date}</p>
                    <p><strong>Location:</strong> ${artifact.location}</p>
                    <p><strong>Status:</strong> ${artifact.status}</p>
                    <button class="remove-btn" onclick="removeArtifact(${artifact.id})">Remove</button>
                `;
                artifactContainer.appendChild(artifactCard);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}

// Function to remove an artifact
function removeArtifact(id) {
    fetch(`http://localhost:3000/artifact/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        displayArtifacts();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Event listener for form submission
document.getElementById('artifact-form').addEventListener('submit', addArtifact);

// Load artifacts when viewing the page
if (document.querySelector('.artifact-container')) {
    window.onload = displayArtifacts;
}
