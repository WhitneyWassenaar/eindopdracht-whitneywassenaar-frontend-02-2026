// React
import {useContext, useEffect, useState} from "react";

// Context
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import {getHorses} from "../../../services/horseService.js";
import {getHorseCareTaskAssignments, assignCareTask} from "../../../services/careTaskService.js";


// Components
import Button from "../../ui/Button/Button.jsx";

// CSS
import "./AssignCareTaskForm.css";

function AssignCareTaskForm({careTask, setSelectedCareTask}) {

    const {token, user} = useContext(AuthContext);

    const [horses, setHorses] = useState([]);
    const [selectedHorses, setSelectedHorses] = useState([]);
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");
    const [existingAssignments, setExistingAssignments] = useState([]);
    const [message, setMessage] = useState("");

    const [loadingHorses, setLoadingHorses] = useState(false);
    const [horsesError, setHorsesError] = useState("");
    const [loadingAssignments, setLoadingAssignments] = useState(false);
    const [assignmentsError, setAssignmentsError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!token || !horses.length) return;

        async function getExistingAssignments() {
            try {
                setLoadingAssignments(true);
                setAssignmentsError("");

                const allAssignments = [];

                for (const horse of horses) {
                    const assignments = await getHorseCareTaskAssignments(
                        horse.id,
                        token
                    );

                    allAssignments.push(...assignments);
                }

                setExistingAssignments(allAssignments);

            } catch (error) {
                console.error("Fout bij ophalen bestaande toewijzingen:", error);
                setAssignmentsError(
                    "Het ophalen van bestaande zorgtaaktoewijzingen is niet gelukt."
                );
            } finally {
                setLoadingAssignments(false);
            }
        }

        getExistingAssignments();
    }, [horses, token]);

    useEffect(() => {
        if (!token || !user) return;


        async function fetchHorses() {
            try {
                setLoadingHorses(true);
                setHorsesError("");

                const data = await getHorses(user.id, token);
                setHorses(data);

            } catch (error) {
                console.error("Fout bij ophalen paarden:", error);
                setHorsesError("Het ophalen van de paarden is niet gelukt.");
            } finally {
                setLoadingHorses(false);
            }
        }
        fetchHorses();
    }, [token, user]);

    function handleHorseSelect(horseId) {
        setSelectedHorses(previous => {

            if (previous.includes(horseId)) {

                return previous.filter(
                    id => id !== horseId
                );

            } else {

                return [
                    ...previous,
                    horseId
                ];
            }
        });
    }

    async function assignCareTaskSubmit(e) {
        e.preventDefault();
        setError("");
        setMessage("");

        if (selectedHorses.length === 0) {
            setError("Selecteer minimaal één paard");
            return;
        }

        const hasDuplicate = selectedHorses.some(horseId =>
            existingAssignments.some(
                assignment =>
                    Number(assignment.horseId) === Number(horseId) &&
                    Number(assignment.careTaskId) === Number(careTask.id) &&
                    assignment.dueDate === dueDate &&
                    assignment.completed === false
            )
        );

        if (hasDuplicate) {
            setError(
                "Deze zorgtaak is al toegewezen aan één of meerdere geselecteerde paarden op deze datum."
            );
            return;
        }

        setIsSubmitting(true);

        try {
            for (const horseId of selectedHorses) {
                await assignCareTask(
                    {
                        careTaskId: careTask.id,
                        careTaskTitle: careTask.title,
                        horseId: horseId,
                        dueDate: dueDate,
                        completed: false
                    },
                    token
                );
            }

            setMessage(
                "Zorgtaak succesvol toegewezen aan de geselecteerde paarden."
            );

            setTimeout(() => {
                setSelectedCareTask(null);
                setMessage("");
            }, 3000);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.error ||
                "Toewijzen mislukt"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={assignCareTaskSubmit}
            className="assign-caretask-form-layout"
        >
            <fieldset>

                <legend>
                    Zorgtaak toewijzen:
                    <strong> {careTask.title}</strong>
                </legend>


                <div className="form-row">

                    <span className="form-label">Paarden</span>

                    {loadingHorses ? (
                        <p>Paarden worden geladen...</p>
                    ) : horsesError ? (
                        <p className="error-message">{horsesError}</p>
                    ) : horses.length === 0 ? (
                        <p>Er zijn geen paarden beschikbaar.</p>
                    ) : ( horses.map((horse) => (
                        <label key={horse.id}>
                            <input
                                type="checkbox"
                                checked={
                                    selectedHorses.includes(horse.id)
                                }
                                onChange={() =>
                                    handleHorseSelect(horse.id)
                                }
                            />
                            {horse.name}
                        </label>
                    )))
                    }

                    {loadingAssignments && (
                        <p> Bestaande zorgtaaktoewijzingen worden geladen...</p>
                    )}

                    {assignmentsError && (
                        <p className="error-message">
                            {assignmentsError}
                        </p>
                    )}
                </div>

                <div className="form-row">

                    <label htmlFor="dueDate">
                        Einddatum
                    </label>

                    <input
                        id="dueDate"
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                        required
                    />

                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting} >
                    {isSubmitting ? "Bezig met toewijzen..." : "Zorgtaak toewijzen"}
                </Button>

                <Button
                    type="button"
                    variant="cancel"
                    onClick={() =>
                        setSelectedCareTask(null)
                    }
                >
                    Annuleren
                </Button>
            </fieldset>
        </form>
    );
}

export default AssignCareTaskForm;