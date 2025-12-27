import { useState, useEffect } from 'react'
import Folder from '@assets/img/icon/icons8-folder-100.png';
import Approve from '@assets/img/icon/icons8-check-all-100.png';
import Reject from '@assets/img/icon/icons8-beanie-96.png';
import formatRupiah from '@lib/format.js'

type ListDataItemsProps = {
    title: string,
    unit: string,
    price: number,
    status?: number
}

const ListDataItems = ({ title, unit, price, status = 0 }: ListDataItemsProps) => {
    return (
        <div className='item-list-container '>
            <div className='dashboardListLeft'>
                <img
                    src={
                        status === 0 ? Folder : status === 1 ? Approve : Reject
                    }
                    // src="https://img.freepik.com/premium-vector/white-elegant-blue-background_662550-436.jpg"
                    // src="https://simpegv2.konaweselatankab.go.id/images/banner.png"
                    alt="No image"
                    style={{
                        width: "50px",
                        height: "auto",
                        display: "block",
                    }}
                />
            </div>
            <div className='dashboardListRight'>
                <div className='list-text1'>{title}</div>
                <div style={{ marginTop: 2 }} className='list-text2'>{unit}</div>
                <div style={{ marginTop: 0 }} className='list-text3'>
                    <b>{formatRupiah(price)}</b>
                </div>
                <div>
                    <span className="badge warn">Menunggu</span>
                </div>
            </div>
        </div>
    )
}

export default ListDataItems
