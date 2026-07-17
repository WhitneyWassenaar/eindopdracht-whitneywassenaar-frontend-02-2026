// React
import {useContext, useEffect, useState} from "react";

// Components
import Button from "../../ui/Button/Button.jsx";

// Context
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

// Api
import api from "../../../api/axios.js";

// CSS
import "./AssignCareTaskForm.css";

function AssignCareTaskForm({careTask, setSelectedCareTask}) {

    const {token, user} = useContext(AuthContext);

    const [horses, setHorses] = useState([]);
    const [selectedHorses, setSelectedHorses] = useState([]);
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");



    useEffect(() => {
        if (!token || !user) return;


        async function getHorses() {
            try {

                const response = await api.get(
                    `/users/${user.id}/horses`,
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

                setHorses(response.data);

            } catch(error) {
                console.error(error);
            }
        }


        getHorses();

    }, [token, user]);



    function handleHorseSelect(horseId) {

        setSelectedHorses(previous => {

            if(previous.includes(horseId)) {

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


        if(selectedHorses.length === 0) {
            setError("Selecteer minimaal één paard");
            return;
        }


        try {


            for(const horseId of selectedHorses) {

                await api.post(
                    "/careTaskAssignments",
                    {
                        careTaskId: careTask.id,
                        horseId: horseId,
                        dueDate: dueDate,
                        completed: false
                    },
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );

            }


            setSelectedCareTask(null);


        } catch(error) {

            console.error(error);
            setError(
                error.response?.data?.error ||
                "Toewijzen mislukt"
            );

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

                    <label>Paarden</label>


                    {horses.map((horse) => (

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

                    ))}


                </div>



                <div className="form-row">

                    <label>
                        Einddatum
                    </label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e)=>
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



                <Button type="submit">
                    Zorgtaak toewijzen
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