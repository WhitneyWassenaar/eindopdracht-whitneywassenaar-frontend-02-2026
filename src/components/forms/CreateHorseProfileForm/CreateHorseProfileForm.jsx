import {useState, useContext} from 'react';
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

import horseBreeds from '../../../data/horseBreeds.js';
import coatColors from '../../../data/coatColors.js';
import projectId from '../../../data/projectId.js';

import Button from '../../ui/Button/Button.jsx';

import './CreateHorseProfileForm.css';

function CreateHorseProfileForm({setHorses, setShowForm, contacts}) {
    const {token} = useContext(AuthContext);

    const [horseName, setHorseName] = useState("");
    const [horseGender, setHorseGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [horseBreed, setHorseBreed] = useState("");
    const [horseColor, setHorseColor] = useState("");
    const [horsePhoto, setHorsePhoto] = useState("");
    const [ownerId, setOwnerId] = useState("");

    const defaultHorsePhoto = "/defaultHorsePhoto.png"
    const today = new Date().toISOString().split("T")[0];
    // const [ownerId,setOwnerId] = useState("");
    // const [contactPersonId,setContactPersonId] = useState("");

    async function createHorseFormSubmit(e) {
        e.preventDefault();



        try {
            const response = await fetch(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/horses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "novi-education-project-id": projectId,
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: horseName,
                        gender: horseGender,
                        birthDate,
                        breed: horseBreed,
                        color: horseColor,
                        active: true,
                        photo: horsePhoto || defaultHorsePhoto,
                        ownerId: ownerId
                    })
                }
            );

            const newHorse = await response.json();

            setHorses(previousHorses => [
                ...previousHorses,
                newHorse
            ]);

            setHorseName("");
            setHorseGender("");
            setHorseColor("");
            setHorseBreed("");
            setBirthDate("")
            setHorsePhoto("");

            setShowForm(false);

        } catch (error) {
            console.error(error)
        }
    }

    const owners = contacts.filter(
        (contact) => contact.role === "Eigenaar"
    );

    return (
        <form onSubmit={createHorseFormSubmit} className="create-horse-profile-form-layout">
            <fieldset>
                <legend>Paardengegevens</legend>
                <div className="form-row">
                    <label>Naam</label>
                    <input
                        value={horseName}
                        onChange={(e) => setHorseName(e.target.value)}
                        id={"horse-name"}
                        type={"text"}
                        maxLength={20}
                        placeholder={"Voer naam van paard in"}
                        required/>
                </div>

                <div className="form-row gender-row">
                    <label>Geslacht</label>
                    <div className="radio-button-container">

                        <label>
                            <input
                                checked={horseGender === "Merrie"}
                                onChange={(e) => setHorseGender(e.target.value)}
                                id={"mare"}
                                name={"gender"}
                                value={"Merrie"}
                                type={"radio"}
                                required
                            />
                            Merrie
                        </label>

                        <label>
                            <input
                                checked={horseGender === "Hengst"}
                                onChange={(e) => setHorseGender(e.target.value)}
                                id={"stallion"}
                                name={"gender"}
                                value={"Hengst"}
                                type={"radio"}
                            />
                            Hengst
                        </label>

                        <label>
                            <input
                                checked={horseGender === "Ruin"}
                                onChange={(e) => setHorseGender(e.target.value)}
                                id={"gelding"}
                                name={"gender"}
                                value={"Ruin"}
                                type={"radio"}
                            />
                            Ruin
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <label>Geboortedatum</label>
                    <input
                        max={today}
                        value={birthDate}
                        onChange={(event) => setBirthDate(event.target.value)}
                        id="birth-date"
                        type="date"
                        required/>
                </div>

                <div className="form-row">
                    <label>Ras</label>
                    <select
                        value={horseBreed}
                        onChange={(event) => setHorseBreed(event.target.value)}
                        id="breed"
                        required
                    >
                        <option
                            value="">
                            Selecteer een ras
                        </option>
                        {horseBreeds.map((horseBreed) => (
                            <option
                                key={horseBreed}
                                value={horseBreed}>
                                {horseBreed}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <label>Kleur</label>
                    <select
                        value={horseColor}
                        onChange={(event) => setHorseColor(event.target.value)}
                        id="coatColor"
                        required
                    >
                        <option
                            value="">
                            Selecteer een vachtkleur
                        </option>
                        {coatColors.map((coatColor) => (
                            <option
                                key={coatColor}
                                value={coatColor}>
                                {coatColor}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <label>Eigenaar</label>
                    <select
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}
                        required
                    >
                        <option value="">
                            Selecteer een eigenaar
                        </option>

                        {owners.map((owner) => (
                            <option
                                key={owner.id}
                                value={owner.id}
                            >
                                {owner.firstName} {owner.lastName}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="form-row">
                    <label>Foto</label>
                    <p>Url afbeelding:</p>
                    <input
                        id="horse-photo"
                        type="url"
                        placeholder="Plaats URL van afbeelding"
                        value={horsePhoto}
                        onChange={(event) => setHorsePhoto(event.target.value)}

                    />
                </div>

                <Button type={"submit"}>Paardenprofiel aanmaken</Button>
            </fieldset>
        </form>
    );
}

export default CreateHorseProfileForm;

// Foto moet optioneel zijn, niet iedereen heeft gelijk een foto om up te loaden
// useState toevoegen voor image preview
// conditioneel renderen van de paardenprofiel aanmaak pagina/component