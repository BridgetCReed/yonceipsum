$(document).ready(function() {

  /**
  * Remove any existing selected states, and change a button's text color to
  grey if it was clicked
  * @param {string} selector - DOM element that triggers event
  */
  function addButtonSelectedState(selector) {
    $('.buttons li').removeClass('active');
    $('.buttons').removeClass('active');
    $(selector).addClass('active');

    $('img.gif01').removeClass('active');
    $('img.gif01').addClass('active');


    $('button.copy').removeClass('active');
    $('button.copy').addClass('active');
  }

  /**
  * Create a multi-dimensional array of random ipsum text. Length is determined
  * by the value of the paragraph & sentence params
  * @param {number} paragraphCount - number of paragraphs generated
  * @param {number} sentenceCount - number of sentences generated in each paragraph
  */
  function generateIpsum(paragraphCount, sentenceCount, sfw){
    var lyrics = 'lyrics.json';
    if (sfw == true) {
      lyrics = 'lyrics_sfw.json';
    }
    $.getJSON(lyrics,
      function(data) {
        var sentenceArr = _.shuffle(data);
        var firstSentences = [];
        var paragraphArr = [];

        for (var p=0; p < paragraphCount; p++) {
          firstSentences = _.first(sentenceArr, sentenceCount);
          paragraphArr.push(firstSentences);
          sentenceArr = _.rest(sentenceArr, sentenceCount);
        }

        return generateTemplate(paragraphArr);
    });
  }

  /**
  * Create and insert markup based on data from the ipsum array
  * @param {Array} ipsum - multi-dimensional array of paragraphs, sentences
  */
  function generateTemplate(ipsum) {
    var templateString = $('.template').html();
    var template = _.template(templateString)({ipsum: ipsum});
    $('.text').html(template);
  }

  /**
  * Attach an event listener that calls functions to change a button's
  * selected state & generate the text block
  * @param {string} selector - DOM element that triggers event
  * @param {number} paragraphCount - number of paragraphs generated
  * @param {number} sentenceCount - number of sentences generated in each paragraph
  */
  function toggleIpsum(selector, paragraphCount, sentenceCount) {
    $(selector).on('click', function() {
      addButtonSelectedState(selector)
      generateIpsum(paragraphCount, sentenceCount);
    })
  }

  toggleIpsum('.short', 1, 8, false);
  toggleIpsum('.medium', 3, 5, false);
  toggleIpsum('.long', 5, 5, false);
  toggleIpsum('.sfw', 5, 5, true);

});
