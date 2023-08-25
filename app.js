const apiKey =
  "bcd6862ca98aa1a0ac7eb562a60356db32c9ec16f36f4beede75e2b8df26142b070bc2cbd9ca88d694e51a1e72c35989";
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
