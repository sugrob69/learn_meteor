Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};


		Meteor.call('postInsert', post, function(error, result) {
			if (error) {
				//отобразить ошибку пользователя
				return Errors.throw(error.reason);
			} 

			if (result.postExists) {
				throwError('This link has already been posted');
			}

			Router.go('postPage', {_id: result._id});
		});
	}
});