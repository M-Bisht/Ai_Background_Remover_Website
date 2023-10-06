const apiKey =
  "63449185b4539b55b88df054eb16718bd3c95fd112b0b34e051c66e698ff98e5e29c023a5482c350da77a2aa9210c52d";
const imageInput = document.getElementById("imageInput");
const uploadButton = document.getElementById("uploadButton");
const processedImage = document.getElementById("processedImage");

uploadButton.addEventListener("click", () => {
  const photo = imageInput.files[0];
  if (photo) {
    const form = new FormData();
    form.append("image_file", photo);

    fetch("https://clipdrop-api.co/remove-background/v1", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
      },
      body: form,
    })
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const imageBytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < imageBytes.length; i++) {
          binary += String.fromCharCode(imageBytes[i]);
        }
        const base64String = btoa(binary);
        const imageUrl = `data:image/png;base64,${base64String}`;
        processedImage.src = imageUrl;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
