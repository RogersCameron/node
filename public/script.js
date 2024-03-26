document.addEventListener('DOMContentLoaded', function() {
  fetch('crafts.json') // Assuming crafts.json is accessible from the public directory
  .then(response => response.json())
  .then(data => loadImages(data))
  .catch(error => console.error('Error loading image data:', error));
});

function loadImages(crafts) {
  const gallery = document.getElementById('imageGallery');
  crafts.forEach(craft => {
      const div = document.createElement('div');
      div.className = 'w3-quarter w3-container';
      const img = document.createElement('img');
      // Prepend the 'images/' path to the image filename
      img.src = `images/${craft.image}`; // Adjust the path here
      img.alt = craft.name;
      img.style.width = '100%';
      img.classList.add("w3-hover-opacity");
      img.onclick = function() { openModal(craft); };
      div.appendChild(img);
      gallery.appendChild(div);
  });
}

function openModal(craft) {
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName("close")[0];
  const info = document.getElementById('modalInfo');
  
  info.innerHTML = `<h3>${craft.name}</h3>
                    <img src="images/${craft.image}" style="max-width:100%;"><br> <!-- Adjust the path here as well -->
                    <p><strong>Description:</strong> ${craft.description}</p>
                    <p><strong>Supplies:</strong> ${craft.supplies.join(', ')}</p>`;
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
