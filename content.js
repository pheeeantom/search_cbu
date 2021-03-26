function preg_quote( str ) {
    return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, "\\$1");
}

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
            if (document.getElementById('search-plugin-pheeantom').value != '') {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].innerHTML = elementsCopy[i].replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red'>$1</span>");
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
        var boldLabel = document.createElement('label');
        boldLabel.style.display = 'inline-block';
        var boldImg = document.createElement('img');
        boldImg.src =  chrome.runtime.getURL('images/bold.png');
        boldImg.width = 25;
        var bold = document.createElement('input');
        bold.type = 'radio';
        bold.checked = true;
        bold.addEventListener('click', function(event) {
            if (set != 0) {
                for (var j = 0; j < elements.length; j++) {
                    elements[j].innerHTML = elementsCopy[j];
                }
                set = 0;
                document.getElementById('settings-plugin-pheeantom').children[1].children[0].checked = false;
                document.getElementById('settings-plugin-pheeantom').children[2].children[0].checked = false;
                elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontWeight >= 500);
                elements = Array.from(elements).filter(element => element.children.length == 0);
                elementsCopy = new Array(elements.length);
                for (var i = 0; i < elements.length; i++) {
                    elementsCopy[i] = elements[i].innerHTML;
                }
                if (document.getElementById('search-plugin-pheeantom').value != '') {
                    for (var k = 0; k < elements.length; k++) {
                        elements[k].innerHTML = elementsCopy[k].replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red'>$1</span>");
                    }
                }
                else {
                    for (var k = 0; k < elements.length; k++) {
                        elements[k].innerHTML = elementsCopy[k];
                    }
                }
            }
        });
        var cursiveLabel = document.createElement('label');
        cursiveLabel.style.display = 'inline-block';
        var cursiveImg = document.createElement('img');
        cursiveImg.src =  chrome.runtime.getURL('images/cursive.png');
        cursiveImg.width = 25;
        var cursive = document.createElement('input');
        cursive.type = 'radio';
        cursive.addEventListener('click', function(event) {
            if (set != 1) {
                for (var j = 0; j < elements.length; j++) {
                    elements[j].innerHTML = elementsCopy[j];
                }
                set = 1;
                document.getElementById('settings-plugin-pheeantom').children[0].children[0].checked = false;
                document.getElementById('settings-plugin-pheeantom').children[2].children[0].checked = false;
                elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontStyle == 'italic' || getComputedStyle(element).fontStyle == 'oblique');
                elements = Array.from(elements).filter(element => element.children.length == 0);
                elementsCopy = new Array(elements.length);
                for (var i = 0; i < elements.length; i++) {
                    elementsCopy[i] = elements[i].innerHTML;
                }
                if (document.getElementById('search-plugin-pheeantom').value != '') {
                    for (var k = 0; k < elements.length; k++) {
                        elements[k].innerHTML = elementsCopy[k].replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red'>$1</span>");
                    }
                }
                else {
                    for (var k = 0; k < elements.length; k++) {
                        elements[k].innerHTML = elementsCopy[k];
                    }
                }
            }
        });
        var headerLabel = document.createElement('label');
        headerLabel.style.display = 'inline-block';
        var headerImg = document.createElement('img');
        headerImg.src =  chrome.runtime.getURL('images/header.png');
        headerImg.width = 25;
        var header = document.createElement('input');
        header.type = 'radio';
        header.addEventListener('click', function(event) {
            if (set != 2) {
                for (var j = 0; j < elements.length; j++) {
                    elements[j].innerHTML = elementsCopy[j];
                }
                set = 2;
                document.getElementById('settings-plugin-pheeantom').children[0].children[0].checked = false;
                document.getElementById('settings-plugin-pheeantom').children[1].children[0].checked = false;
                elements = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
                elementsCopy = new Array(elements.length);
                for (var i = 0; i < elements.length; i++) {
                    elementsCopy[i] = elements[i].innerHTML;
                }
                if (document.getElementById('search-plugin-pheeantom').value != '') {
                    for (var k = 0; k < elements.length; k++) {
                        elements[k].innerHTML = elementsCopy[k].replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red'>$1</span>");
                    }
                }
                else {
                    for (var k = 0; k < elements.length; k++) {
                        elements[k].innerHTML = elementsCopy[k];
                    }
                }
            }
        });
        div.appendChild(boldLabel);
        boldLabel.appendChild(bold);
        boldLabel.appendChild(boldImg);
        div.appendChild(cursiveLabel);
        cursiveLabel.appendChild(cursive);
        cursiveLabel.appendChild(cursiveImg);
        document.body.appendChild(div);
        div.appendChild(headerLabel);
        headerLabel.appendChild(header);
        headerLabel.appendChild(headerImg);
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