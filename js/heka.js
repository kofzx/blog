note_id = 0;
win_height = 0;
music_player = new Audio();
pop_up_note_mode = true;
text_prepared = false;
font_img = null;

function initViewport()
{
    if(/Android (\d+\.\d+)/.test(navigator.userAgent))
    {
        var version = parseFloat(RegExp.$1);

        if(version>2.3)
        {
            var phoneScale = parseInt(window.screen.width)/500;
            document.write('<meta name="viewport" content="width=500, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');

        }
        else
        {
            document.write('<meta name="viewport" content="width=500, target-densitydpi=device-dpi">');    
        }
    }
    else if(navigator.userAgent.indexOf('iPhone') != -1)
    {
        var phoneScale = parseInt(window.screen.width)/500;
        document.write('<meta name="viewport" content="width=500, height=750,initial-scale=' + phoneScale +', user-scalable=no" /> ');         //0.75   0.82
    }
    else 
    {
        document.write('<meta name="viewport" content="width=500, height=750,initial-scale=0.64" /> ');         //0.75   0.82

    }
    document.write('<style>@-webkit-keyframes rotatemusic {from {-webkit-transform: rotate(0deg);}to { -webkit-transform: rotate(360deg);}}::-webkit-input-placeholder {color: #000;}</style>');

    if(navigator.userAgent.match(/iPad/i)=="ipad" || navigator.userAgent.match(/iPhone/i)=="iPhone")
    {
        document.ontouchmove = function(e)
        {
            e.preventDefault();
        } 
    } 
}
// sdk
function add_keyframes(name, cssbody)
{
    csstext = '@-webkit-keyframes ' + name + '{' + cssbody + '}';
    style = document.createElement('style');
    document.head.appendChild(style);
    sheet = style.sheet;
    sheet.insertRule(csstext, 0);
}

function create_imgdiv(url, idname, visible, x, y)
{
    imgdiv = document.createElement('div');
}

function objid(idname)
{
    return document.getElementById(idname);
}

function _kv(value)
{
    if(typeof(value) == 'undefined')
    {
        return false;
    }
    if(value == '')
    {
        return false;
    }
    if(value.charAt(0) == '#')
    {
        return false;
    }
    return true;
}

function _v(keyname)
{
    if(typeof(kawa_data[keyname]) == 'undefined')
    {
        return '';
    }
    return kawa_data[keyname];
}
//滚动文字
function reset_text_height()
{
    var height = objid('textdiv').offsetHeight;
    objid('textdiv').style.height = height + 'px';
}

function kawa_init_async()
{
    read_base();
    create_textdiv();
    create_music();
    zk_create_modify();
}

function kawa_init()
{
    document.body.style.margin = '0px';
    create_base();
    setTimeout("kawa_init_async()", 100);

    if(in_qq_browser)
    {
        setTimeout("play_music()", 500);
    }
 }

function is_show_words()
{
    if(typeof(kawa_data.show_words) == 'undefined')
    {
        return true;
    }
    if(kawa_data.show_words != 'no')
    {
        return true;
    }
    return false;
}

function read_base()
{
    win_height = objid('basepoint').offsetTop;
}

function create_base()
{
    div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.bottom = '0px';
    div.style.width = '1px';
    div.style.height = '1px';
    div.style.left = '-100px';
    div.id = 'basepoint';
    document.body.appendChild(div);
}

