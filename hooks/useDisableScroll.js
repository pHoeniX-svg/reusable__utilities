import { useEffect } from 'react'

const useDisableScroll = () => {
  useEffect(() => {
    document.documentElement.classList.add('disable--scroll')
    return () => {
      document.documentElement.classList.remove('disable--scroll')
    }
  }, [])
}

export default useDisableScroll
