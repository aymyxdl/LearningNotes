# vue创建项目

有两种方式创建vue项目

1. vue init webpack 项目名称

2. vue create 项目名称


注意1：
这里注意，使用vue命令需要安装 vue-cli
但是使用命令 npm install -g vue-cli
安装的是2.x版本的vue-cli

而现在2021-4-8，基本上使用的都是 4.x版本的cli了
而4.x版本的安装需要新命令
npm install -g @vue-cli


注意2：
安装完了vue-cli，想要使用命令 [ vue init webpack 项目名称 ]，创建项目的话
还需要安装 init命令
npm i -g @vue/cli-init

安装完了才可以用 init 创建项目了



使用
[ vue create vue-less ] 命令创建项目
因为是4.x版本的vue-cli，这个时候已经可以创建 vue3.x的项目了
所以会让你进行选择是 2.x 还是 3.x



# 在vue项目中使用 less 
在 .vue 文件中的 style标签中使用 less 语法

<script lang="less" scoped>
.a {
  .b {
    .c {
      .d {
        display: flex
      }
    }
  }
}
</script>


注意1：
如果你直接使用，启动服务，控制台会报错，提示说没有安装less-loader

这里就需要安装less-loader

不过less-loader 需要依赖 less 
所以需要进行安装

npm install --save-dev less less-loader

但是这里有个问题，当前时间是 2021-4-8
安装的最新的 @vue-cli 是 4.5.12
然后 安装的vue项目中自带webpack，通过node_modules中的webpack文件夹
查看 package.json 文件会发现
vue 自带的webpack的版本是 
webpack 4.46.0   

而现在webpack的最新版本是
webpack 5.28.0   
webpack-cli 4.6.0


这里就会引发一个问题，上面安装的 less 和 less-loader命令
npm install --save-dev less less-loader

安装的都是最新版本的，
less  4.1.1
less-loader 是 8.0.0

这里less可以成功安装，但是less-loader会发生冲突
因为 8.x 的less-laoder的 配置是迎合 webpack5.x 的版本的
webpack4.x 会报错，所以需要降级为 7.0.1
但是 7.0.1的less-loader 又会和 4.1.1的 less起冲突
导致less也需要降级

所以最终安装的less为 3.5.0，less-loader 为 7.0.1
npm i -D less@3.5.0 less-loader@7.0.1
这个时候，就可以成功运行项目，使用less命令了



注意2：
我偶然发现，如果不装less，直接安装 less-loader
npm i -D less-loader@7.0.1

会在node_modules里面自带less（自动捎带上less依赖环境）
但是这个 less是从属于 less-loader的
（意味着package.json 中只有less-loader，而没有less）
另外，卸载 less-loader，less也会自动卸载
