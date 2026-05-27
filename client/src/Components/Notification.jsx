import './Notification.css'
function Notification({type = '',message,onClose })
 {
if (!message) return null 
return (
    <div className={'notification ${type}'}>
        <span>{message}</span>
        <button onclick ={onclick}>x</button>
    </div>
)
}
export default Notification;