function make_text_animation()
{
    var mask = objid('textmask');
    var textdiv = objid('textdiv');
    var namediv = objid('namediv');
    if(kawa_data.mode == 'up')
    {
        mask.style.webkitMaskImage = 'url(http://www.kxqq.net/images/shu.png)';
        mask.style.webkitMaskSize  = 'contain';
        mask.style.zIndex          = 10000;
        if(namediv == null)
        {
            var height = 0;
            if(font_img && textdiv.offsetHeight == 0)
            {
                height = font_img.height;
            }
            else
            {
                height = textdiv.offsetHeight;
            }
            var keycss = 'from{-webkit-transform:translate(0px, ' + mask.offsetHeight + 'px);}' +
                 'to{-webkit-transform:translate(0px, -' + height + 'px);}' 
            add_keyframes('textdivani', keycss);
            var dt = (mask.offsetHeight + height) / kawa_data.speed;
            textdiv.style.webkitAnimation = 'textdivani ' + dt + 's linear infinite';
        }
        else
        {
            var keycss = 'from{-webkit-transform:translate(0px, ' + mask.offsetHeight + 'px);}' +
                 'to{-webkit-transform:translate(0px, -' + (textdiv.offsetHeight + namediv.offsetHeight) + 'px);}' 
            add_keyframes('textdivani', keycss);
            var dt = (mask.offsetHeight + textdiv.offsetHeight + namediv.offsetHeight) / kawa_data.speed;
            textdiv.style.webkitAnimation = 'textdivani ' + dt + 's linear infinite';
            var keycss = 'from{-webkit-transform:translate(0px, ' + (mask.offsetHeight + textdiv.offsetHeight)  + 'px);}' +
                 'to{-webkit-transform:translate(0px, -' + namediv.offsetHeight + 'px);}' 

            add_keyframes('namedivani', keycss);
            namediv.style.webkitAnimation = 'namedivani ' + dt + 's linear infinite';
        }
    }
    else if(kawa_data.mode == 'left')
    {
        var keycss = 'from{-webkit-transform:translate(' + mask.offsetWidth + 'px, 0px);}' +
                 'to{-webkit-transform:translate(-' + textdiv.offsetWidth + 'px, 0px);}' 
        add_keyframes('textdivani', keycss);
        var dt = (mask.offsetWidth + textdiv.offsetWidth) / kawa_data.speed;
        textdiv.style.webkitAnimation = 'textdivani ' + dt + 's linear infinite';
        mask.style.webkitMaskImage = 'url(http://www.kxqq.net/images/bg6.png)';
        mask.style.webkitMaskSize  = 'contain';
        mask.style.zIndex          = 1;
    }
    else if (kawa_data.mode == 'print')
    {
        onPrint();
        setTimeout("onPrintAni()", 1500);
    }
    else if (kawa_data.mode == 'alldisplay')
    {
        objid('textdiv').style.top = '0px';
        var keycss = 'from{opacity:0;}' +
                 'to{opacity:1;}' 
        add_keyframes('textdivani', keycss);
        textdiv.style.webkitAnimation = 'textdivani '+kawa_data.speed+'s linear forwards';
        if(getQueryStr('shuming') != '')
        {
            textdiv.style.height = textdiv.offsetHeight - namediv.offsetHeight;
            namediv.style.top = textdiv.offsetHeight;
            namediv.style.webkitAnimation = 'textdivani '+kawa_data.speed+'s linear forwards';
        }

    }
    else if (kawa_data.mode == "ualizer")
    {
        objid('textdiv').innerHTML = '';
        objid('textdiv').style.height = '100%';
        objid('textdiv').style.width = '100%';
        var txt = $('#textdiv');
        var options = {
            duration: kawa_data.speed,          // 每段句子在页面中的停留时间(ms)
            rearrangeDuration: 1000, // 单词切换间隔时间(ms)
            effect: 'random'         // 显示的动画效果：random, fadeIn, slideLeft, slideTop
        }
        txt.textualizer(card_text(),options);
        txt.textualizer('start');
    }
}
function onPrint()
{
    objid('textdiv').style.top = objid('textmask').offsetHeight;
    gPrText          = card_text();
    gOrgCardText       = card_text();
}

function onPrintAni()
{
    pushText = '';
    var reachEnd = 0;
    if(gPrText.length <1)
    {
        reachEnd = 1;
    }
    var cutlen = 0;
    if(gPrText.length >= 4 && gPrText.substring(0, 4) == '<br>')
    {
        gPrText  = gPrText .substring(4);
        pushText = '<br>';
        cutlen = 4;
    }
    else if(gPrText.substring(0, 2) == '/:')
    {
        result = ConvFaceOnBegin(gPrText );
        cutlen = result[1];
        if(cutlen > 0)
        {
            gPrText  = gPrText .substring(cutlen);
            pushText = result[0];
        }
    }
    if(cutlen == 0 && gPrText.length >= 1)
    {
        pushText   = gPrText.substring(0, 1);
        gPrText  = gPrText.substring(1);
    }
    objid('textdiv').innerHTML = objid('textdiv').innerHTML + pushText;
    if((objid('textdiv').offsetTop + objid('textdiv').offsetHeight)> objid('textmask').offsetHeight)
    {
        trans = objid('textmask').offsetHeight - objid('textdiv').offsetHeight;
        objid('textdiv').style.top = trans+ 'px';
    }
    if(reachEnd == 1)
    {
        if(getQueryStr('shuming') != '')
        {
            nameText = unescape(getQueryStr('shuming'));
            setTimeout("printName()", gSpeed);
        }
        else
        {
            setTimeout("pauseShow()",2000);
        }
    }
    else
    {
        var gSpeed = kawa_data.speed;
        setTimeout("onPrintAni()", gSpeed);
    }
}

