"use strict"

// img
function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)

  const file = ev.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = function (e) {
      selectedImage = new Image()
      selectedImage.sec = e.target.result
      selectedImage.onload = function () {
        console.log("Image onload:", selectedImage)
      }
    }
    reader.readAsDataURL(file)
  }
}

function selectImage(imageSrc) {
  selectedImage = new Image()
  selectedImage.src = imageSrc
  selectedImage.onload = function () {
    console.log("Selected Image:", selectedImage)
  }
}
gElCanvas.addEventListener("click", function (ev) {
  if (selectedImage) {
    const pos = getEvPos(ev)
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height) // לנקות את הקנבס קודם
    gCtx.drawImage(selectedImage, pos.x - 25, pos.y - 25, 50, 50) // מציבים את התמונה בקואורדינטות שנבחרו
  }
})

function loadImageFromInput(ev, onImageReady) {
  document.querySelector(".share-container").innerHTML = ""
  const reader = new FileReader()

  reader.onload = function (event) {
    const img = new Image()
    img.onload = () => {
      onImageReady(img)
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
