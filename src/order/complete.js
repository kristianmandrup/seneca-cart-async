module.exports = function(seneca) {
  async function(args){
    // TODO: this user stuff should happen in a trigger
    var user = args.user
    if( !user ) {
      user = args.req$ && args.req$.seneca && args.req$.seneca.user

      if( !user ) {
        // auto register and login
        if( args.email ) {
          // TODO: KILL this fuckin callback hell and normalize using async/await!!!
          var user = await this.act({role:'user',cmd:'register',nick:args.email,email:args.email,name:args.email,active:true})
          var out = await this.act({role:'user',cmd:'login',nick:args.email,auto:true});
          var res = await this.act({role:'auth',cmd:'login',user:out.user,login:out.login}
          user = out.user;
        }
      }
    }
    return complete(user);

    function complete(user) {
      var buyer = {user:user.id,email:user.email,name:user.name}
      // NOTE: should there be a cart passed into this?
      seneca.act({role:name,cmd:'purchase',buyer:buyer},done)
    }
  }
}