function pauseShow()
{
    reachEnd=0;
    trans = 0;
    objid('textdiv').style.top =objid('textmask').offsetHeight;
    gPrText              = gOrgCardText;
    objid('textdiv').innerHTML = "";
    if(getQueryStr('shuming')!='')
    {
        objid('namediv').innerHTML = '';
    }
    setTimeout("onPrintAni()",1000);
}
function show_textdiv()
{
        var box = kawa_data.text_box.split(' ');
        var mask = document.createElement('div');
        mask.id = 'textmask';
        mask.style.position = 'absolute';
        mask.style.left     = box[0] + 'px';
        mask.style.top      = box[1] + 'px';
        mask.style.width    = box[2] + 'px';
        mask.style.height   = box[3] + 'px';
        mask.style.overflow = 'hidden';
        var textdiv = document.createElement('div');
        textdiv.id = 'textdiv';
        textdiv.style.position = 'absolute';
        textdiv.style.color = kawa_data.text_color;
        textdiv.style.fontSize  = kawa_data.font_size;
        textdiv.style.lineHeight = kawa_data.line_height;
        textdiv.style.fontWeight = '600';       
        textdiv.style.fontFamily = 'Microsoft YaHei';
        textdiv.style.zIndex = 50000;
        if(_kv(kawa_data.text_align))
        {
            textdiv.style.textAlign = kawa_data.text_align;
        }

        if(_kv(kawa_data.font_weight))
        {
            textdiv.style.fontWeight = kawa_data.font_weight;
        }

        document.body.appendChild(mask);    
        mask.appendChild(textdiv);

        if(kawa_data.mode == 'left')
        {
            textdiv.style.float = 'left';
        }
        else if(getQueryStr('shuming') != '')
        {
            var namediv = document.createElement('div');
            namediv.id = 'namediv';
            namediv.style.position = 'absolute';
            namediv.style.color = kawa_data.text_color;
            namediv.style.fontSize  = kawa_data.font_size;
            namediv.style.float = 'center';
            namediv.style.right = '0px';
            namediv.style.lineHeight = kawa_data.line_height;
            namediv.style.fontWeight = '600';       
            namediv.style.fontFamily = 'Microsoft YaHei';

            namediv.style.zIndex = 50000;
            namediv.style.textAlign = 'center';

            if(_kv(kawa_data.font_weight))
            {
                namediv.style.fontWeight = kawa_data.font_weight;
            }

            mask.appendChild(namediv);
        }
        set_up_words();
        setTimeout("reset_text_height()", 500);

}

function create_textdiv()
{
    if(is_show_words())
    {
        show_textdiv();
    }
}

function set_up_words()
{
    if(_kv(kawa_data.font_family))
    {
        var text = pure_card_text();
        if(kawa_data.mode == 'up' || kawa_data.mode == 'static')
        {
            text = wrap_text(text);
        }
        if(kawa_data.mode == 'alldisplay')
        {
            text = wrap_text_cut(text);
            textdiv.style.height= textmask.style.height;
            textdiv.style.width= textmask.style.width;
        }
        var font_ip = 'aliyun7.kagirl.cn:8000';

        if(_kv(kawa_data.font_ip))
        {
            font_ip = kawa_data.font_ip;
        }
        var re_d = /^\d+/;
        var font_size = parseFloat(re_d.exec(kawa_data.font_size)[0]);
        var line_height = parseFloat(re_d.exec(kawa_data.line_height)[0]);
        var gap = line_height - font_size;

        var box = kawa_data.text_box.split(' ');

        var color = kawa_data.text_color.substring(1);
        if(getQueryStr('shuming') != '')
        {
            if(kawa_data.mode == 'left')
            {
                text = text + '一' + unescape(getQueryStr('shuming'));
            }
            else
            {
                var url2 = "http://" + font_ip + "/fontimg?words=" + encodeURIComponent(unescape(getQueryStr('shuming'))) + "&fontname=" + 
                kawa_data.font_family + "&fontsize=" + font_size + "&gap=" + gap + "&width=" + box[2] + 
                "&color=" + color;
                name_img = document.createElement('img');
                name_img.src = url2;
            }
        }
        var url = "http://" + font_ip + "/fontimg?words=" + encodeURIComponent(text) + "&fontname=" + 
                kawa_data.font_family + "&fontsize=" + font_size + "&gap=" + gap + "&width=" + box[2] + 
                "&color=" + color;
        font_img = document.createElement('img');
        font_img.src = url;
        imgLoad(font_img,on_font_img_load);
        setTimeout('on_check_font_img()', 1000);
    }
    else
    {
        textdiv = objid('textdiv');
        if (kawa_data.mode=='print')
            textdiv.innerHTML = '';
        else
            textdiv.innerHTML = card_text();
        if(getQueryStr('shuming') != '')
        {
            if(kawa_data.mode == 'left')
            {
                var words = textdiv.innerHTML;
                words = words.substring(0,words.length-7);
                words = words + '一' + unescape(getQueryStr('shuming')) + '</nobr>';
                textdiv.innerHTML = words ;
            }
            else
            {
                namediv = objid('namediv');
                if (kawa_data.mode=='print')
                    namediv.innerHTML = '';
                else
                    namediv.innerHTML = unescape(getQueryStr('shuming'));
            }
        }
        make_text_animation();
    }
}
function imgLoad(img, callback) {
            var timer = setInterval(function() {
                if (img.complete) {
                    callback(img)
                    clearInterval(timer)
                }
            }, 50)
        }
