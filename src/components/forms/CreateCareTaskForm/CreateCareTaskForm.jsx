// React
import {useContext, useState} from "react";

// Components
import Button from "../../ui/Button/Button.jsx";

// Context / Hooks
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

// Api
import api from "../../../api/axios.js";

// CSS
import "./CreateCareTaskForm.css";

function CreateCareTaskForm({addCareTask, setShowForm}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const {token,user} = useContext(AuthContext);

    async function createCareTaskFormSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/careTasks",
                {
                    userId: user.id,
                    title,
                    description,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const newCareTask = response.data;
            addCareTask(newCareTask);
            console.log("Nieuwe zorgtaak uit backend:", newCareTask);

            setTitle("");
            setDescription("");
            setShowForm(false);

        } catch (error) {
            console.error(error)
            setError(error.response?.data?.error || "Er is iets mis gegaan..")
        }
    }

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