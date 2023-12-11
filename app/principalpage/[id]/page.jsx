'use client'
import axios from 'axios'

export default async function Home({ params }) {
    const { id } = params;

    const url = `http://localhost:3000/api/client/${id}`

    const response01 = await axios.get(url)

    const response02 = await axios.get(`https://viacep.com.br/ws/${response01.data.cep}/json/`)
    const nomedarua = response02.data.logradouro.split(' ').join('+')
    const response03 = await axios.get(`https://api.distancematrix.ai/maps/api/geocode/json?address=1600,${nomedarua},${response02.data.localidade},${response02.data.uf},Brazil&key=THy76mc8EB7DE1g30epsm4owSuuPhlcIUemw9hpBiKGmRZSs6GaeMd7VijKHQ1N4`)

    async function getDistance() {
        const response04 = await axios.get (`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${response03.data.result[0].geometry.location.lat},${response03.data.result[0].geometry.location.lng}&destinations={lat,lon}&key=NUG8TVeZxS6TXWwQdv6bMZWWiwCfkKSV6E5IfZ3wdMsGRg7KSkm9jLMVYkGRM3xd`)
    }

    console.log(response03.data.result[0].geometry.location)
    return (
        <>
        </>
    )
}