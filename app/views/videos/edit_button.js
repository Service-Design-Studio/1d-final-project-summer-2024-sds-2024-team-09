// edit button for video title
// Make sure this script is correctly loaded
console.log("edit_button.js loaded");

function editTitle(button) {
    console.log("Edit button clicked", button); // Log when event handler is triggered
    const titleElement = button.previousElementSibling.querySelector('.video-title');
    const input = button.previousElementSibling.querySelector('.video-title-input');
    if (titleElement && input) {
        titleElement.style.display = 'none';
        button.style.display = 'none';
        input.style.display = 'inline';
        input.focus();
    } else {
        console.log("Error: titleElement or input not found");
    }
}

function saveTitle(input, videoId) {
    console.log("Saving title", input, videoId); // Log when saveTitle is triggered
    const newTitle = input.value;
    input.style.display = 'none';
    const titleLink = input.previousElementSibling;
    const button = input.parentElement.nextElementSibling;
    titleLink.innerText = newTitle;
    titleLink.style.display = 'inline';
    button.style.display = 'inline';

    // Save the new title to the server
    fetch(`/api/videos/${videoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function handleKey(event, input, videoId) {
    if (event.key === 'Enter') {
        input.blur();
    }
}

// Initialize event listeners when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    document.querySelectorAll('.edit-button').forEach(button => {
        console.log("Attaching click event to edit button", button); // Log when attaching event listener
        button.addEventListener('click', () => editTitle(button));
    });

    document.querySelectorAll('.video-title-input').forEach(input => {
        input.addEventListener('blur', () => saveTitle(input, input.dataset.videoId));
        input.addEventListener('keydown', (event) => handleKey(event, input, input.dataset.videoId));
    });
});

