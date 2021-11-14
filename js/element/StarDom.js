window.onload = function() {
    var STAT_NUM = 65;
    var stars = document.getElementById('stars'); //获取stars Box
    var star = document.getElementsByClassName('star'); //获取全部流星
    var mywidth = document.documentElement.clientWidth; //获取当前可视宽度
    var myheight = document.documentElement.clientHeight; //获取当前可视高度

    //初始化流星个数 和 left,top值
    for (let i = 0; i < STAT_NUM; i++) {
        let newStar = document.createElement('div');
        let starContent = document.createElement('div');
        newStar.className = "star"
        starContent.className = "starContent"
        newStar.style.top = randomNumber(myheight * .2, -myheight * .2) + 'px'
        newStar.style.left = randomNumber(mywidth * 1.3, -mywidth * 0.3) + 'px'
        newStar.appendChild(starContent)
        stars.appendChild(newStar)
    }

    //封装随机数函数
    function randomNumber(max, min) {
        let randomnum = Math.floor(Math.random() * (max - min + 1) + min)
        return randomnum
    }

    // 给流星添加动画延时
    for (let i = 0, len = star.length; i < len; i++) {
        const randomLen = randomNumber(55, 120);
        const width = Math.ceil(randomLen / 35);

        star[i].style.animationDelay = i % 6 == 0 ? '0s' : i * 0.8 + 's';
        if (star[i].children[0]) {
            star[i].children[0].style.borderWidth = `0px ${randomLen}px ${width}px ${randomLen + 45}px`;
            star[i].children[0].style.opacity = randomNumber(60, 95) / 10;
        }
    }
}