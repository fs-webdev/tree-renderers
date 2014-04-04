tree-renderers
==============

Set of shared renderers used by the tree team.

For an example of the output, see the [styleguide page](https://familysearch.org/tree/styleguide#person-information).

Setup
======

Add the assets you want to use to your ejs file that will use the renderer.

    // render a person
    assets.js.push('personRenderer.js');
    assets.css.push('tree-renderers.styl');

Person Renderer
===============================

Render a person's information.

Example Usage:
--------------

    var personObj = {
      name: "John Adam Doe",
      gender: 'MALE',
      lifeSpan: '1890-1900',
      fullLifeSpan: '12 December 1890 – 1 July 1900',
      id: 'SKJC-D23'
    };
    // renderPerson(container, person, options)
    treeRenderers.renderPerson($('#container'), personObj, {iconSize: 'small', lifeSpan: 'full'});

Parameters
----------

**container** The DOMELement, jQueryElement, or querySelector to append the person information to. If no container is passed, the function will return the HTML as a DOMElement.

**person** Person object to render. A person should container a name, id, gender, and lifespan. Any information that is not in the person object will not be displayed.

**options** Options on how the person should be rendered.

**options.iconSize** Size of the gender icon ('small', 'medium', 'large').

**options.hideIcon** Hide the gender icon.

**options.hideLifeSpan** Hide the person's lifeSpan.

**options.hidePid** Hide the person's id.

**options.lifeSpan** The version of the lifeSpan to displpay ('short', 'full').

**options.openPersonCard** Render the name as a link that opens the Person Card when clicked.

**options.nameWrapper** Wrap the name in a tag ('h1', 'h2', 'h3', 'h4', 'span', 'div').


Couple Renderer
===============================

Render a couple's information.

Example Usage:
--------------

    var personObj = {
      name: "John Adam Doe",
      gender: 'MALE',
      lifeSpan: '1890-1900',
      fullLifeSpan: '12 December 1890 – 1 July 1900',
      id: 'SKJC-D23'
    };
    // renderCouple(container, personTop, personBottom, options)
    treeRenderers.renderCouple($('#container'), personObj, personObj, {iconSize: 'small', lifeSpan: 'full'});

Parameters
----------

All paramenters are the same as the `renderPerson` function except that 2 person objects are passed. All options are applied to both persons.
