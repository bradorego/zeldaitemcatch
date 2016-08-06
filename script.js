(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var dataRef = new Firebase('http://zeldaitemcatch.firebaseio.com/'),
      $playButton = document.getElementById('bjo-zic-play'),
      $totalPlays = document.getElementById('bjo-zic-total-plays'),
      $player = document.getElementById('bjo-zic-player'),
      $url = document.getElementById('bjo-zic-url'),
      $copyUrl = document.getElementById('bjo-zic-copy-url'),
      count = 0,
      context = {};

    $playButton.addEventListener('click', function () {
      $player.play();
      $playButton.disabled = true;
      count++;
      dataRef.set({defaultCount: count});
      $totalPlays.innerHTML = count;
      $player.addEventListener('ended', function () {
        $playButton.disabled = false;
      });
    });
    
    $copyUrl.addEventListener('click', function () {
      $url.select();
      document.execCommand('copy');
    });

    dataRef.on('child_added', function (data) {
      if (data.key() === "defaultCount") {
        count = data.val();
        $totalPlays.innerHTML = count;
      }
      if (window.location.search.indexOf('autoplay') !== -1) {
        $playButton.click();
      }
    });
  });
}());
