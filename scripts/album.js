var createSongRow = function(songNumber, songName, songLength) {
	var template = 
			'<tr class="album-view-song-item">'
		+ '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
		+ '<td class="song-item-title">' + songName + '</td>'
		+ '<td class="song-item-duration">' + songLength + '</td>'
		+ '</tr>'
		;
	
	var $row = $(template);
	
	var clickHandler = function() {
		var songNumber = parseInt($(this).attr('data-song-number'));
		if (currentlyPlayingSongNumber !== null) {
			var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
			currentlyPlayingCell.html(currentlyPlayingSongNumber);
		}
		if (currentlyPlayingSongNumber !== songNumber) {
			$(this).html(pauseButtonTemplate);
			setSong(songNumber);
			updatePlayerBarSong();
		} else if (currentlyPlayingSongNumber === songNumber) {
			$(this).html(playButtonTemplate);
			$('.main-controls .play-pause').html(playerBarPlayButton);
			setSong(null);
		}
		
	};
	
	var onHover = function(event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));
		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(playButtonTemplate);
		}
	};
	var offHover = function(event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number'));
		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(songNumber);
		}
	};
	
	$row.find('.song-item-number').click(clickHandler);
	$row.hover(onHover, offHover);
	return $row;
};

var setCurrentAlbum = function (album) {
	currentAlbum = album;
	var $albumTitle = $('.album-view-title'); 
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');
	
	$albumTitle.text(album.title);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + " " + album.label);
	$albumImage.attr('src', album.albumArtUrl);
	
	$albumSongList.empty();
	
	for (var i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
		$albumSongList.append($newRow);
	}
};

var trackIndex = function(album, song) {
	return album.songs.indexOf(song);
};

var setSong = function(songNumber) {
	currentlyPlayingSongNumber = songNumber;
	currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number) {
	return $('.song-item-number[data-song-number="' + number + '"]')
};

var followingSong = function(direction) {
	var lastSongNumber = trackIndex(currentAlbum, currentSongFromAlbum) + 1;
	var albumLength = currentAlbum.songs.length;
	
	switch (direction) {
		case 'next':
			if (lastSongNumber == albumLength) {
				setSong(1);
			} else {
				setSong(lastSongNumber + 1);
			};
			break;
		case 'previous':
			if (lastSongNumber == 1) {
				setSong(albumLength);
			} else {
				setSong(lastSongNumber - 1);
			};
			break;
	};
	
	updatePlayerBarSong();
	
	var $prevPlayingCell = getSongNumberCell(lastSongNumber);
	
	var $nextPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
	
	$prevPlayingCell.html(lastSongNumber);
	$nextPlayingCell.html(pauseButtonTemplate);
}

var updatePlayerBarSong = function() {
	$('.currently-playing .song-name').text(currentSongFromAlbum.title);
	$('.currently-playing .artist-name').text(currentAlbum.artist);
	$('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " = " + currentAlbum.artist);
	$('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');


$(document).ready(function() {
	setCurrentAlbum(albumPicasso);
	$previousButton.click(function() {
		followingSong('previous');
	});
	$nextButton.click(function() {
		followingSong('next');
	});
});
