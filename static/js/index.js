window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

    // Synchronize video pairs
    function syncVideos(withId, withoutId) {
        var withVideo = document.getElementById(withId);
        var withoutVideo = document.getElementById(withoutId);
        
        console.log('Syncing videos:', withId, withoutId);
        console.log('With video:', withVideo);
        console.log('Without video:', withoutVideo);
        
        if (withVideo && withoutVideo) {
            var isSyncing = false;
            
            // When the 'with' video plays, also play the 'without' video
            withVideo.addEventListener('play', function() {
                if (!isSyncing) {
                    isSyncing = true;
                    console.log('With video playing, syncing without video');
                    withoutVideo.play().catch(function(e) { console.error('Play error:', e); });
                    isSyncing = false;
                }
            });
            
            // When the 'with' video pauses, also pause the 'without' video
            withVideo.addEventListener('pause', function() {
                if (!isSyncing) {
                    isSyncing = true;
                    console.log('With video paused, syncing without video');
                    withoutVideo.pause();
                    isSyncing = false;
                }
            });
            
            // When the 'with' video seeks, sync the 'without' video
            withVideo.addEventListener('seeked', function() {
                if (!isSyncing) {
                    isSyncing = true;
                    withoutVideo.currentTime = withVideo.currentTime;
                    isSyncing = false;
                }
            });
            
            // Click on 'with' video to play both
            withVideo.addEventListener('click', function() {
                console.log('With video clicked');
                withVideo.currentTime = 0;
                withoutVideo.currentTime = 0;
                withVideo.play().catch(function(e) { console.error('Play error:', e); });
            });
            
            // Click on 'without' video to play both
            withoutVideo.addEventListener('click', function() {
                console.log('Without video clicked');
                withVideo.currentTime = 0;
                withoutVideo.currentTime = 0;
                withVideo.play().catch(function(e) { console.error('Play error:', e); });
            });
            
            // Add pointer cursor to indicate clickability
            withVideo.style.cursor = 'pointer';
            withoutVideo.style.cursor = 'pointer';
        } else {
            console.error('Could not find videos:', withId, withoutId);
        }
    }
    
    // Sync each video pair
    syncVideos('erasing-with', 'erasing-without');
    syncVideos('pivoting-with', 'pivoting-without');

})
