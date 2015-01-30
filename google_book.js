
//=============================model=============



function Books(){
	
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
