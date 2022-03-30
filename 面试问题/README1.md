CSS常用属性





div不换行的三种方法：

针对个别元素：可以使用 inline-block或者float来设置

针对元素内的div：使用 flex

-----------

&的用法：

  .star 					//最外层样式
    .star-item				//.star 下面的子类
    &.star-48				//这里是和 .star 同级的样式
    &.star-36				// &.star-36  ===   .star.star-36 （没有空格，表示同级，同时拥有这两种样式）
    &.star-24				// & .star-36 	=== .star .star-36（有空格，表示父子层级，但是一般不会这么写，在样式表里本来就可以通过缩进来表示层级，加上一个&空格，多此一举）


&. (&在前，表示当前父级)

-----------


当元素标签内部的标签都是行内元素的时候，会出现位置不对齐的现象：
这里又分为几种情况：

一、
在一行内  一个无内容的行内元素 与有文字 的行内元素在一起 通常会  有文字的会下沉 原因在于   对齐的基线不一样。
无内容的行内元素的底部  需与 有文字的文字底部 在一条水平线上所以出现下沉现象

解决方案：
1.我们可以在有文字 的一行  加上“vertical-align:top;”的属性；（哪边设置都可以）
2.在无文字的行内元素  加上 &nbsp 并设置相同的line-height；



二、
在行内元素存在padding和float的时候，这些行内元素会不对齐
（浮动的元素会和其它的元素顶部对齐--而这个时候因为存在padding值，所以文本的位置看起来不在同一水平线上）


解决：推荐使用绝对定位。





-----------


元素设置背景图片

background-image: url("./brand@2x.png");

一般来说这样就可以了，但如果元素是行内元素的话，还需要同时设置为行内块级元素，然后设置宽高
另外，还需要设置背景的大小 （一般和宽高一样）
还有背景的平铺方式为 no-repeat

最基本的代码为：

          .brand
            display: inline-block;
            height: 18px;
            width: 30px;
            background-size: 30px 18px;
            background-image: url("./brand@2x.png");
            background-repeat: no-repeat;



-----------

根据后台返回的数据来显示不同的样式（动态显示样式）

.icon
	vertical-align: top;
	display: inline-block;
	width: 12px;
	height: 12px;
	background-repeat: no-repeat;
	background-size: 12px 12px;
	&.decrease
	  bg-img('decrease_1');
	&.discount
	  bg-img('discount_1');
	&.guarantee
	  bg-img('guarantee_1');
	&.invoice
	  bg-img('invoice_1');
	&.special 						//这里要注意 &.special 这几个的作用
	  bg-img('special_1'); 			// &后面紧跟 .special，表示 .icon.special(同时拥有两个属性)
	  								// 不知道有没有空格的形式，比如  & .special
	  								//感觉这样 .icon .special（.icon的后代 .special）多此一举

------
<span class="icon" :class="classMap[seller.supports[0].type]"></span>

------
created () {
  this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
}



-----------



css实现文本内容超出区域后显示...


.bulletin-wrapper
      position: relative;
      height: 28px;					//height是元素的高度
      line-height: 28px;			//line-height是行高，一般用于文字
      padding: 0 22px 0 12px; 		//因为这里有背景颜色的填充，所以需要设置padding
      								//margin不会被背景颜色填充，所以不合适
      white-space: nowrap; 			//设置段落中的文本不进行换行
      overflow: hidden; 			//设置超出元素边框的内容不显示
      text-overflow: ellipsis;		//指定当文本溢出包含它的元素，显示省略符号来代表被修剪的文本


另外，父元素如果设置了font-size = 0 会导致 text-overflow 无效

实现 ... 的元素最好在元素内的最右边，如果右边还有元素的话，推荐使用绝对定位






