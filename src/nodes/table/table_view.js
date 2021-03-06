"use strict";

var CompositeView = require("../composite").View;
var $$ = require("lens/substance/application").$$;

/**
 * ============
 * 
 * ============
 */

var TableView = function (node, viewFactory) {
    CompositeView.call(this, node, viewFactory);
};

TableView.Prototype = function () {

    /**
     * ============
     * 
     * ============
     */

    // this.render = function () {

    //     this.content = $$('.table-wrapper',{
    //         html: this.node.properties.description
    //     });

    //     this.el.appendChild(this.content);
    //     return this;
    // };

    this.render = function () {

        this.content = $$('.table-wrapper');
        this.child = $$('table');

        this.renderChildren();

        this.content.appendChild(this.child)

        this.el.appendChild(this.content)
        return this;
    };

    this.renderChildren = function () {
        var children = this.node.getChildrenIds();

        // ----------------------------
        //  for each child of table-wrap,
        // create its view and append it
        // ----------------------------

        for (var i = 0; i < children.length; i++) {
            var childView = this.createChildView(children[i]);
            var childViewEl = childView.render().el;
            this.child.appendChild(childViewEl.childNodes[0]);
        }
    };

    this.createChildView = function (nodeId) {
        var view = this.createView(nodeId);
        this.childrenViews.push(view);
        return view;
    };

};

TableView.Prototype.prototype = CompositeView.prototype;
TableView.prototype = new TableView.Prototype();

module.exports = TableView;
