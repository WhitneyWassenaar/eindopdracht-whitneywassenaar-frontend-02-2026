// React
import {useContext, useState} from "react";

// Components
import Button from "../../ui/Button/Button.jsx";

// Context / Hooks
import {AuthContext} from "../../../context/AuthContext.jsx";

// Services
import {getCareTasks, createCareTask} from "../../../services/careTaskService.js";

function CreateCareTaskForm({addCareTask, setShowForm}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const {token, user} = useContext(AuthContext);

    const [isSaving, setIsSaving] = useState(false);

    async function createCareTaskFormSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            setIsSaving(true);
            setError("");

            const existingTasks = await getCareTasks(token);

            const taskExists = existingTasks.some(task =>
                task.title.trim().toLowerCase() === title.trim().toLowerCase()
            );

            if (taskExists) {
                setError("Deze zorgtaak bestaat al.");
                return;
            }

            const newCareTask = await createCareTask(
                {
                    userId: user.id,
                    title: title.trim(),
                    description: description.trim()
                },
                token
            );
            addCareTask(newCareTask);

            setTitle("");
            setDescription("");
            setShowForm(false);

        } catch (error) {
            console.error("Zorgtaak aanmaken mislukt:", error);
            setError(error.response?.data?.error || "Er is iets misgegaan.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form onSubmit={createCareTaskFormSubmit} className="create-caretask-form-layout">
            <fieldset>
                <legend>Zorgtaak aanmaken</legend>
                <div className="form-row">
                    <label htmlFor="title">
                        Titel
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        id="title"
                        type="text"
                        minLength={1}
                        maxLength={30}
                        placeholder="Voer titel in"
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="description">
                        Beschrijving
                    </label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description"
                        type="text"
                        maxLength={100}
                        placeholder="Voer beschrijving in"
                        required
                    />
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isSaving}
                >
                    {isSaving ? "Bezig met aanmaken..." : "Zorgtaak aanmaken"}
                </Button>

                <Button
                    type="button"
                    variant="cancel"
                    onClick={() =>
                        setShowForm(null)
                    }
                >
                    Annuleren
                </Button>
            </fieldset>
        </form>
    )
}

export default CreateCareTaskForm;