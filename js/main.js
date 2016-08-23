$(document).ready(  function() {
	
	var xml = "<test><contenu id='2'><title>toto</title><url>url</url></contenu><contenu id='1'><title>toto</title><url>url</url></contenu></test>";
	var json = asxParser(xml);
	var json2 = xmlToJSON.parseString(readAsText2());  
	console.log(json);
	console.log(json2);


});

function readAsText2(){
	var file;
	  // Resolves helloWorld.doc file that is located in the
	  // documents root location
	tizen.filesystem.resolve('wgt-package', function(dir) { 
		file = dir.resolve("SeqA.asx");
		console.log(dir);
		console.log(typeof file);		
		file.readAsText(
				function(str) {
					console.log("The file content " + str);
					return str;
					}, 
				function(e) {console.log("Error " + e.message);},
				"UTF-8");
		
	}, function(e) {console.log("Error" + e.message);}, "r");
	
	
}



function asxParser(xml){
	//variables
	var result = [];
	var data = [];	
	//console.log("debut");
			
	try{
	 $(xml).find('contenu').each(   
	 function()
	 {
		//attributs et noeudsFils formant l'objet contenu 
	    var tmpId = $(this).attr('id');
	    var title = $(this).find('title').text();
	    var url = $(this).find('url').text();
	    
	    data.push({id:tmpId,title:title,url:url});
	    
	  }).promise().done(function(){
		  
		  for(var i=0;i<data.length;i++){
			  result.push(JSON.stringify(data[i]));
			 // console.log(result);
			 // console.log(data[i].id);
		  }
	  });
	                     
	//console.log("après");

	}catch(e){
		console.log("erreur" +e.message);
		
	}
	//console.log("fin");

	return result;
	
}