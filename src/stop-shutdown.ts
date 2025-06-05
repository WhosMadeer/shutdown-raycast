import { Detail, environment, LocalStorage, showHUD, updateCommandMetadata } from "@raycast/api";
import { useEffect, useState } from "react";

export default async function Command() {
    const pid = await LocalStorage.getItem<number>("pid");

    console.log(pid);
    try {
        if (!pid) {
            await showHUD("No active shutdown sequence.");
            await LocalStorage.removeItem("timerEnd");
            return;
        } else {
            process.kill(pid);
            await showHUD(`Killed process ${pid}`);
            await LocalStorage.removeItem("pid");
            await LocalStorage.removeItem("timerEnd");
            return;
        }
    } catch (err) {
        console.error(err);
        await LocalStorage.removeItem("pid");
        await LocalStorage.removeItem("timerEnd");
    }
}
