const Footer = () => {
    return (<>
        <footer className="bg- text-black py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="text-sm hover:underline">Privacy Policy</a>
                    <a href="#" className="text-sm hover:underline">Terms of Service</a>
                    <a href="#" className="text-sm hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    </>);
}

export default Footer;