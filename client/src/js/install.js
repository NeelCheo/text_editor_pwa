let deferredPrompt; // To save the beforeinstallprompt event
const butInstall = document.getElementById('buttonInstall'); // Install button

// Event handler for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('beforeinstallprompt event fired');
  event.preventDefault(); // Prevent the mini-infobar from appearing on mobile
  deferredPrompt = event; // Save the event for later use
  butInstall.style.display = 'block'; // Make the install button visible
});

// Click event handler for the install button
butInstall.addEventListener('click', async () => {
  console.log('Install button clicked');
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Trigger the install prompt
    const { outcome } = await deferredPrompt.userChoice; // Wait for user to respond
    console.log(`User response: ${outcome}`);
    deferredPrompt = null; // Clear the saved prompt event
  }
  butInstall.style.display = 'none'; // Hide the install button
});

// Event handler for appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed');
  deferredPrompt = null; // Clear the saved prompt event
  butInstall.style.display = 'none'; // Hide the install button
});
