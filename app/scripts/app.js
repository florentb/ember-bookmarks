var App = window.App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.animateModalClose = function() {
	var closeModalPromise = new Ember.RSVP.Promise(function(resolve, reject) {
		$('.modal').modal('hide').on('hidden', function() {
			resolve(true);
		});
	});
	return closeModalPromise;
};

App.animateModalOpen = function() {
	var openModalPromise = new Ember.RSVP.Promise(function(resolve, reject) {
		$('.modal').modal('show').on('shown', function() {
			resolve(true);
		});
	});
	return openModalPromise;
};

var showdown = new Showdown.converter();
Ember.Handlebars.registerBoundHelper('markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.registerBoundHelper('timeago', function(date) {
	return moment(date).fromNow();
});

Ember.Handlebars.registerBoundHelper('shorturl', function(url) {
	if (url) {
		var re = /https?:\/\/(www.)?/i;
		return url.replace(re, '');
	}
});

require('scripts/routes/*');
require('scripts/controllers/*');
require('scripts/models/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/store');
require('scripts/helpers');
