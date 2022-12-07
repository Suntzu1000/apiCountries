import React, {useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const PaisUnico = () => {
  const [pais, setPais] = useState([])
  const {name} = useParams()
  useEffect(() => {
    const getPaisUnico = async() => {
      try{
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
        const data = await res.json()
        setPais(data)
      } catch (error) {
        console.error(error)
      }
    }

    getPaisUnico()
  }, [name])

  useEffect(() => {
    document.title= `Paises | ${name}`
  }, [name])

  return (<>
   <section className='p-8 md:py-0 max-w-7xl max-auto'>
    {pais.map((item) => (
     <div key={item.population} className='grid grid-cols-1 gap-8 md:grid-cols-2 md:place-items-center
     md:h-screen'>
        <article>
          <img src={item.flags.svg} alt={item.name.common} />
        </article>

        <article>
          <h1 className='md-8 font-bold  text-gray-900 dark:text-white text-4xl lg:6xl'>
            {item.name.official}
          </h1>
          <ul className='my-4 flex flex-col items-start justify-start gap-2 text-slate-700
          dark:text-gray-400'>
            <li>Capital: {item.capital[0]} </li>
            <li>População: {item.population.toLocaleString()} </li>
            <li>Região: {item.region}</li>
            <li>Sub-região: {item.subregion}</li>
            
          </ul>
          

          {item.borders && (<>
          <h3 className='text-gray-900 font-bold text-lg mb-2 dark:text-white'>Fronteiras com: </h3>
          <ul className='flex flex-wrap items-start justify-start gap-2'>
            {item.borders.map((border, index) => (
              <li key={index} className='bg-white p-2 rounded text-xs tracking-wide shadow 
              dark:bg-gray-800 dark:text-gray-400 text-gray-700'>{border}</li>
            ))}
          </ul>
          </>)}

          <Link to='/' className='inline-block mt-8 bg-white py-2 px-6 
          rounded shadow text-gray-700 hover:bg-gray-200 transition-all duration-200
          dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400'>&larr; Voltar</Link>
        </article>
     </div>
    ))}
   </section>
   </>
  )
}

export default PaisUnico