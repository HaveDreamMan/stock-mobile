import util from './commonUtil'

export default {
    getTimeData: function(handler) {
        return util.sendRequest("http://172.31.100.64/stock/time/605/1?marketType=0").done(handler);
    },
    getPanKou: function(nextId, handler) {
        return util.sendRequest("http://172.31.100.64/stock/pankou/605/1/" + nextId + "?marketType=0").done(handler);
    },
    getTradeTime: function() {
        return util.sendRequest("http://172.31.100.64/stock/tradetime/605?marketType=0");
    },
    getKLine: function(period,time,handler) {
        return util.sendRequest("http://172.31.100.64/stock/kline/605/1/"+period+"/60/"+time+"?marketType=0")
            .done(handler);
    }
}
