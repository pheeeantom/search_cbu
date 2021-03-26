function preg_quote( str ) {
    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}

function getDescendants(node, accum) {
    var i;
    accum = accum || [];
    for (i = 0; i < node.childNodes.length; i++) {
        accum.push(node.childNodes[i])
        getDescendants(node.childNodes[i], accum);
    }
    return accum;
}

function add_setting(name, number, searchCallback, div) {
    var settingLabel = document.createElement('label');
    settingLabel.style.display = 'inline-block';
    var settingImg = document.createElement('img');
    settingImg.src =  chrome.runtime.getURL('images/' + name + '.png');
    settingImg.width = 25;
    var setting = document.createElement('input');
    setting.type = 'radio';
    if (number == 0)
        setting.checked = true;
    setting.addEventListener('click', function(event) {
        if (set != number) {
            for (var j = 0; j < elements.length; j++) {
                elements[j].innerHTML = elementsCopy[j];
            }
            set = number;
            for (var i = 0; i < number; i++) {
                document.getElementById('settings-plugin-pheeantom').children[i].children[0].checked = false;
            }
            for (var i = number + 1; i < NUM_OF_SETTINGS; i++) {
                document.getElementById('settings-plugin-pheeantom').children[i].children[0].checked = false;
            }
            searchCallback();
            var nodes = new Array();
            for (var i = 0; i < elements.length; i++) {
                nodes = nodes.concat(getDescendants(elements[i]));
            }
            var text = new Array();
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeType == Node.TEXT_NODE){
                    text.push(nodes[i]);
                }
            }
            elementsCopy = new Array(elements.length);
            for (var i = 0; i < elements.length; i++) {
                elementsCopy[i] = elements[i].innerHTML;
            }
            if (document.getElementById('search-plugin-pheeantom').value != '') {
                for (var k = 0; k < text.length; k++) {
                    if (text[k].nodeValue.match(/^[ \n]*$/) === null) {
                        console.log(text[k].nodeValue);
                        text[k].nodeValue = text[k].nodeValue.replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red'>$1</span>");
                        var buf = text[k].parentNode.innerHTML.replace(new RegExp("&lt;span style='background-color: red'&gt;",'g'), "<span style='background-color: red'>");
                        buf = buf.replace(new RegExp("&lt;/span&gt;",'g'), "</span>");
                        text[k].parentNode.innerHTML = buf;
                    }
                }
            }
            else {
                for (var k = 0; k < elements.length; k++) {
                    elements[k].innerHTML = elementsCopy[k];
                }
            }
        }
    });
    div.appendChild(settingLabel);
    settingLabel.appendChild(setting);
    settingLabel.appendChild(settingImg);
}

var NUM_OF_SETTINGS = 4;
var key1 = false;
var key2 = false;
var key3 = false;
var search = false;
var elements;
var elementsCopy;
var set = 0;
document.addEventListener('keydown', function(event) {
    if (event.key == 'Alt')
        key1 = true;
    if (event.key == 'Shift')
        key2 = true;
    if (event.code == 'KeyF')
        key3 = true;
    if (key1 && key2 && key3 && !search) {
        search = true;
        var inp = document.createElement('input');
        inp.addEventListener('input', function(event) {
            console.time('FirstWay');
            for (var j = 0; j < elements.length; j++) {
                elements[j].innerHTML = elementsCopy[j];
            }
            var nodes = new Array();
            for (var i = 0; i < elements.length; i++) {
                nodes = nodes.concat(getDescendants(elements[i]));
            }
            var text = new Array();
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeType == Node.TEXT_NODE){
                    text.push(nodes[i]);
                }
            }
            if (document.getElementById('search-plugin-pheeantom').value != '') {
                for (var k = 0; k < text.length; k++) {
                    if (text[k].nodeValue.match(/^[ \n]*$/) === null) {
                        console.log(text[k].nodeValue);
                        text[k].nodeValue = text[k].nodeValue.replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red'>$1</span>");
                        var buf = text[k].parentNode.innerHTML.replace(new RegExp("&lt;span style='background-color: red'&gt;",'g'), "<span style='background-color: red'>");
                        buf = buf.replace(new RegExp("&lt;/span&gt;",'g'), "</span>");
                        text[k].parentNode.innerHTML = buf;
                    }
                }
            }
            else {
                for (var k = 0; k < elements.length; k++) {
                    elements[k].innerHTML = elementsCopy[k];
                }
            }
            console.timeEnd('FirstWay');
        });
        inp.id = 'search-plugin-pheeantom';
        inp.style.position = 'fixed';
        inp.style.bottom = '5px';
        inp.style.left = '5px';
        inp.style.width = '300px';
        inp.style.height = '35px';
        inp.style.borderRadius = '5px';
        inp.placeholder = 'Search...';
        inp.style.zIndex = '2000';
        inp.autofocus = true;
        document.body.appendChild(inp);
        var div = document.createElement('div');
        div.id = 'settings-plugin-pheeantom';
        div.style.position = 'fixed';
        div.style.bottom = '20px';
        div.style.left = '5px';
        div.style.zIndex = '1000';
        add_setting('bold', 0, function(){
            elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontWeight >= 500);
            elements = Array.from(elements).filter(element => element.children.length == 0);
        }, div);
        add_setting('cursive', 1, function(){
            elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontStyle == 'italic' || getComputedStyle(element).fontStyle == 'oblique');
            elements = Array.from(elements).filter(element => element.children.length == 0);
        }, div);
        add_setting('header', 2, function(){
            elements = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
        }, div);
        add_setting('link', 3, function(){
            elements = Array.from(document.querySelectorAll('a'));
        }, div);
        document.body.appendChild(div);
        elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontWeight >= 500);
        elements = Array.from(elements).filter(element => element.children.length == 0);
        elementsCopy = new Array(elements.length);
        for (var i = 0; i < elements.length; i++) {
            elementsCopy[i] = elements[i].innerHTML;
        }
    }
    if (event.key == 'Escape' && search) {
        document.getElementById('search-plugin-pheeantom').remove();
        document.getElementById('settings-plugin-pheeantom').remove();
        search = false;
    }
});
document.addEventListener('keyup', function(event) {
    if (event.key == 'Alt')
        key1 = false;
    if (event.key == 'Shift')
        key2 = false;
    if (event.code == 'KeyF')
        key3 = false;
});