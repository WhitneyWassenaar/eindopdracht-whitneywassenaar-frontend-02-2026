import horseBreeds from '../../../data/horseBreeds.js';
import coatColors from '../../../data/coatColors.js';

import Button from '../../ui/Button/Button.jsx';

import './CreateHorseProfileForm.css';
import {useState} from "react";

function CreateHorseProfileForm() {

    const [horseName,setHorseName] = useState("");
    const [horseGender,setHorseGender] = useState("");
    const [birthDate,setBirthDate] = useState("");
    const [horseBreed,setHorseBreed] = useState("");
    const [owner,setOwner] = useState("");

    function createHorseFormSubmit(e) {
        e.preventDefault();

        const newHorseProfile = {
            id:,
            name:,
            breed:,
            gender:,
            birthDate:,
            color:,
            status : "Actief",
            ownerId: 1,
            contactPersonId: 1,
            careTakerId: null,
            trainerId: null
        };
    }
    return (
        <form onSubmit={createHorseFormSubmit} className="create-horse-profile-form-layout">
            <fieldset>
                <legend>Paardengegevens</legend>
                <div className="form-row">
                    <label>Naam</label>
                    <input
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
                                id={"stallion"}
                                name={"gender"}
                                value={"Hengst"}
                                type={"radio"}
                            />
                            Hengst
                        </label>

                        <label>
                            <input
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
                        id="birth-date"
                        type="date"
                        required/>
                </div>

                <div className="form-row">
                    <label>Ras</label>
                    <select
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