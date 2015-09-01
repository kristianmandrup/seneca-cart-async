/* Copyright (c) 2013 Richard Rodger, MIT License */
'use strict';

var _   = require('underscore')
var nid = require('nid')

module.exports = function cart( options ) {
  var name = "cart"

  options = this.util.deepextend({
    prefix: '/api/cart',
    add: {redirect:'/cart'},
    remove: {redirect:'/cart'}
  }, options)

  var createContext = require('./context').bind(this)
  var ctx = createContext();
  var addAll = require('./seneca/add-all').bind(this);
  addAll(ctx);

  var actAll = require('./seneca/act-all').bind(this);
  actAll(ctx);

  if( _.isArray(options.onlyone) ) {
    this.add({role:name,trigger:'update'}, require('./cart/update_one')(this))
  }

  return {
    name:name
  }
}
