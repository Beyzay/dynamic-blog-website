// Get DOM elements
const postForm = document.getElementById('post-form');
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const postImageInput = document.getElementById('post-image');
const postTitleErrMsg = document.getElementById('post-title-err-msg');
const postContentErrMsg = document.getElementById('post-content-err-msg');


// Handle form submission
postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();

    // Clear previous error messages
    postTitleErrMsg?.classList.add("d-none");
    postContentErrMsg?.classList.add("d-none");

    // Validate Inputs
    if (!title || !content) {
        if (!title) postTitleErrMsg?.classList.remove("d-none"); 
        if (!content) postContentErrMsg?.classList.remove("d-none");
        return;
    }

    // Convert image to base64 if there is an image saved
    let imageBase64 = "";
    if (postImageInput.files.length) {
        imageBase64 = await convertImgFileToBase64(postImageInput.files[0]);
    }

    function convertImgFileToBase64(file) {
        return new Promise ((res, rej) => {
            const reader = new FileReader();

            reader.onload = () => res(reader.result);
            
            reader.onerror = err => rej(err);

            reader.readAsDataURL(file);
        });
    }

    // Try to get saved posts from localStorage, if nothing is found, default to an empty array
    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Add and save the new post to localStorage
    posts.push({
        title,
        content,
        image: imageBase64,
        createdAt: new Date().toISOString()
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    // Redirect to homepage
    window.location.href = "index.html";
});