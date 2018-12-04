import makeChart from './make-chart.js'

const $pokedex = document.querySelector('#pokedex')
const $image = document.querySelector('#image')
const $form = document.querySelector('#form')
const speech = window.speechSynthesis
const $screen = document.querySelector('#screen')

async function getPokemon(entrypoint,id) {
  const response = await fetch(`https://pokeapi.co/api/v2/${entrypoint}/${id}/`)
  const pokemon = await response.json()
  console.log(pokemon);
  return pokemon
}

const labels = [
  'speed','special-defense','special-attack','defense','attack','hp'
]

$form.addEventListener('submit', async (event) => {
  event.preventDefault()
  $pokedex.classList.add('is-active')
  $screen.style.backgroundImage = 'url(./images/loading.gif)'
  const form = new FormData($form)
  const id = form.get('id')
  const pokemon = await getPokemon('pokemon',id)
  const species = await getPokemon('pokemon-species',id)
  const flavor =  species.flavor_text_entries.find((entry)=> entry.language.name === 'es')
  console.log(flavor.flavor_text)
  
  const stats = pokemon.stats.map((stat)=> stat.base_stat)
  console.log(stats);

  
  const utterance = new SpeechSynthesisUtterance(`${pokemon.name}. ${flavor.flavor_text}`)
  utterance.rate = 1.3
  speech.speak(utterance)
  makeChart(stats, pokemon.name, labels)
  $image.setAttribute('src', pokemon.sprites.front_default)
  $screen.style.backgroundImage = '';
})