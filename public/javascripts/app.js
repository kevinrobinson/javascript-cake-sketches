(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("cake", function(exports, require, module) {
  /*
  A component should be a function that takes a reference to the
  Cake and then returns an object.  It can express its dependencies
  in the 'dependencies' property.

  For example:
    
    TwitterComponent = (cake) ->
      dependencies:
        twitterUseComponent: UserComponent

      getTweets: ->
        user = cake.twitterUserComponent.getUser()
        $.ajax user, ...
  */

  var Cake,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module.exports = Cake = (function() {

    function Cake() {
      var component, components, dependencies, dependency, extendCake, ingredient, name, _i, _len, _ref, _ref1,
        _this = this;
      components = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      dependencies = {};
      extendCake = function(component) {
        var ingredient, property, value;
        ingredient = component.call(_this, _this);
        for (property in ingredient) {
          value = ingredient[property];
          if (property !== 'dependencies') {
            _this[property] = value;
          }
        }
        return ingredient;
      };
      for (_i = 0, _len = components.length; _i < _len; _i++) {
        component = components[_i];
        ingredient = extendCake(component);
        _ref = ingredient.dependencies;
        for (name in _ref) {
          dependency = _ref[name];
          if (!(dependencies[name] != null) || dependencies[name] === dependency) {
            dependencies[name] = dependency;
          }
        }
      }
      for (name in dependencies) {
        component = dependencies[name];
        if (this[name] === void 0) {
          throw new Error("Missing " + name + " dependency");
        }
        if (_ref1 = !component, __indexOf.call(components, _ref1) >= 0) {
          throw new Error("Dependency " + name + " is not in ingredients");
        }
      }
    }

    return Cake;

  })();
  
});
window.require.register("initialize", function(exports, require, module) {
  var Cake, UserRepositoryComponent, UserServiceComponent, bakedCake;

  Cake = require('cake');

  UserServiceComponent = require('user_service_component');

  UserRepositoryComponent = require('user_repository_component');

  bakedCake = new Cake(UserServiceComponent, UserRepositoryComponent, function(cake) {
    return {
      userRepository: new cake.UserRepository(),
      userService: new cake.UserService()
    };
  });

  bakedCake.userService.authenticate();
  
});
window.require.register("user", function(exports, require, module) {
  var User;

  module.exports = User = (function() {

    function User(username, password) {
      this.username = username;
      this.password = password;
    }

    return User;

  })();
  
});
window.require.register("user_repository_component", function(exports, require, module) {
  var UserRepositoryComponent;

  module.exports = UserRepositoryComponent = function(cake) {
    var UserRepository;
    return {
      UserRepository: UserRepository = (function() {

        function UserRepository() {}

        UserRepository.prototype.authenticate = function(user) {
          return console.log('authenticating user...');
        };

        UserRepository.prototype.create = function(user) {
          return console.log('creating user...');
        };

        UserRepository.prototype["delete"] = function(user) {
          return console.log('deleting user...');
        };

        return UserRepository;

      })()
    };
  };
  
});
window.require.register("user_service_component", function(exports, require, module) {
  var UserRepositoryComponent, UserServiceComponent;

  UserRepositoryComponent = require('user_repository_component');

  module.exports = UserServiceComponent = function(cake) {
    var UserService;
    return {
      dependencies: {
        userRepository: UserRepositoryComponent
      },
      UserService: UserService = (function() {

        function UserService() {}

        UserService.prototype.authenticate = function(username, password) {
          return cake.userRepository.authenticate(username, password);
        };

        UserService.prototype.create = function(username, password) {
          return cake.userRepository.create(new User(username, password));
        };

        return UserService;

      })()
    };
  };
  
});
