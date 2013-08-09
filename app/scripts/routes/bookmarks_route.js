App.BookmarksRoute = Ember.Route.extend({

	model: function() {
		return App.Bookmark.find();
	},

	events: {

		createItem: function() {
			this.controllerFor('bookmarks.modal').create();
			this.send('openModal', 'bookmarks.modal');
		},

		editItem: function(bookmark) {
			this.controllerFor('bookmarks.modal').edit(bookmark);
			this.send('openModal', 'bookmarks.modal');
		}

	}

});