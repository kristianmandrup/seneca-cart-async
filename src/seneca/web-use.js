module.exports = function(ctx) {
  var redirects = {
    add: ctx.options.add ? ctx.options.add.redirect : null,
    remove: ctx.options.remove? ctx.options.remove.redirect : null,
    complete: ctx.options.complete? ctx.options.complete.redirect : null
  }

  return {
    prefix: ctx.options.prefix,
    pin: {role: name, cmd:'*'},
    map: {
      add_entry: {
        POST:{
          redirect: redirects.add
        }
      },
      remove_entry: {
        POST:{
          redirect: redirects.remove
        }
      },
      get: {
        GET:{
          filter:['id','$']
        }
      },
      complete: {
        POST:{
          redirect: redirects.complete
        }
      }
    }
  }
}
