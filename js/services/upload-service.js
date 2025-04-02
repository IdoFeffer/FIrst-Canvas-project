"use strict"

// upload
function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL("image/jpeg")

  // After a successful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    // console.log('uploadedImgUrl:', uploadedImgUrl)
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    // console.log(' encodedUploadedImgUrl:', encodedUploadedImgUrl)
    document.querySelector(".share-container").innerHTML = `
              <a href="${uploadedImgUrl}">Image Url</a>
              <p>Image url: ${uploadedImgUrl}</p>
             
              <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                  Share on Facebook  
              </button>
          `
  }

  uploadImg(canvasData, onSuccess)
}

function onUploadToFB(url) {
  // console.log('url:', url)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = "webify"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const formData = new FormData()
  formData.append("file", imgData)
  formData.append("upload_preset", "webify")
  try {
    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    })
    const data = await res.json()
    onSuccess(data.secure_url)
  } catch (err) {
    console.log(err)
  }
}
