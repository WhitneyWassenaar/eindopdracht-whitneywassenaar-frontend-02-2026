
function StableRow({stable}) {
    return (
        <tr className="stablerow-layout">
            <td>{stable.name}</td>
            <td>{stable.horse ?? "Vrij"}</td>
            <td>{stable.owner ?? "Onbekend"}</td>
            <td>{stable.horse ? "wijzigen" : "Plaatsen"}</td>
        </tr>
    );
}

export default StableRow;

//TODO
// actie : als box leeg is "plaatsen",
// als box bezet is "wijzigen"