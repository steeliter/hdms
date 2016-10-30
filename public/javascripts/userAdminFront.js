function onload(){
	search({},false);
	var $subBox = $("input[name='checklist']");
    $subBox.click(function(){
        $("#checkAll").attr("checked",$subBox.length == $("input[name='checklist']:checked").length ? true : false);
    }); 
}
function onSearch(){
	var params=collectParams();
	search(params,false);
}
function search(params,isNav){
	$.ajax({
		type: "post",
		url: "/users/search",
		data: params,
		dataType: "json",
		success: function(data){
			if(data){
				if(data.error){
					alert(data.error+"数据加载失败!");
					return;
				}
				updateTable(data);
				if(!isNav)updateNav(data);

			}else{
				alert('数据加载失败！');
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error ' + textStatus + " " + errorThrown+"<br/>请重新登录...");
			$(window.location).attr("href", "/loginPage");
		}
	});
}
function updateTable(data){
	$("#userTable tr:gt(0)").remove();
	for(var i=0;i<data.results.length;i++){
		var tr="<tr><td><input type='checkbox' name='checklist' value='"+data.results[i].userID+"'/></td>"+
		"<td>"+((data.page-1)*data.pagesize+i+1)+"</td>"+
		"<td>"+data.results[i].userID+"</td>"+
		"<td>"+data.results[i].userName+"</td>"+
		"<td>"+data.results[i].department+"</td>"+
		"<td>"+data.results[i].userRole+"</td>"+
		"<td>"+data.results[i].userPhone+"</td>"+
		"<td><div class='btn-group' role='group' aria-label='...'>"+
		"<button type='button' onclick='getUser(\""+data.results[i].userID+
		"\")' class='btn btn-info'>修改</button>"+
		"<button type='button' onclick='delUserByID(\""+data.results[i].userID+
		"\")' class='btn btn-danger'>删除</button>"+
		"</div></td>"+
		"</tr>";
		$("#userTable tr:last").after(tr);
	}
}
function updateNav(data){
	$('#pagination').remove();
	$('#paginationBox').html("<ul id='pagination' class='nav'></ul>");
	$("#pagination").twbsPagination({
		startPage: 1,
		totalPages: data.rowsCount/data.pagesize+1,
		visiblePages:10,
		onPageClick: function (event, page) {
			var params=collectParams();
			params["page"]=page;
			params["pagesize"]=data.pagesize;
			search(params,true);
		}
	});
}
function delUserByID(id){
	var condition={"id":id};
	delUser(condition);
}
function delUser(condition){
	$.ajax({
		type: "post",
		url: "/users/delete",
		data: condition,
		dataType: "json",
		success: function(data){
			if(data){ 
				if(data.success){
					alert(data.success.n+"条数据删除成功");
					var params=collectParams();
					search(params,false);
				}
				else{
					alert("删除失败");
				}
			}else{  
				alert('数据传输失败！');
			}                      
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('出错了： ' + textStatus + " " + errorThrown);  
			var params=collectParams();
			search(params,false);
		}
	});
}
function cancelUpdate(){
	$("#userForm").modal('hide');
	clearUserForm();
}
function submitUpdate(){
	var user=collectUserInfo();
	$.ajax({
		type: "post",
		url: "/users/update",
		data: user,
		dataType: "json",
		success: function(data){
			if(data){ 
				if(data.success){
					alert("用户信息修改成功");
					$("#userForm").modal('hide');
					clearUserForm();
					var params=collectParams();
					search(params,false);
				}
				else{
					alert("删除失败");
				}
			}else{  
				alert('数据传输失败！');
			}                      
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('出错了： ' + textStatus + " " + errorThrown);  
			var params=collectParams();
			search(params,false);
		}
	});
}
function getUser(id){
	$.ajax({
		type: "post",
		url: "/users/get",
		data: {"id":id},
		dataType: "json",
		success: function(data){
			if(data){ 
				if(data.success){
					//alert(data.success.n+"条数据删除成功");
					$("#user_id_u").val(data.user.userID);
					$("#user_name_u").val(data.user.userName);
					$("#user_pwd_u").val(data.user.userPwd);
					$("#user_phone_u").val(data.user.userPhone);
					$("#user_role_u").val(data.user.userRole);
					$("#department_u").val(data.user.department);
                    $("#userForm").modal('show');
				}
				else{
					alert("删除失败"+data.error);
				}
			}else{  
				alert('数据传输失败！');
			}                      
		},
		error:function(jqXHR, textStatus, errorThrown){
			alert('出错了：' + textStatus + " " + errorThrown);  
		}
	});
}
function deleteChecked(){
    var checkboxes=$("input[name='checklist']"); 
    if(checkboxes.length===0){
    	alert("请选择删除条目。");
    	return;
    }
    var ids=new Array();
    for(var i=0,max=checkboxes.length;i<max;i++){
    	ids.push(checkboxes[i].value);
    }
    var condition=new Object();
    condition["id"]=ids.toString();
    //console.log(condition);
    delUser(condition);
}
function collectParams(){
	var params=new Object();
	var id=$("#user_id").val().trim();
	var name=$("#user_name").val().trim();
	params["id"]=id;
	params["name"]=name;
	//console.log(params);
	return params;
}
function collectUserInfo(){
	var user=new Object();
	var id=$("#user_id_u").val().trim();
	var name=$("#user_name_u").val().trim();
	var pwd=$("#user_pwd_u").val().trim();
	var role=$("#user_role_u").val().trim();
	var phone=$("#user_phone_u").val().trim();
	var dept=$("#department_u").val().trim();
	user["id"]=id;
	user["name"]=name;
	user["pwd"]=pwd;
	user["role"]=role;
	user["phone"]=phone;
	user["dept"]=dept;
	//console.log(params);
	return user;
}
function check(){	
	if($("#checkAll").prop("checked")){
		$('input[name="checklist"]').prop('checked', true);//.each(function(){$( this ).prop('checked', true)});
	}
	else{
		//$("#checkAll").removeAttr("checked")
		$('input[name="checklist"]').prop('checked', false);//.each(function(){$( this ).prop('checked', false)});
	}     
}
function clearUserForm(){
	$("#user_id_u").val("");
	$("#user_name_u").val("");
	$("#user_pwd_u").val("");
	$("#user_phone_u").val("");
	$("#user_role_u").val("");
	$("#department_u").val("");
}