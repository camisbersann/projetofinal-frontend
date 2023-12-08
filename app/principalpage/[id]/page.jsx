import axios from 'axios'

export default async function Home({ params }) {
    const { id } = params;

    const response01 = await axios.get(`/api/client/${id}`)

    const response02 = await axios.get(`https://viacep.com.br/ws/${response01.data.cep}/json/`)

    return (
        <>
            <p>{response02.data.logradouro}</p>
        </>
    )
}