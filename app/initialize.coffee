Cake = require 'cake'
UserServiceComponent = require 'user_service_component'
UserRepositoryComponent = require 'user_repository_component'


# Demonstrating baking
bakedCake = new Cake UserServiceComponent, UserRepositoryComponent, (cake) ->
  userRepository: new cake.UserRepository()
  userService: new cake.UserService()


# And using
bakedCake.userService.authenticate()