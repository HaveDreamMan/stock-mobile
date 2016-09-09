!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("_"),require("jQuery")):"function"==typeof define&&define.amd?define(["_","jQuery"],e):"object"==typeof exports?exports.stock=e(require("_"),require("jQuery")):t.stock=e(t._,t.jQuery)}(this,function(t,e){return function(t){function e(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var i={};return e.m=t,e.c=i,e.p=".",e(0)}([/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r,a=i(/*! ./timeline */10),s=n(a),h=i(/*! ./kline */7),o=n(h),l=i(/*! ./http */6),u=n(l),d=i(/*! jquery */4),f=n(d),g=null,c=null,m=0,v=0,C=0,p=0,M=!1,P=!1,_=!0;e["default"]={init:function(t,e,i){return c=t,m=e,v=i,this.timeInit(),this},setCommodity:function(t){return r=t,this},timeInit:function(){M||(M=!0,s["default"].init(c,m,v,!0))},klineInit:function(){P||(P=!0,o["default"].init(c,m,v,!0))},setPeriod:function(t){t!==C&&(0!=t?(P&&o["default"].dispose(),o["default"].setPeriod(t)):M&&s["default"].dispose(),C=t)},touchStart:function(t){0===C?s["default"].showCrossHair(t):o["default"].showCrossHair(t)},touchMove:function(t){0===C?s["default"].showCrossHair(t):o["default"].showCrossHair(t)},touchEnd:function(){0===C?s["default"].hiddenCrossHair():o["default"].hiddenCrossHair()},zoomIn:function(){o["default"].hiddenCrossHair(),o["default"].setCandleCount(-10),o["default"].draw()},zoomOut:function(){o["default"].hiddenCrossHair(),o["default"].isAllowQuery(10)?_&&(_=!1,this.getKlineData().done(function(){_=!0,o["default"].setCandleCount(10),o["default"].draw()})):(o["default"].setCandleCount(10),o["default"].draw())},draw:function(){0===C?(this.timeInit(),this.getTimeData()):(this.klineInit(),this.getKlineData())},getTime:function(){var t=f["default"].Deferred();return g?t.resolve():u["default"].getTradeTime(function(t){var e=t.MMTS,i=e.REPH,n=e.REPB;0===i.RET&&(g=n.STAT,s["default"].setStartAndEndTime(n.STAT,n.ENDT),o["default"].setLastTime(n.ENDT))}).done(function(){t.resolve()}),t.promise()},setPanKouData:function(t,e,i){0===C?s["default"].drawDynamicData(t,e,i):o["default"].setDataFromPanKou(t)},getPanKou:function(){return u["default"].getPanKou({CID:r,DIVN:0,FIVN:0,HANN:p,PRIN:0},this.handlerPanKou.bind(this))},handlerPanKou:function(t){var e=t.MMTS,i=e.REPB;0==e.REPH.RET&&e.REPB.CID==r&&this.setPanKouData(i.DIVL,i.HIGP,i.LOWP)},getTimeData:function(){return u["default"].getTimeData({CID:r,PER:1,AST:-1,DIR:0,REQN:1440},this.handlerTimeData.bind(this))},handlerTimeData:function(t){var e=t.MMTS,i=e.REPH,n=e.REPB;if(0===i.RET){if(n.CID!==r)return;var a={h:+n.HIGP,l:+n.LOWP,c:+n.YCLO};s["default"].setTimeData(a,this._resolveTimeData(n.TDLI))}},_resolveTimeData:function(t){var e=[],i=null,n=null,r=null,a=null,s=null,h="",o="";if(t)for(var l=0,u=t.length;l<u;l++)if(n=t[l],n&&(r=n.TDAY,a=n.TDLL))for(var d=0,f=a.length;d<f;d++)if(s=a[d]){h=""+s.DIVT,3===h.length&&(h="0"+h);var o=""+r+h;i={time:o.formatTime(),price:s.LATP,avgPrice:s.AVGP,volume:s.NVOL,priceId:s.PRID},e.push(i)}return e},getKlineData:function(){return u["default"].getKLine({CID:r,PER:o["default"].getPeriod(),AST:o["default"].getStartTime(),DIR:0,REQN:60},this.handlerKline)},handlerKline:function(t){var e=t.MMTS,i=e.REPH,n=e.REPB;0===i.RET&&n.PER==o["default"].getPeriod()&&n.CID==r&&o["default"].setKlineData(n.TDLL)}}},/*!***************************!*\
  !*** ./src/commonUtil.js ***!
  \***************************/
function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=i(/*! ./constantsUtil */2),a=n(r);String.prototype.format=function(){var t=/\{(\d+)\}/g,e=arguments;return this.replace(t,function(t,i){return e[0|i]})},String.prototype.formatTime=function(){var t=+this.substr(0,4),e=+this.substr(4,2)-1,i=+this.substr(6,2),n=+this.substr(8,2),r=+this.substr(10,2);return new Date(t,e,i,n,r,0).getTime()},Date.prototype.format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"H+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in e)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[i]:("00"+e[i]).substr((""+e[i]).length)));return t},e["default"]={dayArr:["日","一","二","三","四","五","六"],sendRequest:function(t){return $.ajax({url:this.getQuotationUrl(),type:"POST",timeout:9e4,dataType:"json",data:JSON.stringify(t)}).fail(function(t,e,i){console.log(e)})},setQuotationSession:function(t){window.sessionStorage.setItem("sessionQId",t)},getQuotationSession:function(){return window.sessionStorage.getItem("sessionQId")},getQuotationUrl:function(){return"http://10.0.0.38:8080/collection_quotationqueryweb/jsonQuery.do"},getMarketId:function(){return"111"},getTimeString:function(t){var e=new Date(t);return e.toTimeString().substr(0,5)},getDateTime:function(t,e){var i=""+e,n=""+t,r=n+(3==i.length?"0"+i:i),a=+r.substr(0,4),s=+r.substr(4,2)-1,h=+r.substr(6,2),o=+r.substr(8,2),l=+r.substr(10,2);return new Date(a,s,h,o,l,0).getTime()},getDateString:function(t,e){var i,n=t.format("yyyy/MM/dd");if(e>=6)return n;var r=t.toTimeString();return i=this.dayArr[t.getDay()],n.substr(5)+" "+r.substr(0,5)},getTimeDiff:function(t,e){return(e-t)/1e3},getPriceColor:function(t){return t>0?a["default"].PRICE_UP_COLOR:t<0?a["default"].PRICE_DOWN_COLOR:a["default"].CLOSEPRICE_COLOR},getCandleColor:function(t){var e=null;return e=t<0?"rgb(84,255,255)":t>0?"rgb(255,50,50)":"rgb(84,255,255)"},timeEqual:function(t,e){var i=new Date(t),n=new Date(e);return i.getFullYear()===n.getFullYear()&&i.getMonth()==n.getMonth()&&i.getDate()==n.getDate()&&i.getHours()==n.getHours()&&i.getMinutes()==n.getMinutes()},dayEqual:function(t,e){return t.getFullYear()===e.getFullYear()&&t.getMonth()==e.getMonth()&&t.getDate()==e.getDate()},createLinearGradient:function(t){var e=document.createElementNS(a["default"].SVG_NS,"defs"),i=document.createElementNS(a["default"].SVG_NS,"linearGradient");i.setAttribute("id","lg"),i.setAttribute("x1","0"),i.setAttribute("x2","0"),i.setAttribute("y1","0"),i.setAttribute("y2","1");var n=document.createElementNS(a["default"].SVG_NS,"stop");return n.setAttribute("stop-color","#152746"),n.setAttribute("offset","0"),i.appendChild(n),n=document.createElementNS(a["default"].SVG_NS,"stop"),n.setAttribute("stop-color","#121213"),n.setAttribute("offset","1"),i.appendChild(n),e.appendChild(i),t.appendChild(e),e},createPath:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"path");return t.d&&i.setAttribute("d",t.d),t["stroke-width"]?i.setAttribute("stroke-width",t["stroke-width"]):i.setAttribute("stroke-width",1),t.strokeColor?i.setAttribute("stroke",t.strokeColor):i.setAttribute("stroke","none"),t.fillColor?i.setAttribute("fill",t.fillColor):i.setAttribute("fill","none"),t.dash&&i.setAttribute("stroke-dasharray",1.5),t.opacity&&i.setAttribute("opacity",t.opacity),e&&e.appendChild(i),i},createTextG:function(t){var e=document.createElementNS(a["default"].SVG_NS,"g");return t.appendChild(e),e},createRect:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"rect");return i.setAttribute("x",t.x),i.setAttribute("y",t.y),i.setAttribute("width",t.width),i.setAttribute("height",t.height),i.setAttribute("fill",t.fillColor),i.setAttribute("stroke",t.strokeColor),i.setAttribute("stroke-width",1),e&&e.appendChild(i),i},createText:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"text");i.setAttribute("x",t.x),i.setAttribute("y",t.y),i.setAttribute("text-anchor",t.hAlign),i.setAttribute("fill",t.textColor),t["font-size"]?(i.setAttribute("font-size",t["font-size"]),i.setAttribute("font-family",a["default"].FONT_FAMILY)):i.setAttribute("style","font-size:"+a["default"].FONT_SIZE+";font-family:"+a["default"].FONT_FAMILY);var n=document.createElementNS(a["default"].SVG_NS,"tspan");if(n.textContent=t.v,i.appendChild(n),e){e.appendChild(i);var r=i.getBBox();"middle"==t.vAlign?n.setAttribute("dy",t.y-(r.y+r.height/2)):"top"==t.vAlign?n.setAttribute("dy",t.y-r.y):"bottom"==t.vAlign&&n.setAttribute("dy",t.y-(r.y+r.height))}return i},createTextNoSpan:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"text");return i.setAttribute("x",t.x),i.setAttribute("y",t.y),i.setAttribute("dy",5),i.setAttribute("text-anchor",t["text-anchor"]),i.setAttribute("fill",t.fill),t["font-size"]?(i.setAttribute("font-size",t["font-size"]),i.setAttribute("font-family",a["default"].FONT_FAMILY)):i.setAttribute("style","font-size:"+a["default"].FONT_SIZE+";font-family:"+a["default"].FONT_FAMILY),e&&e.appendChild(i),i},createTSpan:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"tspan");return i.textContent=t.v,t.fill&&i.setAttribute("fill",t.fill),t.dx&&i.setAttribute("dx",t.dx),e&&e.appendChild(i),i},setTSpanValue:function(t,e){t.textContent=e},setTextAttr:function(t,e){for(var i in e)t.hasAttribute(i)&&t.setAttribute(i,e[i]);var n=t.getElementsByTagNameNS(a["default"].SVG_NS,"tspan");n.length&&(n[0].textContent=e.v)},setCommonAttr:function(t,e){for(var i in e)t.setAttribute(i,e[i])},createCommonG:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"g");return t&&this.setCommonAttr(i,t),e&&e.appendChild(i),i},createCommonPath:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"path");return t&&this.setCommonAttr(i,t),e&&e.appendChild(i),i},createCommonText:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"text");return t&&this.setCommonAttr(i,t),e&&e.appendChild(i),i},createCommonSpan:function(t,e){var i=document.createElementNS(a["default"].SVG_NS,"tspan");return t&&this.setCommonAttr(i,t),e&&e.appendChild(i),i}}},/*!******************************!*\
  !*** ./src/constantsUtil.js ***!
  \******************************/
function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={SVG_NS:"http://www.w3.org/2000/svg",LINE_COLOR:"#2E2E2E",MIDDLE_COLOR:"#272b2b",TIME_COM_COLOR:"#ffff80",TIME_AVGANDVOLUME_COLOR:"#f1c81d",TIME_LINE_COLOR:"#929bab",TIME_AVG_COLOR:"#e1b91b",TIME_VOLUME_UP:"#d70a1e",TIME_VOLUME_DOWN:"#3ac312",CROSS_LINE_COLOR:"#fff",CROSS_TXT_COLOR:"#fff",CROSS_TXT_FILLCOLOR:"#172b55",COMMODITY_COLOR:"rgb(0,255,255)",KLINE_CANDLE_DOWN:"#54ffff",KLINE_CANDLE_UP:"#ff5454",KLINE_CANDLE_AVG5:"#e6e6e6",KLINE_CANDLE_AVG10:"#f0f865",KLINE_CANDLE_AVG20:"#85486f",KLINE_CANDLE_AVG60:"#70cc9d",KLINE_INDEX_COLOR:"#fff",KLINE_INDEX_YELLOW:"#f0f888",KLINE_INDEX_BLUE:"#70cc9d",KLINE_INDEX_PURPLE:"#99486f",TXT_COLOR:"#999999",TXT_BLUE:"#00ffff",TXT_YELLOW:"#febd5b",PRICE_UP_COLOR:"#e83633",PRICE_DOWN_COLOR:"#6fb24f",CLOSEPRICE_COLOR:"#dedede",FONT_FAMILY:"SimSun",FONT_SIZE:"11px"}},/*!********************!*\
  !*** external "_" ***!
  \********************/
function(e,i){e.exports=t},/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
function(t,i){t.exports=e},/*!***********************!*\
  !*** ./src/base64.js ***!
  \***********************/
function(t,e){"use strict";function i(t){var e,i,n,a,s,h;for(n=t.length,i=0,e="";i<n;){if(a=255&t.charCodeAt(i++),i==n){e+=r.charAt(a>>2),e+=r.charAt((3&a)<<4),e+="==";break}if(s=t.charCodeAt(i++),i==n){e+=r.charAt(a>>2),e+=r.charAt((3&a)<<4|(240&s)>>4),e+=r.charAt((15&s)<<2),e+="=";break}h=t.charCodeAt(i++),e+=r.charAt(a>>2),e+=r.charAt((3&a)<<4|(240&s)>>4),e+=r.charAt((15&s)<<2|(192&h)>>6),e+=r.charAt(63&h)}return e}function n(t){var e,i,n,r,s,h,o;for(h=t.length,s=0,o="";s<h;){do e=a[255&t.charCodeAt(s++)];while(s<h&&e==-1);if(e==-1)break;do i=a[255&t.charCodeAt(s++)];while(s<h&&i==-1);if(i==-1)break;o+=String.fromCharCode(e<<2|(48&i)>>4);do n=255&t.charCodeAt(s++),61==n&&returnreturnVal,n=a[n];while(s<h&&n==-1);if(n==-1)break;o+=String.fromCharCode((15&i)<<4|(60&n)>>2);do r=255&t.charCodeAt(s++),61==r&&returnreturnVal,r=a[r];while(s<h&&r==-1);if(r==-1)break;o+=String.fromCharCode((3&n)<<6|r)}return o}Object.defineProperty(e,"__esModule",{value:!0});var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=new Array((-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),(-1),62,(-1),(-1),(-1),63,52,53,54,55,56,57,58,59,60,61,(-1),(-1),(-1),(-1),(-1),(-1),(-1),0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,(-1),(-1),(-1),(-1),(-1),(-1),26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,(-1),(-1),(-1),(-1),(-1));e["default"]={encode:i,decode:n}},/*!*********************!*\
  !*** ./src/http.js ***!
  \*********************/
function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=i(/*! ./base64 */5),a=(n(r),i(/*! jquery */4)),s=n(a),h=i(/*! ./commonUtil */1),o=n(h);e["default"]={_sendQuotationRequest:function(t,e,i){var n={};return n.MMTS={},n.MMTS.REQH={PID:t},n.MMTS.REQB={},s["default"].extend(n.MMTS.REQB,{MID:o["default"].getMarketId(),SMID:o["default"].getMarketId()},e),n.MMTS.REQH.SID=o["default"].getQuotationSession(),o["default"].sendRequest(n).done(i)},getTradeTime:function(t){return this._sendQuotationRequest("getTradeTime",null,t)},getTimeData:function(t,e){return this._sendQuotationRequest("getShortTimeLine",t,e)},getKLine:function(t,e){return this._sendQuotationRequest("getShortKLine",t,e)},getPanKou:function(t,e){return this._sendQuotationRequest("getPriceForCommodity",t,e)}}},/*!**********************!*\
  !*** ./src/kline.js ***!
  \**********************/
function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function r(t,e,i){this.period=6,this.svgMargin={left:1,right:50,top:1,bottom:20},this.kLineData=[],this.newData=[],this.minCandleCount=11,this.maxCandleCount=300}Object.defineProperty(e,"__esModule",{value:!0});var a=i(/*! ./commonUtil */1),s=n(a),h=i(/*! ./constantsUtil */2),o=n(h),l=i(/*! underscore */3),u=n(l),d=i(/*! ./klineCrossHair */8),f=n(d);r.prototype={getStartTime:function(){var t=this.kLineData.length&&this.kLineData[this.kLineData.length-1];if(t){var e=new Date(t.TIME-6e4*this.period);return this.period<6?e.format("yyyyMMddHHmm"):e.format("yyyyMMdd")}return-1},isAllowQuery:function(t){var e=this.candleCountInScreen+2*t;return e>this.kLineData.length&&e<=this.maxCandleCount},setCandleCount:function(t){var e=this.kLineData.length;if(e<this.minCandleCount)return void(this.candleCountInScreen=this.minCandleCount);if(t>0){if(0!==this.endIndex){var i=this.endIndex-t;i<=0?this.endIndex=0:this.endIndex-=t}var n=this.candleCountInScreen+2*t;n>this.maxCandleCount?this.candleCountInScreen=this.maxCandleCount:this.candleCountInScreen=n}else{var r=this.candleCountInScreen+2*t;r<this.minCandleCount?(this.endIndex=0,this.candleCountInScreen=this.minCandleCount):(this.endIndex>=Math.abs(t)?this.endIndex-=t:this.endIndex=0,this.candleCountInScreen=r)}},_getPreCandle:function(t){return t--,t<0?null:this.newData[t]},_getDataByMousePosition:function(t){var e=this.newData;this.candleWidth;if(e.length){var i=e.filter(function(e,i,n){return t>=e.sx&&t<=e.ex});if(i.length>0)return i[0]}return null},showCrossHair:function(t){var e=this._getDataByMousePosition(t);if(e){var i=this._getPreCandle(e.i);f["default"].show(e,i?i.closePrice:null)}},hiddenCrossHair:function(){f["default"].hidden()},resize:function(t,e){this.init(t,e,!0)},dispose:function(){f["default"].hidden(),this.newData.length=0,this.kLineData.length=0,this._initSetting()},_initSetting:function(){this.firstCandle=null,this.endIndex=0,this.candleCountInScreen=60,this.svgElement.innerHTML="",this.charts?this.svgElement.appendChild(this.charts):this.charts=s["default"].createCommonG({"class":"charts-main"},this.svgElement),f["default"].createCrossHair(this.svgElement,this.svgMargin,this.svgWidth,this.svgHeight)},setLastTime:function(t){this.endTime=t},setPeriod:function(t){this.period=t},getPeriod:function(){return this.period},setKlineData:function(t){if(u["default"].isArray(t)&&t.length>0){if(0===this.kLineData.length)this.kLineData=t.reverse();else for(var e=this.kLineData[this.kLineData.length-1],i=null,n=t.length-1;n>=0;n--)i=t[n],i.TIME<e.TIME&&this.kLineData.push(i);this.draw()}},_judgeTime:function(t,e){var i=new Date(t),n=new Date(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),0).getTime(),r=!1;switch(this.period){case 1:r=e-n<59e3;break;case 2:r=e-n<299e3;break;case 3:r=e-n<839e3;break;case 4:r=e-n<1799e3;break;case 5:r=e-n<3599e3;break;case 6:r=e<this.endTime;break;case 7:r=!0;break;case 8:r=!0;break;case 9:r=!0}return r},setDataFromPanKou:function(t){if(0!==this.kLineData.length&&u["default"].isArray(t)&&0!==t.length){var e=this.kLineData[0],i=0,n=null,r=0,a=t.filter(function(t,i,n){return t.IDX>e.PRID});if(i=a.length,i>0){for(r=0;r<i;r++)if(n=a[r],this._judgeTime(e.TIME,n.TIME))n.PRI>e.HIGP?e.HIGP=n.PRI:n.PRI<e.LOWP&&(e.LOWP=n.PRI),e.CLOP=n.PRI,e.PRID=n.IDX;else{var s={HIGP:n.PRI,LOWP:n.PRI,OPEP:n.PRI,CLOP:n.PRI,TIME:n.TIME,PRID:n.IDX};this.kLineData.unshift(s),e=this.kLineData[0]}this.draw()}}},init:function(t,e,i,n){this.svgElement=t,n&&e>0&&i>0&&(this.svgElement.setAttribute("width",e),this.svgElement.setAttribute("height",i),this.svgElement.setAttribute("viewBox","-0.5 -0.5 "+e+" "+i),this.svgWidth=this.svgElement.width.baseVal.value,this.svgHeight=this.svgElement.height.baseVal.value,this.drawWidth=this.svgWidth-this.svgMargin.right,this.drawHeight=this.svgHeight-this.svgMargin.top-this.svgMargin.bottom,this.timeAxisY=this.svgHeight-this.svgMargin.bottom/2,this._initSetting())},draw:function(){this.charts.innerHTML="",0!=this.kLineData.length&&this.drawKline()},drawKline:function(){this._getHighAndLowPrice(),this._drawHorizonAndVertical(),this._drawKlineHorizonAndText(),this._drawCandle(),this._drawTimeAxis()},_getHighAndLowPrice:function(){var t=this.endIndex,e=this.endIndex+this.candleCountInScreen-1,i=null,n=0,r=0,a=0;for(e;e>=t;e--)i=this.kLineData[e],i&&(0==r?(n=i.HIGP,a=i.LOWP):(i.HIGP>n&&(n=i.HIGP),i.LOWP<a&&(a=i.LOWP)),r++);this.highPrice=n,this.lowPrice=a,this.highPrice===this.lowPrice&&(this.lowPrice-=.01*this.highPrice)},_drawHorizonAndVertical:function(){var t=[];t.push("M{0},{1}L{0},{2}".format(this.svgMargin.left,this.svgMargin.top,this.svgHeight-this.svgMargin.bottom)),t.push("M{0},{1}L{2},{1}".format(this.svgMargin.left,this.svgMargin.top,this.svgWidth-this.svgMargin.right)),t.push("M{0},{1}L{0},{2}".format(this.svgWidth-this.svgMargin.right,this.svgMargin.top,this.svgHeight-this.svgMargin.bottom)),t.push("M{0},{1}L{2},{1}".format(this.svgMargin.left,this.svgHeight-this.svgMargin.bottom,this.svgWidth-this.svgMargin.right)),t.push("M{0},{1}L{2},{1}".format(this.svgMargin.left,this.svgMargin.top+this.drawHeight/2,this.svgWidth-this.svgMargin.right)),s["default"].createPath({d:t.join(""),strokeColor:o["default"].LINE_COLOR},this.charts)},_drawKlineHorizonAndText:function(){var t=this.svgWidth-this.svgMargin.right;s["default"].createText({v:this.highPrice.toFixed(2),x:t+5,y:this.svgMargin.top,textColor:o["default"].TXT_COLOR,hAlign:"start",vAlign:"top"},this.charts);var e=this.drawHeight/2,i=this.highPrice-this.lowPrice,n=i/this.drawHeight,r=(this.highPrice-e*n).toFixed(2);s["default"].createText({v:r,x:t+5,y:Math.round(this.svgMargin.top+e),textColor:o["default"].TXT_COLOR,hAlign:"start",vAlign:"middle"},this.charts),s["default"].createText({v:this.lowPrice.toFixed(2),x:t+5,y:this.svgMargin.top+this.drawHeight,textColor:o["default"].TXT_COLOR,hAlign:"start",vAlign:"middle"},this.charts)},_calcCandleColor:function(t,e,i){return t===e?0===i?o["default"].KLINE_CANDLE_UP:t>=i?o["default"].KLINE_CANDLE_UP:o["default"].KLINE_CANDLE_DOWN:t-e>0?o["default"].KLINE_CANDLE_UP:o["default"].KLINE_CANDLE_DOWN},_drawCandle:function(){this.newData.length=0,this.candleWidth=this.drawWidth/this.candleCountInScreen;var t=this.endIndex+this.candleCountInScreen-1,e=this.highPrice-this.lowPrice;this.priceHeight=0==e?0:this.drawHeight/e;for(var i=0,n=0,r=0,a=0,h=0,l=0,u=0,d=0,f=0,g=0,c="",m="none",a=Math.round(3*this.candleWidth/5),v=null;t>=this.endIndex;t--){var C=this.kLineData[t];if(C){n=Math.round(this.svgMargin.left+this.candleWidth*i+this.candleWidth/2),r=n-Math.floor(a/2),l=C.CLOP>C.OPEP?Math.round(this.svgMargin.top+(this.highPrice-C.CLOP)*this.priceHeight):Math.round(this.svgMargin.top+(this.highPrice-C.OPEP)*this.priceHeight),u=Math.round(this.svgMargin.top+(this.highPrice-C.HIGP)*this.priceHeight),d=Math.round(C.CLOP>C.OPEP?this.svgMargin.top+(this.highPrice-C.CLOP)*this.priceHeight:this.svgMargin.top+(this.highPrice-C.OPEP)*this.priceHeight),f=Math.round(C.CLOP>C.OPEP?this.svgMargin.top+(this.highPrice-C.OPEP)*this.priceHeight:this.svgMargin.top+(this.highPrice-C.CLOP)*this.priceHeight),g=Math.round(this.svgMargin.top+(this.highPrice-C.LOWP)*this.priceHeight),a=a%2==0?a:a-1,a=a<1?1:a,h=f-d<1?1:f-d;var p={x:n,ox:r,w:a,sx:this.svgMargin.left+this.candleWidth*i,ex:this.svgMargin.left+this.candleWidth*(i+1),y:C.CLOP>C.OPEP?d:f,i:i,index:t,highPrice:C.HIGP,lowPrice:C.LOWP,openPrice:C.OPEP,closePrice:C.CLOP,time:new Date(C.TIME),priceId:C.PRID};this.newData.push(p),v=this.kLineData[t+1],c=this._calcCandleColor(C.CLOP,C.OPEP,"undefined"==typeof v?0:v.CLOP),m=c===o["default"].KLINE_CANDLE_UP?"none":c,s["default"].createPath({d:"M{0},{1}L{0},{2}M{0},{3}L{0},{4}".format(n,u,d,f,g),strokeColor:c},this.charts),s["default"].createRect({x:r,y:l,width:a,height:h,fillColor:m,strokeColor:c},this.charts),i++}}this.firstCandle=this.newData[0],this.lastCandle=this.newData[this.newData.length-1]},_drawTimeAxis:function(){for(var t=this.newData,e=t.length,i=1,n=this.timeAxisY,r=t[0],a=r.time,h=r.x,l=s["default"].getDateString(r.time,6),u=null,d=[],f=s["default"].createText({v:l,x:h,y:n,textColor:o["default"].TXT_COLOR,hAlign:"start",vAlign:"middle"},this.charts),g=f.getBBox().width;i<e;i++)u=t[i],s["default"].dayEqual(a,u.time)||u.x-h>g&&(d.push("M{0},{1}L{0},{2}".format(u.x,this.svgHeight-this.svgMargin.bottom,this.svgHeight-this.svgMargin.bottom+5)),s["default"].createText({v:u.time.getDate(),x:u.x,y:n,textColor:o["default"].TXT_COLOR,hAlign:"start",vAlign:"middle"},this.charts),h=u.x,a=u.time);d.length>0&&s["default"].createPath({d:d.join(""),strokeColor:o["default"].LINE_COLOR},this.charts)}},e["default"]=new r},/*!*******************************!*\
  !*** ./src/klineCrossHair.js ***!
  \*******************************/
