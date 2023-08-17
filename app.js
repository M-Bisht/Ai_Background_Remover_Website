const apiKey =
  "70fe5f8b7873c2a5c92de4198d2e0d148b686b6283ada675ebd80c55316db6a4fcc42b84c3c19db959265ba5539e084d";
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
