const url = 'https://api.adviceslip.com/advice'
const button = document.querySelector('button')

const getAdvice = async (endpoint = url, config = {}) => {
  try {
    const response = await fetch(endpoint, config)
    const data = await response.json()
    if (!data) throw new Error('Error on getting data')
    return data
  } catch (error) {
    console.log(error)
  }
}

const updateDOM = async (element = document.querySelector('article')) => {
  const { slip } = await getAdvice()
  const { id, advice } = slip
  element.innerHTML = `
  <h1> Advice #${id}</h1>
  <blockquote>${advice}</blockquote>
  `
  // just to return something :)
  return element
}

button.addEventListener('click', async function (event) {
  event.preventDefault()
  await updateDOM()
  // remove the focus on button after action took place
  setTimeout(() => this.blur(), 100)
})

updateDOM()