function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r,a,s,h=i(/*! ./commonUtil */1),o=n(h),l=i(/*! ./constantsUtil */2),u=n(l),d=o["default"].createCommonG({transform:"translate(0, -9999)","class":"charts-tooltip"}),f=o["default"].createCommonPath({stroke:u["default"].CROSS_LINE_COLOR,visibility:"hidden","stroke-width":1}),g=o["default"].createCommonPath({stroke:u["default"].CROSS_LINE_COLOR,visibility:"hidden","stroke-width":1}),c=o["default"].createCommonPath({stroke:"#7cb5ec","stroke-width":1},d),m=o["default"].createCommonText({style:"font-size:12px;color:#fff;fill:#fff;",x:8,y:5},d),v=o["default"].createCommonSpan({x:8,dy:13},m),C=o["default"].createCommonSpan({x:8,dy:13},m),p=o["default"].createCommonSpan({x:8,dy:13},m),M=o["default"].createCommonSpan({x:8,dy:13},m),P=o["default"].createCommonSpan({x:8,dy:13},m);e["default"]={createCrossHair:function(t,e,i,n){t.appendChild(g),t.appendChild(f),t.appendChild(d),r=e,s=i,a=n},hidden:function(){f.setAttribute("visibility","hidden"),g.setAttribute("visibility","hidden"),d.setAttribute("transform","translate(0, -9999)")},show:function(t,e){o["default"].setCommonAttr(f,{d:"M{0},{1}L{0},{2}".format(Math.round(t.x),r.top,a-r.bottom),visibility:"visible"}),o["default"].setCommonAttr(g,{d:"M{0},{1}L{2},{1}".format(r.left,Math.round(t.y),s-r.right),visibility:"visible"});var i=t.x,n=t.y,h=i-75,l=n-90;h<r.left&&(h=i+5),i+75>s-r.right&&(h=s-r.right-150),l<r.top&&(l=r.top),l+90>n&&(l=n+5),d.setAttribute("transform","translate({0}, {1})".format(Math.round(h),Math.round(l))),o["default"].setCommonAttr(c,{d:"M{0},{1}L{2},{3},L{4},{5}L{6},{7}Z".format(3,0,148,0,148,85,3,85)});var u=o["default"].getDateString(t.time);this.period>=6&&(u=u.slice(0,-5)),v.textContent="时间："+u,C.textContent="开盘价："+t.openPrice,o["default"].setCommonAttr(C,{fill:e&&o["default"].getPriceColor(t.openPrice-e)}),p.textContent="收盘价："+t.closePrice,o["default"].setCommonAttr(p,{fill:e&&o["default"].getPriceColor(t.closePrice-e)}),M.textContent="最高价："+t.highPrice,o["default"].setCommonAttr(M,{fill:e&&o["default"].getPriceColor(t.highPrice-e)}),P.textContent="最低价："+t.lowPrice,o["default"].setCommonAttr(P,{fill:e&&o["default"].getPriceColor(t.lowPrice-e)})}}},/*!******************************!*\
  !*** ./src/timeCrossHair.js ***!
  \******************************/
