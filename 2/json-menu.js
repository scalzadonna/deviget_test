var timeout= 2000;
var closetimer= 0;
var menuItem= 0;
var menu = [
        {
			text    : 'Item1',
			click    : 'alert("item1");',
			submenu    : [
				{
					text    : 'sub element 1',
					click    : 'alert("sub-item1");'
				},
				{
					text    : 'sub element 2',
					click    : 'alert("sub-item2");'
				}
			]
		},
		{
			text    : 'Item2',
			click    : 'alert("item2");',
			submenu    : [
				{
					text    : 'sub element 1',
					click    : 'alert("sub-item1");'
				}
			]
		},
		{
			text    : 'Item3',
			click    : 'alert("item3");'
		}
	];

function prepareSubMenu(submenu){
	var sMenu = "<ul class='sub-menu'>";
	for(var i=0;i<submenu.length;i++){
		var it = submenu[i];
		sMenu += createMenuItem(it);
	}
	sMenu += "</ul>";
	return sMenu;
}

function createMenuItem(it){
	var menuItem = "";
	menuItem += "<li onclick='"+it.click+"' class='item'><a>"+it.text+"</a>";
	if(it.submenu) {
		menuItem += prepareSubMenu(it.submenu);
		console.log(it);
	}
	menuItem += "</li>";
	return menuItem;
}

function createMenu(){
	var z = menu;
	var menuContent = "";
	for(var i=0;i<menu.length;i++){
		if("text" in menu[i]){
			var it = menu[i];
			menuContent += createMenuItem(it);
		}
		else {
			menuContent += "<hr />";
		}
	}
	return menuContent;
}

function showMenu(event){
	var x = event.pageX;
	var y = event.pageY;
	var menuDiv = document.getElementById('menu-placeholder');
	var create = '<ul onmouseover="mopen()" onmouseout="mcloseTimer()" style="visibility:visible;position:absolute; left:'+x+'px;top:'+y+'px;display:block;" id="context-menu">';
		create += createMenu();
		create += "</ul>";
		console.log(create);
		menuDiv.innerHTML = create;
	
	return false;
}

function mopen(){	
	cancelClose();
	
	if(menuItem) menuItem.style.visibility = 'hidden';
	
	menuItem = document.getElementById('context-menu');;
	menuItem.style.visibility = 'visible';
}

function mclose(){
	if(menuItem) menuItem.style.visibility = 'hidden';
}

function mcloseTimer(){
	closetimer = window.setTimeout(mclose, timeout);
}

function cancelClose(){
	if(closetimer){
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}


