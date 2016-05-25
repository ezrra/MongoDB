/* var http = require('http'),
	server =  http.createServer(function ( request, response) {
		response.writeHead(200, { "Content-Type" : "text/plain"});
		response.end("Hello");
	});

	server.listen(8000);

	console.log("Server running."); */

var express = require("express"),
	cons 	= require("consolidate"),
	mongodb = require("mongodb");