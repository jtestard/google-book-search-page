
//=============================book model=============



function Books(){
	this.results
}

// create an ajax call to hit the google books api
// when the results are received from the api, the json data returned is rendered to the DOM
// I also only returned the first 3 results since usually the API returned numerous results
Books.prototype.getBooks = function(params){
	console.log('getting your results now...')
		$.ajax({
		url: "https://www.googleapis.com/books/v1/volumes?q=" + params,
		type: 'GET',
		dataType: 'json',
		success: function (data, textStatus, xhr) {
				
				console.log(data)
       for (var i = 0; i < 3; i++){


       $('.search_results').append('<li> Title: ' + data.items[i].volumeInfo.title + '</li>')
       $('.search_results').append('<li> Author: ' + data.items[i].volumeInfo.authors + '</li>')
       $('.search_results').append('<li> Page Count: ' + data.items[i].volumeInfo.pageCount + '</li>')
       $('.search_results').append('<li><img src=' + data.items[i].volumeInfo.imageLinks.thumbnail + '></li><br><br>')
       }

      },
	})

}



//==============================view==============

function View(){
	this.searchButton = '.search'
	this.resetButton = '.reset'
	this.userInput
}

View.prototype.getSearchParams = function(){
	this.userInput = $('.search_params').val()
	return this.userInput
}

View.prototype.refreshPage = function(){
	$('.search_results').children().remove()
}





//===========================controller============


function Controller(model, view){
	this.model = model
	this.view = view
}

Controller.prototype.enterSearchParams = function(search){
	this.view.getSearchParams()
	this.model.getBooks(this.view.userInput);
}

Controller.prototype.resetSearchResults = function(){
	this.view.refreshPage()
}

Controller.prototype.bindEventListeners = function(){
	$(this.view.searchButton).on('click', this.enterSearchParams.bind(this))
	$(this.view.resetButton).on('click', this.resetSearchResults.bind(this))

}

$(document).ready(function(){
	var myBooks = new Controller(new Books(), new View());
	myBooks.bindEventListeners();
})
