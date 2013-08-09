App.BookmarksModalView = Ember.View.extend({

	classNames: ['modal', 'hide', 'fade'],

	attributeBindings: ['data-backdrop'],

	'data-backdrop': 'static',

	didInsertElement: function() {
		App.animateModalOpen();
	}

});