function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r,a,s=i(/*! ./commonUtil */1),h=n(s),o=i(/*! ./constantsUtil */2),l=n(o),u=h["default"].createCommonG({transform:"translate(0, -9999)","class":"charts-tooltip"}),d=h["default"].createCommonPath({stroke:l["default"].CROSS_LINE_COLOR,visibility:"hidden","stroke-width":1}),f=h["default"].createCommonPath({stroke:l["default"].CROSS_LINE_COLOR,visibility:"hidden","stroke-width":1}),g=h["default"].createCommonPath({stroke:"#7cb5ec","stroke-width":1},u),c=h["default"].createCommonText({style:"font-size:12px;",x:8,y:5},u),m=h["default"].createCommonSpan({fill:l["default"].CLOSEPRICE_COLOR,x:8,dy:13},c),v=h["default"].createCommonSpan({x:8,dy:13},c),C=h["default"].createCommonSpan({x:8,dy:13},c),p=null,M=0;e["default"]={createCrossHair:function(t,e,i,n){t.appendChild(f),t.appendChild(d),t.appendChild(u),p=e,a=i,r=n},setClosePrice:function(t){M=t},hidden:function(){d.setAttribute("visibility","hidden"),f.setAttribute("visibility","hidden"),u.setAttribute("transform","translate(0, -9999)")},show:function(t,e,i,n,s){h["default"].setCommonAttr(d,{d:"M{0},{1}L{0},{2}".format(Math.round(t),p.top,r-p.bottom),visibility:"visible"}),h["default"].setCommonAttr(f,{d:"M{0},{1}L{2},{1}".format(p.left,Math.round(e),a-p.right),visibility:"visible"});var o=t-50,l=e-60;o<p.left&&(o=t+5),t+50>a-p.right&&(o=a-p.right-100),l<p.top&&(l=p.top),l+60>e&&(l=e+5),u.setAttribute("transform","translate({0}, {1})".format(Math.round(o),Math.round(l))),h["default"].setCommonAttr(g,{d:"M{0},{1}L{2},{3},L{4},{5}L{6},{7}Z".format(3,0,98,0,98,55,3,55)}),m.textContent="时间："+i,v.textContent="价格："+n,h["default"].setCommonAttr(v,{fill:h["default"].getPriceColor(n-M)}),C.textContent="涨跌："+s,h["default"].setCommonAttr(C,{fill:h["default"].getPriceColor(n-M)})}}},/*!*************************!*\
  !*** ./src/timeline.js ***!
  \*************************/
