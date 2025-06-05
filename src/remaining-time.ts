import { Detail, environment, LocalStorage, showHUD, updateCommandMetadata } from "@raycast/api";
import { useEffect, useState } from "react";

export default async function Command() {
    const storedEnd = await LocalStorage.getItem<number>("timerEnd");
    const launchType = environment.launchType;

    if (!storedEnd) {
        await updateCommandMetadata({ subtitle: `No active timer.` });
        return;
    }

    const timeLeft = storedEnd - Date.now(); // unix number
    console.log(timeLeft);
    if (timeLeft > 60000) {
        const value = Math.ceil(timeLeft / 60000);
        await updateCommandMetadata({ subtitle: `${value} minutes remaining` });
    } else if (timeLeft > 0) {
        const value = Math.ceil(timeLeft / 1000);
        await updateCommandMetadata({ subtitle: `${value} seconds remaining` });
    } else {
        await updateCommandMetadata({ subtitle: `No active timer.` });
        await LocalStorage.removeItem("timerEnd");
        await LocalStorage.removeItem("pid");
    }
}
