function updateHandle(t,e){t.textContent=e}function checkState(t,e){_.contains(currentState.range,parseInt(e))||updateState(t,e)}function updateState(t,e){for(var n=0;n<sliderStates.length;n++)_.contains(sliderStates[n].range,parseInt(e))&&(currentState=sliderStates[n]);"high"==currentState.name&&updateHandle($handle[0],"50+"),$handle.removeClass(function(t,e){return(e.match(/(^|\s)js-\S+/g)||[]).join(" ")}).addClass("js-"+currentState.name),$tooltip.html(currentState.tooltip)}const $element=$('input[type="range"]'),$tooltip=$("#range-tooltip"),sliderStates=[{name:"low",tooltip:"Great, we're confident we can complete your project within <strong>24 hours</strong> of launch.",range:_.range(5,26)},{name:"med",tooltip:"Looks good! We can complete a project of this size within <strong>48 hours</strong> of launch.",range:_.range(26,51)},{name:"high",tooltip:"With a project of this size we'd like to talk with you before setting a completion timeline.",range:[51]}];var currentState,$handle;$element.rangeslider({polyfill:!1,onInit:function(){$handle=$(".rangeslider__handle",this.$range),updateHandle($handle[0],this.value),updateState($handle[0],this.value)}}).on("input",function(){updateHandle($handle[0],this.value),checkState($handle[0],this.value)});