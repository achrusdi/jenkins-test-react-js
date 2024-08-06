import { useEffect, useState } from "react"

const WithScrollPosition = (WrappedComponent) => {
    return (props) => {
        const [scrollPosition, setScrollPosition] = useState(0);

        useEffect(() => {
            const handleScroll = () => {
                setScrollPosition(window.scrollY)
            }
            window.addEventListener('scroll', handleScroll)
            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }, [])
        
        return (
            <WrappedComponent scrollPosition={scrollPosition} {...props} />
        );
    }
}
 
export default WithScrollPosition;