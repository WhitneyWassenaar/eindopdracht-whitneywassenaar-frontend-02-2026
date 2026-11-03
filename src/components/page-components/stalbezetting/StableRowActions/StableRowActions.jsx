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
                              placeHorseInBox
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
                                        onChange={(e) =>
                                            moveHorseToBox(horse, e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Kies nieuwe box
                                        </option>

                                        {boxes
                                            .filter(box =>
                                                !horses.some(currentHorse =>
                                                    Number(currentHorse.boxId) === Number(box.id)
                                                )
                                            )
                                            .map(box => (
                                                <option
                                                    key={box.id}
                                                    value={box.id}
                                                >
                                                    Box {box.boxNumber}
                                                </option>
                                            ))
                                        }
                                    </select>

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
                                    onClick={() => fromBoxToPasture(horse)}
                                >
                                    Naar wei
                                </Button>
                            ) : (
                                <Button
                                    variant="stable-actions"
                                    onClick={() => fromPastureToBox(horse)}
                                >
                                    Zet op stal
                                </Button>
                            )}
                        </>
                    )}

                    <Button
                        variant="stable-actions"
                        onClick={() => removeHorseFromBox(horse)}
                    >
                        Loskoppelen
                    </Button>
                </>
            ) : (
                <select
                    className="place-horse"
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