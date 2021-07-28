//! you always want your function declared before using it!

const videoElement = document.getElementById('video')
const button = document.getElementById('button')

// Prompt user to select a media stream
// - pass that chosen media steam to video element
// - then play
async function selectMediaStream() {
  try {
    // anything that needs to be resolved after we complete our call will wait until the try has completed, instead of just throwing an error
    // vvv bring in the data  vvv when user has selected media source
    const mediaStream = await navigator.mediaDevices.getDisplayMedia()
    // vvv we are putting the media stream into our video object
    videoElement.srcObject = mediaStream
    // when video has loaded its metadata, it calls function to play vid
    videoElement.onloadedmetadata = () => {
      videoElement.play()
    } // true when finished loading
  } catch (error) {
    console.log('whoops:', error)
  }
}

button.addEventListener('click', async () => {
  // disable button
  button.disabled = true
  // start picture-in-picture
  await videoElement.requestPictureInPicture()
  // reset button - this will only happen if we successfully enable our picture in picture
  button.disabled = false
})

// on load
selectMediaStream()
