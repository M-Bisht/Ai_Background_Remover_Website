const apiKey =
  "90c801a554d46d712284982a748a0901fb26f2e817470940fdfa3279673a37f955f1f86a770ae4ecdba094656c108717";
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
