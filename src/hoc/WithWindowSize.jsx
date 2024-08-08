import { useEffect, useState } from "react";

const WithWindowSize = (WrappedComponent) => {
    return (props) => {
        const [windowSize, setWindowSize] = useState({
            width: window.innerWidth,
            height: window.innerHeight
        })

        useEffect(() => {
            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                })
            }
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }, [])

        return (
            <WrappedComponent windowSize={windowSize} {...props} />
        );
    }
}
 
export default WithWindowSize;