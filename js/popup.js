var popup;

var bg = chrome.extension.getBackgroundPage();

function popup(){

	document.querySelector("#loginControl").addEventListener("click", login);
	
	function showWaiting(message){
		if(message){
			document.querySelector("#waitingText").textContent = message;
		}else{
			document.querySelector("#waitingText").textContent = chrome.i18n.getMessage("popup_waiting");
		}
		document.querySelector("#waitingView").style.display = "";
	}
	
	function hideWaiting(){
		document.querySelector("#waitingView").style.display = "none";
	}
	
	function showLogin(){
		document.querySelector("#loginView").style.display = "";
	}
	
	function hideLogin() {
		document.querySelector("#loginView").style.display = "none";
	}
	
	function showCreate(){
		document.querySelector("#createView").style.display = "";
	}
	
	function hideCreate(){
		document.querySelector("#createView").style.display = "none";
	}
	
	function showResult(){
		document.querySelector("#resultView").style.display = "";
	}
	
	function hideResult(){
		document.querySelector("#resultView").style.display = "none";
	}
	
	//
	function LoginView(){
		hideWaiting();
		hideCreate();
		hideResult();
		showLogin();
	}
	
	function WaitingView(message){
		hideLogin();
		hideCreate();
		hideResult();
		showWaiting(message);
	}
	
	function up(id){
		var upRequest = {
			action:"up",
			linkId:id
		};
		chrome.extension.sendMessage(upRequest, function(response){
			if(response.status == "ups"){
				alert("Ups: " + response.ups);
			}else if(response.status == "error"){
			
			}
		});
	}
	

	function show(){
		//alert("show");
		//
		var request = {
			action:"show"
		};
		
		chrome.extension.sendMessage(request,function(response){
			alert("validss");
			if(response.status == "valid"){
				alert("valid");
				if(!response.has_uped){
					up(response.id);
				}else{
					alert("has_uped");
				}
			}else if(response.status == "empty"){
				alert("empty");
			}else if(response.status == "error"){
				alert(response.error);
			}else{
				hideWaiting();
			}
		});
	}
		
	//
	function login(){
		WaitingView("���ڵ�¼...");
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		
		var request = {
			action:"login",
			username:username,
			password:password
		};
		
		chrome.extension.sendMessage(request, function(response){
			if(response.status == "error"){
				alert("Err");
			}else if(response.status == "success"){
				//alert("su");
				show();
			}
		});
	}
	
	//
	return{
		LoginView : LoginView,
		WaitingView : WaitingView,
		Show : show
	};
};

function start(){
	popup = new popup();
	
	if(!bg.chouti.isAuthorized()){
		
		popup.LoginView();
		return;
	}
	popup.WaitingView("Waiting");
	popup.Show();
};

document.addEventListener("DOMContentLoaded", start);