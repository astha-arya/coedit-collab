/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use strict';var h=require("react"),l=Object.create(null);if(h)for(var n in h)l[n]=h[n];l.default=h;function p(b,c){p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(g,a){g.__proto__=a;return g};return p(b,c)}function q(b,c){b.prototype=Object.create(c.prototype);b.prototype.constructor=b;p(b,c)}function u(b,c){void 0===b&&(b=[]);void 0===c&&(c=[]);return b.length!==c.length||b.some(function(g,a){return!Object.is(g,c[a])})}
var v={error:null},w=function(b){function c(){for(var a,d=arguments.length,f=Array(d),e=0;e<d;e++)f[e]=arguments[e];a=b.call.apply(b,[this].concat(f))||this;a.state=v;a.resetErrorBoundary=function(){for(var k,r=arguments.length,t=Array(r),m=0;m<r;m++)t[m]=arguments[m];null==a.props.onReset?void 0:(k=a.props).onReset.apply(k,t);a.reset()};return a}q(c,b);c.getDerivedStateFromError=function(a){return{error:a}};var g=c.prototype;g.reset=function(){this.setState(v)};g.componentDidCatch=function(a,d){var f,
e;null==(f=(e=this.props).onError)?void 0:f.call(e,a,d)};g.componentDidUpdate=function(a,d){var f=this.props.resetKeys;if(null!==this.state.error&&null!==d.error&&u(a.resetKeys,f)){var e,k;null==(e=(k=this.props).onResetKeysChange)?void 0:e.call(k,a.resetKeys,f);this.reset()}};g.render=function(){var a=this.state.error,d=this.props,f=d.fallbackRender,e=d.FallbackComponent;d=d.fallback;if(null!==a){a={error:a,resetErrorBoundary:this.resetErrorBoundary};if(l.isValidElement(d))return d;if("function"===
typeof f)return f(a);if(e)return l.createElement(e,a);throw Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");}return this.props.children};return c}(l.Component);module.exports=function({children:b,onError:c}){return l.createElement(w,{fallback:l.createElement("div",{style:{border:"1px solid #f00",color:"#f00",padding:"8px"}},"An error was thrown."),onError:c},b)}
