'use strict';

var juke = angular.module('juke', ['ui.router']);

juke.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	 $locationProvider.html5Mode(true);
	// when there is an empty route, redirect to /albums   
    $urlRouterProvider.when('', '/albums');

    $urlRouterProvider.when('/artists/:artistid', '/artists/:artistid/albums');



	// All albums state
  $stateProvider
  .state('albumList', {
    url: '/albums',
    templateUrl: '../allAlbums.html',
    resolve: {
    	albums: function(AlbumFactory) {
    		return AlbumFactory.fetchAll();
    	}
    },
    controller: 'AlbumsCtrl'
  });
  

  $stateProvider.state('album', {
  	url: '/:albumid',
  	templateUrl: '../album.html',
  	resolve: {
  		album: function(AlbumFactory, $stateParams) {
  			return AlbumFactory.fetchById($stateParams.albumid);
  		}
  	},
  	controller: 'AlbumCtrl'
  });

  // All artists state
  $stateProvider.state('artistList', {
    url: '/artists',
    templateUrl: '../allArtists.html',
    controller: 'ArtistsCtrl'
  });

  // One artist state
  $stateProvider.state('artist', {
    url: '/artists/:artistid',
    templateUrl: '../artist.html',
    controller: 'ArtistCtrl'
  })
  .state('artist.albums', {
  	url: '/albums',
  	templateUrl: '../allAlbums.html',
  	controller: 'ArtistCtrl'
  })
  .state('artist.songs', {
  	url: '/songs',
  	templateUrl: '../songs.html',
  	controller: 'ArtistCtrl'
  })
});

juke.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from ' + fromState + ' to ' + toState + ':', error);
  });
});