function on_font_img_load()
{
    if(!text_prepared)
    {
        text_prepared = true;
        var textdiv = objid('textdiv');
        textdiv.appendChild(font_img);
        var namediv = objid('namediv');
        if(namediv != null)
        {
            namediv.appendChild(name_img);
        }
        make_text_animation();
    }
}

function on_check_font_img()
{
    if(!text_prepared)
    {
        var textdiv = objid('textdiv');
        text_prepared = true;
        var fontSize = parseInt(textdiv.style.fontSize);
        var lineHeight = parseInt(textdiv.style.lineHeight);
        textdiv.style.fontSize = fontSize*2/3 + textdiv.style.fontSize.substring(textdiv.style.fontSize.length-2,textdiv.style.fontSize.length);
        textdiv.style.lineHeight = lineHeight*2/3 + textdiv.style.lineHeight.substring(textdiv.style.lineHeight.length-2,textdiv.style.lineHeight.length);
        textdiv.innerHTML = card_text();
        make_text_animation();
    }
}

function pure_card_text()
{
    text = kawa_data.words;
    if(kawa_data.replace_words != '#replace_words#')
    {
        text = kawa_data.replace_words;
    }
    return text;
}

function card_text()
{
    text = pure_card_text();
    if((kawa_data.mode == 'up')||(kawa_data.mode == 'print')||(kawa_data.mode =='alldisplay'))
    {
        text = wrap_text(text);
    }
    else if(kawa_data.mode == 'left')
    {
        text = '<nobr>' + text + '</nobr>';
    }
    else if(kawa_data.mode == 'ualizer')
    {
        text = text.split(/，|。|,|\.|\n|<br>|<br\/>|;|；|!|！|～|:|：|\?|？/g);

        if(text[text.length-1] == "")
        {
            text.pop();
        }
    }
    return text;
}

function wrap_text(in_text)
{
    text = in_text.replace(/,/g, ',<br>');
    text = text.replace(/，/g, '，<br>');
    text = text.replace(/\./g, '.<br>');
    text = text.replace(/。/g, '。<br>');
    text = text.replace(/;/g, ';<br>');
    text = text.replace(/；/g, '；<br>');
    text = text.replace(/!/g, '!<br>');
    text = text.replace(/！/g, '！<br>');
    text = text.replace(/～/g, '～<br>');
    text = text.replace(/：/g, '：<br>');
    text = text.replace(/:/g, ':<br>');    
    text = text.replace(/？/g, '：<br>');
    text = text.replace(/\?/g, ':<br>');
    return text;
}
function wrap_text_cut(in_text)
{
    var text = wrap_text(in_text);
    arr_word = new Array();
    arr_word=text.split('<br>');
    var row=0;
    hangshu=arr_word.length;
    console.log(hangshu);
    myarr=new Array();
    var box = kawa_data.text_box.split(' ');
    var bound = Math.floor(box[2]/parseInt(kawa_data.font_size));
    for(var i=0;i<hangshu;i++)
    {
        if(arr_word[i].length>bound)
        {
            for(var k=0;k<Math.ceil((arr_word[i].length)/bound);k++)
            {
                if(k==Math.floor(arr_word[i].length/bound))
                    myarr[row]=arr_word[i].substring(k*bound);
                else
                    myarr[row]=arr_word[i].substring(k*bound,(k+1)*bound);
                row++;
            }
        }
        else
        {
            myarr[row]=arr_word[i];
            row++;
        }
    }
    mywords="";
    mywords=myarr.join('<br>');
    return mywords;
}
//右上角音乐
var bplay = 0;              
function switchsound()
{
    au = music_player
    ai = objid('sound_image');
    if(au.paused)
    {
        bplay = 1;
        au.play();
        ai.src = "http://www.kxqq.net/images/music_note_big.png";		
		objid('sound_image').style.webkitAnimation = 'rotatemusic 4s infinite linear';
        pop_up_note_mode = true;
        objid("music_txt").innerHTML = "打开";
        objid("music_txt").style.visibility = "visible";
        setTimeout(function(){objid("music_txt").style.visibility="hidden"}, 2500);
    }
    else
    {
        bplay = 0;
        pop_up_note_mode = false;
        au.pause();
        ai.src = "http://www.kxqq.net/images/music_note_big.png";
        objid("music_txt").innerHTML = "关闭";
        objid("music_txt").style.visibility = "visible";
        setTimeout(function(){objid("music_txt").style.visibility="hidden"}, 2500);
    }
}

