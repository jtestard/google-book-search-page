
//=============================model=============



function Books(){
	
}

// create an ajax call to hit the google books api
// when the results are received from the api, the json data returned is rendered to the DOM
//in this case i only returned the first result from the search just to keep the results look cleaner
// however if I were to refactor this code, I would create multiple match results

Books.prototype.getBooks = function(params){
	console.log('ajax call happening')
		$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + params,
		type: 'GET',
		dataType: 'json',
		success: function (data, textStatus, xhr) {

       

       $('.search_results').append('<li> Title: ' + data.items[0].volumeInfo.title + '</li>')
       $('.search_results').append('<li> Author: ' + data.items[0].volumeInfo.authors + '</li>')
       $('.search_results').append('<li> Description: ' + data.items[0].volumeInfo.subtitle + '</li>')
       $('.search_results').append('<li> Page Count: ' + data.items[0].volumeInfo.pageCount + '</li>')
       $('.search_results').append('<img src=' + data.items[0].volumeInfo.imageLinks.thumbnail + '>')

      },
	})

}



//==============================view==============

function View(){
	this.searchButton = '.search'
}

View.prototype.getSearchParams = function(){
	console.log($('search_params').val())
}

View.prototype.renderSearchResuts = function(dataFromAjaxCall){
	console.log("here are your results")
}



//===========================controller============


function Controller(model, view){
	this.model = model
	this.view = view
}

Controller.prototype.enterSearchParams = function(search){
	this.model.getBooks(this.view.getSearchParams);
	this.view.renderSearchResuts(this.model.getBooks());
}

Controller.prototype.bindEventListeners = function(){
	$(this.view.searchButton).on('click', this.enterSearchParams.bind(this))
}

$(document).ready(function(){
	var myBooks = new Controller(new Books(), new View());
	myBooks.bindEventListeners();
})
