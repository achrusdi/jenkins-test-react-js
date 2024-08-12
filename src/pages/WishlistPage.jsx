import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { axiosInstance } from "../configs/axios";

const WishlistPage = () => {
    const [wishlistData, wishlistDataSet] = useState([]);
    const [wishlist, wishlistSet] = useState('');
    const [loading, loadingSet] = useState(false);

    useEffect(() => {
        fetchData();        
    }, []);

    const fetchData = async () => {
        loadingSet(true);
        const response = await axiosInstance.get('/wishlist-items');

        wishlistDataSet(response.data);
        loadingSet(false);
    }

    const handleOnSubmit = async () => {
        if (wishlist !== '') {
            await axiosInstance.post('/wishlist-items', {
                title: wishlist
            });

            wishlistSet('');
            fetchData();
        }

    }

    return (
        <>
            <h1>WishlistPage</h1>
            <div>
                <Input
                    bordered
                    label='Wishlist'
                    onChange={e => wishlistSet(e.target.value)}
                    value={wishlist}
                />

                <Button type="submit" onPress={handleOnSubmit}>Add</Button>
            </div>
            <ol>
                {loading ? <p>Loading...</p> : wishlistData.map(item => <li key={item.id}>{item.title}</li>)}
            </ol>
        </>
    );
}

export default WishlistPage;