var treeRenderers = (function(module) {

  /**
   * Render a person.
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
   * @param {string}  [options.returnType=html] - Specify the return type as HTML or string.
   */
  module.renderPerson = function(person, options) {
    var person = person || {};
    var options = options || {};

    var personContainer = document.createElement('div');
    var personInfo = document.createElement('ul');
    var docFrag = document.createDocumentFragment();
    var icon, lifeSpan, el;

    personContainer.className = 'person-info-container';
    personInfo.className = 'person-info';

    // add the gender icon
    if (!options.hideIcon) {
      icon = 'fs-icon-' + (options.iconSize || 'medium') + '-' + (person.gender || 'unknown').toLowerCase();

      el = document.createElement('div');
      el.className = 'person-gender-icon ' + icon;
      personContainer.appendChild(el);
    }

    // add the person name
    if (person.name) {
      el = document.createElement('li');
      el.className = 'person-name';
      el.textContent = person.name;
      docFrag.appendChild(el);
    }

    // add the lifespan
    if (!options.hideLifeSpan && (person.fullLifeSpan || person.lifeSpan)) {
      if (options.lifeSpan === 'full' && person.fullLifeSpan) {
        lifeSpan = person.fullLifeSpan;
      }
      else {
        lifeSpan = person.lifeSpan;
      }

      el = document.createElement('li');
      el.className = 'person-lifeSpan';
      el.textContent = lifeSpan
      docFrag.appendChild(el);
    }

    // add the pid
    if (!options.hidePid && person.id) {
      el = document.createElement('li');
      el.className = 'person-id';
      el.textContent = person.id;
      docFrag.appendChild(el);
    }

    personInfo.appendChild(docFrag);
    personContainer.appendChild(personInfo);

    // return as string
    if (options.returnType === 'string') {
      el = document.createElement('div');
      el.appendChild(personContainer);
      return el.innerHTML;
    }

    // return as html
    return personContainer;
  };

  /**
   * Couple a person.
   * @requires renderCouple
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
   */
  module.renderCouple = function(person1, person2, options) {
    var coupleTop = this.renderPerson(person1, options);
    var coupleBottom = this.renderPerson(person2, options);

    coupleTop.className += ' couple-husband';
    coupleBottom.className += ' couple-wife';

    var el = document.createElement('div');
    el.appendChild(coupleTop);
    el.appendChild(coupleBottom);

    return el;
  };

  return module;
})(treeRenderers || {});