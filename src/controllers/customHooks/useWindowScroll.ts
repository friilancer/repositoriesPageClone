import { useEffect, useState } from "react"

const useWindowScroll = () => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const updateHeight = () => {
            setOffset(window.scrollY)
        }

        window.addEventListener('scroll', updateHeight)
        updateHeight()

        return () => window.removeEventListener('scroll', updateHeight)
    }, [])

    return offset;
}

export default useWindowScroll