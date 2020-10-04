(function (window) {
    //创建对象
    const globalEventBus = {}
    //存储所有的数据的大容器
    let callbackContainer = {}
    /*
    {
        'add':[callback1,callback2],
        'delete':[callback1,callback2],
    }

    */
    //1. on(eventName,callback):绑定事件
    globalEventBus.on = function (msgName, callback) {
        //从大容器中读取指定的属性
       let callbacks =  callbackContainer[msgName]
       if (!callbacks){
           //小容器为数组类型，并挂载到大容器中
           callbacks = []
           callbackContainer[msgName] = callbacks
       }
       //将回调保存到小容器中
       callbacks.push(callback)
    }
    // 2. emit(eventName,data):分发一个指定的事件
    globalEventBus.emit = function (msgName, data) {
       let callbacks =  callbackContainer[msgName]
       if(callbacks){
           callbacks.forEach(callback =>{
               callback(data)
           })
       }

    }
    // 3. off (eventName):移除指定的事件
    globalEventBus.off = function (flag) {
        if(flag === undefined){
            //没有传参数，默认清除所有事件
            callbackContainer = {}
        }else{
            //传入的为事件名
            delete callbackContainer[flag]
        }
    }

    //将对象暴露出去
    window.globalEventBus = globalEventBus
})(window)