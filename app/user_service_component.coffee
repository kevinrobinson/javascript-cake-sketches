UserRepositoryComponent = require 'user_repository_component'


module.exports = UserServiceComponent = (cake) ->
  dependencies:
    userRepository: UserRepositoryComponent

  UserService: class UserService
    authenticate: (username, password) ->
      cake.userRepository.authenticate(username, password)
    create: (username, password) ->
      cake.userRepository.create(new User(username, password))
