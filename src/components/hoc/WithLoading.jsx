const WithLoading = (WrappedComponent) => {
    return ({isLoading, ...props}) => {
        if (isLoading) {
            return <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        }
        return <WrappedComponent {...props} />
    }
}
 
export default WithLoading;