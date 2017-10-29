	$(function(){
		
       

		$.ajax({
			url : "http://localhost:3000/comments?_page=1&_limit=5",
			type : "GET",
			success:function(posts){
				$.each(posts , function(i,post){
				      $("#results").append( "<li>"  + "First Name :" + post.name + " <br/>Last Name : " + post.email + "<br/> Email :" + post.body + "</li>");
				})
			},
			error:function(xhr,error, status){
				console.log("Error XHR:" + xhr)
			}
		})
	
		

		$("#addpost").on("click",function(){
			
		   var firstname = document.getElementById("name").value;
		   var lastname = document.getElementById("email").value;
		   var email = document.getElementById("body").value;
		
		   var post1 = {
				name : firstname,
				email : lastname,
				body : email
			}
			$.ajax({
					url : "http://localhost:3000/comments",
					type : "POST",
					data : post1,
					success:function(newPost){
						$("#results").append( "<li> First Name :" + newPost.name + " <br/>Last Name : " + newPost.email +"<br/> Email :" + newPost.body +  "</li>");
						
					},
					error:function(xhr,error, status){
						console.log("Error XHR:" + xhr)
					}
				})
		})

		$("#search").keyup(function(){
				var searchtext = document.getElementById("search").value;
				if(searchtext.trim() != "" ){
						$.ajax({
								url : "http://localhost:3000/comments?_page=1&_limit=5&q=" + searchtext,
								type : "GET",
								success:function(posts){
									$("#results").empty();
									$.each(posts , function(i,post){
										$("#results").append( "<li>"  + "First Name :" + post.name + "<br/> Last Name : " + post.email + "<br/> Email :" + post.body + "</li>");
									})
								},
								error:function(xhr,error, status){
									console.log("Error XHR:" + xhr)
								}
							})
						}
		})
	})