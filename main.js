(async () => {
  const response = await fetch("/img-list");
  const text = await response.text();
  const imgs = text.split(",");

  const gallery = document.querySelector(".gallery");
  const overlayBg = document.querySelector(".overlay-background");
  const overlay = document.querySelector(".overlay");

  overlayBg.addEventListener("click", () => {
    overlayBg.classList.add("overlay-background-hide");

    setTimeout(() => {
      overlayBg.classList.remove("overlay-background-hide");
      overlayBg.setAttribute("style", "display: none");
      overlay.removeChild(overlay.firstChild);
    }, 300);
  });

  for (const img of imgs) {
    const galleryImage = document.createElement("img");

    galleryImage.src = img;
    galleryImage.className = "gallery-item";
    galleryImage.onclick = () => {
      const overlayImage = document.createElement("img");
      overlayImage.src = img;

      overlay.appendChild(overlayImage);
      overlayBg.setAttribute("style", "display: flex");
    };

    gallery.appendChild(galleryImage);
  }
})();
