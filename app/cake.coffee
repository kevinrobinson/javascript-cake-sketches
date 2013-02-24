###
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

###  
module.exports = class Cake
  constructor: (components...) ->
    dependencies = {}

    # Pass reference to the cake into the component
    extendCake = (component) =>
      ingredient = component.call this, this
      for property, value of ingredient when property isnt 'dependencies'
        @[property] = value
      ingredient

    # Mix in ingredient components and collect all the dependencies
    for component in components
      ingredient = extendCake(component)
      for name, dependency of ingredient.dependencies
        if not dependencies[name]? or dependencies[name] is dependency
          dependencies[name] = dependency

    # Check that dependencies were satisfied
    for name, component of dependencies
      if @[name] is undefined
        throw new Error("Missing #{name} dependency")
      if not component in components
        throw new Error("Dependency #{name} is not in ingredients")