import validator from 'sjv'

export default validator({
  createdAt: Date,
  modifiedAt: Date,
  password: String,
  email: String
})
