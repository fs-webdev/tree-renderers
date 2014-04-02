var treeRenderers = (function(module) {

  /**
   * Render a person.
   * @param {[DOMElement, jQueryElement, querySelector]} container - Parent element to append the person information to.
   *
   * @type {object} person - Person to render.
   * @param {string} [person.name]
   * @param {string} [person.gender]
   * @param {string} [person.lifeSpan]
   * @param {string} [person.fullLifeSpan]
   * @param {string} [person.id]
   *
   * @type {object} options - How to display the person information.
   * @param {string}  [options.iconSize=medium] - Size of the gender icon (small,medium,large).
   * @param {boolean} [options.hideLifeSpan=false] - Hide the lifespan.
   * @param {string}  [options.lifeSpan=short] - Show the short or the full lifeSpan.
   * @param {boolean} [options.hidePid=false] - Hide the person id.
   * @param {boolean} [options.openPersonCard=false] - Add a link to open the person card when the name is clicked.
   *
   * @returns {DOMElement} Returns the HTML if no container element is passed, otherwise returns nothing.
   */
  module.renderPerson = function(container, person, options) {
    var person = person || {};
    var options = options || {};

    var $personContainer = $('<div class="person-info-container"></div>');
    var $personInfo = $('<ul class="person-info"></ul>');
    var icon, gender, lifeSpan, $el, $link;

    // create the gender div
    $el = $('<div class="person-gender-icon"></div>');

    // only create the person if the object exists
    if (person && Object.keys(person).length > 0) {
      // add the gender icon
      if (!options.hideIcon) {
        icon = 'fs-icon-' + (options.iconSize || 'medium') + '-' + (person.gender || 'unknown').toLowerCase();
        $el.addClass(icon);
      }
      $personContainer.append($el);

      // add the person name
      if (person.name) {
        $el = $('<li class="person-name"></li>');

        // create the link to open the person card
        if (options.openPersonCard) {
          $link = $('<a href="javascript:void(0);" data-cmd="openPersonCard">' + person.name + '</a>');
        }
        else {
          $el.html(person.name);
        }
        $personInfo.append($el);
      }

      // add the lifespan
      if (!options.hideLifeSpan && (person.fullLifeSpan || person.lifeSpan)) {
        if (options.lifeSpan === 'full' && person.fullLifeSpan) {
          lifeSpan = person.fullLifeSpan;
        }
        else {
          lifeSpan = person.lifeSpan;
        }

        $el = $('<li class="person-lifeSpan">' + lifeSpan + '</li>');
        $personInfo.append($el);
      }

      // add the pid
      if (!options.hidePid && person.id) {
        $el = $('<li class="person-id">' + person.id + '</li>');
        $personInfo.append($el);
      }

     $personContainer.append($personInfo);
    }
    // just add the gender div
    else {
      $personContainer.append($el);
    }

    // container not null
    if ((container = $(container)).length) {
      container.append($personContainer);
    }
    else {
      return $personContainer[0];
    }
  };

  /**
   * Couple a person.
   * @requires renderCouple
   * @param {[DOMElement, jQueryElement, querySelector]} container - Parent element to append the person information to.
   *
   * @type {object} person1 - Top couple person to render.
   * @param {string} [person.name]
   * @param {string} [person.gender]
   * @param {string} [person.lifeSpan]
   * @param {string} [person.fullLifeSpan]
   * @param {string} [person.id]
   *
   * @type {object} person2 - Bottom couple person to render.
   * @param {string} [person.name]
   * @param {string} [person.gender]
   * @param {string} [person.lifeSpan]
   * @param {string} [person.fullLifeSpan]
   * @param {string} [person.id]
   *
   * @type {object} options - How to display the person information.
   * @param {string}  [options.iconSize=medium] - Size of the gender icon (small,medium,large).
   * @param {boolean} [options.hideLifeSpan=false] - Hide the lifespan.
   * @param {string}  [options.lifeSpan=short] - Show the short or the full lifeSpan.
   * @param {boolean} [options.hidePid=false] - Hide the person id.
   * @param {string}  [options.returnType=html] - Specify the return type as HTML or string.
   *
   * @returns {DOMElement} Returns the HTML if no container element is passed, otherwise returns nothing.
   */
  module.renderCouple = function(container, person1, person2, options) {
    var coupleTop = this.renderPerson(null, person1, options);
    var coupleBottom = this.renderPerson(null, person2, options);

    coupleTop.className += ' couple-husband';
    coupleBottom.className += ' couple-wife';

    // container not null
    if ((container = $(container)).length) {
      container.append(coupleTop);
      container.append(coupleBottom)
    }
    else {
      var el = document.createElement('div');
      el.appendChild(coupleTop);
      el.appendChild(coupleBottom);

      return el;
    }
  };

  return module;
})(treeRenderers || {});