// Bookmarks Controller
App.BookmarksController = Ember.ArrayController.extend({

	sortNavProperties: Ember.A([
		Ember.Object.create({
			title: 'Date',
			value: 'insertedAt',
			link: 'javascript:void(0);'
		}),
		Ember.Object.create({
			title: 'Title',
			value: 'title',
			link: 'javascript:void(0);'
		})
	]),
	sortProperties: ['insertedAt'],
	sortAscending: false,
	sortNavSelection: [],

	removeItem: function(bookmark) {
		bookmark.deleteRecord();
		bookmark.get('store').commit();
	},

	toggleFavorite: function(bookmark) {
		bookmark.toggleProperty('favorite');
		bookmark.get('store').commit();
	},

	sortNavSelectionDidUpdate: function() {
		this.set('sortAscending', true);
		this.reSort(this.get('sortNavSelection'));
	}.observes('sortNavSelection'),

	reSort: function(attribute) {
		if (this.get('sortProperties.firstObject') === attribute) {
			this.toggleProperty('sortAscending');
		} else {
			this.set('sortProperties', [attribute]);
			this.set('sortAscending', true);
		}
	},

	favorites: function() {
		return this.filterProperty('favorite', true);
	}.property('@each.favorite'),

	regular: function() {
		return this.filterProperty('favorite', false);
	}.property('@each.favorite')

});