document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('artifact-form');
    if (form) {
        form.addEventListener('submit', addArtifact);
    }

    if (document.querySelector('.artifact-container')) {
        displayArtifacts();
    }
});

// Function to add an artifact
function addArtifact(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById('artifact-form'));

    fetch('http://localhost:3000/api/artifacts', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        document.getElementById('artifact-form').reset();
        displayArtifacts();
    })
    .catch(err => console.error(err));
}

// Function to display artifacts
function displayArtifacts() {
    const artifactContainer = document.querySelector('.artifact-container');
    artifactContainer.innerHTML = '';  // Clear the container

    fetch('http://localhost:3000/api/artifacts')
        .then(response => response.json())
        .then(artifacts => {
            artifacts.forEach(artifact => {
                const artifactCard = document.createElement('div');
                artifactCard.classList.add('artifact');
                artifactCard.innerHTML = `
                    <img src="${artifact.image_path}" alt="${artifact.name}">
                    <h3>${artifact.name}</h3>
                    <p><strong>Description:</strong> ${artifact.description}</p>
                    <p><strong>Category:</strong> ${artifact.category}</p>
                    <p><strong>Acquisition Date:</strong> ${artifact.acquisition_date || 'N/A'}</p>
                    <p><strong>Location:</strong> ${artifact.location}</p>
                    <p><strong>Status:</strong> ${artifact.status}</p>
                    <button class="remove-btn" data-id="${artifact.id}">Remove</button>
                `;
                artifactContainer.appendChild(artifactCard);
            });

            // Add event listener to all remove buttons
            const removeButtons = document.querySelectorAll('.remove-btn');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const artifactId = button.getAttribute('data-id');
                    removeArtifact(artifactId);
                });
            });
        })
        .catch(err => console.error(err));
}

// Function to remove an artifact
function removeArtifact(id) {
    fetch(`http://localhost:3000/api/artifacts/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        displayArtifacts();
    })
    .catch(err => console.error(err));
}
