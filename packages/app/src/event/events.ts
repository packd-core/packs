import {createEvent} from "react-event-hook";

export const { usePackCreatedListener, emitPackCreated } = createEvent("packCreated")();
export const { usePackClaimedListener, emitPackClaimed } = createEvent("packClaimed")();
