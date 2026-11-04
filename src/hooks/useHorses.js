import { useEffect, useState } from "react";
import { getHorses } from "../services/horseService.js";

function useHorses(userId, token) {
    console.log("useHorses wordt aangeroepen", userId, token);
    const [horses, setHorses] = useState([]);
    const [loadingHorses, setLoadingHorses] = useState(false);
    const [horsesError, setHorsesError] = useState("");

    useEffect(() => {
        if (!token || userId == null) return;

        const controller = new AbortController();

        async function fetchHorses() {
            try {
                setLoadingHorses(true);
                setHorsesError("");

                const data = await getHorses(
                    userId,
                    token,
                    controller.signal
                );

                console.log("Opgehaalde paarden:", data);

                setHorses(data);
            } catch (error) {
                if (error.name === "CanceledError" || error.name === "AbortError") {
                    return;
                }

                console.error("Fout bij ophalen paarden:", error);
                setHorsesError("Het ophalen van de paarden is niet gelukt.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoadingHorses(false);
                }
            }
        }

        fetchHorses();

        return () => {
            controller.abort();
        };
    }, [userId, token]);

    return {
        horses,
        loadingHorses,
        horsesError
    };
}

export default useHorses;
