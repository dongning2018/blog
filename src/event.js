import MicroEvent from 'microevent'

MicroEvent.prototype.on = MicroEvent.prototype.bind

/* 每次off若不带第二个参数则去掉该事件最后一个绑定的事件，不会将该事件的回调全去除，详见测试 */
MicroEvent.prototype.off = MicroEvent.prototype.unbind

MicroEvent.prototype.emit = MicroEvent.prototype.trigger

export default MicroEvent
