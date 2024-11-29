import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from './useFetch'

const DataContext = createContext()

export const ProvedorDados = ({ children }) => {
  const [data, setData] = useState({ type1: [], type2: [], habitats: [], colors: [] })
  const [base, setBase] = useState()
  const fetchData = useFetch()

  useEffect(() => {
    const loadData = async () => {
      try {
        const type1Data = await fetchData('/type1');
        const type2Data = await fetchData('/type2');
        const habitatsData = await fetchData('/habitats');
        const colorsData = await fetchData('/colors');
        const baseData = await fetchData('/search')

        setData({
          type1: type1Data,
          type2: type2Data,
          habitats: habitatsData,
          colors: colorsData,
        })

        setBase(
          baseData
        )

      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    }

    loadData()
  }, [])

  return <DataContext.Provider value={{...data, base}}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)