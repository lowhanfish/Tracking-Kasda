import Loadingy from '@assets/img/loading.gif'


const Loadingx = () => {

    return (
        <div className='loadingContainer'>
            <img className='loadingImg' src={Loadingy} alt="" />
            <div className='loadingText'>LOADING...!</div>
        </div>
    )
}


export default Loadingx