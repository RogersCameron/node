document.addEventListener('DOMContentLoaded', function() {
  fetch('videogame.json') // Update the filename to videogame.json
  .then(response => response.json())
  .then(data => loadImages(data))
  .catch(error => console.error('Error loading video game data:', error));

  // Show Add Item Modal
  document.getElementById('showAddItemModal').addEventListener('click', function(event) {
      event.preventDefault();
      resetAddItemForm(); // Reset the form every time it's opened
      document.getElementById('addItemModal').style.display = 'block';
  });

  // Close Add Item Modal
  document.getElementsByClassName('close')[1].addEventListener('click', function() {
      document.getElementById('addItemModal').style.display = 'none';
  });

  // Cancel Add Item
  document.getElementById('cancelAddItem').addEventListener('click', function() {
      document.getElementById('addItemModal').style.display = 'none';
  });

  // Add Supply Input
  document.getElementById('addSupply').addEventListener('click', function() {
      const newInput = document.createElement('input');
      newInput.type = 'text';
      newInput.name = 'items[]';
      document.getElementById('suppliesContainer').appendChild(newInput);
  });

  // Image Preview
  document.getElementById('itemImage').addEventListener('change', function() {
      const [file] = this.files;
      if (file) {
          document.getElementById('imagePreview').src = URL.createObjectURL(file);
          document.getElementById('imagePreview').style.display = 'block';
      }
  });

  // Form submission
  document.getElementById('addItemForm').addEventListener('submit', function(event) {
      event.preventDefault();
      // Here, implement the AJAX request to POST data to the server
      // On success, close the modal and refresh the items displayed
  });
});

function loadImages(games) {
  const gallery = document.getElementById('imageGallery');
  games.forEach(game => {
      const div = document.createElement('div');
      div.className = 'w3-quarter w3-container';
      const img = document.createElement('img');
      img.src = `images/${game.image}`;
      img.alt = game.name;
      img.style.width = '100%';
      img.classList.add("w3-hover-opacity");
      img.onclick = function() { openModal(game); };
      div.appendChild(img);
      gallery.appendChild(div);
  });
}

function openModal(game) {
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName("close")[0];
  const info = document.getElementById('modalInfo');

  info.innerHTML = `<h3>${game.name}</h3>
                    <img src="images/${game.image}" style="max-width:100%;"><br>
                    <p><strong>Description:</strong> ${game.description}</p>
                    <p><strong>Items:</strong> ${game.items.join(', ')}</p>`;
  modal.style.display = "block";

  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
}

function resetAddItemForm() {
  document.getElementById('addItemForm').reset();
  const extraInputs = document.querySelectorAll('#suppliesContainer input[name="items[]"]:not(:first-of-type)');
  extraInputs.forEach(input => input.remove());
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('imagePreview').src = '';
}
