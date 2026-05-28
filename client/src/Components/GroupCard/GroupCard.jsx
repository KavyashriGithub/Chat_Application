import "./GroupCard.css";
function GroupCard({ group, handleGroupClick }) {
    return (
        <div className="group-card" onClick={() => handleGroupClick(group)}>
            <p>{group.group_name}</p>
        </div>
    );
}
export default GroupCard;