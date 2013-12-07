'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
MapPhotoQuestion = require('./../models/mapPhotoQuestion.js');

var quizModel = function () {

	var quizSchema = Schema({
		uname: String,
		difficulty: Boolean,
		state: [{id: Schema.Types.ObjectId, correct:Boolean}]
	});

	quizSchema.methods.populateState = function (){
		var self=this;
		console.log(self);
		MapPhotoQuestion.find(function(err,docs){
			if(err) { throw err;} 
			while(docs.length>0){
				var docindex = Math.floor(Math.random()*docs.length);
				self.state.push({id: docs[docindex]._id, correct: null});

				docs.splice(docindex,1);
			}
			self.save(function(err,qs){
				if(err){ throw err;}
				console.log(qs);
			});
		});

	};

	return mongoose.model('Quiz', quizSchema);
};

module.exports = new quizModel();

