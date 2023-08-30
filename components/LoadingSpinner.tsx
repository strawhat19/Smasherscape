export default function LoadingSpinner(props) {
    return (
        <div className={`loadingSpinner`}>
            <div className={`spinnerEl`} style={{maxHeight: props.size}}>
                <i style={{fontSize: props.size}} className="fas fa-spinner spinner"></i>
            </div>
            <span className={`spinnerEl`} style={{fontSize: (props.size <= 56 && props.override == false) ? 56 : props.size, maxHeight: props.size}}>Loading Player(s)...</span>
        </div>
    )
}