

加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted


更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated

销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

常用钩子简易版
父create->子created->子mounted->父mounted



补充单一组件钩子执行顺序
activated, deactivated 是组件keep-alive时独有的钩子

beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
activated
deactivated
beforeDestroy
destroyed
errorCaptured