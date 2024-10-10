$(function() {
    setNavStyle();

    // 给当前页面的导航父级加上高亮
    (function() {
        $('.nav li.item.active').parents('ul').each(function() {
            $(this).parent('li.item').addClass('active');
        })
    })()

    setNavSlide($('.nav .nav-items>li.item.active'));

    setLangNavPosition();

    // 导航单项
    $('.nav-items').find('.item').each(function() {
        // 单项存在下一级导航则添加展开按钮
        if ($(this).children('ul').length > 0) {
            $(this).children('a').append('<i class="iconfont icon-next"></i>');
        }
        // 导航只有一个子项时设置单独样式
        if ($(this).siblings().length === 0) {
            $(this).addClass('only');
        }
    });

    // 滚动监听
    $(window).scroll(function() {
        // var scrollHeight = $(window).scrollTop();
        // console.log(scrollHeight);

        if ($(window).width() >= 992) {
            setNavStyle();
        }
    });

    // 屏幕宽度变换监听
    $(window).resize(function() {
        var windowWidth = $(window).width();

        setLangNavPosition();
        if (windowWidth >= 992) {
            setNavSlide($('.nav .nav-items>li.item.active a'));
        }
    });

    // 鼠标经过一级导航，设置滑块
    $('.nav .nav-items>.item').hover(function() {
        setNavSlide($(this));
    }, function() {});
    // 鼠标移出导航，滑块回到当前页面
    $('.nav .nav-items').hover(function() {}, function() {
        setNavSlide($('.nav .nav-items>li.item.active'));
    });

    // 打开|关闭菜单
    $('.menu').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.nav .main-nav').toggleClass('active');
        $('.nav .main-nav').find('ul, .iconfont').removeClass('active');
        $('body').toggleClass('fix');
    });

    // 点击菜单下拉图标
    $('.nav .main-nav .nav-items .item a .iconfont').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        var opening = $(this).hasClass('active');
        if (opening) {
            $(this).parent().next('ul').addClass('active');
        } else {
            $(this).parent().next('ul').removeClass('active');
            $(this).parent().next('ul').find('ul.active, .iconfont.active').removeClass('active');
        }

        $(this).parent().parent().siblings().find('ul.active, .iconfont.active').removeClass('active');
    });

    // 设置语言栏位置，超出屏幕时显示在左边
    function setLangNavPosition() {
        var dom = $('.language .second-nav');
        var domRight = dom.parent().offset().left + dom.width();
        var windowWidth = $(window).width();
        var domOutScreen = domRight > windowWidth;
        // console.log('domOutScreen', domOutScreen);
        if (domOutScreen) {
            dom.addClass('on-left');
        } else {
            dom.removeClass('on-left');
        }
    }

    // 设置导航栏风格
    function setNavStyle() {
        var scrollHeight = $(window).scrollTop();
        if (scrollHeight > 0) {
            $('nav').addClass('active');
        } else {
            $('nav').removeClass('active');
        }
    }

    // 设置导航栏底部滑块
    function setNavSlide(jqDom) {
        if (jqDom.length > 0) {
            var slideLeft = jqDom.position().left + jqDom.css('margin-left').slice(0, -2) * 1;
            var slideWidth = jqDom.width();
            // console.log(slideLeft);
            $('.nav .nav-items .slide').addClass('active');
            $('.nav .nav-items .slide').css({
                'left': slideLeft,
                'width': slideWidth
            });
        }
    }
})