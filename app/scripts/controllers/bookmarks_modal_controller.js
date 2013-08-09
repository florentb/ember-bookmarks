App.BookmarksModalController = Ember.ObjectController.extend({

	create: function() {
		var bookmark = App.Bookmark.createRecord();
		bookmark.on('didCreate', this, function() {
			this.close();
		});
		this.set('model', bookmark);
	},

	edit: function(bookmark) {
		bookmark.one('didUpdate', this, function() {
			this.send('close');
		});
		this.set('model', bookmark);
	},

	save: function() {
		this.get('model.transaction').commit();
	},

	close: function() {
		var model = this.get('model'),
			transaction = model.get('transaction');
		if (transaction) transaction.rollback();
		this.send("closeModal");
	},

	shouldDisableSubmit: function() {
		return !this.get('isDirty') || this.get('isSaving');
	}.property('isDirty', 'isSaving')

});