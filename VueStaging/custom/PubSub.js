
!(function (window) {
    //创建对象
    const PubSub = {}
    //保存所有消息订阅的容器
    /*
    结构为: {
        'add': {
            'uid_X':function(){},
            'uid_x':function(){}
        },
        'delete':{}
    }
    */
    let callBackContainer = {}
    let id = 0

    //PubSub.subscribe('MY TOPIC', mySubscriber):消息订阅,绑定监听
    PubSub.subscribe = function (msgName, callback) {
        //从保存所有回调的容器中读取该事件名对应的值-->对象
        let callbacks = callBackContainer[msgName]
        //如果没有
        if (!callbacks) {
            //创建一个，并挂到大容器上
            callbacks = {}
            callBackContainer[msgName] = callbacks
        }
        //将回调保存到小容器中
        const token = 'uid_' + (++id)
        callbacks[token] = callback
        //返回唯一标识token
        return token
    }

    //PubSub.publish('MY TOPIC', 'hello world!'):消息发布异步执行
    PubSub.publish = function (msgName, data) {
        //从大容器中读取保存对应事件的小容器
        const callbacks = callBackContainer[msgName]
        if (callbacks) {
            // Object.values：返回参数对象的所有value的数组，并遍历
            Object.values(callbacks).forEach(callback => {
                setTimeout(() => {
                    callback(msgName, data)
                })
            })
        }
    }

    //PubSub.publishSync('MY TOPIC', 'hello world!'):消息发布同步执行
    PubSub.publishSync = function (msgName, data) {
        //从大容器中读取保存对应事件的小容器
        const callbacks = callBackContainer[msgName]
        if (callbacks) {
            // Object.values：返回参数对象的所有value的数组，并遍历
            Object.values(callbacks).forEach(callback => {
                    callback(msgName, data)
            })
        }
    }

    //PubSub.unsubscribe(flag):删除指定token/事件名/的绑定
    PubSub.unsubscribe = function (flag) {
        //如果没有传递,清除所有的消息订阅
        if ( flag === undefined){
            callBackContainer = {}
            //如果flag为字符串且该字符串第一位为uid
        }else if ( typeof flag === 'string' && flag.indexOf('uid_') === 0){
            //遍历返回大容器中保存所有值的数组
            Object.values(callBackContainer).forEach(callbacks =>{
                //删除对象中指定的属性-->找不到也不保存
                delete callbacks[flag]
            })
        }else {
            //删除大容器中flag属性对应的小容器
            delete callBackContainer[flag]
        }
    }

    //将对象暴露出去
    window.PubSub = PubSub
})(window)