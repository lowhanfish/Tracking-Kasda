import Loadingy from '@assets/img/loading.webp'

type LoadingrProps = {
    text: string
}


const Loadingr = ({ text }: LoadingrProps) => {

    return (
        <div className='loadingContainer'>
            <img className='loadingImg' src={Loadingy} alt="" />
            <div className='loadingText'>LOADING</div>
            <div className='loadingSubText'>{text}</div>
        </div>
    )
}


export default Loadingr