function(t,e,i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function r(){this.svgElement=null,this.hcount=2,this.startTime=0,this.endTime=0,this.timeSpan=6,this.timeWidth=0,this.pk={},this.originalData=[],this.newData=[],this.svgMargin={top:1,left:45,right:35,bottom:15}}Object.defineProperty(e,"__esModule",{value:!0});var a=i(/*! ./commonUtil */1),s=n(a),h=i(/*! ./constantsUtil */2),o=n(h),l=i(/*! underscore */3),u=(n(l),i(/*! ./timeCrossHair */9)),d=n(u);r.prototype={_getTimeDataByMousePosition:function(t){var e=this.newData,i=this.timeWidth;if(e.length){var n=e.filter(function(e,n,r){return Math.abs(Math.floor(e.x-t))<=i});return n.length>0?n[0]:t<this.svgMargin.left?e[0]:e[e.length-1]}return null},showCrossHair:function(t){var e=this._getTimeDataByMousePosition(t);e&&d["default"].show(e.x,e.y,e.time,e.price,e.price-this.pk.c)},hiddenCrossHair:function(){d["default"].hidden()},dispose:function(){d["default"].hidden(),this._initMain(),this.originalData.length=0,this.newData.length=0,this.allowPkDraw=!1},init:function(t,e,i,n){n&&e>0&&i>0&&this._initSize(t,e,i)},_initSize:function(t,e,i){this.svgElement=t,this.svgElement.setAttribute("width",e),this.svgElement.setAttribute("height",i),this.svgElement.setAttribute("viewBox","-0.5 -0.5 "+e+" "+i),this.svgWidth=this.svgElement.width.baseVal.value,this.svgHeight=this.svgElement.height.baseVal.value,this.chartWidth=this.svgWidth-this.svgMargin.left-this.svgMargin.right,this.chartHeight=this.svgHeight-this.svgMargin.top-this.svgMargin.bottom,this._initMain()},_initMain:function(){this.svgElement.innerHTML="",this.charts?this.svgElement.appendChild(this.charts):this.charts=s["default"].createCommonG({"class":"charts-main"},this.svgElement),d["default"].createCrossHair(this.svgElement,this.svgMargin,this.svgWidth,this.svgHeight,this.pk.c),this.linePath=null},resize:function(t,e){this._clearCanvas(),this.init(t,e,!0),this.allowPkDraw=!1},setStartAndEndTime:function(t,e){this.startTime=t,this.endTime=e},_initData:function(t){this.originalData.length=0,this.originalData=t},setTimeData:function(t,e){this.pk=t,d["default"].setClosePrice(this.pk.c),this._initPriceDiff(),this._initData(e),this._draw()},_setPKData:function(t){var e=this.originalData.length;if(e>0)for(var i=this.originalData[e-1],n=t.length,r=null,a=0;a<n;a++)if(r=t[a],r&&r.IDX>i.priceId)if(new Date(i.time).getMinutes()!=new Date(r.TIME).getMinutes()){var s={time:r.TIME,price:r.PRI,avgPrice:0,volume:r.TVOL,priceId:r.IDX};this.originalData.push(s),i=s}else{var h=this.originalData[this.originalData.length-1];h.time=r.TIME,h.price=r.PRI,h.volume+=r.TVOL,h.priceId=r.IDX}},drawDynamicData:function(t,e,i){t&&0!==t.length&&(this._setPKData(t),(0===this.pk.h||e>this.pk.h)&&(this.pk.h=e),(0===this.pk.l||i<this.pk.l)&&(this.pk.l=i),this._initPriceDiff(),this.allowPkDraw&&this._draw())},_initPriceDiff:function(){if(0===this.pk.h&&0===this.pk.l)this.diffPrice=.02*this.pk.c;else{var t=this.pk.h-this.pk.c,e=this.pk.c-this.pk.l;this.diffPrice=t>e?t:e,0===this.diffPrice&&(this.diffPrice=.02*this.pk.c)}},_calc:function(){this.timeWidth=this.chartWidth/((this.endTime-this.startTime)/1e3-60),0==this.diffPrice?this.priceHight=0:this.priceHight=this.chartHeight/2/this.diffPrice},_draw:function(){if(!this.startTime)throw new Error("没有设置开始时间");this.svgWidth>0&&this.svgHeight>0&&(this.charts.innerHTML="",this._calc(),this._drawCommon(),this.originalData.length>0&&this._drawLine(),this.allowPkDraw=!0)},_drawCommon:function(){var t=[];t.push("M{0},{1}L{0},{2}".format(this.svgMargin.left,this.svgMargin.top,this.svgHeight-this.svgMargin.bottom)),t.push("M{0},{1}L{2},{1}".format(this.svgMargin.left,this.svgMargin.top,this.svgWidth-this.svgMargin.right)),t.push("M{0},{1}L{0},{2}".format(this.svgWidth-this.svgMargin.right,this.svgMargin.top,this.svgHeight-this.svgMargin.bottom)),t.push("M{0},{1}L{2},{1}".format(this.svgMargin.left,this.svgHeight-this.svgMargin.bottom,this.svgWidth-this.svgMargin.right)),s["default"].createPath({d:t.join(""),strokeColor:o["default"].LINE_COLOR},this.charts),this._drawHorizontal(),this._drawVertical(),this._drawTime(),this._drawPrice()},_drawHorizontal:function(){var t=[],e=Math.round(this.svgMargin.top+this.chartHeight/2);s["default"].createPath({d:"M{0},{1}L{2},{1}".format(this.svgMargin.left,e,this.svgWidth-this.svgMargin.right),"stroke-width":1,strokeColor:o["default"].MIDDLE_COLOR},this.charts);for(var i=this.chartHeight/2,n=i/this.hcount,r=this.svgWidth-this.svgMargin.right,a=0,h=0;a<this.hcount-1;a++)h=Math.round(this.svgMargin.top+i-(a+1)*n),t.push("M{0},{1}L{2},{1}".format(this.svgMargin.left,h,r));for(a=0;a<this.hcount-1;a++)h=Math.round(this.svgMargin.top+i+(a+1)*n),t.push("M{0},{1}L{2},{1}".format(this.svgMargin.left,h,r));s["default"].createPath({d:t.join(""),strokeColor:o["default"].LINE_COLOR},this.charts)},_drawPrice:function(){if(0!==this.pk.c){var t=Math.round(this.svgMargin.top+this.chartHeight/2);s["default"].createText({v:this.pk.c.toFixed(2),x:this.svgMargin.left-3,y:t,textColor:o["default"].CLOSEPRICE_COLOR,hAlign:"end",vAlign:"middle"},this.charts),s["default"].createText({v:"0.00%",x:this.svgMargin.left+this.chartWidth+3,y:t,textColor:o["default"].CLOSEPRICE_COLOR,hAlign:"start",vAlign:"middle"},this.charts),t=this.chartHeight/2;for(var e=t/this.hcount,i=this.diffPrice/this.hcount,n=0,r=0,a=0,h=null,l="middle";n<this.hcount;n++)r=Math.round(t+this.svgMargin.top-(n+1)*e),a=(this.pk.c+i*(n+1)).toFixed(2),h=(i*(n+1)/this.pk.c*100).toFixed(2)+"%",n==this.hcount-1&&(l="top"),s["default"].createText({v:a,x:this.svgMargin.left-3,y:r,textColor:o["default"].PRICE_UP_COLOR,hAlign:"end",vAlign:l},this.charts),s["default"].createText({v:h,x:this.svgMargin.left+this.chartWidth+3,y:r,textColor:o["default"].PRICE_UP_COLOR,hAlign:"start",vAlign:l},this.charts);for(n=0,l="middle";n<this.hcount;n++)r=Math.round(t+this.svgMargin.top+(n+1)*e),a=(this.pk.c-i*(n+1)).toFixed(2),h=(i*(n+1)/this.pk.c*100).toFixed(2)+"%",n==this.hcount-1&&(l="bottom"),s["default"].createText({v:a,x:this.svgMargin.left-3,y:r,textColor:o["default"].PRICE_DOWN_COLOR,hAlign:"end",vAlign:l},this.charts),s["default"].createText({v:h,x:this.svgMargin.left+this.chartWidth+3,y:r,textColor:o["default"].PRICE_DOWN_COLOR,hAlign:"start",vAlign:l},this.charts)}},_drawVertical:function(){for(var t=this.svgHeight-this.svgMargin.bottom,e=this.startTime+36e5*this.timeSpan,i=0,n=[];e<this.endTime;)i=Math.round(this.svgMargin.left+(e-this.startTime)/1e3*this.timeWidth),n.push("M{0},{1}L{2},{3}".format(i,this.svgMargin.top,i,t)),e+=36e5*this.timeSpan;s["default"].createPath({d:n.join(""),strokeColor:o["default"].LINE_COLOR,dash:!0},this.charts)},_drawTime:function(){var t=this.svgHeight-this.svgMargin.bottom,e=this.startTime+36e5*this.timeSpan,i=0;for(s["default"].createText({v:s["default"].getTimeString(this.startTime),x:this.svgMargin.left,y:t,textColor:o["default"].TXT_COLOR,hAlign:"start",vAlign:"top"},this.charts);e<this.endTime;)i=Math.round(this.svgMargin.left+(e-this.startTime)/1e3*this.timeWidth),s["default"].createText({v:s["default"].getTimeString(e),x:i,y:t,textColor:o["default"].TXT_COLOR,hAlign:"middle",vAlign:"top"},this.charts),e+=36e5*this.timeSpan;0===new Date(this.endTime).getMinutes()&&s["default"].createText({v:s["default"].getTimeString(this.endTime-6e4),x:this.svgMargin.left+this.chartWidth,y:t,textColor:o["default"].TXT_COLOR,hAlign:"middle",vAlign:"top"},this.charts)},_drawLine:function(){this.newData.length=0;var t,e,i,n=this.originalData.length,r=this.originalData[0],a=(this.svgMargin.top+this.chartHeight/2,this.pk.c,this.svgMargin.left),h=this.svgMargin.top+this.chartHeight/2+(this.pk.c-r.price)*this.priceHight;null==this.linePath&&(this.linePath=s["default"].createPath({strokeColor:o["default"].TIME_LINE_COLOR}));var l=[],u=1;l.push("M{0},{1}".format(a,Math.round(h))),this.newData.push({index:0,x:a,y:h,price:r.price,volume:r.volume,time:s["default"].getTimeString(r.time),millSeconds:r.time});for(var d=1;d<n;d++){t=this.originalData[d],e=this.svgMargin.left+s["default"].getTimeDiff(r.time,t.time)*this.timeWidth,i=this.svgMargin.top+this.chartHeight/2+(this.pk.c-t.price)*this.priceHight;var f={index:u,x:e,y:i,price:t.price,volume:t.volume,time:s["default"].getTimeString(t.time),millSeconds:t.time};this.newData.push(f),l.push("L{0},{1}".format(Math.round(e),Math.round(i))),u++}u>1&&this.linePath.setAttribute("d",l.join("")),this.charts.appendChild(this.linePath)}},e["default"]=new r}])});
//# sourceMappingURL=stock.js.map