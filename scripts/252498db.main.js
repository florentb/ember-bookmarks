!function(){var a=window.App=Ember.Application.create({LOG_TRANSITIONS:!0});a.animateModalClose=function(){var a=new Ember.RSVP.Promise(function(a){$(".modal").modal("hide").on("hidden",function(){a(!0)})});return a},a.animateModalOpen=function(){var a=new Ember.RSVP.Promise(function(a){$(".modal").modal("show").on("shown",function(){a(!0)})});return a};var b=new Showdown.converter;Ember.Handlebars.registerBoundHelper("markdown",function(a){return new Handlebars.SafeString(b.makeHtml(a))}),Ember.Handlebars.registerBoundHelper("timeago",function(a){return moment(a).fromNow()}),Ember.Handlebars.registerBoundHelper("shorturl",function(a){if(a){var b=/https?:\/\/(www.)?/i;return a.replace(b,"")}})}(),function(){App.ApplicationRoute=Ember.Route.extend({events:{openModal:function(a){this.render(a,{into:"application",outlet:"modal"})},closeModal:function(){App.animateModalClose().then(function(){this.render("empty",{into:"application",outlet:"modal"})}.bind(this))}}})}(),function(){App.BookmarksRoute=Ember.Route.extend({model:function(){return App.Bookmark.find()},events:{createItem:function(){this.controllerFor("bookmarks.modal").create(),this.send("openModal","bookmarks.modal")},editItem:function(a){this.controllerFor("bookmarks.modal").edit(a),this.send("openModal","bookmarks.modal")}}})}(),function(){App.BookmarksController=Ember.ArrayController.extend({sortNavProperties:Ember.A([Ember.Object.create({title:"Date",value:"insertedAt",link:"javascript:void(0);"}),Ember.Object.create({title:"Title",value:"title",link:"javascript:void(0);"})]),sortProperties:["insertedAt"],sortAscending:!1,sortNavSelection:[],removeItem:function(a){a.deleteRecord(),a.get("store").commit()},toggleFavorite:function(a){a.toggleProperty("favorite"),a.get("store").commit()},sortNavSelectionDidUpdate:function(){this.set("sortAscending",!0),this.reSort(this.get("sortNavSelection"))}.observes("sortNavSelection"),reSort:function(a){this.get("sortProperties.firstObject")===a?this.toggleProperty("sortAscending"):(this.set("sortProperties",[a]),this.set("sortAscending",!0))},favorites:function(){return this.filterProperty("favorite",!0)}.property("@each.favorite"),regular:function(){return this.filterProperty("favorite",!1)}.property("@each.favorite")})}(),function(){App.BookmarksModalController=Ember.ObjectController.extend({create:function(){var a=App.Bookmark.createRecord();a.on("didCreate",this,function(){this.close()}),this.set("model",a)},edit:function(a){a.one("didUpdate",this,function(){this.send("close")}),this.set("model",a)},save:function(){this.get("model.transaction").commit()},close:function(){var a=this.get("model"),b=a.get("transaction");b&&b.rollback(),this.send("closeModal")},shouldDisableSubmit:function(){return!this.get("isDirty")||this.get("isSaving")}.property("isDirty","isSaving")})}(),function(){App.Bookmark=DS.Model.extend({insertedAt:DS.attr("date",{defaultValue:new Date}),title:DS.attr("string"),description:DS.attr("string"),url:DS.attr("string"),favorite:DS.attr("boolean",{defaultValue:!1})})}(),function(){App.BookmarksModalView=Ember.View.extend({classNames:["modal","hide","fade"],attributeBindings:["data-backdrop"],"data-backdrop":"static",didInsertElement:function(){App.animateModalOpen()}})}(),function(){App.NavbarItemView=Ember.View.extend({tagName:"li",classNameBindings:["active"],active:function(){return this.get("childViews.firstObject.active")}.property("childViews.firstObject.active")})}(),function(){App.Router.map(function(){this.resource("bookmarks")})}(),function(){App.Store=DS.Store.extend({revision:11,adapter:DS.LSAdapter.create()})}();