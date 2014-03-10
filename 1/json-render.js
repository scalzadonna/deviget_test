var msgIdPrefix = 'msg-';
var jsonData  = 
[
{
id: 1,
text: "<p>This is a message text where new lines are </br> and there is some more text on another line whcih could span 2 lines</p> <h4>data table</h4> <div>lots more details <p> some paragraph info here</p> </div>",
unread: true
},
{
id: 2,
text: "<p>This is a second message text which is a new message </br> and there is some more text on another line which could span 2 lines</p> <h4>data table</h4> <div>lots more details <p> some paragraph info here</p> </div>",
unread: false
},
{
id: 3,
text: "<p>this is a very short message</p>",
unread: false
}
];

function showMessages(){
	
	var content = '';
	var messagesList = document.getElementById('messages-list');
	
	if(messagesList){
		for (var i in jsonData) {
			var message = jsonData[i];
			var cssClass = '';
			var text = message.text;
			var actualText = '';
			if (message.unread === true || i === 1){
				cssClass = 'read-message';
				actualText = text;
			
			} else {
				cssClass = 'unread-message';
				var lines = text.indexOf('</');
				if ( text.indexOf('</') != text.lastIndexOf('</')){
					actualText = text.slice(0,text.indexOf('</')) + '(...)';
				}
				else {	
					actualText = text;
				}
			}
			content = content +'<li class="'+cssClass+'" onclick="switchMessage('+message.id+');"><div id="'+msgIdPrefix+message.id+'">'+actualText+'</div></li>';
		}
		messagesList.innerHTML=content;
	}
	else
		console.log("List not found");
	
}

function switchMessage(id){
	var item  = document.getElementById(msgIdPrefix+id);
	if (item.parentNode.className == "unread-message"){
		item.parentNode.className = "read-message";
		for (var i in jsonData) {
			if (jsonData[i].id == id){
				item.innerHTML = jsonData[i].text;
			}
		}
	} else if (item.parentNode.className == "read-message"){
		item.parentNode.className = "unread-message";
		for (var i in jsonData) {
			if (jsonData[i].id == id){
				item.innerHTML = jsonData[i].text.slice(0,jsonData[i].text.indexOf('</'))+'(...)';
			}
		}
	}
	
	
}
