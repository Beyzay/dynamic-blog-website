 // Select the display area (post item container) to render the post into
const postContainer = document.getElementById("post-container");

// Get the "postId" parameter from the URL query string
const urlParams = new URLSearchParams(window.location.search);

// And convert it to an integer
const postId = parseInt(urlParams.get("postId"), 10);

// Try to get saved posts from localStorage, if nothing is found, default to an empty array
const posts = JSON.parse(localStorage.getItem("posts")) || [];

console.log("Posts in localStorage:", posts);

// Handle invalid or missing post
if (isNaN(postId) || !posts[postId]) {
    postContainer.innerHTML = `<div><div class="alert alert-warning text-center" role="alert">No post found.</div></div>`;
} else {

    const post = posts[postId];

    // Format the post date if there is a post created
    const formattedDate = post.createdAt 
        ? new Date(post.createdAt).toLocaleDateString()
        : "";

    // Display post
    postContainer.innerHTML = `
        <div>
            <div class="card shadow-sm">
                <!-- Try to get the saved image, if nothing is found, default to an empty string -->
                ${post.image ? `<img src="${post.image}" class="card-img-top" alt="Post Image">` : ""}
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${post.title ? post.title : "(Title required)"}</h5>
                    <p class="card-text">${post.content ? post.content : "(Content required)"}</p>
                    ${formattedDate ? `<p class="card-text"><small class="text-body-secondary">Posted on ${formattedDate}</small></p>` : ""}
                </div>
            </div>
        </div>
    `;
}