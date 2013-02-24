module.exports = UserRepositoryComponent = (cake) ->
  UserRepository: class UserRepository
    authenticate: (user) -> console.log 'authenticating user...'
    create: (user) -> console.log 'creating user...'
    delete: (user) -> console.log 'deleting user...'