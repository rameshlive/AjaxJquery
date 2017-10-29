
var updateid='';
$(function(){


  load();
    
})
  function load(){
    var baseURL = "http://localhost:3000/comments";
    var data = "";

    $("#comments tbody").empty();
        // Get all Comments
    $.ajax({
        url:baseURL,
        typr:"GET",
        success:function(comments){
            $.each(comments, function(i, comment){
                data += "<tr><td><span>" + comment.id + "</span></td>";
                data += "<td><span>" + comment.name + "</span></td>";
                data += "<td><span>" + comment.email + "</span></td>";
                data += "<td><span class=text>" + comment.body + "</span></td>";
                data += '<td><a  class="btn btn-warning" onclick = updateUser(' + comment.id + ')> Update </a></td>';
                data += "<td><a  class='btn btn-danger' onclick = remove(" +comment.id+ ")> Remove </a></td>";
                data += "</tr>";
            })

            $("#comments tbody").append(data);
        },
        error:function(){

        }
    });

    }
    // Remove selected comment
   function remove(id){
        var baseURL = "http://localhost:3000/comments";
        var data="";
        if (confirm("Are sure want to delete the user having the id " + id ) ==  true){
            $.ajax({
                url:baseURL+"/"+id,
                type:"DELETE",
                success:function(){
                $("#comments tbody").empty();
                },
                error:function(xhr,status){
                        console.log(xhr);
                }
            }).done(function() { 
                    load();
            });
        }  
    }


    // Add New User
    function addItem(){

        var baseURL = "http://localhost:3000/comments";
        var data="";

        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var desc = document.getElementById("desc").value;
        var data = {
            postId : 1,
            name : name,
            email : email,
            body : desc
        }

        $.ajax({
            url :baseURL,
            type: "POST",
            data:data,
            success:function(){
                alert("Data added sucessfully");
                
            },
            error:function(){
                
            }
        }).done(function(){
             load();
             $("#adduser").modal('hide');
        })
    }


    var submit = document.getElementById("submit");

    submit.addEventListener("click",addItem);



    //Update User

    
    function updateUser(id){
        $("#updateuser").modal('show');
        this.updateid = id;    
        console.log(this.updateid);
    }

    var update = document.getElementById("update");

    update.addEventListener("click",updateUserItem);


    function updateUserItem(){
        
        var baseURL = "http://localhost:3000/comments";

        var name = document.getElementById("uname").value;
        var email = document.getElementById("uemail").value;
        var desc = document.getElementById("udesc").value;


        var data = {
            postId : 1,
            name : name,
            email : email,
            body : desc
        }

        $.ajax({
            url : baseURL + "/" + updateid,
            type: "PUT",
            data :  data,
            success:function(){
                alert("Data Updated Succesfuuly");
            },
            error:function(){

            }

        }).done(function(){
            load();
             $("#updateuser").modal('hide');  
        })

    }

