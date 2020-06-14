function lb(el, length, lef, righ) {
    let ul = el;
    let timer = '';
    let left = lef || document.createElement('div');
    let right = righ || document.createElement('div')
        // animate函数
    function animate(dom, length) {

        let timers = '';
        let target = dom.offsetLeft + length
        clearInterval(timers)
        timers = setInterval(function() {
            let step = (target - dom.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (dom.offsetLeft == target) {
                clearInterval(timers);
                anishow = false;
                return;
            }
            dom.style.left = dom.offsetLeft + step + 'px'

        }, 20);
    }


    // 轮播图运行函数
    function lbt() {
        clearInterval(timer);
        timer = setInterval(function() {
            if (ul.offsetLeft == -ul.offsetWidth + length) {
                ul.style.left = 0;
            }
            // ul.style.left = ul.offsetLeft - length + 'px'
            animate(ul, -length);
        }, 3000)
    }
    // 页面开始轮播图开始运行
    lbt();

    // 当鼠标放上去停止轮播图
    ul.addEventListener('mouseover', function() {
        clearInterval(timer);
    })
    left.addEventListener('mouseover', function() {
        clearInterval(timer);
        left.addEventListener('click', function() {
            if (ul.offsetLeft == 0) {
                ul.style.left = -ul.offsetWidth + length + 'px';
            }
            if (anishow == false) {
                anishow = true;
                animate(ul, length);
            }
        })

        left.addEventListener('mouseleave', function() {
            lbt()
        })


    })
    right.addEventListener('mouseover', function() {
        clearInterval(timer);
        right.addEventListener('click', function() {
            if (ul.offsetLeft == -ul.offsetWidth + length) {
                ul.style.left = 0;
            }
            if (anishow == false) {
                anishow = true;
                animate(ul, -length);
            }
        })
        right.addEventListener('mouseleave', function() {
            lbt()
        })
    })


    // 当鼠标移出师轮播图继续运行
    ul.addEventListener('mouseleave', function() {
        lbt()
    })





}