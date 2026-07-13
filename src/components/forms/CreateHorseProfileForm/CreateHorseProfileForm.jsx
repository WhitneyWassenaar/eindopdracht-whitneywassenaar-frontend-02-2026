import {useState, useContext} from 'react';
import {AuthContext} from "../../authentication/context/AuthContext.jsx";

import horseBreeds from '../../../data/horseBreeds.js';
import coatColors from '../../../data/coatColors.js';

import Button from '../../ui/Button/Button.jsx';
// import generateId from '../../../helpers/generateId.jsx';

import './CreateHorseProfileForm.css';
import projectId from "../../../data/projectId.js";

function CreateHorseProfileForm({setHorses, setShowForm}) {
    const {token} = useContext(AuthContext);

    const [horseName, setHorseName] = useState("");
    const [horseGender, setHorseGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [horseBreed, setHorseBreed] = useState("");
    const [horseColor, setHorseColor] = useState("");
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
                        ownerId: 1
                    })
                }
            );

            const newHorse = await response.json();

            if (!response.ok) {
                console.error(newHorse);
                return;
            }

            setHorses(previousHorses => [
                ...previousHorses,
                newHorse
            ]);


            setHorseName("");
            setHorseGender("");
            setHorseColor("");
            setHorseBreed("");
            setBirthDate("")

            setShowForm(false);


        } catch (error) {
            console.error(error)
        }
    }

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
                    <select disabled>
                        <option>
                            Eerst contactpersoon aanmaken!
                        </option>
                    </select>

                </div>

                <div className="form-row">
                    <label>Foto</label>
                    <p>Upload een afbeelding:</p>
                    <input
                        id="horse-photo"
                        type="file"
                        accept="image/*"/>
                </div>

                <Button type={"submit"}>Paardenprofiel aanmaken</Button>
            </fieldset>
        </form>

    );
}

export default CreateHorseProfileForm;

// Foto moet optioneel zijn, niet iedereen heeft gelijk een foto om up te loaden
// useState toevoegen voor image preview
// in frontend en backend geboortedatum controle uitvoeren
// conditioneel renderen van de paardenprofiel aanmaak pagina/component