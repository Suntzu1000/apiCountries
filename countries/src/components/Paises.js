import {useState, useEffect, React}  from 'react'
import Itens from './Itens'



const Paises = () => {
    const [paises, setPaises] = useState([])
    const [procurarTexto, setProcurarTexto] = useState(``)
    const continentes = [
        {
            name: "Europe"
        },
        {
            name: "Asia"
        },
        {
            name: "Africa"
        },
        {
            name: "Oceania"
        },
        {
            name: "Americas"
        },
        {
            name: "Antarctic"
        }
    ]

    useEffect(() => {
        document.title= `Mostrando todos os Países`
      }, [])

    useEffect(() => {
        const getCountries = async() => {
            try{
                const res = await fetch('https://restcountries.com/v3.1/all')
                const data = await res.json()
                setPaises(data)
            } catch (error) {
                console.error(error)
            }
        }
        getCountries()
    }, [])

    async function procurarPais(){
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${procurarTexto}`)
            const data = await res.json()
            setPaises(data)
        } catch (error) {
            console.error(error)
        }
    }

    function handleProcurarPais(e) {
        e.preventDefault()
        procurarPais()
    }


    async function FiltrarPorRegiao(continentes){
        try {
            const res = await fetch(`https://restcountries.com/v3.1/region/${continentes}`)
            const data = await res.json()
            setPaises(data)
        } catch (error) {
            console.error(error)
        }
    }
    function handleFiltrarPorRegiao(e){
        e.preventDefault()
        FiltrarPorRegiao()

    }
  return (
    <>
    {!paises ? <h1 className="text-gray-100 font-bold uppercase tracking-wide
    flex items-center justify-center text-center h-screen text-4xl dark:text-white">Loading...</h1> : <section className='container mx-auto p-8'>
        {/*form*/}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between
        mb-8'>
            <form onSubmit={handleProcurarPais} autoComplete='off' className='max-w-4xl md:flex-1' >
                <input 
                type="text" 
                name="search" 
                id="procurar" 
                placeholder='Procurar por país' 
                required 
                value={procurarTexto}
                onChange={(e) => setProcurarTexto(e.target.value)}
                className='py-3 px-4 text-gray-600 placeholder-gray-600 w-full
                shadow rounded outline-none dark:text-gray-400 dark:placeholder-gray-400
                dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200'/>
            </form>

            <form onSubmit={handleFiltrarPorRegiao}>
                 <select 
                 name="filtrar por região" 
                 id="filtrar por região" 
                 className='w-52 py-3 px-4
                 outline-none shadow rounded text-gray-600
                 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700'
                 value={continentes.name}
                 onChange={(e) => FiltrarPorRegiao(e.target.value)}>
                 
                    {continentes.map((continente, index)=> (
                        <option key={index} value={continente.name}>{continente.name}</option>
                    ))}
                 </select>
            </form>
        </div>


        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 
        2xl:grid-cols-4'>
        {paises.map((pais) => (
            <Itens key={pais.name.common} {...pais}/>
        ))}      
        </div>  
    </section>}
    </>
  )
}

export default Paises