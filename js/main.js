"use strict"
var gCurrShape = "rect"
var gLastPos
var gElImg
var selectedImage = null

var gElCanvas = document.getElementById("myCanvas")
var gCtx
var gIsMouseDown = false
var gBrush = {
  color: "black",
  size: 15,
  shape: "square",
}

function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  document.querySelector("canvas").addEventListener(
    "touchmove",
    function (event) {
      event.preventDefault()
    },
    { passive: false }
  )
}

// draw shapes
function drawCircle(x, y) {
  gCtx.beginPath()
  gCtx.lineWidth = gBrush.size
  gCtx.arc(x, y, gBrush.size / 2, 0, 2 * Math.PI)
  gCtx.fill()
}

function drawRect(x, y) {
  gCtx.beginPath()
  gCtx.fillStyle = gBrush.color

  gCtx.fillRect(x, y, gBrush.size, gBrush.size)
}

// mouse drawing
function onDown(ev) {
  gIsMouseDown = true
  const pos = getEvPos(ev)
  gLastPos = pos
  //   onDraw(ev)
}

// on draw
function onDraw(ev) {
  if (!gIsMouseDown) return

  const pos = getEvPos(ev)
  const offsetX = pos.x
  const offsetY = pos.y

  switch (gCurrShape) {
    case "rect":
      drawRect(offsetX, offsetY)
      break
    case "circle":
      drawCircle(offsetX, offsetY)
      break
  }
}

function onUp() {
  gIsMouseDown = false
}

// color
function onSetColor(ev) {
  gBrush.color = ev.target.value
}

// Brush Size
function onSetSize(ev) {
  gBrush.size = ev.target.value
}

// set shape
function onSetShape(ev) {
  const shape = ev.target.value === "1" ? "circle" : "rect"
  gBrush.shape = shape
  gCurrShape = shape
  const elShapeTitle = document.querySelector(".shape-title")
  elShapeTitle.innerText = shape === "rect" ? "square" : "circle"
}

// clear canavas
function onClearCanvas() {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  //* We may clear part of the canvas
  // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
}

// get pos
function getEvPos(ev) {
  const canvasRect = gElCanvas.getBoundingClientRect();
  const TOUCH_EVS = ["touchstart", "touchmove", "touchend"]

  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    //* Prevent triggering the default mouse behavior
    if (!gIsMouseDown) {
      ev.preventDefault()
    }
    //* Gets the first touch point (could be multiple in touch event)
    ev = ev.changedTouches[0]

    /*
     * Calculate touch coordinates relative to canvas
     * position by subtracting canvas offsets (left and top) from page coordinates
     */

    // const canvasRect = ev.target.getBoundingClientRect();

    // pos = {
    //   x: ev.clientX - canvasRect.left,
    //   y: ev.clientY - canvasRect.top,
    // };

    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  return pos
}

// download canvas
function onDownloadCanvas(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  elLink.href = dataUrl
  // Set a name for the downloaded file
  elLink.download = "my-img"
}

function resizeCanvas() {
  const elContainer = document.querySelector(".canvas-container")
  gElCanvas.width = elContainer.clientWidth

  if (gElImg) {
    gElCanvas.height =
      (gElImg.naturalHeight / gElImg.naturalWidth) * gElCanvas.width
  } else {
    gElCanvas.height = gElCanvas.width
  }
}

function isActive(ev) {
  const elActivePic = ev.target

  console.log(elActivePic)
  
  elActivePic.style.border = "2px solid black"
}