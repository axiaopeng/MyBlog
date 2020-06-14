import "./css/index.css";

import "./js/jquery.lazyload.js"
$.get('https://www.apeng.work:8222/biji', res => {
    console.log(res)
    var main = document.querySelector('.note-main');
    var html = '';
    for (let i = 0; i < res.length; i++) {
        html += `
      <div class="col-sm-4 col-xs-6 note-main-item" data-index="${i}">
            <div class="note-img"><img class='lazy note-item-img' data-original="${"https://www.apeng.work:8222/"+res[i].imgs}" alt=""></div>
            <div class="note-item-title">${res[i].title}</div>
           
            <div class="note-item-footer">
                <a href="src/details.html?id=${res[i]._id}">+文章阅读</a>
                <span class="glyphicon glyphicon-thumbs-up"></span>
            </div>
        </div>
      `
    }
    main.innerHTML = html;


    // 图片懒加载
    $('img.lazy').lazyload({
        placeholder: 'img/grey.gif',

        effect: "fadeIn", // 载入使用何种效果
        // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
        threshold: 200,
    })
})

$(function() {




    $('.note-item-footer>a').on('click', function(e) {
        console.log($(this).parents('.note-main-item').attr('data-index'))
    })

    // 下拉搜索框的显示与隐藏
    $('#search').on('click', function() {
        $('.downfind').toggleClass('downfindshow');
    })

    var i = 1;
    setInterval(function() {
        if (i > 2) {
            i = 0;
        }
        $('.lb-main>img').eq(i).css('width', '100%').siblings().css('width', '0')
        i++;
        console.log('i')
    }, 2000)
})