function play_music()
{
    if(typeof(kawa_data) != 'undefined')
    {
        music = kawa_data.music;
        if(kawa_data.replace_music != '#replace_music#')
        {
            music = kawa_data.replace_music;
        }
        music_player.src = music;
        music_player.loop = 'loop';
        music_player.play();
        bplay = 1;

    }
}

function create_music()
{
    play_music();
    sound_div = document.createElement("div");
    sound_div.setAttribute("ID", "cardsound");
    sound_div.style.cssText = "position:fixed;right:20px;top:25px;z-index:50000;visibility:visible;";
    sound_div.onclick = switchsound;
    bg_htm = "<img id='sound_image' src='http://www.kxqq.net/images/music_note_big.png'>";
    box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:0px;top:-80px'></div>";
    txt_htm = "<div id='music_txt' style='color:white;position:absolute;left:-40px;top:30px;width:60px'></div>"
    sound_div.innerHTML = bg_htm + box_htm + txt_htm;
    document.body.appendChild(sound_div);
	objid('sound_image').style.webkitAnimation = 'rotatemusic 4s infinite linear';
}   
function on_pop_note_end(event)
{
    note = event.target;
    if(note.parentNode == objid("note_box"))
    {
        objid("note_box").removeChild(note);
    }
}

function popup_note()
{
    box = objid("note_box");
    note = document.createElement("span");
    note.style.cssText = "visibility:visible;position:absolute;background-image:url('http://www.kxqq.net/images/music_note_small.png');width:15px;height:25px";
    note.style.left = Math.random() * 20 + 20;
    note.style.top = "75px";
    this_node = "music_note_" + note_id;
    note.setAttribute("ID", this_node);
    note_id += 1;
    scale = Math.random() * 0.4 + 0.4;
    note.style.webkitTransform = "rotate(" + Math.floor(360 * Math.random()) + "deg) scale(" + scale + "," + scale + ")";
    note.style.webkitTransition = "top 2s ease-in, opacity 2s ease-in, left 2s ease-in";
    note.addEventListener("webkitTransitionEnd", on_pop_note_end);
    box.appendChild(note);
    setTimeout("document.getElementById('" + this_node + "').style.left = '0px';", 100);
    setTimeout("document.getElementById('" + this_node + "').style.top = '0px';", 100);
    setTimeout("document.getElementById('" + this_node + "').style.opacity = '0';", 100);
    if(pop_up_note_mode)
    {
        setTimeout("popup_note()", 600);
    }   
}
//黑板写字
function create_modify()
{
    zk_create_modify();
}
function getQueryStr(str)
{   
    var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";   
}
function zk_create_modify()
{
    if(kawa_data.modify == 'yes' || kawa_data.replace_modify == 'yes')
    {
        var keycss = 'from{-webkit-transform:translateY(70px);}' +
                 'to{-webkit-transform:translateY(0px);}';
        add_keyframes('menu_up',keycss);
        var keycss = 'from{-webkit-transform:translateY(-' + (win_height-70) + 'px);}' +
                 'to{-webkit-transform:translateY(0px);}';
        add_keyframes('wind_down',keycss);
    }
}
