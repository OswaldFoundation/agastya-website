const $element = $('input[type="range"]');
const $tooltip = $('#range-tooltip');
const sliderStates = [
  {name: "low", tooltip: "Great, we're confident we can complete your project within <strong>24 hours</strong> of launch.", range: _.range(10, 500) },
  {name: "med", tooltip: "Looks good! We can complete a project of this size within <strong>48 hours</strong> of launch.", range: _.range(500, 1000)},
  {name: "high", tooltip: "With a project of this size we'd like to talk with you before setting a completion timeline.", range: [5000] },
];
var currentState;
var $handle;

$element
  .rangeslider({
    polyfill: false,
    onInit: function() {
      $handle = $('.rangeslider__handle', this.$range);
      updateHandle($handle[0], this.value + "K");
      updateState($handle[0], this.value);
    }
  })
  .on('input', function() {
    var price;
    if(this.value <= 10) {
      price = "Free";
    } else if (this.value <= 500) {
      price = 49;
    } else if (this.value <= 1000) {
      price = 99;
    } else if (this.value < 5000) {
      price = Math.ceil(this.value/1000)*100;
      price = price - 1;
    } else {
      price = "<span class='smaller'>Custom</span>";
    }
    $("#priceQuote").html(price);
    if(this.value>=1000) {
      updateHandle($handle[0], Math.round((this.value/100))/10 + "M");
      $("#priceQuote").css({
        transform: 'scale(1.' + Math.round((this.value/100))/10 + ')',
      });
    } else {
    updateHandle($handle[0], this.value + "K"); }
    checkState($handle[0], this.value);
  });

// Update the value inside the slider handle
function updateHandle(el, val) {
  el.textContent = val;
}

// Check if the slider state has changed
function checkState(el, val) {
  // if the value does not fall in the range of the current state, update that shit.
  if (!_.contains(currentState.range, parseInt(val))) {
    updateState(el, val);
  }
}

// Change the state of the slider
function updateState(el, val) {
  for (var j = 0; j < sliderStates.length; j++){
    if (_.contains(sliderStates[j].range, parseInt(val))) {
      currentState = sliderStates[j];
      // updateSlider();
    }
  }
  // If the state is high, update the handle count to read 50+
 
  if (currentState.name == "high") {
    updateHandle($handle[0], "5M+");
  }
  // Update handle color
  $handle
    .removeClass (function (index, css) {
    return (css.match (/(^|\s)js-\S+/g) ||   []).join(' ');
  })
    .addClass("js-" + currentState.name);
  // Update tooltip
  $tooltip.html(currentState.tooltip);
}