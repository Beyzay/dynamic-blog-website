document.addEventListener("DOMContentLoaded", () => {
    // Select the display area (post item container) to render posts into
    const postList = document.getElementById("post-list");

    // Try to get saved posts from localStorage, if nothing is found, default to an empty array
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    console.log("Posts in localStorage:", posts);

    if (posts.length === 0) {
        postList.innerHTML = `<div class="col-12 text-center"><p>No posts yet.</p></div>`;
    } else {
        
        // Create a div with appropriate className to hold the Bootstrap card for each post, and append it
        posts.forEach((post, i) => {
            const postDiv = document.createElement("div");
            postDiv.className = "col-md-4 mb-3";

            // Format the post date if there is a post created
            const formattedDate = post.createdAt 
            ? new Date(post.createdAt).toLocaleDateString()
            : "";

            postDiv.innerHTML = `
                <div class="card shadow-sm">
                    
                    <!-- Try to get the saved image, if nothing is found, default to an empty string -->
                    ${post.image ? `<img src="${post.image}" class="card-img-top" alt="Post Image">` : ""}
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${post.title ? post.title : "(Title required)"}</h5>

                        <!-- Limit the post content view to 50 characters if there is any -->
                        <p class="card-text">${post.content ? post.content.substring(0, 50) + "..." : "(Content required)"}</p>
                        ${formattedDate ? `<p class="card-text"><small class="text-body-secondary">Posted on ${formattedDate}</small></p>` : ""}
                    </div>
                    
                    <div class="card-footer text-body-secondary">
                        <a href="post.html?postId=${i}" class="btn btn-primary mt-auto">View Post</a>
                    </div>
                </div>
            `;

            postList.appendChild(postDiv);
        });
    }
});