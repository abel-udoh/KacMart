function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      slideIndex = (slideIndex + 1) % sliderContent.children.length;
      updateSlider();
    }, 3000); // Change slide every 3 seconds (adjust as needed)
  }

  // Initial auto slide setup
  resetAutoSlide();