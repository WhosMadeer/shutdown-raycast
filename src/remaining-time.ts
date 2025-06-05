import { Detail, environment, LocalStorage, showHUD, updateCommandMetadata } from "@raycast/api";
import { useEffect, useState } from "react";

export default async function Command() {
    const storedEnd = await LocalStorage.getItem<number>("timerEnd");
    const launchType = environment.launchType;
    console.log(launchType);
    if (!storedEnd) {
        // showHUD("No active timer.");
        await updateCommandMetadata({ subtitle: `No active timer.` });
        return;
    }

    const timeLeft = storedEnd - Date.now(); // unix number
    if (timeLeft > 60) {
        const value = Math.round(timeLeft / 60000);
        await updateCommandMetadata({ subtitle: `${value} minutes remaining` });
    } else if (timeLeft > 0) {
        const value = Math.round(timeLeft / 10000);
        await updateCommandMetadata({ subtitle: `${value} seconds remaining` });
    } else {
        await showHUD("Timer expired!");
        await LocalStorage.removeItem("timerEnd");
    }
}
