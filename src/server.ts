import app from './app'

app.listen(3333 || process.env.PORT, () => {
  console.log('API runing')
})
