/*
 * jQuery UI Menu 1.8.16 (not officially released)
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menu
 *
 * Depends:
 *	jquery.ui.core.js
 */
('menu' in jQuery.fn) ||
(function($){
    $.widget("ui.menu", {
        _create: function(){
            var self = this;
            this.element.addClass("ui-menu").attr({
                role: "listbox"
            }).click(function(event){
                if (!$(event.target).closest(".ui-menu-item").length) {
                    return;
                }
                // temporary
                event.preventDefault();
                self.select(event);
            });
            this.refresh();
        },
        
        refresh: function(){
            var self = this;
            
            // don't refresh list items that are already adapted
            var items = this.element.children("li:not(.ui-menu-item)").addClass("ui-menu-item").attr("role", "menuitem");
            
            items            // mouseenter doesn't work with event delegation
            .mouseenter(function(event){
                self.activate(event, $(this));
            }).mouseleave(function(){
                self.deactivate();
            });
        },
        
        activate: function(event, item){
            this.deactivate();
            if (this.hasScroll()) {
                var offset = item.offset().top - this.element.offset().top, scroll = this.element.scrollTop(), elementHeight = this.element.height();
                if (offset < 0) {
                    this.element.scrollTop(scroll + offset);
                }
                else if (offset >= elementHeight) {
                    this.element.scrollTop(scroll + offset - elementHeight + item.height());
                }
            }
            this.active = item.addClass("ui-state-hover");
            this._trigger("focus", event, {
                item: item
            });
        },
        
        deactivate: function(){
            if (!this.active) {
                return;
            }
            
            this.active.removeClass("ui-state-hover");
            this._trigger("blur");
            this.active = null;
        },
        
        next: function(event){
            this.move("next", ".ui-menu-item:first", event);
        },
        
        previous: function(event){
            this.move("prev", ".ui-menu-item:last", event);
        },
        
        first: function(){
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        
        last: function(){
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        
        move: function(direction, edge, event){
            if (!this.active) {
                this.activate(event, this.element.children(edge));
                return;
            }
            var next = this.active[direction + "All"](".ui-menu-item").eq(0);
            if (next.length) {
                this.activate(event, next);
            }
            else {
                this.activate(event, this.element.children(edge));
            }
        },
        
        // TODO merge with previousPage
        nextPage: function(event){
            if (this.hasScroll()) {
                // TODO merge with no-scroll-else
                if (!this.active || this.last()) {
                    this.activate(event, this.element.children(".ui-menu-item:first"));
                    return;
                }
                var base = this.active.offset().top, height = this.element.height(), result = this.element.children(".ui-menu-item").filter(function(){
                    var close = $(this).offset().top - base - height + $(this).height();
                    // TODO improve approximation
                    return close < 10 && close > -10;
                });
                
                // TODO try to catch this earlier when scrollTop indicates the last page anyway
                if (!result.length) {
                    result = this.element.children(".ui-menu-item:last");
                }
                this.activate(event, result);
            }
            else {
                this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"));
            }
        },
        
        // TODO merge with nextPage
        previousPage: function(event){
            if (this.hasScroll()) {
                // TODO merge with no-scroll-else
                if (!this.active || this.first()) {
                    this.activate(event, this.element.children(".ui-menu-item:last"));
                    return;
                }
                
                var base = this.active.offset().top, height = this.element.height();
                result = this.element.children(".ui-menu-item").filter(function(){
                    var close = $(this).offset().top - base + height - $(this).height();
                    // TODO improve approximation
                    return close < 10 && close > -10;
                });
                
                // TODO try to catch this earlier when scrollTop indicates the last page anyway
                if (!result.length) {
                    result = this.element.children(".ui-menu-item:first");
                }
                this.activate(event, result);
            }
            else {
                this.activate(event, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"));
            }
        },
        
        hasScroll: function(){
            return this.element.height() < this.element.prop("scrollHeight");
        },
        
        select: function(event){
            this._trigger("selected", event, {
                item: this.active
            });
        }
    });
    $.add('ui-menu');
}(jQuery));
