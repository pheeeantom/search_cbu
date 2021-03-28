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

function parseHTML(html) {
    var t = document.createElement('template');
    t.innerHTML = html;
    return t.content;
}

function createText(elements) {
    var nodes = new Array();
    for (var i = 0; i < elements.length; i++) {
        nodes = nodes.concat(getDescendants(elements[i]));
    }
    text = new Array();
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType == Node.TEXT_NODE){
            if (nodes[i].nodeValue.match(/^[ \t\v\r\n\f]*$/) === null) {
                text.push(nodes[i]);
            }
        }
    }
}

function createTextCopy() {
    textCopy = new Array(text.length);
    for (var i = 0; i < text.length; i++) {
        textCopy[i] = text[i].nodeValue;
    }
}

function bold() {
    var elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontWeight >= 500);
    createText(elements);
}

function cursive() {
    var elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontStyle == 'italic' || getComputedStyle(element).fontStyle == 'oblique');
    createText(elements);
}

function header() {
    var elements = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
    createText(elements);
}

function link() {
    var elements = Array.from(document.querySelectorAll('a'));
    createText(elements);
}

function add_setting(name, number, searchCallback, div) {
    var settingLabel = document.createElement('label');
    settingLabel.style.display = 'inline-block';
    settingLabel.style.marginBottom = '5px';
    settingLabel.style.boxSizing = 'border-box';
    settingLabel.style.height = '35.500px';
    settingLabel.className = 'label-plugin-pheeantom';
    var settingImg = document.createElement('img');
    settingImg.src =  chrome.runtime.getURL('images/' + name + '.png');
    settingImg.style.width = '25px';
    settingImg.style.boxSizing = 'border-box';
    settingImg.style.filter = 'none';
    settingImg.className = 'img-plugin-pheeantom';
    var setting = document.createElement('input');
    setting.type = 'radio';
    setting.style.boxSizing = 'border-box';
    setting.className = 'radio-plugin-pheeantom';
    if (number == 0)
        setting.checked = true;
    setting.addEventListener('click', function(event) {
        if (set != number) {
            for (var j = 0; j < text.length; j++) {
                text[j].nodeValue = textCopy[j];
            }
            set = number;
            for (var i = 0; i < number; i++) {
                document.getElementById('settings-plugin-pheeantom').children[i].children[0].checked = false;
            }
            for (var i = number + 1; i < NUM_OF_SETTINGS; i++) {
                document.getElementById('settings-plugin-pheeantom').children[i].children[0].checked = false;
            }
            searchCallback();
            createTextCopy();
            if (document.getElementById('search-plugin-pheeantom').value != '') {
                for (var k = 0; k < text.length; k++) {
                    var elems = parseHTML(text[k].nodeValue.replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red; display: inline; padding: 0; margin: 0'>$1</span>"));
                    text[k].replaceWith(elems);
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
var text;
var textCopy;
var set = 0;

var num = 1;

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
            //console.time('FirstWay');
            /*if (set == 0) {
                bold();
            }
            else if (set == 1) {
                cursive();
            }
            else if (set == 2) {
                header();
            }
            else if (set == 3) {
                link();
            }*/
            //console.log(text.length + " " + textCopy.length);
            for (var j = 0; j < text.length; j++) {
                text[j].nodeValue = textCopy[j];
            }
            //createTextCopy();
            /*for (var i = 0; i < text.length; i++) {
                console.log(text[i].nodeValue);
            }*/
            if (num == 1) {
                if (document.getElementById('search-plugin-pheeantom').value != '') {
                    for (var k = 0; k < text.length; k++) {
                        var elems = parseHTML(text[k].nodeValue.replace(new RegExp("(" + preg_quote(document.getElementById('search-plugin-pheeantom').value) + ")", 'gi'), "<span style='background-color: red; display: inline; padding: 0; margin: 0'>$1</span>"));
                        text[k].replaceWith(elems);
                    }
                }
            }
            num++;
            //num++; text[25].nodeValue = num.toString();
            //console.timeEnd('FirstWay');
        });
        inp.id = 'search-plugin-pheeantom';
        inp.style.position = 'fixed';
        inp.style.bottom = '5px';
        inp.style.left = '5px';
        inp.style.width = '300px';
        inp.style.height = '35px';
        inp.style.borderRadius = '5px';
        inp.placeholder = 'Search...';
        inp.style.zIndex = '20000';
        inp.autofocus = true;
        inp.style.margin = '0';
        inp.style.boxSizing = 'border-box';
        inp.autocomplete = 'off';
        inp.style.backgroundColor = 'white';
        document.body.appendChild(inp);
        var div = document.createElement('div');
        div.id = 'settings-plugin-pheeantom';
        div.style.position = 'fixed';
        div.style.bottom = '20px';
        div.style.left = '5px';
        div.style.zIndex = '10000';
        add_setting('bold', 0, bold, div);
        add_setting('cursive', 1, cursive, div);
        add_setting('header', 2, header, div);
        add_setting('link', 3, link, div);
        div.style.boxSizing = 'border-box';
        div.style.height = '49.300px';
        document.body.appendChild(div);
        var elements = Array.from(document.querySelectorAll('*')).filter(element => getComputedStyle(element).fontWeight >= 500);
        createText(elements);
        createTextCopy();
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