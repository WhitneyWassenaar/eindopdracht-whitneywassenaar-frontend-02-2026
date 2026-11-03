// React
import Button from '../../../ui/Button/Button.jsx';

// CSS
import './StableRowActions.css';

function StableRowActions({
                              horse,
                              horses = [],
                              boxes = [],
                              boxId,
                              movingHorse,
                              setMovingHorse,
                              moveHorseToBox,
                              fromBoxToPasture,
                              fromPastureToBox,
                              removeHorseFromBox,
                              placeHorseInBox,
                              movingHorseId,
                              removingHorseId,
                              changingBoxHorseId
                          }) {
    return (
        <div className="stable-actions-container">
            {horse ? (
                <>
                    {horse.active && (
                        <>
                            {movingHorse?.id === horse.id ? (
                                <>
                                    <select
                                        className="choose-box"
                                        disabled={changingBoxHorseId === horse.id}
                                        onChange={(e) =>
                                            moveHorseToBox(horse, e.target.value)
                                        }
                                    >
                                        <option value="">
                                            {changingBoxHorseId === horse.id
                                                ? "Bezig met verplaatsen..."
                                                : "Kies nieuwe box"}
                                        </option>

                                        {boxes
                                            .filter(box =>
                                                !horses.some(currentHorse =>
                                                    Number(currentHorse.boxId) === Number(box.id)
                                                )
                                            )
                                            .map(box => (
                                                <option key={box.id} value={box.id}>
                                                    Box {box.boxNumber}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {changingBoxHorseId === horse.id && (
                                        <span>Bezig met verplaatsen...</span>
                                    )}

                                    <Button
                                        variant="stable-actions"
                                        onClick={() => setMovingHorse(null)}
                                    >
                                        Verplaatsen annuleren
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="stable-actions"
                                    onClick={() => setMovingHorse(horse)}
                                >
                                    Verplaatsen
                                </Button>
                            )}

                            {horse.location === "stal" ? (
                                <Button
                                    variant="stable-actions"
                                    disabled={movingHorseId === horse.id}
                                    onClick={() => fromBoxToPasture(horse)}
                                >
                                    {movingHorseId === horse.id
                                        ? "Bezig met verplaatsen..."
                                        : "Naar wei"}
                                </Button>
                            ) : (
                                <Button
                                    variant="stable-actions"
                                    disabled={movingHorseId === horse.id}
                                    onClick={() => fromPastureToBox(horse)}
                                >
                                    {movingHorseId === horse.id
                                        ? "Bezig met verplaatsen..."
                                        : "Zet op stal"}
                                </Button>
                            )}
                        </>
                    )}

                    <Button
                        variant="stable-actions"
                        disabled={removingHorseId === horse.id}
                        onClick={() => removeHorseFromBox(horse)}
                    >
                        {removingHorseId === horse.id
                            ? "Bezig met loskoppelen..."
                            : "Loskoppelen"}
                    </Button>
                </>
            ) : (
                <select
                    className="place-horse"
                    disabled={horses.some(horse => Number(horse.id) === movingHorseId)}
                    onChange={(e) =>
                        placeHorseInBox(e.target.value, boxId)
                    }

                >
                    <option value="">
                        Paard plaatsen
                    </option>

                    {horses
                        .filter(currentHorse =>
                            !currentHorse.boxId && currentHorse.active
                        )
                        .map(currentHorse => (
                            <option
                                key={currentHorse.id}
                                value={currentHorse.id}
                            >
                                {currentHorse.name}
                            </option>
                        ))
                    }
                </select>
            )}
        </div>
    );
}

export default StableRowActions;