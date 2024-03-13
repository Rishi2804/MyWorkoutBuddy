import { TemplatesContext } from "../context/TemplateContext";
import { useContext } from "react";

export const useTemplatesContext = () => {
    const context = useContext(TemplatesContext)

    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutContextProvider')
    }

    return context
}