(async () => {
  const response = await fetch("https://portfolio.nedzad.dev/");
  const json = await response.json();

  if (!response.ok) return;

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

  for (const doc of json[0].images) {
    const galleryImage = document.createElement("img");

    galleryImage.src = doc.url;
    galleryImage.className = "gallery-item";
    galleryImage.onclick = () => {
      const overlayImage = document.createElement("img");
      overlayImage.src = doc.url;

      overlay.appendChild(overlayImage);
      overlayBg.setAttribute("style", "display: flex");
    };

    gallery.appendChild(galleryImage);
  }
})();
