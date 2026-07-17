// CSS
import "./CreateCareTaskForm.css";
import Button from "../../ui/Button/Button.jsx";
import {useContext, useState, useEffect} from "react";
import api from "../../../api/axios.js";
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

function CreateCareTaskForm({addCareTask, setShowForm}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selectedHorse, setSelectedHorse] = useState("");
    const [horses, setHorses] = useState([]);
    const [error, setError] = useState("");

    const {token,user} = useContext(AuthContext);

    async function createCareTaskFormSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/careTasks",
                {
                    userId: user.id,
                    horseId: selectedHorse,
                    title,
                    description,
                    dueDate,
                    completed: false
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const newCareTask = response.data;
            addCareTask(newCareTask);
            setShowForm(false);
            console.log("Nieuwe zorgtaak uit backend:", newCareTask);

            setTitle("");
            setDescription("");
            setDueDate("");
            setSelectedHorse("");

            console.log("Nieuwe zorgtaak:", newCareTask);


        } catch (error) {
            console.error(error)
            setError(error.response?.data?.error || "Er is iets mis gegaan..")
        }
    }

    useEffect(() => {
        if(!token || !user) return;

        async function getHorses() {
            try {
                const response = await api.get(`/users/${user.id}/horses`,
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

    return (
        <form onSubmit={createCareTaskFormSubmit} className="create-caretask-form-layout">
            <fieldset>
                <legend>Zorgtaak aanmaken</legend>
                <div className="form-row">
                    <label>Titel</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id={"title"}
                        type={"text"}
                        maxLength={20}
                        placeholder={"Voer titel in"}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Beschrijving</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id={"description"}
                        type={"text"}
                        maxLength={100}
                        placeholder={"Voer beschrijving in"}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Datum</label>
                    <input
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        id={"dueDate"}
                        type={"date"}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Paard</label>
                    <select
                        value={selectedHorse}
                        onChange={(event) => setSelectedHorse(event.target.value)}
                        id="selected-horse"
                        required
                    >
                        <option
                            value="">
                            Selecteer een paard
                        </option>
                        {horses.map((horse) => (
                            <option
                                key={horse.id}
                                value={horse.id}
                            >
                                {horse.name}
                            </option>
                        ))}
                    </select>
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <Button
                    type={"submit"}
                >
                    Zorgtaak aanmaken
                </Button>
            </fieldset>
        </form>
    )
}

export default CreateCareTaskForm;