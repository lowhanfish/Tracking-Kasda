import React from 'react'
import Folder from '@assets/img/icon/icons8-folder-100.png';

function ListData() {
    return (
        <div className='dashboardListContainer shaddow1'>
            <div className='dashboardListLeft'>
                <img
                    src={Folder}
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
                <div className='dashboardListText1'>Kiken S batara</div>
                <div className='dashboardListText2'>Department of Communication, Informatics, and Encryption of South Konawe Regency</div>
                <div className='dashboardListText3'>2 Sep 2025</div>
            </div>
        </div>
    )
}

export default ListData
