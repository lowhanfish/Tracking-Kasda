import { useEffect, useState } from 'react'
import useStorex from '@store/index'
import axios from 'axios'




type ListDocumentByLimitProps = {
    limit: number | 8,
}

const ListDocumentByLimit = ({ limit }: ListDocumentByLimitProps) => {

    const { url } = useStorex();
    const token = localStorage.getItem("authToken");
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);





    const getListData = () => {
        setLoading(true);
        axios.post(url, JSON.stringify({
            limit: limit
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `kikensbatara ${token}`
            }
        }).then(result => {
            setLoading(false);
            console.log(result)
            setListData(result.data);
        }).catch(error => {
            setLoading(false);
            console.log(error)
        })


    }


    useEffect(() => {
        getListData();
    }, [])


    return (
        <div>
            <h1>Components Active</h1>

            {/* {
                loading ? (
                    <div></div>
                ) : (
                    <>
                        {
                            listData.map((data, index) => (
                                <div>

                                </div>
                            ))
                        }

                    </>
                )
            } */}

        </div>
    )
}

export default ListDocumentByLimit
