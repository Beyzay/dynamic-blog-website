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
                    <div class="alert alert-danger d-none small py-0 mb-1" id="post-title-err-msg" role="alert">Please enter a post title.</div>
                    <h5 class="card-title" id="post-title">${post.title ? post.title : "(Title required)"}</h5>
                    
                    <div class="alert alert-danger d-none small py-0 mb-1" id="post-content-err-msg" role="alert">Please enter post content.</div>
                    <p class="card-text" id="post-content">${post.content ? post.content : "(Content required)"}</p>
                    ${formattedDate ? `<p class="card-text"><small class="text-body-secondary">Posted on ${formattedDate}</small></p>` : ""}
                </div>
                <div class="card-footer text-body-secondary d-flex gap-2">
                    <button class="btn btn-secondary flex-fill" id="post-edit-btn">Edit</button>
                </div>
            </div>
        </div>
    `;
}

// Edit functionality
document.getElementById("post-edit-btn").addEventListener("click", () => {
    const title = document.getElementById("post-title");
    const content = document.getElementById("post-content");

    title.outerHTML = `<input class="form-control mb-3" id="edit-title" value="${posts[postId].title}">`;
    content.outerHTML = `<textArea class="form-control mb-3" id="edit-content" rows="6">${posts[postId].content}</textarea>`;

    const editBtn = document.getElementById("post-edit-btn");
    editBtn.textContent = "Save";
    editBtn.classList.remove("btn-Secondary");
    editBtn.classList.add("btn-success");

    editBtn.addEventListener("click", () => {
        const newTitle = document.getElementById("edit-title").value.trim();
        const newContent = document.getElementById("edit-content").value.trim();
        const postTitleErrMsg = document.getElementById("post-Title-Err-Msg");
        const postContentErrMsg = document.getElementById('post-content-err-msg');
    
       // Clear previous error messages
        postTitleErrMsg?.classList.add("d-none");
        postContentErrMsg?.classList.add("d-none");

        // Validate Inputs
        if (!newTitle || !newContent) {
            if (!newTitle) postTitleErrMsg?.classList.remove("d-none"); 
            if (!newContent) postContentErrMsg?.classList.remove("d-none");
            return;
        }

        //Save to localStorage
        posts[postId].title = newTitle;
        posts[postId].content = newContent;
        localStorage.setItem("posts", JSON.stringify(posts));
        
        window.location.href = "index.html";
    }, {once:true});
});

