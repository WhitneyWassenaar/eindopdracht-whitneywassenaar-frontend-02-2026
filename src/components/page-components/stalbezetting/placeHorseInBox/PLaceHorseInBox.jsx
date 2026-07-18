// React
import { useState } from "react";

function PlaceHorseInBox({ box, horses, updateHorse }) {
    const [selectedHorseId, setSelectedHorseId] = useState("");
    const availableHorses = horses.filter(
        horse => horse.boxId === null
    );

    function handlePlaceHorseInBox() {
        if (!selectedHorseId) return;
        const horse = availableHorses.find(
            horse => horse.id === Number(selectedHorseId)
        );
        updateHorse(horse, box);
    }

    return (
        <>
            <select
                value={selectedHorseId}
                onChange={(e) => setSelectedHorseId(e.target.value)}
            >
                <option value="">
                    Kies een paard
                </option>

                {availableHorses.map((horse) => (
                    <option
                        key={horse.id}
                        value={horse.id}
                    >
                        {horse.name}
                    </option>
                ))}
            </select>

            <button onClick={handlePlaceHorseInBox}>
                Plaatsen
            </button>
        </>
    );
}

export default PlaceHorseInBox;