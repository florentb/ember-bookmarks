App.Bookmark = DS.Model.extend({
	insertedAt: DS.attr('date', { defaultValue: new Date() }),
	title: DS.attr('string'),
	description: DS.attr('string'),
	url: DS.attr('string'),
	favorite: DS.attr('boolean', { defaultValue: false })
});