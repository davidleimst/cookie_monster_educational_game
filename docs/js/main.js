var cookies
var record_time

function reset_cookies(){
    cookies = 3
    console.log('reset cookies')
}

function store_cookies(){
    localStorage.setItem('cookie_score',cookies);
    console.log('saved cookies')
}

function start_Timer(){
    localStorage.setItem('start_time',Date.now());
}

function grab_cookies(){
    cookies = localStorage.getItem('cookie_score')
    if (cookies < 1){
        window.location = 'game_lost.html'
    }
    console.log('loaded cookies')
}

function loose_cookie(){
    cookies = cookies-1
}

function load_cookies(){
    grab_cookies()
    for (let i = 0; i < cookies; i++){
        var img = document.createElement("img");
        img.src = "img/cookie.png";
        img.style.objectFit = "contain";
        img.style.transform = "rotate("+Math.floor(Math.random() * (4 - 1 + 1) + 1)*90+"deg)"
        img.style.padding = "0.2em";
        img.style.height = "100%";
        var block = document.getElementById("cookie_images");
        block.style.display = "inline";
        block.appendChild(img);
    }
}

function loose_cookie_animation(next_level_url){
    let animation = document.createElement("div");
    animation.setAttribute('id','animation');
    document.body.appendChild(animation);
    var cookie_img = document.createElement("img");
    cookie_img.setAttribute('id','animation_cookie');
    cookie_img.src = "img/cookie.png"
    var animation_div = document.getElementById("animation");
    animation_div.appendChild(cookie_img)
    setTimeout(() => {     
        loose_cookie();
        store_cookies(); 
        window.location = next_level_url }, 1300);
}

function remove(el) {
    var element = el;
    element.remove();
  }

function level_3_evaluation(){
    level_4_success = false
    var sliders = document.getElementsByClassName("slider_checked");
    for (var i = 0; i < sliders.length; i++) {
        if (sliders.item(i).checked == true){
            level_4_success = true
        }}
        if (level_4_success == true){
            loose_cookie_animation('level_3.html')
        } else if(level_4_success == false){
            store_cookies()
            window.location = 'level_4.html'
        }
    }


var timeout=170;
function escaping_button(button){
    setTimeout(function() {
        button.style.position = "fixed"
        x = Math.floor(Math.random() * 75)
        y = Math.floor(Math.random() * 75)
        button.style.top = +x+'%'
        button.style.left = y+'%'
    }, timeout );
    timeout += 20;
}

function highscore_time(ms) {
    var secs = ms / 1000;
    ms = Math.floor(ms % 1000);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    return minutes + ":" + secs + "." + ms;  
}


function return_gametime(){
    start_time = localStorage.getItem('start_time')
    time_log = Date.now() - start_time
    set_record(time_log)
    duration_string = highscore_time(time_log).toString()
    document.getElementById('duration').innerHTML = duration_string+" Minuten"
}

function set_record(new_time){
    var record = localStorage.getItem("record_time");
    if (record == null) {
        record_time = new_time;
        localStorage.setItem("record_time", new_time);
        duration_string = highscore_time(time_log).toString();
        document.getElementById('record').innerHTML = duration_string+" Minuten"}

     else if (new_time <= record) {
        record_time = new_time;
        localStorage.setItem("record_time", new_time);
        duration_string = highscore_time(time_log).toString();
        document.getElementById('record').innerHTML = duration_string+" Minuten"}

        else if (new_time > record) {
            record_time = record;
            localStorage.setItem("record_time", record_time);
            duration_string = highscore_time(record_time).toString();
            document.getElementById('record').innerHTML = duration_string+" Minuten"};
}

function randomize_blue_box(){
    var button_list = document.getElementsByTagName('button');
    var div_length=button_list.length;
    var random_div = button_list[Math.floor(Math.random() * (div_length - 1 + 1)) + 1]
    random_div.style.backgroundColor = "#0b97cb";
    random_div.onclick = function() {
        store_cookies();
        window.location = 'level_8.html';}
}


// Return to start page on keypress 'n' or 'N'
function keyListener(event) {
    if (event.defaultPrevented) {
        return;
    }
    var key = event.key || event.keyCode;
    if (key === 'n' ||key === 'N' ) {
        loose_cookie();
        store_cookies(); 
        window.location = 'index.html'
        }
}

document.addEventListener('keyup', keyListener);
