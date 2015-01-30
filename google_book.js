
//=============================model=============



function Books(){
	this.results
}

// create an ajax call to hit the google books api
// when the results are received from the api, the json data returned is rendered to the DOM
// I also only returned the first 3 results since usually the API returned numerous results

Books.prototype.getBooks = function(params){
	console.log('ajax call happening')
		$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + params,
		type: 'GET',
		dataType: 'json',
		success: function (data, textStatus, xhr) {
				this.results = data
				console.log(data)
       for (var i = 0; i < 3; i++){


       $('.search_results').append('<li> Title: ' + data.items[i].volumeInfo.title + '</li>')
       $('.search_results').append('<li> Author: ' + data.items[i].volumeInfo.authors + '</li>')
       $('.search_results').append('<li> Description: ' + data.items[i].volumeInfo.subtitle + '</li>')
       $('.search_results').append('<li> Page Count: ' + data.items[i].volumeInfo.pageCount + '</li>')
       $('.search_results').append('<li><img src=' + data.items[i].volumeInfo.imageLinks.thumbnail + '></li><br><br>')
       }

      },
	})

}



//==============================view==============

function View(){
	this.searchButton = '.search'
	this.userInput
}

View.prototype.getSearchParams = function(){
	this.userInput = $('.search_params').val()
	return this.userInput
}

View.prototype.renderSearchResuts = function(data){
	console.log(data)
	 // for (var i = 0; i < 3; i++){
  //      $('.search_results').append('<li> Title: ' + data.items[i].volumeInfo.title + '</li>')
  //      $('.search_results').append('<li> Author: ' + data.items[i].volumeInfo.authors + '</li>')
  //      $('.search_results').append('<li> Description: ' + data.items[i].volumeInfo.subtitle + '</li>')
  //      $('.search_results').append('<li> Page Count: ' + data.items[i].volumeInfo.pageCount + '</li>')
  //      $('.search_results').append('<li><img src=' + data.items[i].volumeInfo.imageLinks.thumbnail + '></li><br><br>')
  //      }


}



//===========================controller============


function Controller(model, view){
	this.model = model
	this.view = view
}

Controller.prototype.enterSearchParams = function(search){
	this.view.getSearchParams()
	this.model.getBooks(this.view.userInput);
	this.view.renderSearchResuts(this.model.results);
}

Controller.prototype.bindEventListeners = function(){
	$(this.view.searchButton).on('click', this.enterSearchParams.bind(this))
}

$(document).ready(function(){
	var myBooks = new Controller(new Books(), new View());
	myBooks.bindEventListeners();
})
