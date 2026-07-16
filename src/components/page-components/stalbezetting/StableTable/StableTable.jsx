// Components
import StableRow from '../StableRow/StableRow.jsx';

function StableTable() {

// test data
    const stables = [
        {
            id: 1,
            name: "Box 1",
            horse: "Daisy",
            owner: "Mirjam Haas"
        },
        {
            id: 2,
            name: "Box 2",
            horse: null,
            owner: null
        },
        {
            id: 3,
            name: "Box 3",
            horse: "Xanthos",
            owner: "aDennis Schulten"
        }
    ];

    return (
        <table className="table-layout">
            <thead>
            <tr>
                <th>Box</th>
                <th>Paard</th>
                <th>Eigenaar</th>
                <th>Actie</th>
            </tr>
            </thead>

            <tbody>
            {stables.map(stable => (
                <StableRow
                    key={stable.id}
                    stable={stable}
                />
            ))}
            </tbody>
        </table>
    );
}

export default StableTable;